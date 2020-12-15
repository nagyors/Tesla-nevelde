const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Kocsi = db.model('Kocsi', {
  model: String,
  allapot: Number,
  akkumlator: Number,
  szin: String,
  tisztasag: String,
  elado: Boolean,
  ar: Number,
  _garazs: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = Kocsi;