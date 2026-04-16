const ModuleTable = ({ title, columns, rows }) => (
  <div className="card wide-card">
    <h3>{title}</h3>
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {row.map((value, cellIdx) => (
              <td key={`${idx}-${cellIdx}`}>{value ?? '-'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ModuleTable;
