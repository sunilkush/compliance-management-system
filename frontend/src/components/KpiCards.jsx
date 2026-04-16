const KpiCards = ({ data }) => {
  if (!data) return null;

  const cards = [
    { label: 'Compliance Score', value: `${data.complianceScore}%` },
    { label: 'Open Risks', value: data.openRisks },
    { label: 'Overdue Tasks', value: data.overdueTasks },
    { label: 'Active Audits', value: data.activeAudits },
    { label: 'Policy Approval', value: `${data.policyApprovalPct}%` }
  ];

  return (
    <div className="grid four">
      {cards.map((card) => (
        <section className="card" key={card.label}>
          <h3>{card.label}</h3>
          <p className="kpi">{card.value}</p>
        </section>
      ))}
    </div>
  );
};

export default KpiCards;
