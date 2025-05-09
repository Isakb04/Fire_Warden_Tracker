import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/App.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isPasswordChangeRequired, setIsPasswordChangeRequired] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isPasswordChangeRequired) {
            // Handle password change
            try {
                const personId = localStorage.getItem('PersonId'); // Ensure PersonId is retrieved correctly
                if (!personId) {
                    alert('PersonId is missing. Please log in again.');
                    return;
                }

                if (newPassword !== confirmNewPassword) {
                    alert('New password and confirmation do not match.');
                    return;
                }

                const response = await fetch('https://firewardenapi-enfyauf7hjfhd2gy.uksouth-01.azurewebsites.net/FireWardenTracker_change_password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PersonId: personId,
                        newPassword,
                    }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Password changed successfully. Please log in again.');
                    setIsPasswordChangeRequired(false);
                    setPassword('');
                    setNewPassword('');
                    setConfirmNewPassword(''); // Clear confirm password field
                } else {
                    alert(result.message || 'Failed to change password');
                }
            } catch (error) {
                console.error('Error during password change:', error);
                alert('An error occurred. Please try again.');
            }
            return;
        }

        // Handle login
        try {
            const response = await fetch('https://firewardenapi-enfyauf7hjfhd2gy.uksouth-01.azurewebsites.net/FireWardenTracker_authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const result = await response.json();
            console.log('Server response:', result); // Debugging log to inspect the server response
            const personId = result.personId;

            if (response.ok) {
                if (!personId) {
                    alert('PersonId is missing in the response. Please contact support.');
                    return;
                }
                console.log('Retrieved PersonId:', personId);
                localStorage.setItem('PersonId', personId); // Store the correct PersonId in localStorage
// Debugging log to verify the retrieved personId
                if (password === 'Firewarden123') {
                    setIsPasswordChangeRequired(true);
                    alert('Your password is the default password. Please change it.');
                } else {
                    console.log('User type:', result.userType);
                    localStorage.setItem('userType', result.userType);
                    console.log('PersonId:', personId);
                    localStorage.setItem('PersonId', personId); // Ensure PersonId is stored correctly
                    navigate('/dashboard');
                }
            } else {
                alert(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isPasswordChangeRequired}
                />
            </div>
            {isPasswordChangeRequired && (
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
            )}
            {isPasswordChangeRequired && (
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
            )}
            <button className="Login-button" type="submit">
                {isPasswordChangeRequired ? 'Change Password' : 'Log In'}
            </button>
        </form>
    );
};

export default LoginForm;
