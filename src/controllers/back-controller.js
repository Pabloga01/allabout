
const controller = {};
const { select } = require('../models/operations');
const User = require('../models/User');
const Event = require('../models/Event');
const Publication = require('../models/Publication');

const express = require("express");
const app = express();
const storage = require('node-sessionstorage');
const sessions = require('../models/session');

const login_backend = (req, res) => { };

controller.login = (req, res) => {
    const errorMsg = 'Failed to login, please add a valid mail and password';
    if (typeof storage.getItem('msj_error_login') !== 'undefined') {
        console.log(storage.getItem('msj_error_login'));
        storage.removeItem('msj_error_login');
        res.render('login', { message: errorMsg });
    } else res.render('login');
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
    }
}

controller.home = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') {
        let user = new User({ id_user: storage.getItem('id_user') });
        (async () => {
            user = await user.getUserById();
            res.render('home', { id_user: user._id_user, mail: user._mail, name: user._name, surname: user._surname, usertag: user._usertag });
        })()
    } else res.redirect('/backend/login');
}

controller.tables = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') {
        let user = new User({ id_user: storage.getItem('id_user') });
        (async () => {
            user = await user.getUserById();
            res.render('tables', { id_user: user._id_user, mail: user._mail, name: user._name, surname: user._surname, usertag: user._usertag });
        })()
    } else res.redirect('/backend/login');
}


controller.charts = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') {
        let user = new User({ id_user: storage.getItem('id_user') });
        (async () => {
            user = await user.getUserById();
            res.render('charts', { id_user: user._id_user, mail: user._mail, name: user._name, surname: user._surname, usertag: user._usertag });
        })()
    } else res.redirect('/backend/login');
}

controller.logout = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') {
        (async () => {
            storage.removeItem("id_user");
            res.render('login');
        })()
    } else res.redirect('/backend/login');
}




controller.addUser = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') res.render('user', { mode: 'add' });
    else res.redirect('/backend/login');
}



controller.editUser = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') {
        let user = new User({ id_user: req.params.id });
        (async () => {
            user = await user.getUserById();
            res.render('user', { mode: 'edit', user: user });
        })()
    } else res.redirect('/backend/login');
}

controller.editEvent = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') {
        let event = new Event({ id_event: req.params.id });
        (async () => {
            event = await event.getEventById();
            res.render('event', { mode: 'edit', event: event });
        })()
    } else res.redirect('/backend/login');
}


controller.editPublication = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') {
        let publication = new Publication({ id_publication: req.params.id });
        (async () => {
            publication = await publication.getPublicationById();
            res.render('publication', { mode: 'edit', publication: publication });
        })()
    } else res.redirect('/backend/login');
}

controller.restorePassword = (req, res) => { };


//redirect to index where views are setted
controller.index = (req, res) => {
    res.render('index');
    select(result => { console.log(result) });
}



controller.addUser = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') res.render('user');
    else res.redirect('/backend/login');
};

controller.addEvent = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') res.render('event');
    else res.redirect('/backend/login');
};

controller.addPublication = (req, res) => {
    if (typeof storage.getItem('id_user') !== 'undefined') res.render('publication');
    else res.redirect('/backend/login');
};

controller.template = (req, res) => {
    res.render('template');
}







module.exports = controller

