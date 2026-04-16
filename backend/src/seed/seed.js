require('dotenv').config({ path: '.env' });
const connectDB = require('../config/db');
const User = require('../models/User');
const ComplianceItem = require('../models/ComplianceItem');
const { ROLES } = require('../utils/constants');

const users = [
  { name: 'System Admin', email: 'admin@corp.com', role: ROLES.ADMIN, password: 'Password123!', entityId: 'HQ' },
  { name: 'Chief Compliance Officer', email: 'cco@corp.com', role: ROLES.COMPLIANCE_OFFICER, password: 'Password123!', entityId: 'HQ' },
  { name: 'Internal Auditor', email: 'auditor@corp.com', role: ROLES.AUDITOR, password: 'Password123!', entityId: 'HQ' },
  { name: 'Control Owner', email: 'owner@corp.com', role: ROLES.CONTROL_OWNER, password: 'Password123!', entityId: 'HQ' },
  { name: 'Employee User', email: 'employee@corp.com', role: ROLES.EMPLOYEE, password: 'Password123!', entityId: 'HQ' },
  { name: 'Executive Sponsor', email: 'exec@corp.com', role: ROLES.EXECUTIVE, password: 'Password123!', entityId: 'HQ' }
];

const items = [
  { type: 'OBLIGATION', title: 'GDPR Article 32 Security of Processing', status: 'OPEN', frameworkTags: ['GDPR', 'ISO27001'], region: 'EU', metadata: { penalties: 'Up to 2% global turnover', controlIds: ['CTRL-001'] }, entityId: 'HQ' },
  { type: 'POLICY', title: 'Information Security Policy v2.1', status: 'PUBLISHED', frameworkTags: ['ISO27001', 'SOC2'], region: 'GLOBAL', metadata: { acknowledgementRate: 86 }, entityId: 'HQ' },
  { type: 'CONTROL', title: 'Quarterly Access Review', status: 'IN_PROGRESS', frameworkTags: ['SOX', 'SOC2'], region: 'US', metadata: { frequency: 'QUARTERLY', procedure: 'Review IAM group access and recertify.' }, entityId: 'HQ' },
  { type: 'RISK', title: 'Privileged account sprawl', status: 'OPEN', riskScore: 15, frameworkTags: ['NIST-CSF'], region: 'GLOBAL', dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20), entityId: 'HQ' },
  { type: 'INCIDENT', title: 'Whistleblower hotline case #WB-104', status: 'TRIAGE', frameworkTags: ['SOX'], region: 'US', metadata: { confidentiality: 'STRICT', channel: 'Hotline' }, entityId: 'HQ' },
  { type: 'TRAINING', title: 'Annual Code of Conduct Certification', status: 'OPEN', frameworkTags: ['SOX', 'CCPA'], region: 'GLOBAL', metadata: { recertificationCadenceMonths: 12, completionRate: 73 }, entityId: 'HQ' },
  { type: 'VENDOR', title: 'CloudCRM Vendor Reassessment', status: 'OPEN', frameworkTags: ['GDPR', 'PCI-DSS'], region: 'EU', metadata: { riskTier: 'HIGH', nextAssessment: '2026-07-30' }, entityId: 'HQ' },
  { type: 'AUDIT', title: 'SOC 2 Type II Readiness - Q3', status: 'PLANNED', frameworkTags: ['SOC2'], region: 'GLOBAL', metadata: { findingsOpen: 5 }, entityId: 'HQ' }
];

const run = async () => {
  await connectDB();
  await User.deleteMany({});
  await ComplianceItem.deleteMany({});

  const createdUsers = await User.insertMany(users);
  const owner = createdUsers.find((user) => user.role === ROLES.CONTROL_OWNER);

  const enrichedItems = items.map((item) => ({ ...item, owner: owner._id }));
  await ComplianceItem.insertMany(enrichedItems);

  console.log('Seed complete');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
