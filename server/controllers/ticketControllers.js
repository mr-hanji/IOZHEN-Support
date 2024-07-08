const Ticket = require("../models/ticketModels");

exports.createTicket = async (req, res) => {
   try {
      const { firstName, description, lastName, score } = req.body;

      const newTicket = new Ticket({ firstName, lastName, description, score });
      await newTicket.save();

      res.status(201).send({
         message: "Ticket created successfully",
         ticket: newTicket,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
   }
};
