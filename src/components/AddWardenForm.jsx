import React, { useState } from 'react';
import moment from 'moment';

const AddWardenForm = () => {
    const [personId, setPersonId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleInitial, setMiddleInitial] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!personId || isNaN(Number(personId))) {
            alert('Please provide a valid Person ID.');
            return;
        }

        const FireWardens = {
            PersonId: personId,
            FirstName: firstName,
            MiddleInitial: middleInitial,
            LastName: lastName,
            DateOfBirth: moment(dateOfBirth).format('YYYY-MM-DD'),
            Email: email,
            password: password,
            Phone: phone,
            Location: location
        };

        try {
            const response = await fetch('https://firewardenapi-enfyauf7hjfhd2gy.uksouth-01.azurewebsites.net/FireWardenTracker_add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(FireWardens)
            });

            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to submit data');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Person ID:</label>
                <input
                    type="number"
                    value={personId}
                    onChange={(e) => setPersonId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Middle Initial:</label>
                <input
                    type="text"
                    value={middleInitial}
                    onChange={(e) => setMiddleInitial(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                />
            </div>
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
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Warden</button>
        </form>
    );
};

export default AddWardenForm;