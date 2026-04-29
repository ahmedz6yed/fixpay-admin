import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../components/ui/Logo";
import { useEmailLogin } from "../hooks/useAuth";
import { emailLoginSchema } from "../schemas/authSchemas";

// ─── Google Icon ──────────────────────────────────────────
const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5836-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573C.3477 6.1731 0 7.5477 0 9s.3477 2.8268.9573 4.0418L3.964 10.71z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4627.8918 11.4254 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1632 6.656 3.5795 9 3.5795z"
      fill="#EA4335"
    />
  </svg>
);

// ─── Eye Icons ────────────────────────────────────────────
const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// ─── Divider ──────────────────────────────────────────────
const OrDivider = ({ label = "or Login with Email" }) => (
  <div className="flex items-center gap-3 my-1">
    <hr className="divider flex-1 m-0" />
    <span className="text-xs text-subtle font-sans whitespace-nowrap">
      {label}
    </span>
    <hr className="divider flex-1 m-0" />
  </div>
);

// ─── FormField ────────────────────────────────────────────
const FormField = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-[var(--color-text)] font-sans">
      {label}
    </label>
    {children}
    {error && (
      <p
        className="text-xs font-sans m-0 px-3 py-2 rounded-sm border"
        role="alert"
        style={{
          color: "#c0392b",
          background: "#fdf0ed",
          borderColor: "#f5c6c0",
        }}
      >
        {error}
      </p>
    )}
  </div>
);

// ─── PasswordInput ────────────────────────────────────────
const PasswordInput = ({
  registration,
  placeholder = "Enter your password",
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        className="input pr-10"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="current-password"
        {...registration}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none p-0 cursor-pointer flex items-center text-subtle hover:text-[var(--color-text)] transition-fast"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeIcon /> : <EyeOffIcon />}
      </button>
    </div>
  );
};

// ─── RememberMe ───────────────────────────────────────────
const RememberMe = ({ checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <div
      onClick={onChange}
      className={[
        "w-4 h-4 rounded-sm flex items-center justify-center shrink-0 cursor-pointer transition-fast",
        checked
          ? "bg-accent border-none"
          : "bg-surface border border-[var(--color-border)]",
      ].join(" ")}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 5l2.5 2.5L8 3"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
    <span className="text-sm text-muted font-sans">Remember Me</span>
  </label>
);

// ─── GoogleButton ─────────────────────────────────────────
const GoogleButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="btn btn-ghost w-full justify-center gap-2.5 py-3 px-5 text-sm font-medium rounded-md hover:shadow-sm"
  >
    <GoogleIcon />
    Login with Google
  </button>
);

// ─── SubmitButton ─────────────────────────────────────────
const SubmitButton = ({ label = "Login", loading = false }) => (
  <button
    type="submit"
    disabled={loading}
    className="btn btn-primary w-full justify-center py-3.5 px-5 text-sm font-semibold rounded-md tracking-wide transition-fast hover:-translate-y-px hover:shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
  >
    {loading ? "Logging in…" : label}
  </button>
);

// ─── Login Page ───────────────────────────────────────────
export default function Login() {
  const [remember, setRemember] = useState(false);

  // ── RHF + Zod ──────────────────────────────────────────
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  // ── TanStack Query mutation ─────────────────────────────
  // onSuccess → saves token + user to Zustand, navigates to /dashboard
  // onError   → surfaces the backend message below
  const { mutate, isPending, isError, error } = useEmailLogin();

  const serverError = isError
    ? (error?.response?.data?.message ?? "Login failed. Please try again.")
    : null;

  const onSubmit = (values) => mutate(values);

  const handleGoogle = () => {
    // TODO: trigger Google OAuth flow (Option B)
    alert("Google OAuth — connect your provider here.");
  };

  return (
    <div className="relative min-h-screen bg-page flex items-center justify-center p-6">
      {/* Logo */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 transition-normal">
        <Logo className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
      </div>

      <div className="w-full max-w-[360px] flex flex-col gap-6">
        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-4xl font-normal text-[var(--color-text)] leading-tight tracking-tight">
            Login
          </h1>
          <p className="font-sans text-sm text-muted leading-normal">
            Hi, Welcome back 👋
          </p>
        </div>

        {/* Google SSO */}
        <GoogleButton onClick={handleGoogle} />

        {/* Divider */}
        <OrDivider />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          <FormField label="Email" error={errors.email?.message}>
            <input
              className="input"
              type="email"
              placeholder="E.g. johndoe@email.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </FormField>

          <FormField label="Password" error={errors.password?.message}>
            <PasswordInput
              registration={register("password")}
              placeholder="Enter your password"
            />
          </FormField>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <RememberMe
              checked={remember}
              onChange={() => setRemember((r) => !r)}
            />
            <Link
              to="/forgot-password"
              className="text-sm text-accent font-sans font-medium no-underline transition-fast hover:text-[var(--color-accent-hover)]"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Server-side error */}
          {serverError && (
            <p
              className="text-xs font-sans m-0 px-3 py-2 rounded-sm border"
              role="alert"
              style={{
                color: "#c0392b",
                background: "#fdf0ed",
                borderColor: "#f5c6c0",
              }}
            >
              {serverError}
            </p>
          )}

          <SubmitButton label="Login" loading={isPending} />
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-muted font-sans m-0">
          Not registered yet?{" "}
          <Link
            to="/register"
            className="text-accent font-medium no-underline inline-flex items-center gap-1 transition-fast hover:text-[var(--color-accent-hover)]"
          >
            Create an account ↗
          </Link>
        </p>
      </div>
    </div>
  );
}
