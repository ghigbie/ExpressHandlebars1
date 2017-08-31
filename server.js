const express = require('express');
const app = express();

let PORT = process.env.PORT;
let IP = process.env.IP;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //takes the absolute path to folder you need to serve

app.get('/', (req, res) => {
    res.send('<h1> Yo puppy!</h1>');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) =>{
    res.send({
       errorMessage: 'Unable to handle request' 
    });
});

app.get('*', (req, res) => {
    res.send({
       errorMessage: 'Unable to handle request' 
    });
});

app.listen(PORT, IP, ()=> {
   console.log(`The server is listening on ${PORT}`);
});