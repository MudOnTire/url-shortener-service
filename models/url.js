const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String
});

module.exports = mongoose.model('Url', urlSchema);