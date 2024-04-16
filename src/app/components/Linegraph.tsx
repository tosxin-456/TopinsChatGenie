import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

function LineGraph() {

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', "December"]
  const currentDate = new Date
  const month = currentDate.getMonth() ;
  
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      label: 'Medication Intake',
      data: [],
      backgroundColor: 'transparent',
      borderColor: '#263A5C',
      pointBorderColor: 'transparent',
      pointBorderWidth: 4,
      tension: 0.3
    }]
  });

  const tosinToken = localStorage.getItem("token");
  const token = JSON.parse(tosinToken as string); // type assertion

  const fetchLine = async () => {
    try {
      const response = await fetch("https://senexcare.onrender.com/user/line", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const chatData = await response.json();
  
      // Extract day and medicationTaken values from chatData
      const labels = chatData.map((entry: { day: number }) => entry.day);
      const medicationTakenData = chatData.map((entry: { medicationTaken: number }) => entry.medicationTaken);
  
      // Update the chart data
      setData({
        labels: labels,
        datasets: [{
          ...data.datasets[0],
          data: medicationTakenData,
        }]
      });
  
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };
  
  useEffect(() => {
    fetchLine();
  }, []); // Call fetchLine only once when component mounts

  const options = {
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          padding: 15, // Adjust padding for x-axis ticks
        },
      },
      y: {
        ticks: {
          padding: 10, // Adjust padding for y-axis ticks
        },
        min: -1, // Set the minimum value for the x-axis
      },
    },
  };
  
  


  return (
    <div className='w-full md:w-[80%]'
      style={{
        margin: 'auto',
        borderStyle: 'solid',
        borderRadius: '10px',
        boxShadow: '3px 4px 2px rgba(161,164,170 ,0.5)',
      }}
    >
      <h1 className='text-center text-[#263A5C] mt-[40px]'>Medication intake Graph for {months[month]}</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
