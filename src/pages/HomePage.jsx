import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/App.css';

const HomePage = () => (
    <div className="bg-image">
        <div className="HomePage-header">
            <h1>University of Winchester Fire Warden App</h1>
            <p>Welcome to the Fire Warden Location Tracking System</p>
            <p>Please log your working location at the beginning of each day.</p>
            <Link className="Login-button1" to="/login">
                Log In
            </Link>
        </div>
    </div>
);

export default HomePage;