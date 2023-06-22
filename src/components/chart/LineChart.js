import React, {useContext, useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-adapter-moment';
import {Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, TimeScale} from "chart.js";


import JwtKeyContext from "../context/JwtKeyContext";


const LineChart = () => {
    ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);

    const [importData, setImportData] = useState([]);
    const jwtKey = useContext(JwtKeyContext);

    useEffect(() => {
        // Fetch data from the API endpoint '/api/import'
        fetch('http://127.0.0.1:8089/api/import', {
            method: "get",
            headers: {
                'Authorization': `Bearer ${jwtKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setImportData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

// Prepare data for the chart
    const chartData = {
        labels: importData.map((importItem) => moment(importItem.date).format('MMM D')), // Assuming date is in a format recognized by Moment.js
        datasets: [
            {
                label: 'Range 5', // Replace with the appropriate label
                data: importData.map((importItem) => importItem.range_5), // Replace with the appropriate data property
                fill: false,
                borderColor: 'rgba(75,192,192,1)', // Replace with desired line color
            },
        ],
    };

    // Customize chart options if needed
    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day', // Adjust the time unit as per your data
                    displayFormats: {
                        day: 'MMM D', // Adjust the date format as per your preference
                    },
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Import Data Line Chart</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineChart;
