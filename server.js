const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./app/models/user");
require("dotenv").config(); // Charger les variables d'environnement

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Vérifier si tous les champs requis sont présents
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are necessary." });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log("User registered successfully");
    res.status(200).json({ message: "User registered successfully." });
  } catch (err) {
    console.log("Failed to register user:", err);
    res.status(500).json({ error: "Failed to register user." });
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
