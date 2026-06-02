import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ItemForm from "../components/ProductForm";

function EditRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct, loading } = useProducts();
  const item = getProductById(id);

  useEffect(() => {
    if (item) {
      document.title = `${item.name} · Edit item`;
    }
  }, [item]);

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
          <p>The item you wanted to edit does not exist.</p>
          <Link className="button button--secondary" to="/dashboard">
            Back to dashboard
          </Link>
        </div>
      </section>
    );
  }

  async function handleUpdateProduct(updatedItem) {
    await updateProduct(id, {
      ...updatedItem,
      createdAt: item.createdAt,
    });
    navigate(`/items/${id}`);
  }

  return (
    <section className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Edit item</span>
          <h1>Update inventory details</h1>
          <p>Keep your records accurate by editing item details here.</p>
        </div>
      </div>

      <ItemForm
        initialData={item}
        submitLabel="Save changes"
        onSubmit={handleUpdateProduct}
      />
    </section>
  );
}

export default EditRequest;
