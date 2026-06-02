import { useNavigate, useParams, Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

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

  return (
    <section className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Item details</span>
          <h1>{item.name}</h1>
          <p>{item.notes}</p>
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
          <h2>Price</h2>
          <p>${Number(item.price).toFixed(2)}</p>
        </div>
        <div className="detail-card">
          <h2>Condition</h2>
          <p>{item.condition}</p>
        </div>
        <div className="detail-card">
          <h2>Location</h2>
          <p>{item.location}</p>
        </div>
        <div className="detail-card">
          <h2>Purchase date</h2>
          <p>{item.purchaseDate}</p>
        </div>
        <div className="detail-card">
          <h2>Status</h2>
          <p>{item.status}</p>
        </div>
      </div>

      <div className="section-footer">
        <Link className="button button--secondary" to="/dashboard">
          Back to dashboard
        </Link>
      </div>
    </section>
  );
}

export default ProductDetails;
