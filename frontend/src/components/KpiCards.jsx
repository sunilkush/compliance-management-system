const KpiCards = ({ data }) => {
  if (!data) return null;

  const cards = [
    { label: 'Total Records', value: data.totalRecords },
    { label: 'High Risk Open Issues', value: data.highRiskOpenIssues },
    { label: 'Obligations Mapped %', value: `${data.obligationsMappedPct}%` },
    { label: 'Overdue Actions', value: data.overdueActions }
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
