const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//CREATE A LOG FILE
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//MAINTENANCE PAGE. LOADS THIS PAGE AND STOP EVERYTHING ELSE
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

//FUNCTION
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//THIS IS HERE. IF IT WAS ABOVE, THE HELP FILE WOULD STILL BE AVAILABLE WITH THE MAINTENANCE
app.use(express.static(__dirname + '/public'));


//FUNCTION
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//ROUTING
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to this Shit!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Great job, dipshit!'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
}); //port
