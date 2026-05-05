const userService = require("../service/userService");
const logger = require("../utils/logger");

const signupController = async (req, res) => {
    logger.info("Entering signupController");
    try {
        const userData = req.body;
        const result = await userService.signupService(userData);
        if (result.status === 400) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(201).json({ message: "User created successfully", user: result.user });
    } catch (error) {
        logger.error("Error in signupController: %o", error);
        res.status(500).json({ message: error.message });
    }
}

const loginController = async (req, res) => {
    logger.info("Entering loginController");
    try {
        const userData = req.body;
        const result = await userService.loginService(userData);
        if (result.status === 400 || result.status === 401) {
            return res.status(result.status).json({ message: result.message });
        }
        return res.status(200).json({
            message: "User logged in successfully",
            token: result.token,
            user: result.user
        });
    } catch (error) {
        logger.error("Error in loginController: %o", error);
        res.status(500).json({ message: error.message });
    }
}

const forgotPasswordController = async (req, res) => {
    logger.info("Entering forgotPasswordController");
    try {
        const { email, newPassword } = req.body;
        const result = await userService.forgotPasswordService(email, newPassword);
        if (result.status === 404) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        logger.error("Error in forgotPasswordController: %o", error);
        res.status(500).json({ message: error.message });
    }
}

const usersController = async (req, res) => {
    logger.info("Entering the userController");
    try {
        const result = await userService.usersService();
        if (result.status === 404) {
            return res.status(404).json({ message: result.message });
        }
        return res.status(200).json({ message: "got all the users info", user: result.user });
    } catch (error) {
        logger.error("Error in userController: %o", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signupController,
    loginController,
    forgotPasswordController,
    usersController
}


