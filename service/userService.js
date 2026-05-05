const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const signupService = async (userData) => {
    logger.info("Entering signupService for user: %s", userData.username);
    try {
        const { username, email, password, role } = userData;
        const existingUser = await userRepository.getUserByEmailOrUsername(email, username);
        if (existingUser) {
            return { status: 400, message: "Username or Email already exists" };
        }
        const newUser = await userRepository.createUser({
            username,
            email,
            password,
            role: role || 'CUSTOMER'
        });
        const userResponse = newUser.toJSON();
        delete userResponse.password;
        logger.info("User created successfully: %s", newUser.username);
        return { status: 201, user: userResponse };
    }
    catch (error) {
        logger.error("Error in signupService: %o", error);
        throw error;
    }
}

const loginService = async (userData) => {
    logger.info("Entering loginService for user: %s", userData.username);
    try {
        const { username, password } = userData;
        const user = await userRepository.getUserByUsername(username);
        if (!user) {
            return { status: 400, message: "User not found" };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { status: 401, message: "Invalid credentials" };
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        const userResponse = user.toJSON();
        delete userResponse.password;
        logger.info("User logged in: %s", user.username);
        return { status: 200, token, user: userResponse };
    } catch (error) {
        logger.error("Error in loginService: %o", error);
        throw error;
    }
}

const forgotPasswordService = async (email, newPassword) => {
    logger.info("Entering forgotPasswordService for email: %s", email);
    try {
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            return { status: 404, message: "User not found" };
        }
        await userRepository.updateUserPassword(user, newPassword);
        logger.info("Password updated for user: %s", user.email);
        return { status: 200, message: "Password updated successfully" };
    } catch (error) {
        logger.error("Error in forgotPasswordService: %o", error);
        throw error;
    }
}

const usersService = async () => {
    logger.info("Entering the userSrevice");
    try {
        const user = await userRepository.usersRepository();
        if (user.length === 0) {
            return { status: 404, message: "User not found" };
        }
        return { status: 200, user };
    }
    catch (error) {
        logger.error("Error in userSrevice: %o", error);
        throw error;
    }
}

module.exports = {
    signupService,
    loginService,
    forgotPasswordService,
    usersService
}