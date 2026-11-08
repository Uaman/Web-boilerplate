import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import {
  checkCredentials, getUser, signIn, validateLoginForm,
} from '../auth.js'

const EMPTY_FORM = { login: '', password: '' }

const FIELDS = [
  { name: 'login', label: 'Login', type: 'text', autoComplete: 'username' },
  { name: 'password', label: 'Password', type: 'password', autoComplete: 'current-password' },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  if (getUser()) return <Navigate to="/dashboard" replace />

  const handleChange = ({ target: { name, value } }) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setFormError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = { login: values.login.trim(), password: values.password }
    const fieldErrors = validateLoginForm(form)
    const firstInvalid = FIELDS.find(({ name }) => fieldErrors[name])

    setErrors(fieldErrors)
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid.name].focus()
      return
    }

    if (!checkCredentials(form)) {
      setFormError('Incorrect login or password')
      return
    }

    if (!signIn(form.login)) {
      setFormError('Enable cookies in your browser to sign in')
      return
    }

    navigate(location.state?.from ?? '/dashboard', { replace: true })
  }

  return (
    <main className="login">
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <h1 className="login__title">Sign in</h1>
        <p className="login__hint">Use your name and course number, e.g. mark5</p>

        {FIELDS.map(({ name, label, type, autoComplete }) => (
          <div className="field" key={name}>
            <label className="field__label" htmlFor={name}>{label}</label>
            <input
              className="field__input"
              id={name}
              name={name}
              type={type}
              value={values[name]}
              onChange={handleChange}
              aria-invalid={Boolean(errors[name])}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              autoComplete={autoComplete}
            />
            {errors[name] && (
              <span className="field__error" id={`${name}-error`} role="alert">{errors[name]}</span>
            )}
          </div>
        ))}

        {formError && <p className="login__error" role="alert">{formError}</p>}
        <button className="button" type="submit">Sign in</button>
      </form>
    </main>
  )
}
