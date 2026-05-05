const ticketService = require("../service/ticketService");
const logger = require("../utils/logger");

const createTicket = async (req, res) => {
    logger.info("entering createTicket");
    try {
        const ticketdata = req.body;
        ticketdata.created_by = req.user.id;
        const result = await ticketService.createTicket(ticketdata);
        if (result.status === 400) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(201).json({ message: "ticket created successfully", ticket: result.ticket });
    } catch (error) {
        logger.error("Error in createTicketController: %o", error);
        return res.status(500).json({ message: error.message });
    }
}

const updateTicket = async (req, res) => {
    logger.info("entering updateTicket");
    try {
        const { id } = req.params;
        const updateData = req.body;
        const user = req.user;
        const result = await ticketService.updateTicket(id, updateData, user);
        if (result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }
        return res.status(200).json({ message: "ticket updated successfully", ticket: result.ticket });
    } catch (error) {
        logger.error("Error in updateTicketController: %o", error);
        return res.status(500).json({ message: error.message });
    }
}

const allTickets = async (req, res) => {
    logger.info("entering allTickets");
    try {
        const payload = req.query;
        const user = req.user;
        const result = await ticketService.allTickets(payload, user);
        if (result.status === 400) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json({ message: result.message, tickets: result.tickets });
    } catch (error) {
        logger.error("Error in the allTicketsController: %o", error);
        return res.status(500).json({ message: error.message })
    }
}


module.exports = {
    createTicket,
    updateTicket,
    allTickets
}
