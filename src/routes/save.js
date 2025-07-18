const express = require("express");
const router = express.Router();
const SavedAnswer = require("../models/SavedAnswer");

// Save an answer
router.post("/", async (req, res) => {
  try {
    const { userId, question, answer } = req.body;

    const saved = new SavedAnswer({
      userId,
      question,
      answer
    });

    await saved.save();
    res.status(201).json({ message: "Answer saved successfully", saved });

  } catch (error) {
    res.status(500).json({ error: "Error saving answer" });
  }
});

// Get all saved answers for a user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const answers = await SavedAnswer.find({ userId });
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved answers" });
  }
});

module.exports = router;
