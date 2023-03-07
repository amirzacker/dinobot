const express = require('express');
const { turboChat } = require('../controllers/turboChatController');

const router = express.Router();

router.post('/', turboChat);

module.exports = router;