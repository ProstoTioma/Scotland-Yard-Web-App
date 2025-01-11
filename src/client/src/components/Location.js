import React, { useState, useEffect } from 'react';

const Location = () => {
    const [pois, setPois] = useState([]);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Location component rendered');
        getLocation();
    }, []);

    const getLocation = async () => {
        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });

                try {
                    const response = await fetch(`http://localhost:5000/api/location?lat=${latitude}&lon=${longitude}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const data = await response.json();
                    setPois(data.pois || []);  // Set the POIs from the response
                } catch (error) {
                    console.error('Error fetching POIs:', error);
                    setError('Failed to fetch POIs.');
                }
            }, (error) => {
                console.error('Error getting location:', error);
                setError('Failed to get location.');
            });
        } catch (error) {
            console.error('Error in getLocation:', error);
            setError('An error occurred while trying to fetch location.');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome to the location page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {location ? (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            ) : (
                <p>Loading location...</p>
            )}

            {pois.length > 0 ? (
                <div>
                    <h2>Your address:</h2>
                        {pois.map((poi, index) => (
                            <li key={index}>{poi.name}</li>
                        ))}
                </div>
            ) : (
                <p>No Points of Interest available.</p>
            )}
        </div>
    );
};

export default Location;
