import { useEffect, useState } from "react";
import "./style.css"
import BarChart from "../../components/chart/BarChart";
import LineChart from "../../components/chart/LineChart";
import PieChart from "../../components/chart/PieChart";

const Dashboard = () => {


    const [barchart, setBarChart] = useState([]);
    const [piechart, setPieChart] = useState([]);
    const [linechart, setLineChart] = useState([]);



    const getDataBarChart = async () => {
        const response = await fetch("api/dashboard/Barchart");
        if (response.ok) {
            const data_r = await response.json();
            setBarChart(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    };

    const getDataPieChart = async () => {
        const response = await fetch("api/dashboard/Piechart");
        if (response.ok) {
            const data_r = await response.json();
            setPieChart(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    };
    const getDataLineChart = async () => {
        const response = await fetch("api/dashboard/Linechart");
        if (response.ok) {
            const data_r = await response.json();
            console.log(data_r)
            setLineChart(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    };

    useEffect(() => {
        getDataLineChart();
        getDataBarChart();
        getDataPieChart();
    }, []);

    const renderBarChart = {
        labels: barchart.map((data) => data.nombre),
        datasets: [{
            label: "Top 5 Clientes con mas compras",
            data: barchart.map((data) => data.total),
            backgroundColor: [
                '#719AD4'
            ],
            borderColor: [
                '#719AD4'
            ],
            borderWidth: 1
        }]
    }
    const renderPieChart = {
        labels: piechart.map((data) => data.nombre),
        datasets: [{
            label: "Top 5 Productos con mas compras",
            data: piechart.map((data) => data.total),
            backgroundColor: [
                '#75B266',
                '#719AD2',
                '#D7B1E0',
                '#FFA027',
                '#FEC745'
            ],
            borderColor: [
                '#75B266',
                '#719AD2',
                '#D7B1E0',
                '#FFA027',
                '#FEC745'
            ],
            borderWidth: 1
        }]
    }
    const renderLineChart = {
        labels: linechart.map((data) => data.categoria),
        datasets: [{
            label: "Top 5 Categorias con mas productos vendidos",
            data: linechart.map((data) => data.total),
            backgroundColor: [
                '#3717F9'
            ],
            borderColor: [
                '#3717F9'
            ],
            fill: false,
            tension: 0.1
        }]
    }
    return (
        <div className="content">
             <div className="row">
                <div className="col-sm-6">
                    <div className="title-page">
                        <i className="bx bx-grid-alt nav_icon"></i>
                        Dashboard
                    </div>
                </div>
            </div>
            <div className="row c">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="content-chart m mb-4">
                            <BarChart chartData={renderBarChart}></BarChart>
                        </div>
                    </div>
                    <div className="row">
                        <div className="content-chart m">
                            <LineChart chartData={renderLineChart}></LineChart>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 d">
                    <div className="content-chart f">
                        <PieChart chartData={renderPieChart}></PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;