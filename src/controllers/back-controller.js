
const controller = {};
const { select } = require('../models/operations');
const title = 'INDEX DESDE EL SERVIDOR CON PUG DESDE VARIABLE';
const User = require('../models/User');
const express = require("express");
const app = express();

const login_backend = (req, res) => { };

controller.login = (req, res) => {
    const title2 = 'ALTERNATIVE DESDE EL SERVIDOR CON PUG DESDE VARIABLE';
    res.render('login', { title: title2 });
    select(result => { console.log(result) });
    sessionStorage.setItem('id_user', this.id_user + '');

};

controller.loginCheck = (req, res) => {
    if (typeof req.body.mail !== 'undefined' && typeof req.body.password !== 'undefined') {
        let user = new User({ mail: req.body.mail, password: req.body.password, admin: 0 });
        let x = user.querySelectUser();
        try {
            if (typeof window !== 'undefined') {
                // Perform localStorage action
                if (typeof sessionStorage.getItem('id_user') !== 'undefined') {
                    res.redirect('/backend/home');
                    console.log('existe');
                } else {
                    res.redirect('/backend/login');
                    console.log('no existe');
                }
            }
        } catch (exc) {
            res.redirect('/backend/login');
        }

    }
    // console.log(req.params);
    // app.post('/backend/logincheck', async (req, res) => {
    //     console.log('fetch working');
    //     console.log(req.params['usertag']);
    // });



    // console.log(req.params['usertag']);
    // if (typeof req.params['usertag'] !== 'undefined' && typeof req.params['password'] !== 'undefined') {
    //     }
    // }
    // res.render('alternative', { title: 'title2' });
    // select(result => { console.log(result) });
}

controller.home = (req, res) => {
    res.render('home', { title: title });
    select(result => { console.log(result) });
}

controller.tables = (req, res) => { 
    res.render('tables', { title: title});
}

controller.restorePassword = (req, res) => { };


//redirect to index where views are setted
controller.index = (req, res) => {
    res.render('index', { title: title });
    select(result => { console.log(result) });
}

module.exports = controller

