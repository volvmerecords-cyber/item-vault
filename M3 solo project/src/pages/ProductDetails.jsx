import { useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

function formatStatus(status) {
  if (!status) return "";

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getProductById, deleteProduct, loading } = useProducts();
  const item = getProductById(id);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(location.state?.deleteError || "");

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
    if (isDeleting) return;

    const itemId = item.id;
    setDeleteError("");
    setIsDeleting(true);

    const deleteRequest = deleteProduct(itemId);
    navigate("/dashboard", { replace: true });

    try {
      await deleteRequest;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "The item could not be deleted. Please try again.";

      navigate(`/items/${itemId}`, {
        replace: true,
        state: { deleteError: message },
      });
    }
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
          <button
            className="button button--danger"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete item"}
          </button>
        </div>
      </div>

      {deleteError && (
        <p className="form-error delete-error" role="alert">
          {deleteError}
        </p>
      )}

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
