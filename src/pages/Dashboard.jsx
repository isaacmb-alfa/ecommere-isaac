import { useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/Hook/useAuthContext';
import Users from '../components/Users';
import Products from '../components/Products';
import ProtectedRoute from '../Controller/ProtectedRoute';
import '../styles/dashboard.scss';

function Dashboard() {
    const navigate = useNavigate();
    const { logout} = useAuthContext();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <NavLink to="/dashboard/users">Usuarios</NavLink>
                <NavLink to="/dashboard/products">Items</NavLink>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="content">
                <Routes>
                    <Route
                        path="users"
                        element={
                            <ProtectedRoute>
                                <Users />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="products"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default Dashboard;