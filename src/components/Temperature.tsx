import React from 'react';

interface TemperatureProps {
  weatherText: string;
  currentTemp: number | null;
  icon: string;
  unit: 'C' | 'F';
}

const Temperature: React.FC<TemperatureProps> = ({ weatherText, currentTemp, icon, unit }) => {
  return (
    <div className="temperature-container">
      <div className="temperature-column">
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" className="weather-icon" />
        <p className="weather-text">{weatherText}</p>
      </div>
      <p className="temperature">
        {currentTemp !== null
          ? unit === 'C'
            ? `${Number(currentTemp).toFixed(1)}°`
            : `${(Number(currentTemp) * 1.8 + 32).toFixed(1)}°`
          : "Loading..."}
      </p>
      <p className="unit">{unit}</p>
    </div>
  );
};

export default Temperature;
