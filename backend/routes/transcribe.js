// backend/routes/transcribe.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post("/", async (req, res) => {
  const { audioBase64 } = req.body;
  try {
    const payload = {
      config: {
        encoding: "LINEAR16",
        languageCode: "en-US"
      },
      audio: {
        content: audioBase64
      }
    };

    const response = await axios.post(
      "https://speech.googleapis.com/v1/speech:recognize?key=240c8f9a2b9cc01ca6eb6b2a54d9524b32b52665beaf17dea205e0fa1bdf8fa7",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
