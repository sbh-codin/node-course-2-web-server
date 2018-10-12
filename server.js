const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

            console.log('Unable to append to server.log')
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('<h1>hello to my app</h1>');
    // res.send({
    //     name: 'Sourabh',
    //     likes: [
    //         'music',
    //         'reading'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Welcome page',
        welcomeMessage: 'Welcome to the Express server!',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({
        error: 'Unable to load the page'
    });
});

app.listen(3000, () =>{
    console.log('server is up and running');
});