const express = require('express');
// const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Proxy endpoint
app.get('/proxy', async (req, res) => {
    const imageUrl = req.query.url; // Get the image URL from query parameters
    if (!imageUrl) {
        return res.status(400).send('No URL provided');
    }

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(imageUrl);
        const imageBuffer = await response.buffer();
        res.set('Content-Type', response.headers.get('Content-Type'));
        res.send(imageBuffer);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
