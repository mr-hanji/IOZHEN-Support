const express = require("express");
const router = express.Router();
const ticketControllers = require("../controllers/ticketControllers");
const verifyToken = require("../middleware/authMiddleWare");

router.post("/", ticketControllers.createTicket);

module.exports = router;
