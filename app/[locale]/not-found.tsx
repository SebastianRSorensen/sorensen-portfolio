import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <p className="text-mono text-sm text-accent">404</p>
        <h1 className="text-display text-5xl md:text-7xl text-foreground">
          Page not found
        </h1>
        <p className="text-body text-muted-foreground max-w-md mx-auto">
          Sorry, this page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:bg-accent-hover transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
