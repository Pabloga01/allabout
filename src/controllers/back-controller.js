
const controller = {};
const { select } = require('../models/operations');
const User = require('../models/User');
const express = require("express");
const app = express();
const storage = require('node-sessionstorage');
const sessions = require('../models/session');


const login_backend = (req, res) => { };

controller.login = (req, res) => {
    const errorMsg = 'Failed to login, please add a valid mail and password';
    if (typeof storage.getItem('msj_error_login') !== 'undefined') {
        console.log(storage.getItem('msj_error_login') );
        storage.removeItem('msj_error_login');
        res.render('login', { message: errorMsg });
    } else res.render('login');

    // select(result => { console.log(result) });
    //  sessionStorage.setItem('id_user', this.id_user + '');

};

controller.loginCheck = (req, res) => {
    if (typeof req.body.mail !== 'undefined' && typeof req.body.password !== 'undefined') {
        let user = new User({ mail: req.body.mail, password: req.body.password, admin: 0 });
        (async () => {
            user = await user.loginAdmin();
            const userId = user._id_user;
            if (user != false) {
                storage.setItem('id_user', userId);
                res.redirect('/backend/home');
            } else {
                storage.setItem('msj_error_login', 'error');
                res.redirect('/backend/login');
            }
        })()

        // if (user.id_user != '-1') {
        //     console.log('usuario registrado');
        // } else {
        //     console.log('usuario no registrado');
        // }

        // try {
        //     if (typeof window !== 'undefined') {
        //         // Perform localStorage action
        //         if (typeof sessionStorage.getItem('id_user') !== 'undefined') {
        //             res.redirect('/backend/home');
        //             console.log('existe');
        //         } else {
        //             res.redirect('/backend/login');
        //             console.log('no existe');
        //         }
        //     }
        // } catch (exc) {
        //     res.redirect('/backend/login');
        // }

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
    if (typeof storage.getItem('id_user') !== 'undefined') res.render('home');
    else res.redirect('/backend/login');

    //select(result => { console.log(result) });
}

controller.tables = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') res.render('tables');
    else res.redirect('/backend/login');
}

controller.restorePassword = (req, res) => { };


//redirect to index where views are setted
controller.index = (req, res) => {
    res.render('index', { title: title });
    select(result => { console.log(result) });
}

module.exports = controller

