const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Testovací route
app.get("/api", (req, res) => {
  res.send("API is running...");
});

// API routy
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/buses", require("./routes/busesRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingsRoutes"));
app.use("/api/cities", require("./routes/citiesRoutes"));

// Statické soubory z React build složky
app.use(express.static(path.join(__dirname, "../client/build")));

// Pro jakýkoli jiný request vrať React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start serveru
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
