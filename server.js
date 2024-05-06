const http = require('http');
const https = require('https');
const url = require('url');

const PORT = process.env.PORT || 8080;

http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const targetUrl = query.url;

    if (!targetUrl) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Missing target URL parameter');
        return;
    }

    https.get(targetUrl, (response) => {
        res.writeHead(response.statusCode, {
            'Content-Type': response.headers['content-type'],
            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
            // You can customize other CORS headers here if needed
        });
        response.pipe(res);
    }).on('error', (err) => {
        console.error('Error:', err.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
    });
}).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
