import React from 'react';
import '../assets/styles/App.css';
import ManageWardenForm from '../components/ManageWardenForm';
import TopBar from "../components/TopBar";


function AdminPage() {
    return (
        <div className="bg-image">
            <TopBar />
            <header className="HomePage-header">
                <h1>University of Winchester Fire Warden App</h1>
                <p>Add and Manage Fire Wardens</p>
                <ManageWardenForm />
            </header>
        </div>
    );
}

export default AdminPage;   