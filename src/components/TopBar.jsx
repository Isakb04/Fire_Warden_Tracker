import React, { useEffect, useState } from 'react';
import '../assets/styles/TopBar.css';
import { Link } from 'react-router-dom';

function TopBar() {

    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        setUserType(storedUserType);
    }, []);
    
    return (
        <div className="topbar">
            <img src="https://play-lh.googleusercontent.com/a8P2nsIr4osk1TJIVmFsnVhfD2HkDcA9X-BmMq6_I24ODadaQ3r162TkIyWQkm6hIg=w600-h300-pc0xffffff-pd" alt="UoW Logo"/>
            <h2 className="usertype">
                Logged in as: {
                (() => {
                    switch (userType) {
                        case '0':
                            return 'Fire Warden';
                        case '1':
                            return 'Admin';
                        case '2':
                            return 'Health and Safety team';
                        default:
                            return 'Unknown Role (Contact Admin)';
                    }
                })()
            }
            </h2>            
            <nav>
                <Link to="/dashboard">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/login">LogOut</Link>
                {userType === '1' && <Link to="/adminPage">Admin-Page</Link>}
            </nav>
        </div>
    );
}

export default TopBar;