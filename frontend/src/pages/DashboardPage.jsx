import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import KpiCards from '../components/KpiCards';
import ItemTable from '../components/ItemTable';
import CreateItemForm from '../components/CreateItemForm';

const canCreate = (role) => ['ADMIN', 'COMPLIANCE_OFFICER', 'CONTROL_OWNER'].includes(role);
const canSeeAuditLogs = (role) => ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR'].includes(role);

const DashboardPage = () => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState(null);
  const [items, setItems] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const loadData = async () => {
    const [{ data: dashboardData }, { data: itemData }] = await Promise.all([
      api.get('/dashboard'),
      api.get('/compliance-items')
    ]);

    setKpis(dashboardData);
    setItems(itemData);

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
      <section className="card role-card">
        <h3>Role-aware Home</h3>
        <p>
          Welcome, <strong>{user.name}</strong>. You are signed in as <strong>{user.role}</strong> for entity
          <strong> {user.entityId}</strong>.
        </p>
        <ul>
          <li>Admin/Compliance Officer: full lifecycle management + audit logs.</li>
          <li>Control Owner: create/update controls, risks, and evidence-linked records.</li>
          <li>Auditor: read records + view immutable audit trail.</li>
          <li>Executive: KPI dashboard for governance cadence.</li>
          <li>Employee: policies and training visibility.</li>
        </ul>
      </section>
      {canCreate(user.role) && <CreateItemForm onCreated={loadData} />}
      <ItemTable items={items} />
      {canSeeAuditLogs(user.role) && (
        <section className="card">
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
