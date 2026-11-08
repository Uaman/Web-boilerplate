const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const FORECAST_DAYS = 5
const GEOLOCATION_TIMEOUT = 8000

export const KYIV = { name: 'Kyiv', latitude: 50.4501, longitude: 30.5234 }

const CONDITIONS = [
  { codes: [0], label: 'Clear sky', icon: '☀️' },
  { codes: [1, 2], label: 'Partly cloudy', icon: '⛅' },
  { codes: [3], label: 'Overcast', icon: '☁️' },
  { codes: [45, 48], label: 'Fog', icon: '🌫️' },
  { codes: [51, 53, 55, 56, 57], label: 'Drizzle', icon: '🌦️' },
  { codes: [61, 63, 65, 66, 67, 80, 81, 82], label: 'Rain', icon: '🌧️' },
  { codes: [71, 73, 75, 77, 85, 86], label: 'Snow', icon: '❄️' },
  { codes: [95, 96, 99], label: 'Thunderstorm', icon: '⛈️' },
]

export const describeWeather = (code) => (
  CONDITIONS.find(({ codes }) => codes.includes(code)) ?? { label: 'Unknown', icon: '🌡️' }
)

// The geolocation timeout option does not count the time the permission prompt stays open.
export const getLocation = () => new Promise((resolve) => {
  if (!navigator.geolocation) {
    resolve(KYIV)
    return
  }

  const timer = setTimeout(() => resolve(KYIV), GEOLOCATION_TIMEOUT)
  const finish = (place) => {
    clearTimeout(timer)
    resolve(place)
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => finish({
      name: 'Your location',
      latitude: coords.latitude,
      longitude: coords.longitude,
    }),
    () => finish(KYIV),
    { timeout: GEOLOCATION_TIMEOUT, maximumAge: 10 * 60 * 1000 },
  )
})

export const fetchForecast = async ({ latitude, longitude }, signal) => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
    timezone: 'auto',
    forecast_days: FORECAST_DAYS,
  })
  const response = await fetch(`${FORECAST_URL}?${params}`, { signal })
  if (!response.ok) throw new Error(`Weather service responded with ${response.status}`)

  const { daily } = await response.json()
  return daily.time.map((date, index) => ({
    date,
    code: daily.weather_code[index],
    max: daily.temperature_2m_max[index],
    min: daily.temperature_2m_min[index],
    precipitation: daily.precipitation_probability_max[index],
    wind: daily.wind_speed_10m_max[index],
  }))
}
