const express = require("express");
const router = express.Router();

const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

// Import Url schema
const Url = require("../models/Url");

// Shorten url route, post to /api/url/shorten, Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl,memo } = req.body;
  const baseUrl = config.get("baseUrl");

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url.");
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        // Res exsist long url data
        res.json(url);
      } else {
        // Save a new url data
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
          memo
        });

        await url.save();
        // Res new url data
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error.");
    }
  } else {
    res.status(401).json("Invalid long url.");
  }
});

module.exports = router;
