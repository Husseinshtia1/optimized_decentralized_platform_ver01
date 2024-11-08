
// frontend/components/AnalyticsWithChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const AnalyticsWithChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'User Growth',
        data: [10, 20, 30, 40, 50],
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    // Simulate dynamic data loading
    const fetchData = async () => {
      const data = [12, 24, 36, 48, 60]; // Replace with real API call
      setChartData((prevState) => ({
        ...prevState,
        datasets: [{ ...prevState.datasets[0], data }],
      }));
    };
    fetchData();
  }, []);

  return (
    <div className="analytics-chart">
      <h2>User Growth Analytics</h2>
      <Line data={chartData} />
    </div>
  );
};

export default AnalyticsWithChart;
