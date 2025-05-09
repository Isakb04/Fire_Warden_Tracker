import React from 'react';
import '../assets/styles/App.css';
import LoginForm from '../components/LoginForm';
import {Link} from "react-router-dom";

function LoginPage() {
    return (
        <div className="bg-image">
            <img src="https://play-lh.googleusercontent.com/a8P2nsIr4osk1TJIVmFsnVhfD2HkDcA9X-BmMq6_I24ODadaQ3r162TkIyWQkm6hIg=w600-h300-pc0xffffff-pd" alt="UoW Logo"/>
            <header className="HomePage-header">
                <h1>Login</h1>
                <LoginForm />
                <Link className="Login-button" to="/">
                    Back
                </Link>
            </header>
        </div>
    );
}

export default LoginPage;