import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
ChartJs.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

interface ChartData {
  month: string;
  year: number;
  totalAppointments: number;
  totalMedication: number;
  totalTreatment: number;
}

function Barchart() {
  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Medication',
        data: [] as number[], // Explicitly define the type of data
        backgroundColor: '#00F50A', // Green
      },
      {
        label: 'Appointment',
        data: [] as number[], // Explicitly define the type of data
        backgroundColor: '#263A5C', // Blue
      },
      {
        label: 'Treatment',
        data: [] as number[], // Explicitly define the type of data
        backgroundColor: '#FB640D', // Yellow
      },
    ],
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    fetchPie();
  }, []); // Call fetchPie only once when component mounts

  const fetchPie = async () => {
    try {
      const tosinToken = localStorage.getItem("token");
      const token = JSON.parse(tosinToken as string); // Type assertion

      const response = await fetch('https://senexcare.onrender.com/user/pie', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const chartData: ChartData[] = await response.json();

      const medicationData = chartData.map(item => item.totalMedication || 0);
      const appointmentData = chartData.map(item => item.totalAppointments || 0);
      const treatmentData = chartData.map(item => item.totalTreatment || 0);

      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: medicationData,
          },
          {
            ...data.datasets[1],
            data: appointmentData,
          },
          {
            ...data.datasets[2],
            data: treatmentData,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  return (
    <div className='w-[100%] md:w-[80%]'
      style={{
        margin: 'auto',
        borderStyle: 'solid',
        borderRadius: '10px',
        boxShadow: '3px 4px 2px rgba(161,164,170 ,0.5)',
      }}
    >
      <h1 className='text-center text-[#263A5C] my-[32px]'>Total Activity</h1>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Barchart;
