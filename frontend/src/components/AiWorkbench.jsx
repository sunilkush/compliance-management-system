import { useState } from 'react';
import api from '../api/client';

const features = [
  'regulation_summarizer',
  'gap_analyzer',
  'risk_predictor',
  'compliance_chatbot',
  'audit_report'
];

const AiWorkbench = () => {
  const [feature, setFeature] = useState(features[0]);
  const [result, setResult] = useState(null);

  const runFeature = async () => {
    const { data } = await api.post(`/ai/${feature}`, { frameworks: ['GDPR', 'HIPAA', 'ISO27001', 'SOC2'] });
    setResult(data);
  };

  return (
    <section className="card wide-card">
      <h3>AI Assistant Workbench</h3>
      <div className="grid two">
        <select value={feature} onChange={(e) => setFeature(e.target.value)}>
          {features.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <button onClick={runFeature} type="button">
          Run AI Feature
        </button>
      </div>
      {result && <pre className="json-preview">{JSON.stringify(result.generated, null, 2)}</pre>}
    </section>
  );
};

export default AiWorkbench;
