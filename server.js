const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res) => {
    res.send('Proxy server is running');
});

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) return res.send('No URL specified');
    req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy listening'));
