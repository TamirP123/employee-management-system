const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['CLOCK_IN', 'CLOCK_OUT'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
