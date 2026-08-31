import Link from 'next/link';

export default function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="glass-panel p-10 rounded-3xl max-w-lg w-full flex flex-col items-center">
        <h1 className="text-4xl font-serif font-bold text-[var(--text)] mb-4">Coming Soon</h1>
        <p className="text-[var(--text-secondary)] mb-8 text-lg leading-relaxed">
          We are currently building this feature. Check back soon as we roll out the new ACHIHI Media ecosystem.
        </p>
        <Link 
          href="/" 
          className="btn-primary"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
