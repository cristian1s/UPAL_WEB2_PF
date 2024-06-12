import { react } from "react"
import { Bar } from "react-chartjs-2"
import {Chart as Chart } from "chart.js/auto"

const BarChart = ({chartData}) => {
    return (
        <Bar data={chartData}></Bar>
    )
}
export default BarChart;


