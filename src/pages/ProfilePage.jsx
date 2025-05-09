import React, { useEffect, useState } from 'react';
import '../assets/styles/App.css';
import TopBar from "../components/TopBar";
import ProfileManagment from "../components/ProfileManagment";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setEmail(parsedUser.email || '');
            setPhone(parsedUser.phone || '');
        }
    }, []);

    const handleSave = () => {
        const updatedUser = { ...user, email, phone };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
        alert('Profile updated successfully.');
    };

    return (
        <div className="bg-image">
            <TopBar />
            <div className="main">
                <header className="HomePage-header">
                    <h1>Profile</h1>
                    <p>Please log your working location at the beginning of each day.</p>
                    <ProfileManagment />
                </header>
            </div>
     
        </div>
    );
}

export default ProfilePage;
