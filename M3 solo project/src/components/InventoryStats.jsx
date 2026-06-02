function InventoryStats({ totalItems, ownedValue }) {
  return (
    <div className="stats-grid">
      <article className="stat-card">
        <span className="stat-label">Total items</span>
        <strong className="stat-value">{totalItems}</strong>
      </article>

      <article className="stat-card">
        <span className="stat-label">Owned value</span>
        <strong className="stat-value">
          ${ownedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </strong>
      </article>
    </div>
  );
}

export default InventoryStats;
