import React, { useEffect, useState } from 'react';
import '../assets/styles/App.css';
import TopBar from "../components/TopBar";

function SettingsPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="bg-image">
            <TopBar />
            <div className="main">
                <header className="HomePage-header">
                    <h1>Settings</h1>
                    {user && (
                        <div>
                            <h2>User Settings</h2>
                            Work in progress.
                        </div>
                    )}
                </header>
            </div>
        </div>
    );
}

export default SettingsPage;