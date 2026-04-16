const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['BACKLOG', 'TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'], default: 'TODO' },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' },
    dueDate: Date,
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    module: { type: String, enum: ['POLICY', 'RISK', 'AUDIT', 'TRAINING', 'GENERAL'], default: 'GENERAL' },
    reminderChannels: [{ type: String, enum: ['EMAIL', 'SMS', 'SLACK'] }],
    entityId: { type: String, default: 'HQ', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
