import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import KpiCards from '../components/KpiCards';
import ModuleStatusGrid from '../components/ModuleStatusGrid';
import ModuleTable from '../components/ModuleTable';
import AiWorkbench from '../components/AiWorkbench';

const canSeeAuditLogs = (role) => ['SUPER_ADMIN', 'COMPLIANCE_OFFICER', 'INTERNAL_AUDITOR', 'EXTERNAL_AUDITOR'].includes(role);

const DashboardPage = () => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [risks, setRisks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [audits, setAudits] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const loadData = async () => {
    const [dashboardData, policyData, riskData, taskData, auditData] = await Promise.all([
      api.get('/dashboard'),
      api.get('/policies'),
      api.get('/risks'),
      api.get('/tasks'),
      api.get('/audits')
    ]);

    setKpis(dashboardData.data);
    setPolicies(policyData.data.slice(0, 6));
    setRisks(riskData.data.slice(0, 6));
    setTasks(taskData.data.slice(0, 6));
    setAudits(auditData.data.slice(0, 6));

    if (canSeeAuditLogs(user.role)) {
      const { data } = await api.get('/audit-logs');
      setAuditLogs(data.slice(0, 8));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="layout">
      <KpiCards data={kpis} />
      <section className="card wide-card role-card">
        <h3>Enterprise Compliance Hub</h3>
        <p>
          Welcome, <strong>{user.name}</strong>. Role <strong>{user.role}</strong> scoped to entity
          <strong> {user.entityId}</strong>.
        </p>
        <ul>
          <li>Centralized governance for GDPR, HIPAA, ISO 27001, and SOC 2.</li>
          <li>Policy engine + risk matrix + audit tracker + CAP workflows.</li>
          <li>Task automation, reminders, and AI-assisted compliance operations.</li>
        </ul>
      </section>

      <ModuleStatusGrid data={kpis} />
      <AiWorkbench />

      <ModuleTable
        title="Policies"
        columns={['Title', 'Category', 'Status', 'Version']}
        rows={policies.map((item) => [item.title, item.category, item.status, item.version])}
      />
      <ModuleTable
        title="Risk Register"
        columns={['Title', 'Category', 'Likelihood', 'Impact', 'Status']}
        rows={risks.map((item) => [item.title, item.category, item.likelihood, item.impact, item.status])}
      />
      <ModuleTable
        title="Task Board"
        columns={['Title', 'Module', 'Priority', 'Status', 'Due Date']}
        rows={tasks.map((item) => [item.title, item.module, item.priority, item.status, item.dueDate ? new Date(item.dueDate).toLocaleDateString() : '-'])}
      />
      <ModuleTable
        title="Audit Manager"
        columns={['Name', 'Type', 'Status', 'Frameworks']}
        rows={audits.map((item) => [item.name, item.auditType, item.status, item.frameworks?.join(', ')])}
      />

      {canSeeAuditLogs(user.role) && (
        <section className="card wide-card">
          <h3>Recent Audit Trail</h3>
          <ul>
            {auditLogs.map((log) => (
              <li key={log._id}>
                <strong>{new Date(log.createdAt).toLocaleString()}:</strong> {log.action} {log.entityType} by{' '}
                {log.actor?.email || log.actorEmail}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default DashboardPage;
