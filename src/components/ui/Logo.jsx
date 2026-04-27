export default function Logo({ className = "text-3xl" }) {
  return (
    <h1 className={`font-bold font-logo ${className}`}>
        Fix<span className="text-accent">Pay</span>
    </h1>
  );
}