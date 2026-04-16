const ItemTable = ({ items }) => {
  return (
    <div className="card">
      <h3>Compliance Records</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Title</th>
            <th>Status</th>
            <th>Region</th>
            <th>Frameworks</th>
            <th>Risk Score</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.type}</td>
              <td>{item.title}</td>
              <td>{item.status}</td>
              <td>{item.region}</td>
              <td>{item.frameworkTags?.join(', ') || '-'}</td>
              <td>{item.riskScore || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
