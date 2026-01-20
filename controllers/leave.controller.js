const Leave = require('../models/leave.model');

exports.applyLeave = async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT
    const { date, leaveType, reason } = req.body;

    if (!date || !leaveType || !reason) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const d = new Date(date);
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const leave = await Leave.create({
      userId,
      date,
      leaveType,
      reason,
      month,
      year
    });

    return res.status(201).json(leave);

  } catch (err) {

    // Duplicate leave
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Leave already applied for this date'
      });
    }

    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserLeaves = async (req, res) => {
  const userId = req.user.userId;

  const leaves = await Leave.find(
    { userId },
    { date: 1, status: 1, _id: 0 } // only return dates
  );

  res.json(leaves);
};

