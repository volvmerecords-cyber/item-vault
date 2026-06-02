import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getAuthErrorMessage } from "../firebase/authErrors";
import useAuth from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const { login, loginWithGoogle, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  if (isLoggedIn) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter an email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email.trim(), password.trim());
      navigate(from, { replace: true });
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");

    try {
      setIsGoogleSubmitting(true);
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setIsGoogleSubmitting(false);
    }
  }

  return (
    <section className="login-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p>Access your ItemVault dashboard and manage your inventory securely.</p>

        <button
          type="button"
          className="button button--google"
          onClick={handleGoogleLogin}
          disabled={isSubmitting || isGoogleSubmitting}
        >
          <span className="google-mark">G</span>
          {isGoogleSubmitting ? "Connecting..." : "Continue with Google"}
        </button>

        <div className="auth-divider">
          <span>or login with email</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter a password"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="button button--primary" disabled={isSubmitting || isGoogleSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
