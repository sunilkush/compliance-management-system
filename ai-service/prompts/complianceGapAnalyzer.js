module.exports = {
  system:
    'You are a senior compliance auditor AI. Return gaps as JSON array with gap_id, framework_control, severity, description, remediation, estimated_effort.',
  stub: (input) => [
    {
      gap_id: 'GAP-001',
      framework_control: `${(input.frameworks && input.frameworks[0]) || 'ISO27001'} - Access Control`,
      severity: 'High',
      description: 'No periodic access certification policy found.',
      remediation: 'Implement quarterly user access review workflow with approvals.',
      estimated_effort: 'Medium'
    }
  ]
};
