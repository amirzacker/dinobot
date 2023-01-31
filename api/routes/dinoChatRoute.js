const express = require('express');
const { dinoChat } = require('../controllers/dinoChatController');

const router = express.Router();

router.post('/', dinoChat);

module.exports = router;