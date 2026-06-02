import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProducts from "../hooks/useProducts";
import ItemList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import InventoryStats from "../components/InventoryStats";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "owned", label: "Owned" },
  { value: "sold", label: "Sold" },
  { value: "lost", label: "Lost" },
  { value: "borrowed", label: "Borrowed" },
];

function Products() {
  const { greetingName } = useAuth();
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryOptions = useMemo(() => {
    const categories = [...new Set(products.map((item) => item.category))].sort();
    return [{ value: "all", label: "All categories" }, ...categories.map((category) => ({ value: category, label: category }))];
  }, [products]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((item) => {
      const matchesName =
        normalizedSearch === "" || item.name.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesName && matchesCategory && matchesStatus;
    });
  }, [products, search, categoryFilter, statusFilter]);

  const totalItems = products.length;
  const totalOwnedValue = products.reduce((sum, item) => {
    return item.status === "owned" ? sum + Number(item.price || 0) : sum;
  }, 0);

  return (
    <section className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Welcome back, {greetingName}</h1>
          <p>Use search and filters to find items fast, then view or manage them from one clean dashboard.</p>
        </div>
        <Link className="button button--primary" to="/add-item">
          Add item
        </Link>
      </div>

      <InventoryStats totalItems={totalItems} ownedValue={totalOwnedValue} />

      <div className="dashboard-controls">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by item name..." />
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
      </div>

      <ItemList products={filteredItems} hasProducts={totalItems > 0} />
    </section>
  );
}

export default Products;
