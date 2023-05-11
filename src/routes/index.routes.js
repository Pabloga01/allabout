const express = require('express');
const router = express.Router();
const controller = require('../controllers/back-controller');
const apicontroller = require('../controllers/api-controller');
const apiSpotifyController = require('../controllers/api-spotify-controller');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


//common template for each view
router.get('/backend/template', controller.template);

//physical routes
//router.get('/backend/', controller.index);

router.get('/backend/login', controller.login);
router.post('/backend/logincheck', controller.loginCheck);
router.get('/backend/home', controller.home);
router.get('/backend/tables', controller.tables);
router.get('/backend/charts', controller.charts);
router.get('/backend/useradd', controller.addUser);
router.get('/backend/eventadd', controller.addEvent);
router.get('/backend/publicationadd', controller.addPublication);
router.get('/backend/logout', controller.logout);


router.get('/backend/useredit/:id', controller.editUser);
router.get('/backend/eventedit/:id', controller.editEvent);
router.get('/backend/publicationedit/:id', controller.editPublication);

//api routes
router.get('/backend/api/users', apicontroller.getAllUsers)
router.get('/backend/api/events', apicontroller.getAllEvents)
router.get('/backend/api/publications', apicontroller.getAllPublications)


//api queries
router.get('/backend/api/userquerybymail/:mail', apicontroller.userquerybymail);
router.get('/backend/api/eventquerybyid/:id', apicontroller.eventQueryById);
router.get('/backend/api/publicationquerybyid/:id', apicontroller.publicationQueryById);
router.get('/backend/api/usersbycountry', apicontroller.usersByCountry);
router.get('/backend/api/publicationsbycategory', apicontroller.publicationsByCategory);


//api operations
router.post('/backend/api/insertuser', apicontroller.insertUser)
router.post('/backend/api/insertevent', apicontroller.insertEvent)
router.post('/backend/api/insertpublication', apicontroller.insertPublication)

router.post('/backend/api/updateuser', apicontroller.updateUser)
router.post('/backend/api/updateevent', apicontroller.updateEvent)
router.post('/backend/api/updatepublication', apicontroller.updatePublication)

router.get('/backend/api/userdelete/:mail', apicontroller.deleteUser)
router.get('/backend/api/eventdelete/:id', apicontroller.deleteEvent)
router.get('/backend/api/publicationdelete/:id', apicontroller.deletePublication)

//api rsc operations
router.get('/backend/api/geodata', apicontroller.geoJson)


//spotify api requests
router.get('/backend/api/spotify/topsongs/:country', apiSpotifyController.getPopularSongs);
router.get('/backend/api/spotify/topartists/:country', apiSpotifyController.getPopularArtists);
router.get('/backend/api/spotify/topplaylists/:country', apiSpotifyController.getPopularPlaylists);
router.get('/backend/api/spotify/topgenres/:country', apiSpotifyController.getPopularGenres);

module.exports = router;