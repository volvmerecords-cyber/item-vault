import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const carouselSlides = [
  {
    label: "Capture",
    title: "Save every item without the clutter.",
    text: "Add the essentials first, then keep optional details like price, condition, purchase date, notes, and image close by.",
    metric: "7+ fields",
    metricLabel: "structured into one item record",
    visual: "capture",
  },
  {
    label: "Search",
    title: "Find belongings the way you remember them.",
    text: "Search by name, category, room, status, or notes so a messy inventory becomes quick to scan.",
    metric: "4 filters",
    metricLabel: "for category, status, location, and sort",
    visual: "search",
  },
  {
    label: "Status",
    title: "Status tags make the dashboard readable.",
    text: "Owned, borrowed, sold, and lost states use clear labels and color cues, so the list explains itself at a glance.",
    metric: "4 states",
    metricLabel: "shown with accessible text labels",
    visual: "status",
  },
];

function CarouselVisual({ type }) {
  if (type === "search") {
    return (
      <div className="carousel-visual carousel-visual--search" aria-hidden="true">
        <div className="mini-search">Search: camera bag</div>
        <div className="mini-filter-row">
          <span>Electronics</span>
          <span>Bedroom</span>
          <span>Newest</span>
        </div>
        <div className="mini-result-card">
          <strong>Camera bag</strong>
          <span>Bedroom shelf · Owned</span>
        </div>
      </div>
    );
  }

  if (type === "status") {
    return (
      <div className="carousel-visual carousel-visual--status" aria-hidden="true">
        <div className="mini-status-grid">
          <span className="status-label status-owned">Owned</span>
          <span className="status-label status-borrowed">Borrowed</span>
          <span className="status-label status-lost">Lost</span>
          <span className="status-label status-sold">Sold</span>
        </div>
        <div className="mini-row">
          <strong>Winter coat</strong>
          <span className="status-label status-owned">Owned</span>
        </div>
        <div className="mini-row">
          <strong>Bluetooth speaker</strong>
          <span className="status-label status-borrowed">Borrowed</span>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-visual carousel-visual--capture" aria-hidden="true">
      <div className="mini-form-row">
        <span>Item name</span>
        <strong>Denim jacket</strong>
      </div>
      <div className="mini-form-row">
        <span>Location</span>
        <strong>Bedroom wardrobe</strong>
      </div>
      <div className="mini-form-row mini-form-row--split">
        <span>Category</span>
        <strong>Clothing</strong>
      </div>
    </div>
  );
}

function Home() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { isLoggedIn } = useAuth();
  const activeSlide = carouselSlides[activeSlideIndex];

  function showPreviousSlide() {
    setActiveSlideIndex((currentIndex) =>
      currentIndex === 0 ? carouselSlides.length - 1 : currentIndex - 1,
    );
  }

  function showNextSlide() {
    setActiveSlideIndex((currentIndex) =>
      currentIndex === carouselSlides.length - 1 ? 0 : currentIndex + 1,
    );
  }

  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">ItemVault</span>
        <h1>Your personal inventory, organized simply.</h1>
        <p>
          Track your belongings with a clean dashboard, add new items easily, and
          find what you own by category, location, or status from any signed-in device.
        </p>
        <div className="hero-actions">
          <Link className="button button--primary" to="/dashboard">
            View dashboard
          </Link>
          <Link className="button button--secondary" to="/add-item">
            Add item
          </Link>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="hero-panel hero-carousel" aria-label="ItemVault feature carousel">
          <div className="carousel-topline">
            <span>{activeSlide.label}</span>
            <div className="carousel-controls">
              <button type="button" onClick={showPreviousSlide} aria-label="Show previous feature">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 5 8 12l7 7" />
                </svg>
              </button>
              <button type="button" onClick={showNextSlide} aria-label="Show next feature">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="carousel-slide" aria-live="polite">
            <h2>{activeSlide.title}</h2>
            <p>{activeSlide.text}</p>
            <div className="carousel-proof">
              <strong>{activeSlide.metric}</strong>
              <span>{activeSlide.metricLabel}</span>
            </div>
            <CarouselVisual type={activeSlide.visual} />
          </div>

          <div className="carousel-dots" aria-label="Choose carousel slide">
            {carouselSlides.map((slide, index) => (
              <button
                className={index === activeSlideIndex ? "is-active" : ""}
                type="button"
                key={slide.label}
                onClick={() => setActiveSlideIndex(index)}
                aria-label={`Show ${slide.label.toLowerCase()} slide`}
                aria-current={index === activeSlideIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Home;
