const express = require('express');
const { getLogin, getProfile, getHome } = require('../controllers/homeController')
const { postLogin } = require('../controllers/authController')
const { checkAuth } = require('../middleware/authMiddleware')
const { getListUser, sendMessage, getMessages } = require('../controllers/userController')
const router = express.Router();
router.get('/login', getLogin)
router.post('/login', postLogin);
router.get('/profile', checkAuth, getListUser)
router.get('/', checkAuth, getHome)
router.get('/list-user', checkAuth, getListUser)
router.get('/get-messages/:id', checkAuth, getMessages);
router.post('/send-message', checkAuth, sendMessage);
module.exports = router;