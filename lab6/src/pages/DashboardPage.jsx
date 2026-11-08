import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Loader from '../components/Loader.jsx'
import WeatherCard from '../components/WeatherCard.jsx'
import { getUser, signOut } from '../auth.js'
import { fetchForecast, getLocation } from '../weather.js'

const LOADING_TEXT = {
  locating: 'Detecting your location...',
  loading: 'Loading weather...',
}

const INITIAL_FORECAST = { status: 'locating', days: [], place: null }

export default function DashboardPage() {
  const navigate = useNavigate()
  const [forecast, setForecast] = useState(INITIAL_FORECAST)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      try {
        const place = await getLocation()
        if (controller.signal.aborted) return
        setForecast({ status: 'loading', days: [], place })
        const days = await fetchForecast(place, controller.signal)
        if (!controller.signal.aborted) setForecast({ status: 'ready', days, place })
      } catch {
        if (!controller.signal.aborted) setForecast({ status: 'error', days: [], place: null })
      }
    }

    load()
    return () => controller.abort()
  }, [attempt])

  const retry = () => {
    setForecast(INITIAL_FORECAST)
    setAttempt((value) => value + 1)
  }

  const logout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  const { status, days, place } = forecast

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Weather for 5 days</h1>
        <span className="dashboard__user">{getUser()}</span>
        <button className="button button--ghost" type="button" onClick={logout}>Log out</button>
      </header>

      {LOADING_TEXT[status] && <Loader text={LOADING_TEXT[status]} />}

      {status === 'error' && (
        <div className="dashboard__error" role="alert">
          <p>Could not load the forecast. Check your connection and try again.</p>
          <button className="button" type="button" onClick={retry}>Try again</button>
        </div>
      )}

      {status === 'ready' && (
        <>
          <p className="dashboard__place">
            {place.name} ({place.latitude.toFixed(2)}, {place.longitude.toFixed(2)})
          </p>
          <section className="dashboard__days">
            {days.map((day) => <WeatherCard key={day.date} {...day} />)}
          </section>
        </>
      )}
    </div>
  )
}
