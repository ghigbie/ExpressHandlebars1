const express = require('express');
const app = express();

let PORT = process.env.PORT;
let IP = process.env.IP;

app.get('/', (req, res) => {
    res.send('<h1> Yo puppy!</h1>');
});

app.listen(PORT, IP, ()=> {
   console.log(`The server is listening on ${PORT}`);
});