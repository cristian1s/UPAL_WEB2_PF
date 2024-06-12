import { react } from "react"
import { Line } from "react-chartjs-2"
import { Chart as Chart } from "chart.js/auto"

const LineChart = ({ chartData }) => {
    return (
        <Line data={chartData}></Line>
    )
}
export default LineChart;
