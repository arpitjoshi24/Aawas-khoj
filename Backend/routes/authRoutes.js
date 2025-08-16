const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/request-verification', authController.requestVerification);
router.post('/verify-code', authController.verifyCode);
router.post('/login', authController.login);
module.exports = router;
