import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ItemList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "owned", label: "Owned" },
  { value: "borrow", label: "Borrow" },
  { value: "borrowed", label: "Borrowed" },
  { value: "sold", label: "Sold" },
  { value: "lost", label: "Lost" },
];

const sortOptions = [
  { value: "newest", label: "Sort: Newest" },
  { value: "name", label: "Sort: Name A-Z" },
  { value: "category", label: "Sort: Category" },
  { value: "location", label: "Sort: Location" },
];

function Products() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categoryOptions = useMemo(() => {
    const categories = [...new Set(products.map((item) => item.category).filter(Boolean))].sort();
    return [
      { value: "all", label: "All categories" },
      ...categories.map((category) => ({ value: category, label: category })),
    ];
  }, [products]);

  const locationOptions = useMemo(() => {
    const locations = [...new Set(products.map((item) => item.location).filter(Boolean))].sort();
    return [
      { value: "all", label: "All locations" },
      ...locations.map((location) => ({ value: location, label: location })),
    ];
  }, [products]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const matchingItems = products.filter((item) => {
      const searchableText = [item.name, item.category, item.location, item.notes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesName =
        normalizedSearch === "" || searchableText.includes(normalizedSearch);
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      const matchesLocation =
        locationFilter === "all" || item.location === locationFilter;

      return matchesName && matchesCategory && matchesStatus && matchesLocation;
    });

    return [...matchingItems].sort((itemA, itemB) => {
      if (sortBy === "name") return itemA.name.localeCompare(itemB.name);
      if (sortBy === "category") return itemA.category.localeCompare(itemB.category);
      if (sortBy === "location") return itemA.location.localeCompare(itemB.location);

      const dateA = Date.parse(itemA.createdAt) || 0;
      const dateB = Date.parse(itemB.createdAt) || 0;
      return dateB - dateA;
    });
  }, [products, search, categoryFilter, statusFilter, locationFilter, sortBy]);

  const totalItems = products.length;
  const itemCountText =
    filteredItems.length === totalItems
      ? `${totalItems} ${totalItems === 1 ? "item" : "items"}`
      : `${filteredItems.length} of ${totalItems} items`;
  const hasActiveFilters =
    search.trim() !== "" ||
    categoryFilter !== "all" ||
    statusFilter !== "all" ||
    locationFilter !== "all";

  function clearFilters() {
    setSearch("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setLocationFilter("all");
  }

  return (
    <section className="inventory-page">
      <div className="inventory-header">
        <div>
          <h1>Your inventory</h1>
          <p>Find what you own by item, category, location, or status.</p>
        </div>
        <Link className="button button--primary" to="/add-item">
          Add item
        </Link>
      </div>

      <div className="dashboard-controls">
        <SearchBar value={search} onChange={setSearch} placeholder="Search items" />
        <FilterDropdown
          label="Category"
          value={categoryFilter}
          options={categoryOptions}
          onChange={setCategoryFilter}
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          options={statusOptions}
          onChange={setStatusFilter}
        />
        <FilterDropdown
          label="Location"
          value={locationFilter}
          options={locationOptions}
          onChange={setLocationFilter}
        />
        <FilterDropdown
          label="Sort inventory"
          value={sortBy}
          options={sortOptions}
          onChange={setSortBy}
        />
      </div>

      <div className="items-heading">
        <div>
          <h2>{locationFilter === "all" ? "All items" : locationFilter}</h2>
          <span>{itemCountText}</span>
        </div>
        {hasActiveFilters && (
          <button className="clear-filters" type="button" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      <ItemList
        products={filteredItems}
        hasProducts={totalItems > 0}
        loading={loading}
      />
    </section>
  );
}

export default Products;
