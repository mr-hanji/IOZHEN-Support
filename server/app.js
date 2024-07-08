const express = require("express");
const connectDB = require("./config/db");
const config = require("./config");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/tickets", ticketRoutes);

connectDB();

const PORT = config.port || 3000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
