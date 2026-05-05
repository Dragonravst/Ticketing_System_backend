const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticketController");
const authenticateJWT = require("../middleware/auth");

router.post("/create", authenticateJWT, ticketController.createTicket);
router.put("/update/:id", authenticateJWT, ticketController.updateTicket);
router.get("/allTickets",authenticateJWT,ticketController.allTickets);

module.exports = router;