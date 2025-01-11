const express = require('express');
const cors = require('cors');
const { NominatimJS } = require('@owsas/nominatim-js');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

// Rate limiting to avoid hitting the API too frequently
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // Limit to 5 requests per minute
    message: 'Too many requests, please try again later.',
});
app.use(limiter);

app.get('/api/location', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }
    try {
        // Call Nominatim Reverse Geocoding API for POI
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                lat,
                lon,
                format: 'json',
                zoom: 18,  // Adjust zoom level for more detailed results (POIs)
                addressdetails: 1
            },
            headers: {
                'User-Agent': 'YourAppName/1.0 (your-email@example.com)' // Replace with your app name and email
            }
        });

        if (response.data) {
            // Extract POI information from response
            const data = response.data;
            const pois = extractPOIs(data);
            return res.json({ pois });
        }
        res.status(404).json({ message: 'No POI found' });
    } catch (error) {
        console.error('Error fetching POIs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const extractPOIs = (address) => {
    // This is an example, customize based on address details and POI types you need
    const pois = [];
    pois.push({ name: address.display_name, type: 'name' });

    return pois;
};

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;

    // Replace this with actual authentication logic
    if (login === 'admin' && password === 'admin') {
        res.status(200).json({ success: true, user: { name: `${login}`} });
    } else {
        res.status(401).json({ success: false, message: 'Invalid login or password' });
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
