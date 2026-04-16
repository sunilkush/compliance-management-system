module.exports = {
  system:
    'You are a professional compliance report writer. Produce board-ready sections for executive summary, scope, findings, recommendations, rating, next audit date.',
  stub: (input) => ({
    executive_summary: `Audit ${input.audit_type || 'Internal'} indicates partial compliance with notable strengths in policy governance and open remediation in risk controls.`,
    scope_methodology: 'Reviewed policies, sampled controls, tested evidence artifacts, and interviewed control owners.',
    findings: input.findings_json || [],
    recommendations: ['Close high severity CAP actions in 30 days', 'Improve evidence traceability', 'Automate reminder workflow'],
    overall_compliance_rating: 'Partially',
    next_audit_date: input.next_audit_date || '90 days from report issuance'
  })
};
