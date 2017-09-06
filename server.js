const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 8081;
const IP = process.env.IP;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    let now = new Date().toString();
    let log =`${now}: ${req.method} ${req.url}`;
    fs.appendFile('sever.log', log + '\n', (err) => {
        if(err){
            console.log(`Unable to append to server.log`);
        }
    });
    next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//       maintenanceMessage: 'We are doing some work. We\'ll be back soon : )'
//   });
// });

app.use(express.static(__dirname + '/public')); //takes the absolute path to folder you need to serve

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
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

app.get('/projects', (req, res) => {
   res.render('porjects.hbs', {
       pageTitle: 'Projects Page',
       filler: 'Here are some really awesome projects:',
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