import { Link } from "react-router-dom";

function formatStatus(status) {
  if (!status) return "";

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      {product.imageUrl && (
        <div className="product-card__image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      )}

      <div className="product-card__body">
        <div className="product-card__top">
          <span className="product-card__tag">{product.category}</span>
          <span className={`product-card__tag status-tag status-${product.status}`}>
            {formatStatus(product.status)}
          </span>
        </div>

        <div className="product-card__content">
          <h2>{product.name}</h2>
          {product.notes && <p>{product.notes}</p>}
        </div>

        <div className="product-card__meta">
          <span>{product.location}</span>
        </div>

        <div className="product-card__footer">
          <Link className="button button--secondary button--small" to={`/items/${product.id}`}>
            View item
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
