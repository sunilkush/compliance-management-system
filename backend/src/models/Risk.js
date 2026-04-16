const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, enum: ['Operational', 'Legal', 'Financial', 'Reputational', 'IT'], default: 'Operational' },
    likelihood: { type: Number, min: 1, max: 5, required: true },
    impact: { type: Number, min: 1, max: 5, required: true },
    residualLikelihood: { type: Number, min: 1, max: 5, default: 1 },
    residualImpact: { type: Number, min: 1, max: 5, default: 1 },
    mitigationPlan: { type: String, default: '' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['OPEN', 'MITIGATING', 'CLOSED'], default: 'OPEN' },
    frameworkTags: [{ type: String }],
    entityId: { type: String, default: 'HQ', required: true }
  },
  { timestamps: true }
);

riskSchema.virtual('riskScore').get(function riskScore() {
  return this.likelihood * this.impact;
});

module.exports = mongoose.model('Risk', riskSchema);
