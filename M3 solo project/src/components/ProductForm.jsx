import { useState, useEffect } from "react";

function ProductForm({ initialData = {}, onSubmit, submitLabel = "Save item" }) {
  const [name, setName] = useState(initialData.name || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [price, setPrice] = useState(initialData.price ?? "");
  const [condition, setCondition] = useState(initialData.condition || "Good");
  const [location, setLocation] = useState(initialData.location || "");
  const [purchaseDate, setPurchaseDate] = useState(initialData.purchaseDate || "");
  const [notes, setNotes] = useState(initialData.notes || "");
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "");
  const [status, setStatus] = useState(initialData.status || "owned");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validationErrors = {};

    if (!name.trim()) validationErrors.name = "Item name is required.";
    if (!category.trim()) validationErrors.category = "Category is required.";
    if (!price || Number(price) < 0) validationErrors.price = "Price must be zero or more.";
    if (!condition.trim()) validationErrors.condition = "Condition is required.";
    if (!location.trim()) validationErrors.location = "Location is required.";
    if (!purchaseDate.trim()) validationErrors.purchaseDate = "Purchase date is required.";
    if (!status.trim()) validationErrors.status = "Status is required.";

    setErrors(validationErrors);
  }, [name, category, price, condition, location, purchaseDate, status]);

  function handleSubmit(event) {
    event.preventDefault();

    if (Object.keys(errors).length > 0) return;

    onSubmit({
      id: initialData.id || Date.now().toString(),
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      condition: condition.trim(),
      location: location.trim(),
      purchaseDate: purchaseDate.trim(),
      notes: notes.trim(),
      imageUrl: imageUrl.trim(),
      status: status.trim(),
      createdAt: initialData.createdAt || new Date().toISOString().split("T")[0],
    });
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <label>
        Item name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Laptop, Sofa, Bicycle"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>

      <div className="field-row">
        <label>
          Category
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="e.g. Electronics, Furniture"
          />
          {errors.category && <span className="field-error">{errors.category}</span>}
        </label>

        <label>
          Price
          <input
            type="number"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="0.00"
          />
          {errors.price && <span className="field-error">{errors.price}</span>}
        </label>
      </div>

      <div className="field-row">
        <label>
          Condition
          <select value={condition} onChange={(event) => setCondition(event.target.value)}>
            <option>Excellent</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Poor</option>
          </select>
          {errors.condition && <span className="field-error">{errors.condition}</span>}
        </label>

        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="owned">Owned</option>
            <option value="sold">Sold</option>
            <option value="lost">Lost</option>
            <option value="borrowed">Borrowed</option>
          </select>
          {errors.status && <span className="field-error">{errors.status}</span>}
        </label>
      </div>

      <div className="field-row">
        <label>
          Location
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Office, Living room"
          />
          {errors.location && <span className="field-error">{errors.location}</span>}
        </label>

        <label>
          Purchase date
          <input
            type="date"
            value={purchaseDate}
            onChange={(event) => setPurchaseDate(event.target.value)}
          />
          {errors.purchaseDate && <span className="field-error">{errors.purchaseDate}</span>}
        </label>
      </div>

      <label>
        Image URL
        <input
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="https://example.com/item.jpg"
        />
      </label>

      <label>
        Notes
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Add optional notes about the item"
        />
      </label>

      <button type="submit" disabled={Object.keys(errors).length > 0}>
        {submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;
