const express = require('express');
const router = express.Router();

// Require the controllers
const user_controller = require('../controllers/user.controller');

// define routes and their handler functions
router.post("/register", user_controller.register);
router.post("/login", user_controller.login);
router.post("/profile", user_controller.profile);

module.exports = router;
