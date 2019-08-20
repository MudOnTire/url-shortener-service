const epxress = require("express");
const router = epxress.Router();
const Url = require('../models/url');

router.get('/*', async (req, res, next) => {
  const urlCode = req.path.slice(1);
  const url = await Url.findOne({ urlCode });
  if (url) {
    res.redirect(url.longUrl);
  } else {
    res.status(404).json("Corresponding long url not found");
  }
});

module.exports = router;