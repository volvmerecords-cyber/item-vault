import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">ItemVault</span>
        <h1>Your personal inventory, organized simply.</h1>
        <p>
          Track your belongings with a clean dashboard, add new items easily, and
          manage item details all in the browser using localStorage.
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

      <div className="hero-panel">
        <h2>Inventory made easy</h2>
        <p>
          Add items with category, price, condition, purchase date, and notes.
          Filter and search so you always know what you own.
        </p>
      </div>
    </section>
  );
}

export default Home;
