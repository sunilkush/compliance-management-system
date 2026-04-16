import { useState } from 'react';
import api from '../api/client';

const types = ['OBLIGATION', 'POLICY', 'CONTROL', 'RISK', 'ISSUE', 'INCIDENT', 'TRAINING', 'VENDOR', 'AUDIT'];

const CreateItemForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    type: 'OBLIGATION',
    title: '',
    status: 'OPEN',
    region: 'GLOBAL',
    frameworkTags: 'ISO27001,SOC2',
    riskScore: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      frameworkTags: form.frameworkTags
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
      riskScore: Number(form.riskScore)
    };

    await api.post('/compliance-items', payload);
    setForm({ ...form, title: '', riskScore: 0 });
    onCreated();
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Create Compliance Record</h3>
      <div className="grid two">
        <div>
          <label>Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Status</label>
          <input value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        </div>
      </div>
      <label>Title</label>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <div className="grid two">
        <div>
          <label>Region</label>
          <input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
        </div>
        <div>
          <label>Risk Score</label>
          <input type="number" value={form.riskScore} onChange={(e) => setForm({ ...form, riskScore: e.target.value })} />
        </div>
      </div>
      <label>Framework Tags (comma-separated)</label>
      <input
        value={form.frameworkTags}
        onChange={(e) => setForm({ ...form, frameworkTags: e.target.value })}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateItemForm;
