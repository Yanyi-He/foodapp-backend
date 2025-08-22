
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearTokens, getAccessToken } from '../api';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const authed = Boolean(getAccessToken());

    const logout = () => {
        clearTokens();
        navigate('/login');
    };

    return (
        <>
            <div className="brand">Food Order System</div>
            <div className="nav-spacer" />
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/orders">My Orders</Link>
            <div className="nav-spacer" />
            {!authed ? (
                <>
                    <Link to="/login">Log In</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <button className="btn btn-outline" onClick={logout}>Log Out</button>
            )}
        </>
    );
};

export default Navbar;
