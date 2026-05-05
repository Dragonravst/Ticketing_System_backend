const { User } = require("../models");
const { Sequelize, Op } = require("sequelize");
const logger = require("../utils/logger");

const getUserByEmailOrUsername = async (email, username) => {
    logger.info("Repository: getUserByEmailOrUsername called");
    try {
        return await User.findOne({
            where: {
                [Op.or]: [{ email }, { username }]
            }
        });
    } catch (error) {
        logger.error("Error in getUserByEmailOrUsername: %o", error);
        throw error;
    }
};

const createUser = async (userData) => {
    logger.info("Repository: createUser called");
    try {
        return await User.create(userData);
    } catch (error) {
        logger.error("Error in createUser: %o", error);
        throw error;
    }
};

const getUserByUsername = async (username) => {
    logger.info("Repository: getUserByUsername called");
    try {
        return await User.findOne({ where: { username } });
    } catch (error) {
        logger.error("Error in getUserByUsername: %o", error);
        throw error;
    }
};

const getUserByEmail = async (email) => {
    logger.info("Repository: getUserByEmail called");
    try {
        return await User.findOne({ where: { email } });
    } catch (error) {
        logger.error("Error in getUserByEmail: %o", error);
        throw error;
    }
};

const updateUserPassword = async (user, newPassword) => {
    logger.info("Repository: updateUserPassword called");
    try {
        user.password = newPassword;
        return await user.save();
    } catch (error) {
        logger.error("Error in updateUserPassword: %o", error);
        throw error;
    }
};

const usersRepository = async () => {
    logger.info("Repository: usersRepository called");
    try {
        const users = await User.findAll();
        const userResponse = users.map(user => {
            const userJson = user.toJSON();
            delete userJson.password;
            return userJson;
        });
        return userResponse;
    } catch (error) {
        logger.error("Error in usersRepository: %o", error);
        throw error;
    }
}

module.exports = {
    getUserByEmailOrUsername,
    createUser,
    getUserByUsername,
    getUserByEmail,
    updateUserPassword,
    usersRepository
};
