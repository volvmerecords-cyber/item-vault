function FilterDropdown({ label, value, onChange, options }) {
  return (
    <div className="filter-dropdown">
      <label>
        <span className="sr-only">{label}</span>
        <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default FilterDropdown;
