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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sample sales data
const salesData = [
{ month: "Jan", item: "Item A", sold: 120 },
{ month: "Feb", item: "Item B", sold: 150 },
{ month: "Mar", item: "Item C", sold: 180 },
{ month: "Apr", item: "Item B", sold: 200 },
{ month: "May", item: "Item A", sold: 170 },
{ month: "Jun", item: "Item C", sold: 210 },
{ month: "Jul", item: "Item B", sold: 190 },
{ month: "Aug", item: "Item A", sold: 220 },
{ month: "Sep", item: "Item C", sold: 230 },
{ month: "Oct", item: "Item B", sold: 250 },
{ month: "Nov", item: "Item A", sold: 240 },
{ month: "Dec", item: "Item C", sold: 260 },
];

// Prepare data for the chart
const labels = salesData.map((d) => `${d.month} (${d.item})`);
const data = {
labels,
datasets: [
    {
        label: "Max Sold Item",
        data: salesData.map((d) => d.sold),
        backgroundColor: "rgba(6, 57, 135, 1)",
        borderRadius: 5,
        barThickness: 10,
        
    },
],
};

const options = {
responsive: true,
plugins: {
    legend: { display: false },
    title: {
        display: true,
        text: "Maximum Sold Item in Each Month",
    },
    tooltip: {
        callbacks: {
            label: function (context) {
                const idx = context.dataIndex;
                return `${salesData[idx].item}: ${salesData[idx].sold}`;
            },
        },
    },
},
scales: {
    y: {
        beginAtZero: true,
        title: { display: true, text: "Units Sold" },
    },
    x: {
        title: { display: true, text: "Month" },
    },
},
};

const MaxSales = () => (
<div className="chartBox ">
    <Bar data={data} options={options} />
</div>
);

export default MaxSales;