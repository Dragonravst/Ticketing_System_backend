const ticketRepository = require("../repository/ticketRepository");
const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const createTicket = async (ticketData) => {
    logger.info("Entering createTicketService for user: %s", ticketData.created_by);
    try {
        const { title, description, priority, category, status, created_by } = ticketData;
        const ticket = await ticketRepository.createTicket({
            title,
            description,
            priority,
            category,
            status,
            created_by
        });
        return { status: 201, ticket };
    } catch (error) {
        logger.error("Error in createTicketService: %o", error);
        throw error;
    }
}

const updateTicket = async (id, updateData, user) => {
    logger.info("Entering updateTicketService for ticket id: %s", id);
    try {
        const existingTicket = await ticketRepository.getTicketById(id);
        if (!existingTicket) {
            return { status: 404, message: "Ticket not found" };
        }
        if (updateData.assigned_to && user.role !== 'ADMIN') {
            return { status: 403, message: "Only administrators can assign tickets" };
        }
        const updatedTicket = await ticketRepository.updateTicket(id, updateData);
        return { status: 200, ticket: updatedTicket };
    } catch (error) {
        logger.error("Error in updateTicketService: %o", error);
        throw error;
    }
}

const allTickets = async (payload, user) => {
    logger.info("Entering the allTicketsService for user %s", user.id);
    try {
        if (user.role === 'ADMIN') {
            const result = await ticketRepository.getAllTickets(payload);
            return { status: 200, message: "All tickets fetched successfully", tickets: result };
        } else {
            const result = await ticketRepository.allTicketsByUser(user.id, payload);
            return { status: 200, message: "User tickets fetched successfully", tickets: result };
        }
    } catch (error) {
        logger.error("Error in allTicketService: %o", error);
        throw error;
    }

}
module.exports = {
    createTicket,
    updateTicket,
    allTickets
}
