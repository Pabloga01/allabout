const mysql = require('mysql');
const connection = require('./connection');


class User {

    /**
     ...
     * @param {Object} obj object with user values 
     ...
     */
    constructor(obj) {
        if (typeof obj !== 'undefined') {
            if (typeof obj.id_user === 'undefined') this.id_user = 0;
            else this.id_user = obj.id_user;
            if (typeof obj.usertag === undefined) this.usertag = '';
            else this.usertag = obj.usertag;
            if (typeof obj.mail === undefined) this.mail = '';
            else this.mail = obj.mail;
            if (typeof obj.password === undefined) this.password = '';
            else this.password = obj.password;
            if (typeof obj.admin === undefined) this.admin = 1;
            else this.admin = obj.admin;
            if (typeof obj.name === undefined) this.name = ''
            else this.name = obj.name;
            if (typeof obj.surname === undefined) this.surname = ''
            else this.surname = obj.surname;
            if (typeof obj.rank === undefined) this.rank = ''
            else this.rank = obj.rank;
            if (typeof obj.address === undefined) this.address = ''
            this.address = obj.address;
        }
    }

    //getters
    get id_user() {
        return this.id_user;
    }

    get user() {
        return this;
    }

    querySelectAllUsers(callback) {
        connection.query('select * from user', function (err, result) {
            if (err) callback(err, null);
            else {
                let data = JSON.parse(JSON.stringify(result));
                console.log(data);
                callback(null, data)
            }
        });
    }

    querySelectAllUsers1() {
        return new Promise((resolve, reject) => {
            connection.query('select * from user', (err) => {
                if (err) {
                    return reject(err)
                }
                return resolve()
            })
        })
    }

    querySelectUser() {
        try {
            let selectQuery = "select * from user where mail='" + this.mail + "' and password='" + this.password + "' and admin=" + this.admin;
            connection.query(selectQuery, function (err, result) {
                if (err) return false;

                if (result.length === 0) return false;
                else {
                    this.id_user = result[0].id_user;
                    this.mail = result[0].mail;
                    //  sessionStorage.setItem('id_user', this.id_user + '');
                    this.password = result[0].password;
                    this.usertag = result[0].usertag;
                    this.name = result[0].name;
                    this.surname = result[0].surname;
                    this.admin = result[0].admin;
                    this.rank = result[0].rank;
                    this.address = result[0].address;
                    return true;
                }
                //connection.end();
            });
            // connection.end();
        } catch (e) {
        }
        return false;
    }

}


module.exports = User