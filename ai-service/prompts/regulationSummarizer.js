module.exports = {
  system:
    'You are a compliance expert assistant for a Corporate Compliance Management System. Return strict JSON with summary, obligations, departments, priority_actions, policy_types.',
  stub: () => ({
    summary: 'Regulation requires data protection governance, lawful processing, and continuous monitoring controls.',
    obligations: ['Maintain records of processing', 'Protect sensitive data', 'Report incidents on time'],
    departments: ['Legal', 'IT Security', 'HR', 'Operations'],
    priority_actions: ['Gap assess current controls', 'Assign accountable owners', 'Track evidence in audits'],
    policy_types: ['Data Protection Policy', 'Incident Response Policy', 'Access Control Policy']
  })
};
