const ModuleStatusGrid = ({ data }) => {
  if (!data) return null;

  const modules = [
    { name: 'Policy Engine', status: `${data.policyApprovalPct}% approved`, icon: '✅' },
    { name: 'Risk Module', status: `${data.openRisks} open risks`, icon: '⚠️' },
    { name: 'Audit Manager', status: `${data.activeAudits} active audits`, icon: '🔍' },
    { name: 'Task Tracker', status: `${data.overdueTasks} overdue tasks`, icon: '📋' },
    { name: 'AI Assistant', status: 'Prompts + API ready', icon: '🤖' },
    { name: 'Training', status: 'Courses + completion tracking', icon: '📚' }
  ];

  return (
    <section className="card wide-card">
      <h3>Module-wise Features</h3>
      <div className="module-grid">
        {modules.map((module) => (
          <article key={module.name} className="module-tile">
            <div>{module.icon}</div>
            <strong>{module.name}</strong>
            <p>{module.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ModuleStatusGrid;
