import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ItemForm from "../components/ProductForm";

function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  async function handleCreateProduct(item) {
    await addProduct(item);
    navigate("/dashboard", { replace: true });
  }

  return (
    <section className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Add item</span>
          <h1>Add a new inventory item.</h1>
          <p>Track details like condition, location, purchase date, and item status.</p>
        </div>
      </div>

      <ItemForm submitLabel="Save item" onSubmit={handleCreateProduct} />
    </section>
  );
}

export default AddProduct;
