import React, { useState, useEffect } from 'react';
import moment from 'moment';

const ManageWardenForm = () => {
    const [wardenDetails, setWardenDetails] = useState({
        personId: '',
        userType: '0', // Default to '0' for User
        firstName: '',
        lastName: '',
        middleInitial: '',
        dateOfBirth: '',
        email: '',
        password: '',
        phone: '',
        location: '',
    });

    const [manageWardenDetails, setManageWardenDetails] = useState({
        personId: '',
        userType: '0',
        firstName: '',
        lastName: '',
        middleInitial: '',
        dateOfBirth: '',
        password: '',
        email: '',
        phone: '',
    });

    const [wardens, setWardens] = useState([]);
    const [selectedWarden, setSelectedWarden] = useState(null);

    useEffect(() => {
        const fetchWardens = async () => {
            try {
                const response = await fetch('https://firewardenapi-enfyauf7hjfhd2gy.uksouth-01.azurewebsites.net/FireWardenTracker_get_all');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setWardens(data || []);
            } catch (error) {
                console.error('Error fetching wardens:', error);
                setWardens([]);
            }
        };
        fetchWardens();
    }, []);

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        const FireWardens = {
            PersonId: wardenDetails.personId,
            UserType: wardenDetails.userType,
            FirstName: wardenDetails.firstName,
            MiddleInitial: wardenDetails.middleInitial,
            LastName: wardenDetails.lastName,
            DateOfBirth: moment(wardenDetails.dateOfBirth).format('YYYY-MM-DD'),
            Email: wardenDetails.email,
            Password: wardenDetails.password, // Changed from "Password" to "password"
            Phone: wardenDetails.phone,
            Location: wardenDetails.location,
        };
        try {
            const response = await fetch('https://firewardenapi-enfyauf7hjfhd2gy.uksouth-01.azurewebsites.net/FireWardenTracker_add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FireWardens),
            });
            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to submit data');
        }
    };

    const handleWardenSelect = (event) => {
        const wardenId = event.target.value;
        if (wardenId === '') {
            setSelectedWarden(null);
            setManageWardenDetails({
                personId: '',
                userType: '0',
                firstName: '',
                lastName: '',
                middleInitial: '',
                dateOfBirth: '',
                password: '',
                email: '',
                phone: '',
            });
            return;
        }
        const warden = wardens.find((w) => w.PersonId === parseInt(wardenId, 10));
        setSelectedWarden(warden);
        if (warden) {
            setManageWardenDetails({
                personId: warden.PersonId,
                userType: warden.UserType,
                firstName: warden.FirstName,
                middleInitial: warden.MiddleInitial,
                lastName: warden.LastName,
                dateOfBirth: moment(warden.DateOfBirth).format('YYYY-MM-DD'),
                password: '',
                email: warden.Email,
                phone: warden.Phone,
            });
        }
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        const updatedWarden = {
            PersonId: manageWardenDetails.personId,
            UserType: manageWardenDetails.userType,
            FirstName: manageWardenDetails.firstName || undefined,
            MiddleInitial: manageWardenDetails.middleInitial || undefined,
            LastName: manageWardenDetails.lastName || undefined,
            DateOfBirth: manageWardenDetails.dateOfBirth
                ? moment(manageWardenDetails.dateOfBirth).format('YYYY-MM-DD')
                : undefined,
            Password: manageWardenDetails.password || undefined,
            Email: manageWardenDetails.email || undefined,
            Phone: manageWardenDetails.phone || undefined,
        };
        try {
            const response = await fetch('https://firewardenapi-enfyauf7hjfhd2gy.uksouth-01.azurewebsites.net/FireWardenTracker_update', {
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

    const handleRemoveWarden = async () => {
        if (!selectedWarden) {
            alert('Please select a warden to remove.');
            return;
        }
        try {
            const response = await fetch('https://firewardenapi-enfyauf7hjfhd2gy.uksouth-01.azurewebsites.net/FireWardenTracker_remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ PersonId: selectedWarden.PersonId }),
            });
            const result = await response.json();
            alert(result.message || 'Warden removed successfully');
            setWardens(wardens.filter((w) => w.PersonId !== selectedWarden.PersonId));
            setSelectedWarden(null);
        } catch (error) {
            console.error('Error removing warden:', error);
            alert('Failed to remove warden');
        }
    };

    const handleInputChange = (event, setState, state) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Add Fire Warden Section */}
            <form onSubmit={handleAddSubmit} style={{ width: '45%' }}>
                <h2>Add Fire Warden</h2>
                <label>Fill in Details</label>

                <table>
                    <tbody>
                        <tr>
                            <td><label>Person ID:</label></td>
                            <td>
                                <input
                                    type="number"
                                    name="personId"
                                    value={wardenDetails.personId}
                                    onChange={(e) => handleInputChange(e, setWardenDetails, wardenDetails)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>User Type:</label></td>
                            <td>
                                <select
                                    name="userType"
                                    value={wardenDetails.userType}
                                    onChange={(e) => handleInputChange(e, setWardenDetails, wardenDetails)}
                                    required
                                >
                                    <option value="1">Admin</option>
                                    <option value="0">User</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>First Name:</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={wardenDetails.firstName}
                                    onChange={(e) => handleInputChange(e, setWardenDetails, wardenDetails)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Middle Initial:</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="middleInitial"
                                    value={wardenDetails.middleInitial}
                                    onChange={(e) => handleInputChange(e, setWardenDetails, wardenDetails)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Last Name:</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={wardenDetails.lastName}
                                    onChange={(e) => handleInputChange(e, setWardenDetails, wardenDetails)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Date of Birth:</label></td>
                            <td>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={wardenDetails.dateOfBirth}
                                    onChange={(e) => handleInputChange(e, setWardenDetails, wardenDetails)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Email:</label></td>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={wardenDetails.email}
                                    onChange={(e) => handleInputChange(e, setWardenDetails, wardenDetails)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="checkbox"
                                    id="defaultPassword"
                                    checked={wardenDetails.password === 'Firewarden123'}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setWardenDetails({ ...wardenDetails, password: 'Firewarden123' });
                                        } else {
                                            setWardenDetails({ ...wardenDetails, password: '' });
                                        }
                                    }}
                                />
                                <label htmlFor="defaultPassword">Set Default Password</label>
                            </td>
                            <td>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={wardenDetails.password}
                                    onChange={(e) => handleInputChange(e, setWardenDetails, wardenDetails)}
                                    required
                                    disabled={wardenDetails.password === 'Firewarden123'}
                                />
                                {/* Hidden input to ensure password is always sent */}
                                {wardenDetails.password === 'Firewarden123' && (
                                    <input type="hidden" name="password" value={wardenDetails.password} />
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td><label>Phone:</label></td>
                            <td>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={wardenDetails.phone}
                                    onChange={(e) => handleInputChange(e, setWardenDetails, wardenDetails)}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Add Warden</button>
            </form>

            {/* Manage Fire Wardens Section */}
            <div style={{ width: '45%' }}>
                <h2>Manage Existing Fire Wardens</h2>
                <div>
                    <label>Select Warden:</label>
                    <select
                        onChange={handleWardenSelect}
                        value={selectedWarden?.PersonId || ''}
                    >
                        <option value="" disabled>Select a warden</option>
                        {wardens.length > 0 ? (
                            wardens.map((warden) => (
                                <option key={warden.PersonId} value={warden.PersonId}>
                                    {warden.FirstName} {warden.LastName}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No wardens available</option>
                        )}
                    </select>
                </div>
                {selectedWarden && (
                    <form onSubmit={handleUpdateSubmit}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Person ID</td>
                                    <td>
                                        <input
                                            type="number"
                                            name="personId"
                                            value={manageWardenDetails.personId}
                                            onChange={(e) =>
                                                handleInputChange(e, setManageWardenDetails, manageWardenDetails)
                                            }
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>User Type</td>
                                    <td>
                                        <select
                                            name="userType"
                                            value={manageWardenDetails.userType}
                                            onChange={(e) =>
                                                handleInputChange(e, setManageWardenDetails, manageWardenDetails)
                                            }
                                            required
                                        >
                                            <option value="1">Admin</option>
                                            <option value="0">User</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={manageWardenDetails.firstName}
                                            onChange={(e) =>
                                                handleInputChange(e, setManageWardenDetails, manageWardenDetails)
                                            }
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Middle Initial</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="middleInitial"
                                            value={manageWardenDetails.middleInitial}
                                            onChange={(e) =>
                                                handleInputChange(e, setManageWardenDetails, manageWardenDetails)
                                            }
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={manageWardenDetails.lastName}
                                            onChange={(e) =>
                                                handleInputChange(e, setManageWardenDetails, manageWardenDetails)
                                            }
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={manageWardenDetails.dateOfBirth}
                                            onChange={(e) =>
                                                handleInputChange(e, setManageWardenDetails, manageWardenDetails)
                                            }
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <input
                                            type="email"
                                            name="email"
                                            value={manageWardenDetails.email}
                                            onChange={(e) =>
                                                handleInputChange(e, setManageWardenDetails, manageWardenDetails)
                                            }
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={manageWardenDetails.phone}
                                            onChange={(e) =>
                                                handleInputChange(e, setManageWardenDetails, manageWardenDetails)
                                            }
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit">Update Warden</button>
                        <button
                            type="submit"
                            onClick={(e) => {
                                setManageWardenDetails({
                                    ...manageWardenDetails,
                                    Password: 'Firewarden123',
                                });
                                alert('Password has been reset to default.');
                            }}
                        >
                            Reset Password
                        </button>
                        <button type="button" onClick={handleRemoveWarden}>
                            Remove Warden
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ManageWardenForm;
