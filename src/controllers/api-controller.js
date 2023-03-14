const apiController = {};
const { select } = require('../models/operations');
const express = require("express");
const { querySelectAllUsers } = require('../models/User');
const app = express();
const User = require('../models/User');


apiController.getAllUsers = (req, res) => {
    // let allUsers = querySelectAllUsers();
    // console.log(allUsers);
    // if (typeof allUsers !== 'undefined') {
    //     res.json(allUsers);
    // }


    let user=new User();
    let allUsers = user.querySelectAllUsers();
    console.log(allUsers);
    if (typeof allUsers !== 'undefined') {
        res.json(allUsers);
    }

};

module.exports = apiController
