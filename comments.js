//create web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//set routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Index' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

app.post('/contact/send-message', (req, res) => {
    const { author, sender, title, message } = req.body;

    if (author && sender && title && message) {
        res.render('contact', { isSent: true, title: 'Contact' });
    } else {
        res.render('contact', { isError: true, title: 'Contact' });
    }
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});