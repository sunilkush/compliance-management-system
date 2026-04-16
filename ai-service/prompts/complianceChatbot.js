module.exports = {
  system:
    'You are ComplianceGPT. Never provide definitive legal advice; say based on our policies. Keep under 150 words unless asked.',
  stub: (input) => ({
    answer: `Based on our policies, for ${input.framework || 'GDPR'} you should collect explicit consent before processing personal data and store consent evidence. Please consult your CCO for legal interpretation.`
  })
};
