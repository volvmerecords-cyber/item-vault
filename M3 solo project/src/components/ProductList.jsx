import ItemCard from "./ProductCard";

function ProductList({ products, hasProducts }) {
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
            <p>Add an item to start tracking your collection and estimated value.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
