import React, { useEffect, useState } from 'react';
import '../assets/styles/TopBar.css';

function ProfileManagment() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [manageEmail, setManageEmail] = useState('');
    const [managePhone, setManagePhone] = useState('');

    const loggedInPersonId = localStorage.getItem('PersonId'); // Retrieve PersonId

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://firewardenapi-enfyauf7hjfhd2gy.uksouth-01.azurewebsites.net/FireWardenTracker_get_all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Find the logged-in user's data
                const loggedInUser = data.find(user => user.PersonId === parseInt(loggedInPersonId));
                if (loggedInUser) {
                    setEmail(loggedInUser.Email || '');
                    setPhone(loggedInUser.Phone || '');
                    setManageEmail(loggedInUser.Email || '');
                    setManagePhone(loggedInUser.Phone || '');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (loggedInPersonId) {
            fetchUserData();
        }
    }, [loggedInPersonId]);

    const handleSave = async () => {
        const updatedUser = { email, phone };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);

        try {
            const response = await fetch('http://localhost:5000/FireWardenTracker_update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Phone: phone,
                    PersonId: parseInt(loggedInPersonId), // Use parsed PersonId
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message || 'Profile updated successfully.');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        const updatedWarden = {
            Email: manageEmail || undefined,
            Phone: managePhone || undefined,
        };
        try {
            const response = await fetch('http://localhost:5000/FireWardenTracker_update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedWarden),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error('Error updating warden:', error);
            alert('Failed to update warden');
        }
    };

    return (
        <div className="ProfileManagment">
            <h2>Manage Profile</h2>
            {isEditing ? (
                <div>
                    <form onSubmit={handleUpdateSubmit} style={{ width: '45%' }}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>If you wish to change your password please speak to an Admin.</label>
                        </div>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h3>Profile Details</h3>
                    <p>PersonId: {loggedInPersonId || 'Not Logged In'}</p>
                    <p>Email: {manageEmail}</p>
                    <p>Phone: {managePhone}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default ProfileManagment;
