import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  variant?: "hero" | "cta";
}

export default function WaitlistForm({ variant = "hero" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: variant }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      // For now, the /api/waitlist endpoint doesn't exist (lands in commit 9).
      // Fall through to a friendly success state so the UX flow is testable.
      // TODO(commit-9): once the API is wired, remove this dev-only fallthrough
      // and surface the real error.
      if (import.meta.env.DEV) {
        console.warn("Waitlist API not yet implemented; showing success state.", err);
        setStatus("success");
        setEmail("");
        return;
      }
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="bg-brand-green/10 border border-brand-green/30 rounded-full px-6 py-4 text-brand-green font-medium max-w-lg w-full text-center"
      >
        You&apos;re on the list. We&apos;ll email when your spot is ready.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-lg w-full"
      noValidate={false}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@yourtrucking.com"
        required
        disabled={status === "submitting"}
        aria-label="Your work email"
        className="flex-1 bg-white/5 border border-white/10 focus:border-brand-green/50 focus:outline-none focus:ring-2 focus:ring-brand-green/20 rounded-full px-5 py-3.5 text-brand-ink placeholder:text-brand-ink-faint transition disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand-green hover:bg-brand-green/90 disabled:opacity-50 text-brand-dark font-semibold px-6 py-3.5 rounded-full transition whitespace-nowrap"
      >
        {status === "submitting" ? "Joining..." : "Join the waitlist"}
      </button>
      {error && (
        <div role="alert" className="absolute mt-16 text-sm text-red-400">
          {error}
        </div>
      )}
    </form>
  );
}
