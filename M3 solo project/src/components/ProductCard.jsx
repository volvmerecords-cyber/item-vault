import { Link } from "react-router-dom";

function formatStatus(status) {
  if (!status) return "";

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function ProductCard({ product }) {
  const placeholderLetter = product.name?.trim().charAt(0).toUpperCase() || "I";

  return (
    <Link
      className="product-card"
      to={`/items/${product.id}/edit`}
      aria-label={`Edit ${product.name}`}
    >
      <div className="product-card__identity">
        <div className="product-card__image" aria-hidden={!product.imageUrl}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <span aria-hidden="true">{placeholderLetter}</span>
          )}
        </div>
        <div className="product-card__content">
          <h2>{product.name}</h2>
          {product.notes && <p>{product.notes}</p>}
        </div>
      </div>

      <div className="product-card__field" data-label="Category">
        {product.category}
      </div>

      <div className="product-card__field" data-label="Location">
        {product.location || "Unassigned"}
      </div>

      <div className="product-card__field" data-label="Status">
        <span className={`status-label status-${product.status}`}>
          {formatStatus(product.status)}
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;
