import React from 'react';
import '../assets/styles/DashboardPage.css';
import '../assets/styles/App.css';
import TopBar from "../components/TopBar";
import WardenList from "../components/FireWardenList";

function DashboardPage() {
    return (
        <div className="bg-image">
            <TopBar />
            <div className="main">
                <header className="HomePage-header">
                    <h1>Dashboard</h1>
                    <p>Welcome to the Fire Warden Location Tracking System</p>
                    <p>Please log your working location at the beginning of each day and as you change locations.</p>
                    <WardenList />
                </header>
            </div>
        </div>
    );
}

export default DashboardPage;