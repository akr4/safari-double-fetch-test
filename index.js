const express = require('express');
const app = express();
const port = 3000;

app.set('etag', false);

app.use(express.static('public'));
app.get('/api/hello', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
