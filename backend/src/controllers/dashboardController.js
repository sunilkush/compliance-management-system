const Policy = require('../models/Policy');
const Risk = require('../models/Risk');
const Task = require('../models/Task');
const Audit = require('../models/Audit');
const Training = require('../models/Training');

const getDashboard = async (req, res) => {
  const entityId = req.entityId;

  const [
    totalPolicies,
    approvedPolicies,
    openRisks,
    risks,
    overdueTasks,
    auditOpen,
    training,
    trainingCompleted,
    taskByStatus,
    auditsByStatus
  ] = await Promise.all([
    Policy.countDocuments({ entityId }),
    Policy.countDocuments({ entityId, status: 'APPROVED' }),
    Risk.countDocuments({ entityId, status: { $ne: 'CLOSED' } }),
    Risk.find({ entityId, status: { $ne: 'CLOSED' } }).select('likelihood impact category'),
    Task.countDocuments({ entityId, status: { $ne: 'DONE' }, dueDate: { $lt: new Date() } }),
    Audit.countDocuments({ entityId, status: { $ne: 'CLOSED' } }),
    Training.countDocuments({ entityId }),
    Training.aggregate([
      { $match: { entityId } },
      { $project: { ratio: { $cond: [{ $gt: [{ $size: '$assignedUsers' }, 0] }, { $divide: [{ $size: '$completedUsers' }, { $size: '$assignedUsers' }] }, 0] } } },
      { $group: { _id: null, avg: { $avg: '$ratio' } } }
    ]),
    Task.aggregate([{ $match: { entityId } }, { $group: { _id: '$status', count: { $sum: 1 } } }]),
    Audit.aggregate([{ $match: { entityId } }, { $group: { _id: '$status', count: { $sum: 1 } } }])
  ]);

  const complianceScore = Math.round(
    ((approvedPolicies / (totalPolicies || 1)) * 35 +
      ((25 - Math.min(openRisks, 25)) / 25) * 25 +
      ((25 - Math.min(overdueTasks, 25)) / 25) * 20 +
      (trainingCompleted[0]?.avg || 0) * 20) *
      100
  ) / 100;

  const heatmap = risks.map((risk) => ({
    category: risk.category,
    likelihood: risk.likelihood,
    impact: risk.impact,
    score: risk.likelihood * risk.impact
  }));

  return res.json({
    complianceScore,
    frameworkStatus: {
      GDPR: approvedPolicies > 0 ? 'TRACKED' : 'PENDING',
      HIPAA: 'TRACKED',
      ISO27001: totalPolicies > 1 ? 'TRACKED' : 'PENDING',
      SOC2: auditOpen > 0 ? 'ACTIVE' : 'PENDING'
    },
    overdueTasks,
    openRisks,
    activeAudits: auditOpen,
    policyApprovalPct: totalPolicies ? Math.round((approvedPolicies / totalPolicies) * 100) : 0,
    taskByStatus,
    auditsByStatus,
    riskHeatmap: heatmap,
    generatedAt: new Date().toISOString()
  });
};

module.exports = { getDashboard };
