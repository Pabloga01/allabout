const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'allabout',
    user: 'root',
    password: '',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to ddbb');
});

module.exports = connection;