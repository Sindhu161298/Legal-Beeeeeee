const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // new model we'll create next

router.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Feedback message cannot be empty." });
  }

  try {
    const feedback = new Feedback({
      name: name || "Anonymous",
      email: email || "Not provided",
      message,
    });

    await feedback.save();
    res.status(200).json({ success: true, message: "Your buzz has been heard! 🐝" });
  } catch (error) {
    console.error("Feedback save error:", error.message);
    res.status(500).json({ success: false, error: "Something went wrong. Please try again later." });
  }
});

module.exports = router;
