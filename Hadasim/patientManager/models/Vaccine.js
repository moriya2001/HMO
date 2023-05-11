const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  }
});

const Vaccine = mongoose.model('Vaccine', vaccineSchema);

module.exports = Vaccine;
