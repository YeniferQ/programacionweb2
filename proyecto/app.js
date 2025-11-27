require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const { error } = require('console');
const db = require('./DB.js')
const port = 3006;
const routes = require('./routes/pages.js');
const session = require('express-session');
const app = express();

app.use(express.static('public'));


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine','ejs');

app.use(session({
    secret: 'inicio-sesion',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use('/',routes);


app.get('/',(req, res)=>{
    res.redirect('/login');
});

app.listen(port,()=>{
    console.log(`Server: http://localhost:${port}`)
});

