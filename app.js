const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send("Hello World Server");
});

app.get('/about', (request, response) => {
    response.send("Hello World about");
});

app.get('/contact', (request, response) => {
    response.send("Hello World contact");
});


app.get('/signin', (request, response) => {
    response.send("Hello World signin");
});


app.get('/signup', (request, response) => {
    response.send("Hello World signup");
});

app.listen(3000, () => {
    console.log('server is running on 3000');
})