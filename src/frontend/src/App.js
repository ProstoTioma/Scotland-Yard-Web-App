import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Location from "./components/Location"; // Protected page

const App = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
        <Router> {/* Wrap everything inside the Router */}
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/location" element={<Location />} />
            </Routes>
        </Router>
        </div>
    );
};

export default App;
