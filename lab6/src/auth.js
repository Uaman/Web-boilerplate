const COOKIE_NAME = 'auth_user'
const COOKIE_MAX_AGE = 60 * 60 * 24

const CREDENTIALS = { login: 'roman3', password: 'roman3' }

const LOGIN_FORMAT = /^[a-z]+[1-6]$/i

export const validateLoginForm = ({ login, password }) => {
  const errors = {}

  if (!login) errors.login = 'Enter your login'
  else if (!LOGIN_FORMAT.test(login)) errors.login = 'Login is a name followed by a course number, e.g. mark5'

  if (!password) errors.password = 'Enter your password'

  return errors
}

export const checkCredentials = ({ login, password }) => (
  login.toLowerCase() === CREDENTIALS.login && password === CREDENTIALS.password
)

const decode = (value) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return undefined
  }
}

export const getUser = () => {
  const value = document.cookie
    .split('; ')
    .find((pair) => pair.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1)
  const user = value && decode(value)
  return user === CREDENTIALS.login ? user : undefined
}

export const signIn = (login) => {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(login.toLowerCase())}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Strict`
  return Boolean(getUser())
}

export const signOut = () => {
  document.cookie = `${COOKIE_NAME}=; max-age=0; path=/; SameSite=Strict`
}
