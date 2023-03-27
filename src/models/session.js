const express = require("express");
const app = express();
const storage = require('node-sessionstorage')
const sessions = {};

sessions.checkSession = async (res, req) => {
    if (typeof storage.getItem('id_user') === 'undefined')
        res.redirect('/backend/login');
};

module.exports = sessions;