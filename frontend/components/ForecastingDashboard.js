
// frontend/components/ForecastingDashboard.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const ForecastingDashboard = () => {
  const [historicalData, setHistoricalData] = useState([10, 12, 15, 18, 20, 22, 25, 28, 30, 32]);
  const [forecast, setForecast] = useState(null);

  // Fetch forecasted transaction value
  const fetchForecast = async () => {
    const response = await fetch('/api/ai/forecast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: historicalData }),
    });
    const data = await response.json();
    setForecast(data.forecast);
  };

  const chartData = {
    labels: [...Array(historicalData.length).keys()],
    datasets: [
      {
        label: 'Historical Data',
        data: historicalData,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Forecasted Value',
        data: forecast ? [...historicalData.slice(-1), forecast] : [],
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
        borderDash: [5, 5],
      },
    ],
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <div className="forecasting-dashboard">
      <h2>AI Forecasting Dashboard</h2>
      <Line data={chartData} />
      {forecast !== null && <p>Forecasted Value: {forecast}</p>}
    </div>
  );
};

export default ForecastingDashboard;
