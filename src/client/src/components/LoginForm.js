import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useNavigate(); // useHistory hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        setMessage('Submitting...');

        // Example API call logic (mocked for now)
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to log in');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token); // Store the auth token in localStorage
            setMessage(`Login successful! Welcome, ${data.user.name}`);

            // Redirect to a new page after successful login
            history('/location');
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '300px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="login">Login:</label>
                <input
                    type="text"
                    id="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    required
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    required
                />
            </div>
            <button
                type="submit"
                style={{
                    padding: '10px 15px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Login
            </button>
            {message && (
                <div style={{ marginTop: '15px', color: message.includes('successful') ? 'green' : 'red' }}>
                    {message}
                </div>
            )}
        </form>
    );
};

export default LoginForm;
