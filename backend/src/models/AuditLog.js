const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    actorEmail: { type: String },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityIdRef: { type: String, required: true },
    diff: { type: mongoose.Schema.Types.Mixed, default: {} },
    entityId: { type: String, required: true, default: 'HQ' }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);
