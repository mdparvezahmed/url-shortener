const express = require('express');
const { Login, Register, Profile } = require('../controller/authController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/login', Login);
router.post('/register', Register);
router.get('/profile', verifyToken, Profile);








module.exports = router;