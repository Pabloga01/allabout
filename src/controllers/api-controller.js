const apiController = {};
const { select } = require('../models/operations');
const { querySelectAllUsers } = require('../models/User');
const express = require("express");
const app = express();
const User = require('../models/User');
const Event = require('../models/Event');
const Publication = require('../models/Publication');

const storage = require('node-sessionstorage')


apiController.getAllUsers = (req, res) => {
    let user = new User();
    (async () => {
        let allUsers = await user.getAllUsers();
        if (typeof allUsers !== 'undefined' && allUsers != false) {
            res.json(allUsers);
        }
    })()

};

apiController.getAllEvents = (req, res) => {
    let event = new Event();
    (async () => {
        let allEvents = await event.getAllEvents();
        if (typeof allEvents !== 'undefined' && allEvents != false) {
            res.json(allEvents);
        }
    })()

};


apiController.getAllPublications = (req, res) => {
    let publication = new Publication();
    (async () => {
        let allPublications = await publication.getAllPublications();
        if (typeof allPublications !== 'undefined' && allPublications != false) {
            res.json(allPublications);
        }
    })()

};

module.exports = apiController
