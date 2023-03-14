const mysql = require('mysql');
const connection = require('./connection');



function select(callback) {
    let selectQuery = 'select * from user'
    connection.query(selectQuery, function (err, result) {
        if (err) throw err;
        callback(result);
    });

}

module.exports = { select };