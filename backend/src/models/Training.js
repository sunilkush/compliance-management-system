const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true },
    audienceRole: { type: String, default: 'EMPLOYEE' },
    mandatory: { type: Boolean, default: true },
    dueDate: Date,
    quizQuestions: [{ type: String }],
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    completedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    entityId: { type: String, default: 'HQ', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Training', trainingSchema);
