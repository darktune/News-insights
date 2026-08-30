import Link from "next/link";
import AchihiLogo from "@/components/AchihiLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg)" }}>
      <div className="text-center">
        <AchihiLogo size={56} className="justify-center mb-6" />
        <h1 className="text-6xl font-black mb-3" style={{ color: "var(--text)" }}>404</h1>
        <p className="text-xl font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Story not found</p>
        <p className="text-sm mb-8" style={{ color: "var(--text-tertiary)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary text-sm px-6 py-2.5">Back to Homepage</Link>
      </div>
    </div>
  );
}
