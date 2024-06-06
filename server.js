const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./app/models/user");
const port = process.env.PORT || 5000;
const fetch = require("node-fetch");
require("dotenv").config();

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.API_KEY;

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(cors());
app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are necessary." });
  }

  const newUser = new User({ name, email, password });
  try {
    await newUser.save();
    res.status(200).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are necessary." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Failed to log in." });
  }
});

app.post("/api/userexists", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    res.status(200).json({ user: user !== null });
  } catch (err) {
    res.status(500).json({ error: "Failed to check user existence." });
  }
});

app.post("/api/session", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }

    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ user: { name: user.name, email: user.email } });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
});

app.post("/api/verifyToken", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }

    res.status(200).json({ valid: true, user: { userId: decoded.userId } });
  });
});

//chatGPT connexion

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or the model you are using
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error });
    }

    res.json(data.choices[0].message.content);
  } catch (error) {
    console.error("Error communicating with ChatGPT API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
