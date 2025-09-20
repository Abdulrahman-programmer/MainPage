import React from "react";
import { Bar } from "react-chartjs-2";
import {

Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
labels: [
    "Item A",
    "Item B",
    "Item C",
    "Item D",
    "Item E",
    "Item F",
    "Item G",
    "Item H",
    "Item I",
    "Item J",
],
datasets: [
    {
        label: "Units Sold",
        data: [120, 110, 105, 98, 95, 90, 85, 80, 75, 70],
        backgroundColor: "rgba(6, 57, 135, 1)",
        borderColor: "rgba(6, 57, 135, 1)",
        borderWidth: 1,
    },
],
};

const options = {
indexAxis: "y",
responsive: true,
plugins: {
    legend: { display: false },
    title: {
        display: true,
        text: "Top 10 Selling Items",
    },
},
scales: {
    x: {
        beginAtZero: true,
    },
},
};

const BestSellers = () => (
<div  className="chartBox">
    <Bar data={data} options={options} />
</div>
);

export default BestSellers;