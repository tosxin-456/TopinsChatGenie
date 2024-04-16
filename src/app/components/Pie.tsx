import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import {
  Chart as ChartJs,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJs.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

function Piechart() {
  const [data, setData] = useState({
    labels: ['Schedules Attended', 'Schedules Missed'],
    datasets: [
      {
        data: [1, 1], // Initial values (can be anything)
        backgroundColor: ['#00F50A', '#FB640D'], // Green for attended, Red for missed
      },
    ],
  });

  useEffect(() => {
    fetchPie();
  }, []); // Call fetchLine only once when component mounts

  const tosinToken = localStorage.getItem("token");
  const token = JSON.parse(tosinToken as string); // type assertion

  const fetchPie = async () => {
    try {
      const response = await fetch('https://senexcare.onrender.com/user/pie', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const chatData = await response.json();

      const totalCompleted = chatData.totalCompleted || 0; // Default to 0 if not available
      const totalIncomplete = chatData.totalIncomplete || 0; // Default to 0 if not available

      // Update the data object with new values
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: [totalCompleted, totalIncomplete],
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  return (
    <div className='w-[80%] md:w-[60%]'
      style={{
        margin: 'auto',
        borderStyle: 'solid',
        borderRadius: '10px',
        boxShadow: '3px 4px 2px rgba(161, 164, 170, 0.5)',
      }}
    >
      <h1 className='text-center text-[#263A5C] mt-[80px] '>Schedules Graph</h1>
      <Pie id="myChart" data={data} />
    </div>
  );
}

export default Piechart;
