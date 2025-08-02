"use client";

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 via-black to-zinc-800 text-white px-4">
      <div className="text-center max-w-xl space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold">🚀 Coming Soon</h1>
        <p className="text-gray-400 text-lg">
          We're working on something amazing. Stay tuned and be the first to
          know when we launch.
        </p>

        <p className="text-xs text-zinc-500 mt-4">
          We’ll notify you when we go live.
        </p>
      </div>
    </main>
  );
}
