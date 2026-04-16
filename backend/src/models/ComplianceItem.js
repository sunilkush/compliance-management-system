const mongoose = require('mongoose');

const complianceItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        'REGULATION',
        'OBLIGATION',
        'POLICY',
        'CONTROL',
        'RISK',
        'ISSUE',
        'INCIDENT',
        'TRAINING',
        'VENDOR',
        'AUDIT'
      ],
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, default: 'OPEN' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    frameworkTags: [{ type: String }],
    region: { type: String, default: 'GLOBAL' },
    riskScore: { type: Number, default: 0 },
    dueDate: { type: Date },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    entityId: { type: String, required: true, default: 'HQ' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ComplianceItem', complianceItemSchema);
