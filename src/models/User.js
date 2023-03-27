const connection = require('./connection');


class User {
    /**
     * @param {Object} obj object with user values 
     */
    constructor(obj) {
        if (typeof obj !== 'undefined') {
            this._id_user = obj.id_user === undefined ? -1 : obj.id_user;
            this._usertag = obj.usertag === undefined ? '' : obj.usertag;
            this._mail = obj.mail === undefined ? '' : obj.mail;
            this._password = obj.password === undefined ? '' : obj.password;
            this._admin = obj.admin === undefined ? 1 : obj.admin;
            this._name = obj.name === undefined ? '' : obj.name;
            this._surname = obj.surname === undefined ? '' : obj.surname;
            this._rank = obj.rank === undefined ? '' : obj.rank;
            this._address = obj.address === undefined ? '' : obj.address;
        }
    }
    //getters
    get id_user() {
        return this._id_user;
    }
    get user() {
        return this;
    }

    async getAllUsers() {
        return new Promise((resolve, reject) => {
            let selectQuery = 'select * from user';
            connection.query(selectQuery, async function (err, result) {
                if (err) return reject(err);
                try {
                    if (result.length > 0) {
                        resolve(result);
                    } else resolve(false);
                } catch (ex) {
                    resolve(false);
                }
            });
        });
    }


    async loginAdmin() {
        return new Promise((resolve, reject) => {
            let selectQuery = "select * from user where mail='" + this._mail + "' and password='" + this._password + "' and admin=" + this._admin;
            connection.query(selectQuery, async function (err, result) {
                if (err) return reject(err);
                try {
                    this._id_user = result[0].id_user;
                    this._mail = result[0].mail;
                    this._password = result[0].password;
                    this._usertag = result[0].usertag;
                    this._name = result[0].name;
                    this._surname = result[0].surname;
                    this._admin = result[0].admin;
                    this._rank = result[0].rank;
                    this._address = result[0].address;
                    if (result.length > 0) {
                        resolve(this);
                    } else resolve(false);
                } catch (ex) {
                    resolve(false);
                }
            });
        });
    }


    async querySelectUser() {
        let selectQuery = "select * from user where mail='" + this._mail + "' and password='" + this._password + "' and admin=" + this._admin;
        // connection.query(selectQuery, async function f(err, result)
        try {

            const result = await connection.query(selectQuery)
            if (result.length > 0) return true;
            else return false;
        } catch (err) { return false }

    }


}


module.exports = User