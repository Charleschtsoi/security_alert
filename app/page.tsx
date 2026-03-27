import { BellRing, LockKeyhole, Radar, ShieldAlert } from "lucide-react";
import SubscriptionForm from "@/components/subscription-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_55%)] text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8 lg:py-16">
        <section className="space-y-5 text-center">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
              <ShieldAlert className="h-4 w-4" aria-hidden />
              Live Threat Intelligence Digest
            </div>
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Stay Ahead of Cyber Threats
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-300">
            Get customized security alerts delivered straight to your inbox so your
            team can react faster to high-impact vulnerabilities, breaches, and
            emerging malware campaigns.
          </p>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-3 pt-2 text-sm text-slate-200 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2">
              <Radar className="h-4 w-4 text-cyan-300" aria-hidden />
              Real-Time Monitoring
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2">
              <BellRing className="h-4 w-4 text-cyan-300" aria-hidden />
              Actionable Alerts
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2">
              <LockKeyhole className="h-4 w-4 text-cyan-300" aria-hidden />
              Privacy Focused
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-2xl">
          <SubscriptionForm />
        </div>
      </main>
      <p className="pointer-events-none fixed bottom-3 right-4 text-xs tracking-wide text-slate-500/80">
        created by CH Tsoi
      </p>
    </div>
  );
}
