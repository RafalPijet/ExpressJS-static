const express = require('express');
const app = express();

app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.sendFile('./assets/index.html')
});

app.use('/store', (req, res, next) => {
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    next();
});

app.get('/store', (req, res) => {
    res.send('To jest sklep');
});

app.use((req, res, next) => {
    console.log('Hej, jestem pośrednikiem między żądaniem a odpowiedzią!');
    next();
});

app.get('/userform', (req, res) => {
    let response = {
        firstName: req.query.first_name,
        lastName: req.query.last_name
    };
    res.json(response);
});

const server = app.listen(3000, 'localhost', () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});

app.use((req, res, next) => {
    res.status(404).send("Something was wrong :(")
});
