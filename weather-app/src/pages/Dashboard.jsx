import React, { useEffect, useState } from "react";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todaySun, setTodaySun] = useState({ sunrise: null, sunset: null });
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  
    
  
  useEffect(() => {
    
    const fetchWeather = async () => {
      try {
        const res = await fetch(
            "https://api.open-meteo.com/v1/forecast?" +
              "latitude=50.45&longitude=30.52" +
              "&hourly=temperature_2m,relative_humidity_2m,visibility,pressure_msl" +
              "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,sunrise,sunset" +
              "&timezone=Europe/Kiev" +
              "&forecast_days=6"
          );
          
          
        const data = await res.json();
        
        setTodaySun({
            sunrise: data.daily.sunrise[0],
            sunset: data.daily.sunset[0],
          });
          
        const hourlyHumidity = data.hourly.relative_humidity_2m;
        const hourlyVisibility = data.hourly.visibility;
        const hourlyPressure = data.hourly.pressure_msl;  
        
        const daily = data.daily.time.map((date, i) => {
          const { sum: humSum, count: humCount } = hourlyHumidity.reduce(
            (acc, h, idx) => {
              const dayOfHour = new Date(data.hourly.time[idx]).getDate();
              const thatDay = new Date(date).getDate();
              if (dayOfHour === thatDay) {
                acc.sum += h;
                acc.count += 1;
              }
              return acc;
            }, { sum: 0, count: 0 }
          );
          const avgHumidity = humCount > 0 ? Math.round(humSum / humCount) : null;
  
          const { sum: visSum, count: visCount } = hourlyVisibility.reduce(
            (acc, v, idx) => {
              const dayOfHour = new Date(data.hourly.time[idx]).getDate();
              const thatDay = new Date(date).getDate();
              if (dayOfHour === thatDay) {
                acc.sum += v;
                acc.count += 1;
              }
              return acc;
            }, { sum: 0, count: 0 }
          );
          const avgVisibility = visCount > 0 ? Math.round(visSum / visCount) : null;
  
          const { sum: presSum, count: presCount } = hourlyPressure.reduce(
            (acc, p, idx) => {
              const dayOfHour = new Date(data.hourly.time[idx]).getDate();
              const thatDay = new Date(date).getDate();
              if (dayOfHour === thatDay) {
                acc.sum += p;
                acc.count += 1;
              }
              return acc;
            }, { sum: 0, count: 0 }
          );
          const avgPressure = presCount > 0 ? Math.round(presSum / presCount) : null;
  
          return {
            date,
            maxTemp: data.daily.temperature_2m_max[i],
            minTemp: data.daily.temperature_2m_min[i],
            weatherCode: data.daily.weathercode[i],
            precipitation: data.daily.precipitation_sum[i],
            humidity: avgHumidity,
            visibility: avgVisibility,
            pressure: avgPressure,  
          };
        });
  
        setWeather(daily);
      } catch (err) {
        console.error("Помилка:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);
  
  

    useEffect(() => {
    const interval = setInterval(() => {
        setCurrentTime(new Date());
    }, 60000); 

    return () => clearInterval(interval); 
    }, []);

    

  if (loading) return <Loader />;

  return (
    <div>
      <header className="topbar">
        <nav className="nav-left">
          <button>Home</button>
          <button>Language</button>
          <button>Map</button>
          <button>API</button>
          <button>About</button>
        </nav>
        <div className="nav-right">
        <input 
          type="text"
          placeholder="Search"
          />
        </div>
      </header>
      
  {todaySun.sunrise && todaySun.sunset && (
    <div className="sun-info">
      <p>Поточний час: {currentTime.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}</p>
      <p>Схід: {new Date(todaySun.sunrise).toLocaleTimeString("uk-UA", { hour: '2-digit', minute: '2-digit' })}</p>
      <p>Захід: {new Date(todaySun.sunset).toLocaleTimeString("uk-UA", { hour: '2-digit', minute: '2-digit' })}</p>
    </div>
  )}

      
      <div className="dashboard">
        <h2>Київ</h2>
        <div className="weather-list">
          {weather.map((day, index) => (
            <WeatherCard key={day.date} day={day} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

