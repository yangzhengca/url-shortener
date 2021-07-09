const express = require("express");
const router = express.Router();

// Import Url schema
const Url = require("../models/Url");

// Redirect Route, Redirect to long URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    url.clicks++
    await url.save()

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error.");
  }
});

// Home page
router.get("/",async (req,res)=>{
    const shortUrls= await Url.find()
    res.render('index',{shortUrls:shortUrls})
})

module.exports = router;
