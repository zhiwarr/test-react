import { useState } from "react";
import FormField from "../components/FormField";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) return;

    setError("");
    setIsSubmitting(true);
    try {
      await onLogin(email, password);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to login. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-(--border-color) bg-(--bg-color) p-6 text-left shadow-sm">
      <h1 className="mb-2 text-3xl font-semibold text-(--text-color) text-center">
        Sign In
      </h1>

      {error ? (
        <p className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="zhiwar@test.com"
          disabled={isSubmitting}
          required
        />

        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          disabled={isSubmitting}
          required
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-(--primary-color) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--primary-color-hover) disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
