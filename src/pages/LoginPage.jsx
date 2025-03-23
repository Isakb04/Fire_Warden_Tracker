import React from 'react';
import '../assets/styles/App.css';
import LoginForm from '../components/LoginForm';

function LoginPage() {
    return (
        <div className="LoginPage">
            <header className="LoginPage-header">
                <h1>Login</h1>
                <LoginForm />
            </header>
        </div>
    );
}

export default LoginPage;