import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/App.css';

function DashboardPage() {
    return (
        <div className="DashboardPage">
            <header className="DashboardPage-header">
                <nav className="DashboardPage-nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><Link to="/login">Log Out</Link></li>
                    </ul>
                </nav>
                <h1>Dashboard</h1>
                <section>
                    <h2>Welcome to your dashboard</h2>
                    <table className="DashboardPage-stats">
                        <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>John Doe</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>johndoe@example.com</td>
                        </tr>
                        <tr>
                            <th>Location:</th>
                            <td>West downs</td>
                        </tr>
                        <tr>
                            <th>Room:</th>
                            <td>401</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </header>
        </div>
    );
}

export default DashboardPage;