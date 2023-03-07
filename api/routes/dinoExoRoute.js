const express = require('express');
const { dinoExo } = require('../controllers/dinoExoController');

const router = express.Router();

router.post('/', dinoExo);

module.exports = router;