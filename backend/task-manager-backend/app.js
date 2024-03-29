const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
