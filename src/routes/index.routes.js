const express = require('express');
const router = express.Router();
const controller = require('../controllers/back-controller');
const apicontroller = require('../controllers/api-controller');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


//physical routes
router.get('/backend/', controller.index);
router.get('/backend/login', controller.login);
router.post('/backend/logincheck', controller.loginCheck);
router.get('/backend/home', controller.home);
router.get('/backend/tables', controller.tables);


//api routes
router.get('/backend/api/allusers', apicontroller.getAllUsers)
module.exports = router