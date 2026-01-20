const express = require('express');
const router = express.Router();
const controller = require('../controllers/leave.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, controller.applyLeave);

router.get('/', auth, controller.getUserLeaves);

module.exports = router;
