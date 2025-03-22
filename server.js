const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like styles or images, if needed)
app.use(express.static('public'));

// Render the main page (index.ejs)
app.get('/', (req, res) => {
    res.send(`
    <html>
        <body>
            <h1>Web Scraper</h1>
            <form action="/download" method="post">
                <label for="url">Enter URL: </label>
                <input type="text" id="url" name="url" required />
                <button type="submit">Submit</button>
            </form>
        </body>
    </html>
    `);
});

// Handle form submission and download page as HTML
app.post('/download', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.send('Please provide a valid URL.');
    }

    try {
        // Fetch the page content
        const response = await axios.get(url);
        
        // Define the file path to save the HTML
        const filename = 'downloaded_page.html';
        const filePath = path.join(__dirname, filename);

        // Save the HTML content to a file
        fs.writeFileSync(filePath, response.data);

        // Send a success message to the client with a download link
        res.send(`
            <html>
                <body>
                    <h1>Successfully downloaded page!</h1>
                    <a href="/downloaded_page" download>Click here to download the file.</a>
                </body>
            </html>
        `);
    } catch (error) {
        // In case of an error (e.g., invalid URL or network issues)
        res.send(`
            <html>
                <body>
                    <h1>Download failed!</h1>
                    <p>There was an error downloading the page. Please check the URL and try again.</p>
                </body>
            </html>
        `);
    }
});

// Serve the downloaded HTML file
app.get('/downloaded_page', (req, res) => {
    const filePath = path.join(__dirname, 'downloaded_page.html');
    
    if (fs.existsSync(filePath)) {
        res.download(filePath, 'downloaded_page.html', (err) => {
            if (err) {
                res.status(500).send('Error downloading the file.');
            }
        });
    } else {
        res.status(404).send('File not found!');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
