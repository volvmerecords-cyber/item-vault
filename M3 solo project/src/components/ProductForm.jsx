import { useState, useRef } from "react";

const COMMON_LOCATIONS = [
  "Bedroom",
  "Living room",
  "Kitchen",
  "Office",
  "Garage",
  "Storage",
];

function ProductForm({ initialData = {}, onSubmit, submitLabel = "Save item" }) {
  const initialLocation = initialData.location || "";
  const initialLocationOption = COMMON_LOCATIONS.includes(initialLocation)
    ? initialLocation
    : initialLocation
      ? "custom"
      : "";

  const [name, setName] = useState(initialData.name || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [price, setPrice] = useState(initialData.price ?? "");
  const [condition, setCondition] = useState(initialData.condition || "");
  const [locationOption, setLocationOption] = useState(initialLocationOption);
  const [customLocation, setCustomLocation] = useState(
    initialLocationOption === "custom" ? initialLocation : "",
  );
  const [purchaseDate, setPurchaseDate] = useState(initialData.purchaseDate || "");
  const [notes, setNotes] = useState(initialData.notes || "");
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "");
  const [status, setStatus] = useState(initialData.status || "owned");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const isSubmittingRef = useRef(false);
  const location = locationOption === "custom" ? customLocation : locationOption;

  function getValidationErrors() {
    const validationErrors = {};

    if (!name.trim()) validationErrors.name = "Item name is required.";
    if (!category.trim()) validationErrors.category = "Category is required.";
    if (price !== "" && (Number.isNaN(Number(price)) || Number(price) < 0)) {
      validationErrors.price = "Price must be zero or more.";
    }
    if (!location.trim()) validationErrors.location = "Location is required.";
    if (!status.trim()) validationErrors.status = "Status is required.";

    return validationErrors;
  }

  const validationErrors = getValidationErrors();
  const errors = hasAttemptedSubmit ? validationErrors : {};

  async function handleSubmit(event) {
    event.preventDefault();

    setHasAttemptedSubmit(true);

    if (isSubmittingRef.current || Object.keys(validationErrors).length > 0) return;

    setSubmitError("");
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      await onSubmit({
        name: name.trim(),
        category: category.trim(),
        price: price === "" ? null : Number(price),
        condition: condition.trim(),
        location: location.trim(),
        purchaseDate: purchaseDate.trim(),
        notes: notes.trim(),
        imageUrl: imageUrl.trim(),
        status: status.trim(),
        createdAt: initialData.createdAt || new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save item. Please try again.";

      setSubmitError(message);
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="product-form__fieldset" disabled={isSubmitting}>
        <label>
          Item name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Laptop, Sofa, Bicycle"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "item-name-error" : undefined}
          />
          {errors.name && (
            <span className="field-error" id="item-name-error" role="alert">
              {errors.name}
            </span>
          )}
        </label>

        <div className="field-row">
          <label>
            Category
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="e.g. Electronics, Furniture"
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? "category-error" : undefined}
            />
            {errors.category && (
              <span className="field-error" id="category-error" role="alert">
                {errors.category}
              </span>
            )}
          </label>

          <label>
            Status
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="owned">Owned</option>
              <option value="borrow">Borrow</option>
              <option value="borrowed">Borrowed</option>
              <option value="sold">Sold</option>
              <option value="lost">Lost</option>
            </select>
            {errors.status && <span className="field-error">{errors.status}</span>}
          </label>
        </div>

        <label>
          Location
          <select
            value={locationOption}
            onChange={(event) => setLocationOption(event.target.value)}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "location-error" : undefined}
          >
            <option value="">Choose a location</option>
            {COMMON_LOCATIONS.map((locationName) => (
              <option key={locationName} value={locationName}>
                {locationName}
              </option>
            ))}
            <option value="custom">Add your own</option>
          </select>
          {locationOption === "custom" && (
            <input
              value={customLocation}
              onChange={(event) => setCustomLocation(event.target.value)}
              placeholder="Enter a custom location"
              aria-label="Custom location"
            />
          )}
          {errors.location && (
            <span className="field-error" id="location-error" role="alert">
              {errors.location}
            </span>
          )}
        </label>

        <details className="optional-fields">
          <summary>Optional details</summary>
          <div className="optional-fields__content">
            <div className="field-row">
              <label>
                Price
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="0.00"
                  aria-invalid={Boolean(errors.price)}
                  aria-describedby={errors.price ? "price-error" : undefined}
                />
                {errors.price && (
                  <span className="field-error" id="price-error" role="alert">
                    {errors.price}
                  </span>
                )}
              </label>

              <label>
                Condition
                <select value={condition} onChange={(event) => setCondition(event.target.value)}>
                  <option value="">Not specified</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
              </label>
            </div>

            <label>
              Purchase date
              <input
                type="date"
                value={purchaseDate}
                onChange={(event) => setPurchaseDate(event.target.value)}
              />
            </label>

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
          </div>
        </details>

        {submitError && <p className="form-error">{submitError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </fieldset>
    </form>
  );
}

export default ProductForm;
