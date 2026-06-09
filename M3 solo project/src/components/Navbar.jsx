import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { logout, isLoggedIn } = useAuth();

  // Theme state persisted in localStorage
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("theme") || "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      window.localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore if storage isn't available
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <header className="site-header">
      <div className="brand">
        <Link to="/">ItemVault</Link>
      </div>

      <nav className="main-nav">
        {isLoggedIn ? (
          <button className="button button--secondary" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="button button--secondary" to="/register">
              Register
            </Link>
          </>
        )}

        <button
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="button button--secondary theme-toggle"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
