const express = require('express');
const { generateImage } = require('../controllers/imageGeneratorController');

const router = express.Router();

router.post('/', generateImage);

module.exports = router;