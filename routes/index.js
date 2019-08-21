const epxress = require("express");
const router = epxress.Router();
const Url = require('../models/url');

router.get('/:code', async (req, res, next) => {
  try {
    const urlCode = req.params.code;
    const url = await Url.findOne({ urlCode });
    if (url) {
      res.redirect(url.longUrl);
    } else {
      res.status(404).json("No url found");
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;