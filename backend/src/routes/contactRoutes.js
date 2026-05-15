const express = require('express');
const { createMessage, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(createMessage).get(protect, getMessages);

module.exports = router;
