import { react } from "react"
import { Pie } from "react-chartjs-2"
import { Chart as Chart } from "chart.js/auto"

const PieChart = ({ chartData }) => {
    return (
        <Pie data={chartData} ></Pie>
    )
}
export default PieChart;

