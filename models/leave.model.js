const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: String, // yyyy-mm-dd
      required: true
    },
    leaveType: {
      type: String,
      enum: ['CL', 'SL', 'EL'],
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'PENDING'
    },
    month: Number,
    year: Number
  },
  { timestamps: true }
);

// Prevent duplicate leave on same day for same user
LeaveSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Leave', LeaveSchema);
