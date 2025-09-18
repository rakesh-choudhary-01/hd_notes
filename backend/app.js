const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

mongoose.connect(process.env.MONGO_URL).then(() => {

    console.log("Data base connected successfully")

}).catch((err) => {

    console.log("Database connection failed", err)
});

app.listen(port, () => console.log("Server running on port 3000"));

// get the auth routes

app.use("/api/auth", authRoutes);

// get the note routes

app.use("/api/notes", noteRoutes);