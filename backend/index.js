const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
// connect to express app
const app = express();
const PORT = 3004;
// connect to mongoDB
mongoose
  .connect(process.env.usersDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is connected on localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
// middleware
app.use(bodyParser.json());
app.use(cors());

// SCHEMA

// Routes
app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfullt" });
  } catch (error) {
    res.status(500).json({ error: "Error signing up" });
  }
});

// get registered users
app.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch {
    res.status(500).json({ error: "Error getting the data from database" });
  }
});

// login user
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }
    const isPassworValid = await bcrypt.compare(password, user.password);
    if (!isPassworValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "3h",
      algorithm: "HS256",
    });
    res.json({ username, password, token, message: "login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error logginig in" });
  }
});

// authentication token

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  console.log(token);
  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err); // Log the error for debugging
      return res.status(403).json({ error: "Token is not valid" });
    }
    req.user = user;
    next();
  });
};

app.get("/protectedRoute", authenticateToken, async (req, res) => {
  // Your protected route logic here
  const userId = req.user.userId;

  const userData = await User.findById(userId);

  res.json({ userData, message: "Access granted" });
});

app.get("/userProfile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
});
