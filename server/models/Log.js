const mongoose = require('mongoose');
const dayjs = require('dayjs');

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
    type: String,
    default: () => dayjs().format('YYYY-MM-DD HH:mm')
  }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
