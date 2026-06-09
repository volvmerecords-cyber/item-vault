import { useNavigate, useParams, Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

function formatStatus(status) {
  if (!status) return "";

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, deleteProduct, loading } = useProducts();
  const item = getProductById(id);

  if (loading) {
    return (
      <section className="section-card">
        <p>Loading item details…</p>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="section-card">
        <div>
          <h1>Item not found</h1>
          <p>The item you are looking for does not exist.</p>
        </div>
      </section>
    );
  }

  async function handleDelete() {
    await deleteProduct(item.id);
    navigate("/dashboard");
  }

  const optionalDetails = [
    item.price !== null && item.price !== undefined && item.price !== ""
      ? ["Price", `$${Number(item.price).toFixed(2)}`]
      : null,
    item.condition ? ["Condition", item.condition] : null,
    item.purchaseDate ? ["Purchase date", item.purchaseDate] : null,
  ].filter(Boolean);

  return (
    <section className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Item details</span>
          <h1>{item.name}</h1>
          {item.notes && <p>{item.notes}</p>}
        </div>
        <div className="details-actions">
          <Link className="button button--secondary" to={`/items/${item.id}/edit`}>
            Edit item
          </Link>
          <button className="button button--secondary" onClick={handleDelete}>
            Delete item
          </button>
        </div>
      </div>

      <div className="detail-grid">
        {item.imageUrl && (
          <div className="detail-card detail-image-card">
            <img src={item.imageUrl} alt={item.name} />
          </div>
        )}
        <div className="detail-card">
          <h2>Category</h2>
          <p>{item.category}</p>
        </div>
        <div className="detail-card">
          <h2>Location</h2>
          <p>{item.location}</p>
        </div>
        <div className="detail-card">
          <h2>Status</h2>
          <p>{formatStatus(item.status)}</p>
        </div>
      </div>

      {optionalDetails.length > 0 && (
        <details className="optional-fields item-details-more">
          <summary>More details</summary>
          <dl className="optional-detail-list">
            {optionalDetails.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}

      <div className="section-footer">
        <Link className="button button--secondary" to="/dashboard">
          Back to dashboard
        </Link>
      </div>
    </section>
  );
}

export default ProductDetails;
