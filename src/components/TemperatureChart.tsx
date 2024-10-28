import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Forecast } from '../types/types';

interface TemperatureChartProps {
  forecasts: Forecast[];
  unit: 'C' | 'F';
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ forecasts, unit }) => {

  const chartData = forecasts.map((forecast) => ({
    date: forecast.date,
    temperature: unit === 'C' ? forecast.temp : forecast.temp * 1.8 + 32, 
  }));

  return (
    <ResponsiveContainer width="100%" height={300} style={{ backgroundColor: '#f0f4f8', borderRadius: '8px' }}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: `Temperature (°${unit})`, angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value) => `${value}°${unit}`} />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
  
};

export default TemperatureChart;
