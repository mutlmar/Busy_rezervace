const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig");
const bodyParser = require("body-parser");

// Middlewary
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Testovací route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get('/welcome', (req, res) => {
  res.send('Welcome to the bus booking service!');
});

// API routy
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/buses", require("./routes/busesRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingsRoutes"));
app.use("/api/cities", require("./routes/citiesRoutes"));

// Start serveru
const path = require("path");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Catch-all handler: return React's index.html for any unknown route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
