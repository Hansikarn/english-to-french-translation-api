
const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser middleware for parsing JSON data
const translate = require('google-translate-api'); // Import Google Translate API


const app = express();

// Define the port number
const PORT = process.env.PORT || 3000; // Use the specified port or default to 3000

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Define a POST endpoint for translation
app.post('/translate', async (req, res) => {
    try {
        // Check if the request body contains the "text" key
        if (!req.body.text) {
            return res.status(400).json({ error: 'Missing text in the request body' });
        }

        // Translate the text from English to French
        const translatedText = await translate(req.body.text, { from: 'en', to: 'fr' });

        // Send the translated text in the response
        res.json({ translation: translatedText.text });
    } catch (error) {
        // Handle translation errors
        console.error('Translation error:', error);
        res.status(500).json({ error: 'An error occurred while translating the text' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
