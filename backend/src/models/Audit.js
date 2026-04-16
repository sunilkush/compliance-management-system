const mongoose = require('mongoose');

const findingSchema = new mongoose.Schema(
  {
    severity: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], default: 'MEDIUM' },
    title: String,
    evidenceRefs: [{ type: String }],
    capAction: String,
    status: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'CLOSED'], default: 'OPEN' }
  },
  { _id: false }
);

const auditSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    auditType: { type: String, enum: ['INTERNAL', 'EXTERNAL'], default: 'INTERNAL' },
    frameworks: [{ type: String }],
    periodStart: Date,
    periodEnd: Date,
    status: { type: String, enum: ['PLANNED', 'ACTIVE', 'REPORTING', 'CLOSED'], default: 'PLANNED' },
    auditor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    evidenceFiles: [{ type: String }],
    findings: [findingSchema],
    overallRating: { type: String, enum: ['Compliant', 'Partially', 'Non-Compliant'], default: 'Partially' },
    nextAuditDate: Date,
    entityId: { type: String, default: 'HQ', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Audit', auditSchema);
