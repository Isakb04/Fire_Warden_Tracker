import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/App.css';
import AddWardenForm from '../components/AddWardenForm';


function AdminPage() {
    return (
        <div className="AdminPage">
            <header className="HomePage-header">
                <h1>University of Winchester Fire Warden App</h1>
                <p>Add Fire Wardens</p>
                <AddWardenForm />
                <Link className="Back-Button" to="/dashboard">
                    Back
                </Link>
            </header>
        </div>
    );
}

export default AdminPage;   