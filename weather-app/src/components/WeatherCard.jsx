export default function WeatherCard({ day, index }) {
    const getIcon = (code) => {
      if ([0].includes(code)) return "☀️";
      if ([1, 2].includes(code)) return "🌤";
      if ([3].includes(code)) return "☁️";
      if ([45, 48].includes(code)) return "🌫";
      if ([51, 61, 80].includes(code)) return "🌦";
      if ([56, 57, 63, 65, 80, 81, 82].includes(code)) return "🌧";
      if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
      if ([95, 96, 99].includes(code)) return "⛈";
      return "🤪";
    };
  
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
  
      if (index === 0) return "Today";
      if (index === 1) return "Tomorrow";
  
      return date.toLocaleDateString("en-GB", {
        weekday: "short", 
        day: "2-digit",   
        month: "short",   
      });
    };
    
    return (
      <div className="weather-card">
        <h3>{formatDate(day.date)}</h3>
        <div style={{ fontSize: "40px" }}>{getIcon(day.weatherCode)}</div>
        <p>Max: {Math.round(day.maxTemp)}°C</p>
        <p>Min: {Math.round(day.minTemp)}°C</p>
        <p>Вологість: {day.humidity}%</p>
        <p>Опади: {day.precipitation} м</p>
        <p>Видимість: {Math.round(day.visibility / 1000)} км</p>
        <p>Тиск: {day.pressure} гПа</p>

      </div>
    );
  }
  