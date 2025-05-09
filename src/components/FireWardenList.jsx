import React, { useEffect, useState } from 'react';
import '../assets/styles/FireWardenList.css';

const WardenList = () => {
    const [wardens, setWardens] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const loggedInPersonId = localStorage.getItem('PersonId'); // Retrieve PersonId

    useEffect(() => {
        const fetchWardens = async () => {
            try {
                const response = await fetch('http://localhost:8080/FireWardenTracker_get_all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWardens(data);

                // Find the logged-in user's location and set it as the default selected location
                const loggedInUser = data.find(warden => warden.PersonId === parseInt(loggedInPersonId));
                if (loggedInUser) {
                    setSelectedLocation(loggedInUser.Location || '');
                }
            } catch (error) {
                console.error('Error fetching wardens:', error);
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await fetch('http://localhost:8080/FireWarden_Locations');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchWardens().then(r => console.log('Wardens Loaded'));
        fetchLocations().then(r => console.log('Locations Loaded'));
    }, [loggedInPersonId]);

 const handleLocationChange = (event) => {
     setSelectedLocation(event.target.value);
     fetch('http://localhost:8080/FireWardenTracker_update_location', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
             PersonId: parseInt(loggedInPersonId),
             Location: event.target.value
         }),
     })
         .then(response => {
             if (!response.ok) {
                 throw new Error('Failed to update location');
             }
             return response.json();
         })
         .then(data => {
             console.log('Location updated successfully:', data);
             // Re-fetch wardens to refresh the table
             fetch('http://localhost:8080/FireWardenTracker_get_all')
                 .then(response => {
                     if (!response.ok) {
                         throw new Error('Failed to fetch updated wardens');
                     }
                     return response.json();
                 })
                 .then(updatedWardens => {
                     setWardens(updatedWardens);
                 })
                 .catch(error => {
                     console.error('Error fetching updated wardens:', error);
                 });
         })
         .catch(error => {
             console.error('Error updating location:', error);
         });
 };

    return (
        <div className="table-container">
            
            <table>
                <thead>
                <tr>
                    <th>Person ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>LastUpdated</th>
                </tr>
                </thead>
                <tbody>
                {wardens
                    .sort((a, b) => (a.PersonId === parseInt(loggedInPersonId) ? -1 : b.PersonId === parseInt(loggedInPersonId) ? 1 : 0))
                    .map(warden => (
                        <tr
                            key={warden.PersonId}
                            className={warden.PersonId === parseInt(loggedInPersonId) ? 'highlighted-row' : ''}
                        >
                            <td>{warden.PersonId === parseInt(loggedInPersonId) ? `${warden.PersonId} (You)` : warden.PersonId}</td>
                            <td>{warden.FirstName}</td>
                            <td>{warden.LastName}</td>
                            <td>{warden.Email}</td>
                            <td>{warden.Phone}</td>
                            <td>
                                {warden.PersonId === parseInt(loggedInPersonId) ? (
                                    <select
                                        value={selectedLocation}
                                        onChange={handleLocationChange}
                                    >
                                        <option value="" disabled>Select a location</option>
                                        {locations.map(location => (
                                            <option key={location.id} value={location.Location}>
                                                {location.Location}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    warden.Location
                                )}
                            </td>
                            <td>
                                {warden.LastUpdated
                                    ? new Date(warden.LastUpdated).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false,
                                    }).replace(/\//g, '-')
                                    : 'N/A'}
                            </td>                    
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WardenList;
