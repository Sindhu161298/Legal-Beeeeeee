const express = require("express");
const router = express.Router();

// Dummy user storage (in-memory)
const users = [];

// ✅ SIGNUP Route
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(409).json({ success: false, message: "User already exists!" });
  }

  users.push({ username, email, password });
  return res.status(201).json({ success: true, message: "User registered successfully!" });
});

// ✅ LOGIN Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials!" });
  }

  return res.status(200).json({ success: true, message: `Welcome back, ${user.username}!` });
});

module.exports = router;
