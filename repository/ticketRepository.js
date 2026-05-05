const { Ticket, Sequelize } = require("../models");
const { Op } = Sequelize;
const logger = require("../utils/logger");

const createTicket = async (ticketData) => {
    logger.info("Repository: createTicket called");
    try {
        return await Ticket.create(ticketData);
    } catch (error) {
        logger.error("Error in createTicket Repository: %o", error);
        throw error;
    }
};

const getTicketById = async (id) => {
    logger.info("Repository: getTicketById called for id: %s", id);
    try {
        return await Ticket.findByPk(id);
    } catch (error) {
        logger.error("Error in getTicketById Repository: %o", error);
        throw error;
    }
};

const updateTicket = async (id, updateData) => {
    logger.info("Repository: updateTicket called for id: %s", id);
    try {
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return null;
        }
        return await ticket.update(updateData);
    } catch (error) {
        logger.error("Error in updateTicket Repository: %o", error);
        throw error;
    }
};

const getAllTickets = async (payload) => {
    logger.info("Repository: getAllTickets called");
    try {
        const limitStr = payload.sizeperpage ? atob(payload.sizeperpage) : "10";
        const pageStr = payload.page ? atob(payload.page) : "1";

        const limit = parseInt(limitStr);
        const page = parseInt(pageStr);
        const offset = (page - 1) * limit;

        return await Ticket.findAll({
            limit,
            offset,
            order: [['created_at', 'DESC']]
        });
    } catch (error) {
        logger.error("Error in getAllTickets Repository: %o", error);
        throw error;
    }
};

const allTicketsByUser = async (id, payload) => {
    try {
        const limitStr = payload.sizeperpage ? atob(payload.sizeperpage) : "10";
        const pageStr = payload.page ? atob(payload.page) : "1";

        const limit = parseInt(limitStr);
        const page = parseInt(pageStr);
        const offset = (page - 1) * limit;

        return await Ticket.findAll({
            where: {
                [Op.or]: [
                    { created_by: id },
                    { assigned_to: id }
                ]
            },
            limit,
            offset,
            order: [['created_at', 'DESC']]
        });
    } catch (error) {
        logger.error("Error in allTicketsByUser Repository: %o", error);
        throw error;
    }
}

module.exports = {
    createTicket,
    getTicketById,
    updateTicket,
    getAllTickets,
    allTicketsByUser
};
