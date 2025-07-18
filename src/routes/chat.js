import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "openai/gpt-4-turbo",
        messages: [
          {
            role: 'system',
            content: "You are a legal assistant called Bee. Help students by explaining legal topics and answering questions clearly.",
          },
          {
            role: 'user',
            content: userMessage,
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!data || !data.choices || !data.choices[0]) {
      throw new Error("Invalid response from AI");
    }

    res.status(200).json({ choices: data.choices });
  } catch (error) {
    console.error("Ask Bee Error:", error.message);
    res.status(500).json({ error: "Bee is currently unavailable. Please try again shortly." });
  }
});

module.exports = router;
