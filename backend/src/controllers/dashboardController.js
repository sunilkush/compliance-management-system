const ComplianceItem = require('../models/ComplianceItem');

const getDashboard = async (req, res) => {
  const entityId = req.entityId;

  const [all, highRiskIssues, mappedObligations, totalObligations, overdueActions] = await Promise.all([
    ComplianceItem.countDocuments({ entityId }),
    ComplianceItem.countDocuments({ entityId, type: { $in: ['RISK', 'ISSUE'] }, riskScore: { $gte: 12 }, status: { $ne: 'CLOSED' } }),
    ComplianceItem.countDocuments({ entityId, type: 'OBLIGATION', 'metadata.controlIds.0': { $exists: true } }),
    ComplianceItem.countDocuments({ entityId, type: 'OBLIGATION' }),
    ComplianceItem.countDocuments({ entityId, status: { $in: ['OPEN', 'IN_PROGRESS'] }, dueDate: { $lt: new Date() } })
  ]);

  const pctMapped = totalObligations ? Math.round((mappedObligations / totalObligations) * 100) : 0;

  return res.json({
    totalRecords: all,
    highRiskOpenIssues: highRiskIssues,
    obligationsMappedPct: pctMapped,
    overdueActions,
    generatedAt: new Date().toISOString()
  });
};

module.exports = { getDashboard };
