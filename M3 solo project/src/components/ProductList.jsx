import ItemCard from "./ProductCard";

function InventoryRows({ products }) {
  return (
    <div className="inventory-list">
      <div className="inventory-list__header" aria-hidden="true">
        <span>Item</span>
        <span>Category</span>
        <span>Location</span>
        <span>Status</span>
      </div>
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductList({ products, hasProducts, loading }) {
  if (loading) {
    return <div className="inventory-loading">Loading inventory...</div>;
  }

  if (!products.length) {
    return (
      <div className="empty-state">
        {hasProducts ? (
          <>
            <h2>No results found</h2>
            <p>Try adjusting the item name search, category, or status filters.</p>
          </>
        ) : (
          <>
            <h2>Your inventory is empty</h2>
            <p>Add an item to start building your personal inventory.</p>
          </>
        )}
      </div>
    );
  }

  return <InventoryRows products={products} />;
}

export default ProductList;
