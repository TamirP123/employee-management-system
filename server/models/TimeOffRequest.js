const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const timeOffRequestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(dateTime){
        return dayjs(dateTime).format("M/D/YYYY")
    },
  },
  notes: {
    type: String,
    default: '',
  },
});

const TimeOffRequest = model('TimeOffRequest', timeOffRequestSchema);

module.exports = TimeOffRequest;
