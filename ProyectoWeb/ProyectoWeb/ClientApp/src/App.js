import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/users/users";
import Clients from "./pages/clients/clients";
import Producto from "./pages/products/producto";
import MainLayout from "./MainLayout";
import Ventas from "./pages/venta/venta";

const App = () => {
    const isAuthenticated = () => {
        const session = JSON.parse(localStorage.getItem('session'));
        if (session != null) {
            if (session.isAuthenticated == true ) {
                return true;
            }else {
                return false;

            }
        } else {
            return false;
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                    isAuthenticated() ? (
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                    
                } />
                <Route path="/users" element={
                    isAuthenticated() ? (
                        <MainLayout>
                            <Users />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                } />
                <Route path="/clientes" element={
                    isAuthenticated() ? (
                        <MainLayout>
                            <Clients />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                } />
                <Route path="/productos" element={
                    isAuthenticated() ? (
                        <MainLayout>
                            <Producto />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                } />
                <Route path="/ventas" element={
                    isAuthenticated() ? (
                        <MainLayout>
                            <Ventas></Ventas>
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                } />
            </Routes>
        </Router>
    );
};
export default App;
