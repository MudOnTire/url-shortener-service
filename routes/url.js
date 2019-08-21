const epxress = require("express");
const router = epxress.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');
const Url = require('../models/url');

router.post('/shorten', async (req, res, next) => {
  const { longUrl } = req.body;
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json({
          shortUrl: `${config.get('baseUrl')}/${url.urlCode}`
        });
      } else {
        const urlCode = shortId.generate();
        url = new Url({
          longUrl,
          urlCode
        });
        await url.save();
        res.json({
          shortUrl: `${config.get('baseUrl')}/${urlCode}`
        });
      }
    } catch (error) {
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;