const router = require('express').Router();

const homeController = require('../controllers/homeController');
const cryptoController = require('../controllers/cryptoController');
router.get('/', homeController.home);
router.get('/fetch-and-store', cryptoController.fetchAndStore);
// Route to fetch cryptocurrency details based on user's selection
router.get('/crypto-details/:symbol', cryptoController.getCryptoDetails);
module.exports = router;