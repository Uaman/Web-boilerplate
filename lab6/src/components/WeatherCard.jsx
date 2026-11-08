import { describeWeather } from '../weather.js'

const dateFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })

export default function WeatherCard({ date, code, max, min, precipitation, wind }) {
  const { label, icon } = describeWeather(code)

  return (
    <article className="weather-card">
      <h2 className="weather-card__date">{dateFormat.format(new Date(`${date}T00:00`))}</h2>
      <p className="weather-card__icon" aria-hidden="true">{icon}</p>
      <p className="weather-card__label">{label}</p>
      <p className="weather-card__temp">
        {Math.round(max)}° <span className="weather-card__min">/ {Math.round(min)}°</span>
      </p>
      <dl className="weather-card__details">
        <dt>Rain</dt>
        <dd>{precipitation ?? 0}%</dd>
        <dt>Wind</dt>
        <dd>{Math.round(wind)} km/h</dd>
      </dl>
    </article>
  )
}
