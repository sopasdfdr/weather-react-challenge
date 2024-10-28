import React from 'react';
import { Forecast } from '../types/types';
import { formatDate } from '../utils/dateUtils';

interface FiveDayForecastProps {
  forecasts: Forecast[];
  unit: 'C' | 'F';
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ forecasts, unit }) => {
  const getBackgroundImage = (weatherType: number) => {
    switch (weatherType) {
      case 0:
        return "url('/thunderstorm.jpeg')";
      case 1:
      case 2:
        return "url('/rain.jpg')";
      case 3:
        return "url('/snow.jpeg')";
      case 4:
        return "url('/tornado.jpg')";
      case 5:
        return "url('/clear-day.jpg')";
      case 6:
        return "url('/clear-night.jpg')";
      case 7:
        return "url('/cloudy-day.jpg')";
      case 8:
        return "url('/cloudy-night.jpg')";
      default:
        return "url('/dusk.jpg')";
    }
  };

  return (
    <div className="forecast-wrapper">
      <div className="forecast-container">
        {forecasts.map((forecast) => (
          <div
            key={forecast.dt}
            className="forecast-card"
            style={{
              backgroundImage: getBackgroundImage(forecast.weatherType), 
              backgroundSize: 'cover', 
              color: 'white',
            }}
          >
            <p>{formatDate(forecast.date,0)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
              alt={forecast.weatherText}
              className="forecast-icon"
            />
            <p>{forecast.weatherText}</p>
            <p>
              {unit === 'C'
                ? `${forecast.temp.toFixed(1)}°C`
                : `${(forecast.temp * 1.8 + 32).toFixed(1)}°F`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
