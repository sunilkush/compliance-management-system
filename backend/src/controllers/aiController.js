const PROMPTS = {
  regulation_summarizer: require('../../ai-service/prompts/regulationSummarizer'),
  gap_analyzer: require('../../ai-service/prompts/complianceGapAnalyzer'),
  risk_predictor: require('../../ai-service/prompts/riskPredictor'),
  compliance_chatbot: require('../../ai-service/prompts/complianceChatbot'),
  audit_report: require('../../ai-service/prompts/auditReportGenerator')
};

const runAiPrompt = async (req, res) => {
  const { feature } = req.params;
  const promptConfig = PROMPTS[feature];

  if (!promptConfig) {
    return res.status(404).json({ message: 'AI feature not found' });
  }

  const input = req.body || {};
  const systemPrompt = promptConfig.system;

  if (!process.env.CLAUDE_API_KEY) {
    return res.json({
      feature,
      mode: 'stub',
      systemPrompt,
      generated: promptConfig.stub(input)
    });
  }

  return res.json({
    feature,
    mode: 'configured',
    systemPrompt,
    generated: promptConfig.stub(input),
    note: 'Claude API key detected. Wire the external API call in production deployment.'
  });
};

module.exports = { runAiPrompt };
