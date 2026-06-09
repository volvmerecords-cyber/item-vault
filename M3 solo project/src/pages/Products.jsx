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

function Products() {
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
  const itemCountText =
    filteredItems.length === totalItems
      ? `${totalItems} ${totalItems === 1 ? "item" : "items"}`
      : `${filteredItems.length} of ${totalItems} items`;

  return (
    <section className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Items</span>
          <h1>Your inventory items</h1>
          <p>Browse what you have, where it is, and its current status.</p>
        </div>
        <Link className="button button--primary" to="/add-item">
          Add item
        </Link>
      </div>

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

      <div className="items-heading">
        <h2>Item list</h2>
        <span>{itemCountText}</span>
      </div>

      <ItemList products={filteredItems} hasProducts={totalItems > 0} />
    </section>
  );
}

export default Products;
