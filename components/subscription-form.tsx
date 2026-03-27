"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, ShieldCheck } from "lucide-react";

const TOPIC_OPTIONS = [
  "Zero-Day Vulnerabilities",
  "Cloud Security Alerts",
  "Data Breaches & Leaks",
  "Malware & Ransomware Updates",
] as const;

export default function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleTopic = (topic: string) => {
    setSelectedTopics((current) =>
      current.includes(topic)
        ? current.filter((selected) => selected !== topic)
        : [...current, topic],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const webhookUrl =
      process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
      "https://your-n8n-railway-url.com/webhook/subscribe"; // Replace this placeholder with your real n8n webhook URL.

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          selectedTopics,
        }),
      });

      if (!response.ok) {
        throw new Error("Subscription request failed.");
      }

      setSuccessMessage("You are subscribed. Cyber alerts are now on watch for you.");
      setEmail("");
      setSelectedTopics([]);
    } catch {
      setErrorMessage("We could not subscribe you right now. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 shadow-[0_0_60px_-40px_rgba(34,211,238,0.65)] backdrop-blur-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden />
        <h2 className="text-xl font-semibold text-slate-100">Get Custom Alerts</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-200">
            Work Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-slate-600 bg-slate-950/70 px-4 py-3 text-slate-50 placeholder:text-slate-400 outline-none transition duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="mb-1 text-sm font-medium text-slate-200">
            Preferences (select one or more)
          </legend>
          {TOPIC_OPTIONS.map((topic) => {
            const isSelected = selectedTopics.includes(topic);

            return (
              <label
                key={topic}
                className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 transition hover:border-cyan-400/70 hover:bg-slate-900"
              >
                <span className="pr-3 text-sm text-slate-200">{topic}</span>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleTopic(topic)}
                  className="peer sr-only"
                />
                <span
                  className={`relative h-6 w-11 rounded-full transition ${
                    isSelected ? "bg-cyan-500" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                      isSelected ? "left-5" : "left-0.5"
                    }`}
                  />
                </span>
              </label>
            );
          })}
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:from-cyan-400 hover:to-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>

        {successMessage ? (
          <p className="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {successMessage}
          </p>
        ) : null}

        {errorMessage ? (
          <p className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {errorMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}
