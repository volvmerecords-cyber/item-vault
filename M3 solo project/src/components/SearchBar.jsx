function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search inventory"
      />
    </div>
  );
}

export default SearchBar;
