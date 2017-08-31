const express = require('express');
const hbs = require('hbs');
const app = express();

let PORT = process.env.PORT;
let IP = process.env.IP;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //takes the absolute path to folder you need to serve

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'This is really important, so Welcome!'
    });
});

app.get('/home', (req, res) => {
    res.render('newHome.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome yo!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        filler: 'This is really important text',
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