import { Link } from "react-router-dom";

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
          <span className={`product-card__tag status-tag status-${product.status}`}>{product.status}</span>
        </div>

        <div className="product-card__content">
          <h2>{product.name}</h2>
          <p>{product.notes || "No notes added."}</p>
        </div>

        <div className="product-card__meta">
          <span>{product.location}</span>
          <span>${Number(product.price).toFixed(2)}</span>
        </div>

        <div className="product-card__footer">
          <span className="small-text">Purchased {product.purchaseDate}</span>
          <Link className="button button--secondary button--small" to={`/items/${product.id}`}>
            View item
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
