"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from '@/app/assets/logo.png';
/* ─────────────────────────────────────────────
   Shared Waitlist Page — Gainday brand spec
───────────────────────────────────────────── */


type Variant = "candidates" | "employers";

interface WaitlistPageProps {
  variant: Variant;
}

const content = {
  candidates: {
    kicker: "For candidates",
    heading: "Show what you can do.",
    headingLight: "Not just what you've done.",
    sub: "Gainday is opening its first cohort for candidates. Join the waitlist and we'll be in touch when your side goes live.",
    bullets: [
      "Complete a role-based challenge as your application.",
      "Your capability score is what employers see first — your CV provides context.",
      "Get matched with employers who've seen your reasoning, not just your résumé.",
    ],
    inputLabel: "Your email address",
    inputPlaceholder: "you@example.com",
    submitLabel: "Join the candidate waitlist",
    successHeading: "You're on the list.",
    successSub: "We'll be in touch when the candidate side goes live. In the meantime, try the demo challenge.",
    successCta: "Try the demo challenge",
    successHref: "https://forms.gle/7FnnZRmJaFxBJeM38",
    sideKicker: "What to expect",
    sideItems: [
      { label: "Challenge length", value: "45 – 90 min" },
      { label: "Format", value: "Varied submissions" },
      { label: "Level", value: "Junior – Mid" },
      { label: "Better signal of capability", value: "More visibility to employers" },
    ],
    sideNote:
      "Challenges are built from real job requirements. Every submission is scored against structured, role-specific criteria — with human oversight throughout.",
  },
  employers: {
    kicker: "For employers",
    heading: "Stop guessing from CVs.",
    headingLight: "Start hiring from proof.",
    sub: "Gainday is opening its first employer cohort in the United Kingdom. Join the waitlist and we'll reach out when employer access opens.",
    bullets: [
      "Receive a ranked shortlist of candidates who've already demonstrated capability.",
      "Challenges are custom-built for your team and role — not generic assessments.",
      "Replace the CV black hole with structured, scored performance data.",
    ],
    inputLabel: "Work email address",
    inputPlaceholder: "you@company.com",
    submitLabel: "Join the employer waitlist",
    successHeading: "Request received.",
    successSub: "We'll be in touch shortly with next steps for employer access. In the meantime, you can try the demo as a candidate to see what your applicants experience.",
    successCta: "Try the candidate demo",
    successHref: "https://forms.gle/7FnnZRmJaFxBJeM38",
    sideKicker: "How it works for employers",
    sideItems: [
      { label: "Cohort size", value: "Limited — UK first" },
      { label: "Challenge type", value: "Role-specific" },
      { label: "Pricing", value: "Pay-per-unlock bundle / Subscription — early access rate" },
    ],
    sideNote:
      "Each challenge is reviewed by the Gainday team before going live. You'll receive a ranked candidate list with scored submissions — not another pile of applications.",
  },
} as const;

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistPage({ variant }: WaitlistPageProps) {
  const c = content[variant];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setStatus("loading");
    setErrorMsg("");
    // Simulate API call — replace with your actual endpoint
    await new Promise((r) => setTimeout(r, 1100));
    try {
      // await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email, variant }) })
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="gd-waitlist">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:     #FFFFFF;
          --ink:    #0A0A0A;
          --ink-2:  #2B2B2B;
          --ink-3:  #5A5A5A;
          --ink-4:  #8A8A8A;
          --line:   #E6E6E6;
          --line-2: #D0D0D0;
          --tint:   #F6F6F6;
          --tint-2: #F0F0F0;
          --r-btn:  7px;
          --r-card: 13px;
          --r-pill: 999px;
          --container: 1200px;
          --shadow-card: 0 1px 0 rgba(0,0,0,0.02), 0 24px 48px -24px rgba(0,0,0,0.18), 0 8px 16px -8px rgba(0,0,0,0.08);
        }

        ::selection { background: var(--ink); color: #fff; }

        .gd-waitlist {
          font-family: 'Raleway', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: var(--bg);
          color: var(--ink);
          line-height: 1.5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .wl-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
          height: 64px;
        }
        .wl-nav-inner {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 32px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .wl-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          color: var(--ink);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .wl-nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
          list-style: none;
        }
        .wl-nav-links a {
          text-decoration: none;
          color: var(--ink-3);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: color 0.15s;
        }
        .wl-nav-links a:hover { color: var(--ink); }
        .btn-nav {
          background: var(--ink);
          color: #fff;
          border: 1px solid var(--ink);
          padding: 10px 20px;
          border-radius: var(--r-btn);
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
          display: inline-block;
        }
        .btn-nav:hover { background: #222; }

        /* ── MAIN ── */
        .wl-main {
          flex: 1;
          max-width: var(--container);
          margin: 0 auto;
          padding: 80px 32px 96px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* Left col */
        .wl-kicker {
          display: inline-block;
          border: 1px solid var(--line-2);
          border-radius: var(--r-pill);
          padding: 6px 14px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-3);
          margin-bottom: 28px;
        }
        .wl-h1 {
          font-size: clamp(36px, 3.8vw, 52px);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 18px;
        }
        .wl-h1-light {
          font-weight: 300;
          color: var(--ink-2);
          display: block;
        }
        .wl-sub {
          font-size: 17px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.6;
          letter-spacing: -0.005em;
          margin-bottom: 36px;
          max-width: 460px;
        }
        .wl-bullets {
          list-style: none;
          margin-bottom: 0;
        }
        .wl-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          font-weight: 400;
          color: var(--ink-2);
          line-height: 1.6;
          padding: 9px 0;
          border-top: 1px solid var(--line);
        }
        .wl-bullets li:last-child { border-bottom: 1px solid var(--line); }
        .wl-dash { flex-shrink: 0; color: var(--ink-4); margin-top: 2px; font-size: 14px; }

        /* Right col — form card */
        .wl-card {
          border: 1px solid var(--line-2);
          border-radius: var(--r-card);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          position: sticky;
          top: 88px;
        }
        .wl-card-head {
          background: var(--tint);
          border-bottom: 1px solid var(--line);
          padding: 16px 24px;
        }
        .wl-card-head-label {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-4);
        }
        .wl-card-body { padding: 28px 24px; }

        /* Form elements */
        .form-group { margin-bottom: 20px; }
        .form-label {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-3);
          margin-bottom: 8px;
        }
        .form-input {
          width: 100%;
          border: 1px solid var(--line-2);
          border-radius: var(--r-btn);
          padding: 14px 16px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 400;
          color: var(--ink);
          background: var(--bg);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          -webkit-appearance: none;
        }
        .form-input::placeholder { color: var(--line-2); }
        .form-input:focus {
          border-color: var(--ink);
          box-shadow: 0 0 0 3px rgba(10,10,10,0.06);
        }
        .form-input.invalid { border-color: #c0392b; }

        .btn-submit {
          width: 100%;
          background: var(--ink);
          color: #fff;
          border: 1px solid var(--ink);
          padding: 15px 26px;
          border-radius: var(--r-btn);
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, opacity 0.2s;
          margin-top: 4px;
        }
        .btn-submit:hover:not(:disabled) { background: #222; }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-arrow { display: inline-block; transition: transform 0.2s; }
        .btn-submit:hover:not(:disabled) .btn-arrow { transform: translateX(3px); }

        .form-error {
          font-size: 13px;
          font-weight: 500;
          color: #c0392b;
          margin-top: 10px;
          text-align: center;
        }

        /* Spinner */
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Success state */
        .success-block {
          text-align: center;
          padding: 8px 0 4px;
        }
        .success-icon {
          width: 48px;
          height: 48px;
          background: var(--ink);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .success-h {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin-bottom: 10px;
        }
        .success-p {
          font-size: 14.5px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .btn-outline {
          background: transparent;
          color: var(--ink);
          border: 1px solid var(--ink);
          padding: 13px 22px;
          border-radius: var(--r-btn);
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s, color 0.2s;
        }
        .btn-outline:hover { background: var(--ink); color: #fff; }

        /* Side detail items */
        .side-detail {
          margin-top: 32px;
          border: 1px solid var(--line);
          border-radius: var(--r-card);
          overflow: hidden;
        }
        .side-detail-head {
          background: var(--tint);
          border-bottom: 1px solid var(--line);
          padding: 13px 20px;
        }
        .side-detail-label {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-4);
        }
        .side-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px 20px;
          border-bottom: 1px solid var(--line);
          font-size: 14px;
        }
        .side-row:last-child { border-bottom: none; }
        .side-row-key { font-weight: 500; color: var(--ink-3); }
        .side-row-val { font-weight: 700; color: var(--ink); letter-spacing: -0.01em; }
        .side-note {
          font-size: 13.5px;
          font-weight: 400;
          color: var(--ink-4);
          line-height: 1.65;
          margin-top: 20px;
          padding: 0 2px;
        }

        /* ── FOOTER ── */
        .wl-footer {
          border-top: 1px solid var(--line);
          padding: 28px 32px;
        }
        .wl-footer-inner {
          max-width: var(--container);
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-4);
        }
        .wl-footer a {
          color: var(--ink-3);
          text-decoration: none;
          transition: color 0.15s;
        }
        .wl-footer a:hover { color: var(--ink); }

        /* ── MOBILE ── */
        @media (max-width: 860px) {
          .wl-nav-links { display: none; }
          .wl-nav-inner { padding: 0 20px; }
          .wl-main {
            grid-template-columns: 1fr;
            padding: 48px 20px 72px;
            gap: 48px;
          }
          .wl-card { position: static; }
          .wl-footer { padding: 24px 20px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="wl-nav">
        <div className="wl-nav-inner">
          <Link href="/" className="wl-logo">
            <Image src={Logo} alt="Gainday" width={122} height={72} style={{ objectFit: "contain" }} />
          </Link>
          <ul className="wl-nav-links">
            <li><Link href="/#how-it-works">How it works</Link></li>
            <li><Link href="/#challenge">The challenge</Link></li>
            <li><Link href="/candidates">For candidates</Link></li>
            <li><Link href="/employers">For employers</Link></li>
          </ul>
          <a href="https://forms.gle/7FnnZRmJaFxBJeM38" target="_blank" rel="noopener noreferrer" className="btn-nav">Try a challenge</a>
        </div>
      </nav>

      {/* MAIN */}
      <main className="wl-main">
        {/* Left — copy */}
        <div>
          <span className="wl-kicker">{c.kicker}</span>
          <h1 className="wl-h1">
            {c.heading}
            <span className="wl-h1-light">{c.headingLight}</span>
          </h1>
          <p className="wl-sub">{c.sub}</p>
          <ul className="wl-bullets">
            {c.bullets.map((b) => (
              <li key={b}>
                <span className="wl-dash">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Detail panel */}
          <div className="side-detail">
            <div className="side-detail-head">
              <span className="side-detail-label">{c.sideKicker}</span>
            </div>
            {c.sideItems.map((item) => (
              <div key={item.label} className="side-row">
                <span className="side-row-key">{item.label}</span>
                <span className="side-row-val">{item.value}</span>
              </div>
            ))}
          </div>
          <p className="side-note">{c.sideNote}</p>
        </div>

        {/* Right — form card */}
        <div>
          <div className="wl-card">
            <div className="wl-card-head">
              <span className="wl-card-head-label">
                {status === "success" ? "Registered" : "Join the waitlist"}
              </span>
            </div>
            <div className="wl-card-body">
              {status === "success" ? (
                <div className="success-block">
                  <div className="success-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="success-h">{c.successHeading}</div>
                  <p className="success-p">{c.successSub}</p>
                  <Link href={c.successHref} className="btn-outline">
                    {c.successCta}
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label className="form-label" htmlFor="wl-email">
                      {c.inputLabel}
                    </label>
                    <input
                      id="wl-email"
                      type="email"
                      className={`form-input${email && !isValid ? " invalid" : ""}`}
                      placeholder={c.inputPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={!isValid || status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="spinner" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        {c.submitLabel}
                        <span className="btn-arrow">→</span>
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="form-error">{errorMsg}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="wl-footer">
        <div className="wl-footer-inner">
          <span>© 2026 Gainday Ltd. All rights reserved.</span>
          <span>
            <Link href="/">← Back to home</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}