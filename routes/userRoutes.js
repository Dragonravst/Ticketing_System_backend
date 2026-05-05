const express = require("express");
const router = express.Router();
const {
    signupController,
    loginController,
    forgotPasswordController,
    usersController
} = require("../controller/userController");

const authenticateJWT = require("../middleware/auth");

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController);
router.get('/users', authenticateJWT, usersController);

module.exports = router;