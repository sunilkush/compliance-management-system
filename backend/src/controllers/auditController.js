const AuditLog = require('../models/AuditLog');

const getAuditLogs = async (req, res) => {
  const logs = await AuditLog.find({ entityId: req.entityId })
    .sort({ createdAt: -1 })
    .limit(200)
    .populate('actor', 'name email role');

  return res.json(logs);
};

module.exports = { getAuditLogs };
