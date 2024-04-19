import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
    const [xAxisData, setXAxisData] = useState([]);
    const [yAxisData, setYAxisData] = useState([]);
    const chartRef = useRef(null);
  
    useEffect(() => {
      // Fetching data from y-axis API
      axios.get('https://retoolapi.dev/o5zMs5/data')
        .then(response => {
          setYAxisData(response.data.slice(0, 50));
        })
        .catch(error => {
          console.error('Error fetching y-axis data:', error);
        });
  
      // Fetching data from x-axis API
      axios.get('https://retoolapi.dev/gDa8uC/data')
        .then(response => {
          setXAxisData(response.data.slice(0, 50));
        })
        .catch(error => {
          console.error('Error fetching x-axis data:', error);
        });
    }, []);
  
    useEffect(() => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    }, [xAxisData, yAxisData]);
  
    const data = {
      labels: xAxisData.map(item => item.Label),
      datasets: [
        {
          label: 'Y Axis Data',
          data: yAxisData.map(item => parseFloat(item.RandomNumber)),
          fill: false,
          borderColor: '#02c785',
          tension: 0.1
        }
      ]
    };
  
    return (
      <div style={{padding: '20px'}}>
        <h2> Spearmint Chart</h2>
        <Line ref={chartRef} data={data} />
      </div>
    );
  };
  
  export default ChartComponent;