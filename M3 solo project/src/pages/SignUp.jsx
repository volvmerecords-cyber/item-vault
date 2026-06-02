import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAuthErrorMessage } from "../firebase/authErrors";
import useAuth from "../hooks/useAuth";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const { signup, loginWithGoogle, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !firstName.trim() ||
      !surname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      await signup(email.trim(), password.trim(), {
        firstName: firstName.trim(),
        surname: surname.trim(),
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignUp() {
    setError("");

    try {
      setIsGoogleSubmitting(true);
      await loginWithGoogle();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setIsGoogleSubmitting(false);
    }
  }

  return (
    <section className="login-page">
      <div className="auth-card">
        <h1>Register</h1>
        <p>Create your ItemVault account and save inventory to your personal dashboard.</p>

        <button
          type="button"
          className="button button--google"
          onClick={handleGoogleSignUp}
          disabled={isSubmitting || isGoogleSubmitting}
        >
          <span className="google-mark">G</span>
          {isGoogleSubmitting ? "Connecting..." : "Sign up with Google"}
        </button>

        <div className="auth-divider">
          <span>or create an account with email</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            First name
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Enter your first name"
              autoComplete="given-name"
            />
          </label>

          <label>
            Surname
            <input
              type="text"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              placeholder="Enter your surname"
              autoComplete="family-name"
            />
          </label>

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
              autoComplete="new-password"
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
              autoComplete="new-password"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="button button--primary" disabled={isSubmitting || isGoogleSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
