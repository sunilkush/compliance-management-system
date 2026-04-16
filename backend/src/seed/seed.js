require('dotenv').config({ path: '.env' });
const connectDB = require('../config/db');
const User = require('../models/User');
const Policy = require('../models/Policy');
const Risk = require('../models/Risk');
const Task = require('../models/Task');
const Audit = require('../models/Audit');
const Training = require('../models/Training');
const { ROLES } = require('../utils/constants');

const users = [
  { name: 'Platform Super Admin', email: 'admin@corp.com', role: ROLES.SUPER_ADMIN, password: 'Password123!', entityId: 'HQ' },
  { name: 'Chief Compliance Officer', email: 'cco@corp.com', role: ROLES.COMPLIANCE_OFFICER, password: 'Password123!', entityId: 'HQ' },
  { name: 'Legal Risk Manager', email: 'legal@corp.com', role: ROLES.LEGAL_RISK_MANAGER, password: 'Password123!', entityId: 'HQ' },
  { name: 'Internal Auditor', email: 'auditor@corp.com', role: ROLES.INTERNAL_AUDITOR, password: 'Password123!', entityId: 'HQ' },
  { name: 'Department Manager', email: 'manager@corp.com', role: ROLES.DEPARTMENT_MANAGER, password: 'Password123!', entityId: 'HQ' },
  { name: 'Employee User', email: 'employee@corp.com', role: ROLES.EMPLOYEE, password: 'Password123!', entityId: 'HQ' },
  { name: 'External Auditor', email: 'external.auditor@corp.com', role: ROLES.EXTERNAL_AUDITOR, password: 'Password123!', entityId: 'HQ' },
  { name: 'Executive Sponsor', email: 'exec@corp.com', role: ROLES.EXECUTIVE, password: 'Password123!', entityId: 'HQ' }
];

const run = async () => {
  await connectDB();
  await Promise.all([
    User.deleteMany({}),
    Policy.deleteMany({}),
    Risk.deleteMany({}),
    Task.deleteMany({}),
    Audit.deleteMany({}),
    Training.deleteMany({})
  ]);

  const createdUsers = await User.insertMany(users);
  const owner = createdUsers.find((user) => user.role === ROLES.COMPLIANCE_OFFICER);

  await Policy.insertMany([
    {
      title: 'Information Security Policy',
      category: 'SECURITY',
      content: 'Policy baseline for GDPR, HIPAA, ISO 27001, and SOC 2.',
      status: 'APPROVED',
      owner: owner._id,
      frameworkTags: ['GDPR', 'HIPAA', 'ISO27001', 'SOC2'],
      entityId: 'HQ'
    }
  ]);

  await Risk.insertMany([
    {
      title: 'Privileged account sprawl',
      description: 'Unreviewed admin access across business systems.',
      category: 'IT',
      likelihood: 4,
      impact: 5,
      residualLikelihood: 3,
      residualImpact: 3,
      mitigationPlan: 'Quarterly access recertification and PAM rollout',
      owner: owner._id,
      frameworkTags: ['ISO27001', 'SOC2'],
      entityId: 'HQ'
    }
  ]);

  await Task.insertMany([
    {
      title: 'Complete SOC2 evidence collection',
      module: 'AUDIT',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
      assignee: owner._id,
      reminderChannels: ['EMAIL'],
      entityId: 'HQ'
    }
  ]);

  await Audit.insertMany([
    {
      name: 'SOC 2 Type II Readiness',
      auditType: 'INTERNAL',
      frameworks: ['SOC2'],
      periodStart: new Date('2026-01-01'),
      periodEnd: new Date('2026-03-31'),
      status: 'ACTIVE',
      auditor: owner._id,
      findings: [{ severity: 'HIGH', title: 'Missing access review evidence', evidenceRefs: ['EV-001'], capAction: 'Implement quarterly review', status: 'OPEN' }],
      entityId: 'HQ'
    }
  ]);

  await Training.insertMany([
    {
      title: 'Annual Privacy Awareness',
      topic: 'GDPR Basics',
      audienceRole: ROLES.EMPLOYEE,
      mandatory: true,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      assignedUsers: [createdUsers.find((u) => u.role === ROLES.EMPLOYEE)._id],
      completedUsers: [],
      entityId: 'HQ'
    }
  ]);

  console.log('Seed complete');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
