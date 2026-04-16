module.exports = {
  system:
    'You are a risk assessment AI for corporate compliance. Return likelihood_score, impact_score, risk_rating, risk_category, top_3_mitigations, estimated_financial_impact, similar_regulatory_risks.',
  stub: (input) => ({
    likelihood_score: 4,
    impact_score: 4,
    risk_rating: 'High',
    risk_category: 'IT',
    top_3_mitigations: [
      'Enable MFA for privileged users',
      'Implement quarterly access recertification',
      'Automate overdue control reminders'
    ],
    estimated_financial_impact: '$150,000-$400,000 potential penalty + remediation cost',
    similar_regulatory_risks: [`Delayed breach notification in ${input.industry || 'regulated'} sector`]
  })
};
