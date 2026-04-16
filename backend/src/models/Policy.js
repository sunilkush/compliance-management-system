const mongoose = require('mongoose');

const policySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: 'GENERAL' },
    content: { type: String, default: '' },
    version: { type: Number, default: 1 },
    status: { type: String, enum: ['DRAFT', 'REVIEW', 'APPROVED', 'ARCHIVED'], default: 'DRAFT' },
    approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    frameworkTags: [{ type: String }],
    attestationRequired: { type: Boolean, default: true },
    attestedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    expiryDate: Date,
    entityId: { type: String, default: 'HQ', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Policy', policySchema);
