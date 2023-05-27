const FS = require("fs");


const express = require("express");
const app = express();
const path = require("path");

//template engine
app.set('view engine', 'pug')
//param to assing views
app.set('views', path.join(__dirname, 'views'));


//ROUTES
app.use(require('./routes/index.routes'));

//STATIC FILE
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src/views')));

//NOTFOUND ROUTE 
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../public/error-page.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor a la espera de conexiones')
});

