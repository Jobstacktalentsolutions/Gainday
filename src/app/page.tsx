"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import  Logo  from "../assets/logo.png";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.8s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* Wordmark square icon */
function Mark({ size = 22, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <rect width="22" height="22" fill={dark ? "#fff" : "#0A0A0A"} />
      <rect x="5" y="5" width="12" height="12" fill={dark ? "#0A0A0A" : "#fff"} />
    </svg>
  );
}


/* ── PREVIEW FLOW COMPONENT ── */
type PreviewTab = "job" | "challenge" | "scorecard";

function PreviewFlow() {
  const [tab, setTab] = useState<PreviewTab>("job");
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");

  return (
    <div style={{ border: "1px solid var(--line-2)", borderRadius: "var(--r-card)", overflow: "hidden", boxShadow: "var(--shadow-card)", background: "var(--bg)" }}>

      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--line)", background: "var(--tint)" }}>
        {([
          { key: "job", label: "Job post" },
          { key: "challenge", label: "Challenge" },
          { key: "scorecard", label: "Score card" },
        ] as { key: PreviewTab; label: string }[]).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1, padding: "12px 8px", background: "none", border: "none",
              borderBottom: tab === t.key ? "2px solid var(--ink)" : "2px solid transparent",
              fontFamily: "inherit", fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.10em", textTransform: "uppercase",
              color: tab === t.key ? "var(--ink)" : "var(--ink-4)",
              cursor: "pointer", transition: "color 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Job post ── */}
      {tab === "job" && (
        <div style={{ padding: "22px 22px 24px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 10 }}>Example role</div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 4 }}>Finance Assistant</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-4)", marginBottom: 16 }}>Infrastructure firm · London · Junior</div>
          <div style={{ fontSize: 13.5, fontWeight: 400, color: "var(--ink-3)", lineHeight: 1.6, marginBottom: 16 }}>
            Support the delivery of major UK infrastructure projects by helping manage invoices, supplier payments, financial records, and project reporting.
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-3)", marginBottom: 8 }}>You&apos;ll work with project and finance teams to:</div>
          {["Process invoices and supplier records", "Resolve payment queries", "Support monthly financial reporting", "Maintain accurate timesheet and finance data", "Use Excel and finance systems to track project costs"].map((b) => (
            <div key={b} style={{ display: "flex", gap: 8, fontSize: 13, fontWeight: 400, color: "var(--ink-3)", lineHeight: 1.5, marginBottom: 5 }}>
              <span style={{ flexShrink: 0, color: "var(--ink-4)" }}>—</span><span>{b}</span>
            </div>
          ))}
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", margin: "16px 0 8px" }}>What they&apos;re looking for</div>
          {["Strong organisation and attention to detail", "Good Excel and data handling skills", "Clear communication and problem-solving"].map((b) => (
            <div key={b} style={{ display: "flex", gap: 8, fontSize: 13, fontWeight: 400, color: "var(--ink-3)", lineHeight: 1.5, marginBottom: 5 }}>
              <span style={{ flexShrink: 0, color: "var(--ink-4)" }}>—</span><span>{b}</span>
            </div>
          ))}
          <button
            onClick={() => setTab("challenge")}
            style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, background: "var(--ink)", color: "#fff", border: "none", borderRadius: "var(--r-btn)", padding: "11px 18px", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            See the challenge →
          </button>
        </div>
      )}

      {/* ── TAB: Challenge ── */}
      {tab === "challenge" && !submitted && (
        <div style={{ padding: "22px 22px 24px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 12 }}>The challenge</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-3)", marginBottom: 4 }}>Role: Junior Finance Analyst London Fintech Startup</div>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", margin: "14px 0 6px" }}>Your manager sends you this message:</div>
          <p style={{ fontSize: 13.5, fontWeight: 400, color: "var(--ink-2)", lineHeight: 1.65, fontStyle: "italic", marginBottom: 16, borderLeft: "3px solid var(--line-2)", paddingLeft: 12 }}>
            &quot;Hey I&apos;ve pulled last month&apos;s numbers quickly. Can you take a look and tell me: which figure looks wrong, why you think that, and what you&apos;d do next? Just a few sentences is fine.&quot;
          </p>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", marginBottom: 10 }}>Last month&apos;s snapshot:</div>
          <div style={{ border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
            {[
              { label: "Revenue", value: "£85,000", strong: false },
              { label: "Cost of goods sold", value: "£12,000", strong: false },
              { label: "Gross profit", value: "£61,000", strong: true },
              { label: "Operating expenses", value: "£18,000", strong: false },
              { label: "Net profit", value: "£43,000", strong: true },
            ].map((r, i, a) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderBottom: i < a.length - 1 ? "1px solid var(--line)" : "none", fontSize: 13.5, fontWeight: r.strong ? 700 : 500, color: r.strong ? "var(--ink)" : "var(--ink-2)", fontVariantNumeric: "tabular-nums" }}>
                <span>{r.label}</span><span>{r.value}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", marginBottom: 6 }}>Answer box:</div>
          <p style={{ fontSize: 13, color: "var(--ink-4)", fontStyle: "italic", marginBottom: 10 }}>What looks wrong, why, and what would you do next? Write in 3–5 sentences.</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            style={{ width: "100%", minHeight: 72, border: "1.5px dashed var(--line-2)", borderRadius: 7, background: "var(--tint)", padding: "11px 13px", fontFamily: "inherit", fontSize: 13.5, color: "var(--ink-2)", resize: "none", outline: "none", marginBottom: 14 }}
          />
          <button
            onClick={() => { if (answer.trim().length > 10) setSubmitted(true); }}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--ink)", color: "#fff", border: "none", borderRadius: "var(--r-btn)", padding: "12px 20px", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: answer.trim().length > 10 ? "pointer" : "not-allowed", opacity: answer.trim().length > 10 ? 1 : 0.45, transition: "opacity 0.15s" }}
          >
            See how you scored →
          </button>
        </div>
      )}

      {/* ── TAB: Challenge submitted state ── */}
      {tab === "challenge" && submitted && (
        <div style={{ padding: "22px 22px 24px", textAlign: "center" }}>
          <div style={{ width: 44, height: 44, background: "var(--ink)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Submitted.</div>
          <p style={{ fontSize: 13.5, color: "var(--ink-3)", marginBottom: 20 }}>In the real product, your submission is scored and added to your candidate profile.</p>
          <button onClick={() => setTab("scorecard")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--ink)", color: "#fff", border: "none", borderRadius: "var(--r-btn)", padding: "11px 18px", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            See your score card →
          </button>
        </div>
      )}

      {/* ── TAB: Score card ── */}
      {tab === "scorecard" && (
        <div style={{ padding: "22px 22px 24px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 4 }}>Candidate profile as seen by employer</div>
          <div style={{ fontSize: 12, fontWeight: 400, fontStyle: "italic", color: "var(--ink-4)", marginBottom: 14 }}>Name and contact details hidden until unlocked</div>

          {/* Meta row */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            {[
              { label: "Field", value: "Finance" },
              { label: "Challenges", value: "3" },
              { label: "Capability", value: "Top 18%" },
            ].map((m) => (
              <div key={m.label} style={{ border: "1px solid var(--line)", borderRadius: 7, padding: "9px 13px", flex: 1, minWidth: 70 }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 3 }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{m.value}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: "var(--ink-3)", fontStyle: "italic", marginBottom: 16, lineHeight: 1.55 }}>
            This candidate outperformed 82% of everyone who has attempted this challenge type.
          </div>

          {/* Score breakdown */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--ink)", marginBottom: 10 }}>Score breakdown</div>
          {[
            { dim: "Task Accuracy", score: 23, max: 25 },
            { dim: "Reasoning Quality", score: 21, max: 25 },
            { dim: "Communication", score: 22, max: 25 },
            { dim: "Originality", score: 19, max: 25 },
          ].map((r) => (
            <div key={r.dim} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 500, color: "var(--ink-2)", marginBottom: 4 }}>
                <span>{r.dim}</span>
                <span style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{r.score}/{r.max}</span>
              </div>
              <div style={{ height: 4, background: "var(--line)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--ink)", borderRadius: 2, width: `${(r.score / r.max) * 100}%` }} />
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 10, marginTop: 4, marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Total</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>85 / 100</span>
          </div>

          {/* Score trajectory */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--ink)", marginBottom: 8 }}>Score trajectory</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            {[
              { label: "Challenge 1", value: "Top 45%" },
              { label: "Challenge 2", value: "Top 31%" },
              { label: "Challenge 3", value: "Top 18% ↑" },
            ].map((t) => (
              <div key={t.label} style={{ flex: 1, border: "1px solid var(--line)", borderRadius: 6, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 9.5, fontWeight: 600, color: "var(--ink-4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{t.label}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{t.value}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-4)", fontStyle: "italic", marginBottom: 14 }}>Consistent improvement across 3 challenges.</div>

          {/* Submission preview */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--ink)", marginBottom: 8 }}>Submission preview</div>
          <div style={{ background: "var(--tint)", border: "1px solid var(--line)", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.65, fontStyle: "italic", marginBottom: 16 }}>
            &quot;The gross profit figure looks incorrect revenue of £85,000 minus COGS of £12,000 should give £73,000, not £61,000. This suggests either a data entry error or an unrecorded cost of around £12,000. I&apos;d flag this to the finance manager immediately and cross-check against the raw transaction data before month-end reporting.&quot;
          </div>

          {/* Unlock CTA */}
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Unlock full profile</div>
              <div style={{ fontSize: 12, color: "var(--ink-4)" }}>Contact details, CV, full submission</div>
            </div>
            <button style={{ background: "var(--ink)", color: "#fff", border: "none", borderRadius: "var(--r-btn)", padding: "10px 16px", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              £50 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GaindayLanding() {
  const [answer, setAnswer] = useState("");

  return (
    <div className="gd">
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
          --shadow-card: 0 1px 0 rgba(0,0,0,0.02), 0 24px 48px -24px rgba(0,0,0,0.18), 0 8px 16px -8px rgba(0,0,0,0.08);
          --shadow-hover: 0 12px 30px -16px rgba(0,0,0,0.12), 0 24px 50px -28px rgba(0,0,0,0.2);
          --shadow-float: 0 6px 16px -6px rgba(0,0,0,0.4);
          --r-btn: 7px;
          --r-card: 13px;
          --r-pill: 999px;
          --container: 1200px;
        }

        ::selection { background: var(--ink); color: #fff; }

        .gd {
          font-family: 'Raleway', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: var(--bg);
          color: var(--ink);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        /* ── CONTAINER ── */
        .container {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ── NAV ── */
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
          height: 64px;
        }
        .nav-inner {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 32px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
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
        .nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
          list-style: none;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--ink-3);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: color 0.15s;
        }
        .nav-links a:hover { color: var(--ink); }

        /* ── BUTTONS ── */
        .btn-primary {
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
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .btn-primary:hover { background: #222; }
        .btn-primary:hover .btn-arrow { transform: translateX(3px); }
        .btn-arrow { display: inline-block; transition: transform 0.2s; }

        .btn-outline {
          background: transparent;
          color: var(--ink);
          border: 1px solid var(--ink);
          padding: 15px 26px;
          border-radius: var(--r-btn);
          font-family: inherit;
          font-size: 14.5px;
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
        }
        .btn-nav:hover { background: #222; }

        /* ── KICKER / PILL ── */
        .kicker {
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
          line-height: 1;
        }
        .kicker-sm {
          display: inline-block;
          border: 1px solid var(--line-2);
          border-radius: var(--r-pill);
          padding: 5px 12px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-3);
          margin-bottom: 20px;
          line-height: 1;
        }

        /* ── HERO ── */
        .hero {
          padding: 96px 0 104px;
        }
        .hero-inner {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--line-2);
          border-radius: var(--r-pill);
          padding: 6px 14px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-3);
          margin-bottom: 32px;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          background: var(--ink);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .hero-h1 {
          font-size: clamp(44px, 5.5vw, 72px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          color: var(--ink);
        }
        .hero-h1-light {
          font-weight: 300;
          color: var(--ink-2);
          display: block;
        }
        .hero-lede {
          font-size: 18.5px;
          font-weight: 400;
          color: var(--ink-3);
          letter-spacing: -0.005em;
          line-height: 1.55;
          max-width: 430px;
          margin-bottom: 36px;
        }
        .hero-lede strong { font-weight: 600; color: var(--ink-2); }
        .hero-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .hero-actions a {
          flex: 1;
          justify-content: center;
          min-width: 200px;
        }
        .hero-actions a {
          flex: 1;
          min-width: 160px;
          justify-content: center;
          text-align: center;
        }
        .hero-proof {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
        }
        .proof-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-3);
          letter-spacing: 0.005em;
        }
        .proof-check {
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--ink);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .proof-check svg { display: block; }

        /* Hero P&L card */
        .hero-card {
          border: 1px solid var(--line-2);
          border-radius: var(--r-card);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          background: var(--bg);
        }
        .card-head {
          background: var(--tint);
          border-bottom: 1px solid var(--line);
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-head-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-4);
        }
        .flag-tag {
          background: var(--ink);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 4px;
          box-shadow: var(--shadow-float);
        }
        .card-body { padding: 24px 22px; }
        .pnl-title {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 3px;
        }
        .pnl-period {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-4);
          margin-bottom: 20px;
        }
        .pnl-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 11px 0;
          border-bottom: 1px solid var(--tint-2);
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-2);
          font-variant-numeric: tabular-nums;
        }
        .pnl-row:last-child { border-bottom: none; }
        .pnl-row.strong { font-weight: 700; color: var(--ink); }
        .pnl-row.flag-row { position: relative; }
        .pnl-flag {
          position: absolute;
          right: -22px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--ink);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 3px 7px;
          border-radius: 3px;
        }
        .card-foot {
          background: var(--tint);
          border-top: 1px solid var(--line);
          padding: 12px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-foot-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-4);
        }

        /* ── TICKER ── */
        .ticker {
          background: var(--tint);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 15px 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          overflow: hidden;
        }
        .ticker-label {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-4);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ticker-items {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
        }
        .ticker-item {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--ink-3);
        }
        .ticker-sep { color: var(--line-2); font-size: 10px; }

        /* ── SECTION DEFAULTS ── */
        .section-pad { padding: 96px 0; }
        .section-pad-sm { padding: 88px 0; }

        .section-heading {
          font-size: clamp(36px, 3.8vw, 52px);
          font-weight: 700;
          line-height: 1.07;
          letter-spacing: -0.025em;
          color: var(--ink);
          text-align: center;
          margin-bottom: 16px;
        }
        .section-heading-light {
          font-weight: 300;
          color: var(--ink-2);
        }
        .section-sub {
          font-size: 16.5px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.6;
          text-align: center;
          max-width: 580px;
          margin: 0 auto 56px;
        }

        /* ── FEATURE CARDS ── */
        .cards-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          align-items: stretch;
        }
        .cards-3 > div { height: 100%; }
        .feat-card {
          border: 1px solid var(--line);
          border-radius: var(--r-card);
          padding: 32px;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .feat-desc {
          flex: 1;
        }
        .feat-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-3px);
        }
        .feat-icon {
          width: 44px;
          height: 44px;
          border: 1px solid var(--line-2);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink-2);
          margin-bottom: 22px;
        }
        .feat-title {
          font-size: 15.5px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin-bottom: 10px;
        }
        .feat-desc {
          font-size: 14.5px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.6;
        }

        /* Blockquote callout */
        .callout {
          border-left: 3px solid var(--ink);
          padding: 22px 32px;
          background: var(--tint);
          border-radius: 0 10px 10px 0;
          margin: 48px 0 0 0;
        }
        .callout p {
          font-size: 16px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.65;
          letter-spacing: -0.005em;
        }

        /* ── CHALLENGE BAND ── */
        .band {
          background: var(--tint);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .band-inner {
          max-width: var(--container);
          margin: 0 auto;
          padding: 96px 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
        }
        .band-h2 {
          font-size: clamp(34px, 3.2vw, 48px);
          font-weight: 700;
          line-height: 1.07;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .band-h2-light {
          font-weight: 300;
          color: var(--ink-2);
          display: block;
        }
        .band-desc {
          font-size: 15.5px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.65;
          margin-bottom: 32px;
        }
        .meta-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 32px;
          align-items: stretch;
        }
        .meta-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .meta-box {
          border: 1px solid var(--line);
          border-radius: var(--r-btn);
          padding: 16px 20px;
          background: var(--bg);
        }
        .meta-lbl {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-4);
          margin-bottom: 7px;
        }
        .meta-val {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .form-note {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink-4);
          margin-top: 12px;
          letter-spacing: 0.005em;
        }

        /* Memo card */
        .memo-card {
          background: var(--bg);
          border: 1px solid var(--line-2);
          border-radius: var(--r-card);
          overflow: hidden;
          box-shadow: var(--shadow-card);
        }
        .memo-head {
          background: var(--tint);
          border-bottom: 1px solid var(--line);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .avatar {
          width: 32px;
          height: 32px;
          background: var(--ink);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .memo-from {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.005em;
        }
        .memo-time {
          font-size: 12.5px;
          font-weight: 400;
          color: var(--ink-4);
          margin-left: 3px;
        }
        .memo-tag-label {
          margin-left: auto;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-4);
        }
        .memo-body { padding: 22px 22px; }
        .memo-from-lbl {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-4);
          margin-bottom: 12px;
        }
        .memo-body p {
          font-size: 14.5px;
          font-weight: 400;
          color: var(--ink-2);
          line-height: 1.65;
          margin-bottom: 18px;
        }
        .memo-body p strong { font-weight: 600; color: var(--ink); }
        .memo-divider { border: none; border-top: 1px solid var(--line); margin: 16px 0; }
        .task-label {
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .task-desc {
          font-size: 14px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .answer-box {
          width: 100%;
          min-height: 80px;
          border: 1.5px dashed var(--line-2);
          border-radius: 7px;
          background: var(--tint);
          padding: 13px 15px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 400;
          color: var(--ink-2);
          resize: none;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
          line-height: 1.55;
        }
        .answer-box::placeholder { color: var(--line-2); }
        .answer-box:focus { border-color: var(--ink-4); background: var(--bg); }


        /* ── DEEP DIVE SECTIONS ── */
        .deep-section {
          padding: 96px 0;
          border-top: 1px solid var(--line);
        }
        .deep-section.dark-bg {
          background: var(--ink);
          border-top: none;
        }
        .deep-inner {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .deep-h2 {
          font-size: clamp(32px, 3vw, 46px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .deep-section.dark-bg .deep-h2 { color: #fff; }
        .deep-lede {
          font-size: 17px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.65;
          margin-bottom: 32px;
          max-width: 480px;
        }
        .deep-section.dark-bg .deep-lede { color: rgba(255,255,255,0.65); }
        .deep-body {
          font-size: 15.5px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 480px;
        }
        .deep-section.dark-bg .deep-body { color: rgba(255,255,255,0.6); }
        .deep-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          color: var(--ink);
          border: 1px solid var(--ink);
          padding: 14px 24px;
          border-radius: var(--r-btn);
          transition: background 0.2s, color 0.2s;
        }
        .deep-cta:hover { background: var(--ink); color: #fff; }
        .deep-section.dark-bg .deep-cta {
          color: #fff;
          border-color: rgba(255,255,255,0.25);
        }
        .deep-section.dark-bg .deep-cta:hover {
          background: #fff;
          color: var(--ink);
          border-color: #fff;
        }
        .deep-cta:hover .btn-arrow { transform: translateX(3px); }

        /* Right side stat / proof panel */
        .proof-panel {
          border: 1px solid var(--line);
          border-radius: var(--r-card);
          overflow: hidden;
          background: var(--bg);
          box-shadow: var(--shadow-card);
        }
        .deep-section.dark-bg .proof-panel {
          border-color: var(--line);
          background: #fff;
        }
        .proof-panel-head {
          background: var(--tint);
          border-bottom: 1px solid var(--line);
          padding: 13px 22px;
        }
        .deep-section.dark-bg .proof-panel-head {
          background: var(--tint);
          border-color: var(--line);
        }
        .proof-panel-label {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-4);
        }
        .deep-section.dark-bg .proof-panel-label { color: var(--ink-4); }
        .proof-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 22px;
          border-bottom: 1px solid var(--line);
        }
        .proof-row:last-child { border-bottom: none; }
        .deep-section.dark-bg .proof-row { border-color: var(--line); }
        .proof-num {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--ink);
          line-height: 1;
          flex-shrink: 0;
          min-width: 48px;
        }
        .deep-section.dark-bg .proof-num { color: var(--ink); }
        .proof-row-copy {}
        .proof-row-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 3px;
          letter-spacing: -0.005em;
        }
        .deep-section.dark-bg .proof-row-title { color: var(--ink); }
        .proof-row-desc {
          font-size: 13px;
          font-weight: 400;
          color: var(--ink-4);
          line-height: 1.5;
        }
        .deep-section.dark-bg .proof-row-desc { color: var(--ink-4); }

        @media (max-width: 900px) {
          .deep-inner { grid-template-columns: 1fr; padding: 0 20px; gap: 40px; }
          .deep-section { padding: 64px 0; }
        }

        /* ── AUDIENCE SPLIT ── */
        .audience-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }
        .audience-grid > div { height: 100%; }
        .aud-card {
          border: 1px solid var(--line);
          border-radius: var(--r-card);
          padding: 36px 36px 28px;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .aud-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-3px);
        }
        .aud-card.dark {
          background: var(--ink);
          border-color: var(--ink);
          color: #fff;
        }
        .aud-h3 {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .aud-card:not(.dark) .aud-h3 { color: var(--ink); }
        .aud-card.dark .aud-h3 { color: rgba(255,255,255,1); }
        .aud-desc {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .aud-card:not(.dark) .aud-desc { color: var(--ink-3); }
        .aud-card.dark .aud-desc { color: rgba(255,255,255,0.75); }
        .aud-list {
          list-style: none;
          margin-bottom: 32px;
          flex: 1;
        }
        .aud-list li {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          font-size: 14.5px;
          font-weight: 400;
          line-height: 1.55;
          padding: 7px 0;
        }
        .aud-card:not(.dark) .aud-list li { color: var(--ink-2); }
        .aud-card.dark .aud-list li { color: rgba(255,255,255,0.85); }
        .aud-dash { flex-shrink: 0; margin-top: 1px; }
        .aud-card:not(.dark) .aud-dash { color: var(--ink-4); }
        .aud-card.dark .aud-dash { color: rgba(255,255,255,0.4); }
        .aud-footer {
          border-top: 1px solid var(--line);
          margin-top: auto;
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .aud-card.dark .aud-footer { border-color: rgba(255,255,255,0.12); }
        .aud-cta-link {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          min-width: 0;
          flex: 1;
        }
        .aud-card:not(.dark) .aud-cta-link { color: var(--ink-3); }
        .aud-card.dark .aud-cta-link { color: rgba(255,255,255,0.6); }
        .circle-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--line-2);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .circle-btn:hover { background: var(--ink); color: #fff; border-color: var(--ink); }
        .aud-card:not(.dark) .circle-btn { color: var(--ink); }
        .aud-card.dark .circle-btn { border-color: rgba(255,255,255,0.25); color: #fff; }
        .aud-card.dark .circle-btn:hover { background: #fff; color: var(--ink); border-color: #fff; }

        /* ── FAQ ── */
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 44px 72px;
          max-width: 900px;
          margin: 0 auto;
        }
        .faq-grid > div:last-child:nth-child(odd) {
          grid-column: 1 / -1;
          max-width: calc(50% - 36px);
        }
        .faq-q {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.005em;
          color: var(--ink);
          margin-bottom: 10px;
        }
        .faq-a {
          font-size: 14.5px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.65;
        }

        /* ── CTA DARK BAND ── */
        .cta-band {
          background: var(--ink);
          padding: 96px 0;
        }
        .cta-inner {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .cta-h2 {
          font-size: clamp(34px, 3.2vw, 52px);
          font-weight: 700;
          line-height: 1.07;
          letter-spacing: -0.025em;
          color: #fff;
          margin-bottom: 20px;
        }
        .cta-h2-light {
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          display: block;
        }
        .cta-desc {
          font-size: 15px;
          font-weight: 400;
          color: rgba(255,255,255,0.85);
          line-height: 1.65;
          margin-bottom: 20px;
        }
        .cta-desc strong { color: #fff; font-weight: 600; }
        .cta-eyebrow {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .cta-btns { display: flex; flex-direction: column; gap: 10px; width: 100%; }
        .cta-row-btn { width: 100%; }
        .cta-row-btn {
          background: #fff;
          color: var(--ink);
          border: 1px solid #fff;
          border-radius: var(--r-btn);
          padding: 18px 22px;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .cta-row-btn:hover {
          background: var(--tint-2);
          border-color: var(--tint-2);
          color: var(--ink);
        }
        .cta-row-btn:hover .btn-arrow { transform: translateX(4px); }

        /* ── FOOTER ── */
        .footer { padding: 68px 0 32px; border-top: 1px solid var(--line); }
        .footer-inner {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 32px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .footer-desc {
          font-size: 14px;
          font-weight: 400;
          color: var(--ink-3);
          line-height: 1.65;
          margin-top: 14px;
          max-width: 240px;
        }
        .footer-col-title {
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 18px;
        }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 11px; }
        .footer-links a {
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          color: var(--ink-3);
          transition: color 0.15s;
        }
        .footer-links a:hover { color: var(--ink); }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid var(--line);
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-4);
        }

        /* ── MOBILE ── */
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .nav-inner { padding: 0 20px; }
          .hero-inner { grid-template-columns: 1fr; padding: 0 20px; gap: 40px; }
          .hero { padding: 64px 0 72px; }
          .band-inner { grid-template-columns: 1fr; padding: 64px 20px; gap: 40px; }
          .cta-inner { grid-template-columns: 1fr; padding: 0 20px; }
          .cta-band { padding: 64px 0; }
          .cards-3 { grid-template-columns: 1fr; }
          .audience-grid { grid-template-columns: 1fr; }
          .faq-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
          .container { padding: 0 20px; }
          .section-pad { padding: 64px 0; }
          .section-pad-sm { padding: 64px 0; }
          .ticker { padding: 14px 20px; flex-wrap: wrap; gap: 12px; }
          .footer-inner { padding: 0 20px; }
          .callout { margin: 32px 0 0; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <Image src={Logo} alt="Gainday" width={65} height={3} style={{ objectFit: "contain" }} />
          </a>
          <ul className="nav-links">
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#challenge">The challenge</a></li>
            <li><Link href="/candidates">For candidates</Link></li>
            <li><Link href="/employers">For employers</Link></li>
          </ul>
          <a href="https://forms.gle/7FnnZRmJaFxBJeM38" target="_blank" rel="noopener noreferrer" className="btn-nav">Try a challenge</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <FadeUp delay={0}>
            <div className="hero-badge">
              <span className="badge-dot" />
              Now in early access · London
            </div>
            <h1 className="hero-h1">
              Your CV tells your story.
              <span className="hero-h1-light">Gainday proves your ability.</span>
            </h1>
            <p className="hero-lede">
              Show employers what you can actually do through{" "}
              <strong>role-based challenges</strong> built for real hiring.
            </p>
            <div className="hero-actions">
              <a href="https://forms.gle/7FnnZRmJaFxBJeM38" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Try a challenge (Demo)
                <span className="btn-arrow">→</span>
              </a>
              <Link href="/employers" className="btn-outline">For employers</Link>
            </div>
            <div className="hero-proof">
              {["Real tasks", "Role-based", "Proof, not paper"].map((t) => (
                <span key={t} className="proof-item">
                  <span className="proof-check">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="hero-card">
              <div className="card-head">
                <span className="card-head-label">Demo of challenge</span>
                <span className="flag-tag">Spot what&apos;s off →</span>
              </div>
              <div className="card-body">
                <div className="pnl-title">Profit &amp; Loss</div>
                <div className="pnl-period">Month 04 · FY26</div>
                {[
                  { label: "Revenue", val: "£85,000", strong: false, flag: false },
                  { label: "Cost of goods sold", val: "£12,000", strong: false, flag: true },
                  { label: "Gross profit", val: "£61,000", strong: true, flag: false },
                  { label: "Operating expenses", val: "£18,000", strong: false, flag: false },
                  { label: "Net profit", val: "£43,000", strong: true, flag: false },
                ].map((r) => (
                  <div
                    key={r.label}
                    className={`pnl-row${r.strong ? " strong" : ""}${r.flag ? " flag-row" : ""}`}
                    style={{ position: "relative" }}
                  >
                    <span>{r.label}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {r.val}
                      {r.flag && (
                        <span
                          style={{
                            background: "var(--ink)",
                            color: "#fff",
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            padding: "2px 6px",
                            borderRadius: 3,
                          }}
                        >
                          F
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <div className="card-foot">
                <span className="card-foot-label">Junior finance challenge</span>
                <span className="card-foot-label">Short answer</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <span className="ticker-label">Built with input from</span>
        <div className="ticker-items">
          {["Hiring managers", "Founders", "Recent grads", "Early-career candidates"].map((t, i, a) => (
            <>
              <span key={t} className="ticker-item">{t}</span>
              {i < a.length - 1 && <span key={t + "-sep"} className="ticker-sep">·</span>}
            </>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="section-pad" id="how-it-works">
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center" }}>
              <span className="kicker">How it works</span>
            </div>
            <h2 className="section-heading">
              The CV process is broken.<br />
              <span className="section-heading-light">Here&apos;s what replaces it.</span>
            </h2>
            <p className="section-sub">
              When every CV looks polished, how do you know who can actually do the job? Too many applications. Too little proof. Gainday helps candidates demonstrate capability and helps employers identify it faster.
            </p>
          </FadeUp>
          <div className="cards-3">
            {[
              {
                icon: (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                ),
                title: "Real work, not keyword matching",
                desc: "Candidates complete a role-based challenge built from actual job tasks. Not a quiz, not a keyword filter.",
                delay: 0,
              },
              {
                icon: (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                ),
                title: "Built for signal, not busywork",
                desc: "Timed well enough to be fair and deep enough to reveal capability.",
                delay: 80,
              },
              {
                icon: (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                ),
                title: "Capability first. Context second.",
                desc: "Employers see demonstrated performance first then use CVs and background as supporting context.",
                delay: 160,
              },
            ].map((c) => (
              <FadeUp key={c.title} delay={c.delay}>
                <div className="feat-card">
                  <div className="feat-icon">{c.icon}</div>
                  <div className="feat-title">{c.title}</div>
                  <p className="feat-desc">{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={80}>
            <div className="callout">
              <p>
                Most early-career hiring still relies on CVs, keywords, and luck. Gainday replaces that with proof: candidates complete a role-specific challenge as their application, performance is scored, and employers see a ranked list of people who&apos;ve already shown they can do the work.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CHALLENGE BAND ── */}
      <section className="band" id="challenge">
        <div className="band-inner">
          <FadeUp delay={0}>
            <span className="kicker-sm">Reduce bias. Increase signal.</span>
            <h2 className="band-h2">
              See what hiring feels like when proof comes first.
              <span className="band-h2-light">Try the 3-minute challenge.</span>
            </h2>
            <p className="band-desc">
              You&apos;ve just joined a small London startup as a junior finance assistant. Your manager pings you the numbers and asks you what you think. You have a blank box and a few minutes show, on the record, how you think.
            </p>
            <div className="meta-pair">
              <div className="meta-box">
                <div className="meta-lbl">Format</div>
                <div className="meta-val">Short answer</div>
              </div>
              <div className="meta-box">
                <div className="meta-lbl">Level</div>
                <div className="meta-val">Junior</div>
              </div>
            </div>
            <a href="https://forms.gle/7FnnZRmJaFxBJeM38" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "inline-flex" }}>
              Start the challenge
              <span className="btn-arrow">→</span>
            </a>
            <p className="form-note">Opens in a Google Form. No sign-up required.</p>
          </FadeUp>

          <FadeUp delay={140}>
            <PreviewFlow />
          </FadeUp>
        </div>
      </section>


      {/* ── CANDIDATE DEEP DIVE ── */}
      <section className="deep-section" id="for-candidates">
        <div className="deep-inner">
          <FadeUp delay={0}>
            <span className="kicker-sm">For candidates</span>
            <h2 className="deep-h2">Skip the CV black hole.<br />Show employers what you can actually do.</h2>
            <p className="deep-lede">
              Your CV can only describe what you&apos;ve done. It can&apos;t show what you&apos;re capable of right now.
            </p>
            <p className="deep-body">
              In a pile of hundreds of AI-polished applications, yours gets lost before a human reads it. Gainday gives you a way to prove your thinking directly through a real task, scored fairly, seen by employers who are actually hiring.
            </p>
            <p className="deep-body" style={{ marginBottom: 32 }}>
              Get matched with employers who&apos;ve already seen what you can do.
            </p>
            <Link href="/candidates" className="deep-cta">
              Join the candidate waitlist
              <span className="btn-arrow">→</span>
            </Link>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="proof-panel">
              <div className="proof-panel-head">
                <span className="proof-panel-label">Why it works for candidates</span>
              </div>
              {[
                { num: "01", title: "Prove thinking, not tenure", desc: "A real task shows more in 60 minutes than a CV shows in 60 seconds." },
                { num: "02", title: "Fair scoring, not gut feel", desc: "Every submission is assessed against the same structured criteria. No interviewer bias on step one." },
                { num: "03", title: "Seen before you're screened out", desc: "Employers see your capability score before they see your name or university." },
                { num: "04", title: "Matched, not mass-applied", desc: "You reach employers who are actively hiring for your challenge type not spray-and-pray." },
              ].map((r) => (
                <div key={r.num} className="proof-row">
                  <span className="proof-num">{r.num}</span>
                  <div className="proof-row-copy">
                    <div className="proof-row-title">{r.title}</div>
                    <div className="proof-row-desc">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── EMPLOYER DEEP DIVE ── */}
      <section className="deep-section dark-bg" id="for-employers">
        <div className="deep-inner">
          <FadeUp delay={0}>
            <span className="kicker-sm" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.45)" }}>For employers</span>
            <h2 className="deep-h2">Stop guessing.<br />Start seeing.</h2>
            <p className="deep-lede">
              Every candidate on Gainday has completed a real task relevant to your role.
            </p>
            <p className="deep-body">
              You get a ranked shortlist with capability scores not a pile of CVs to wade through. You see their reasoning before you spend a penny.
            </p>
            <Link href="/employers" className="deep-cta">
              Join the employer waitlist
              <span className="btn-arrow">→</span>
            </Link>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="proof-panel">
              <div className="proof-panel-head">
                <span className="proof-panel-label">What you get</span>
              </div>
              {[
                { num: "01", title: "Ranked shortlist, not a pile", desc: "Candidates arrive pre-scored. You open the list, not the inbox." },
                { num: "02", title: "Role-specific challenges", desc: "Every challenge is built from actual job requirements not generic aptitude tests." },
                { num: "03", title: "See reasoning before you commit", desc: "Read how each candidate thinks before you schedule a single call." },
                { num: "04", title: "Structured scoring, human oversight", desc: "AI-assisted scoring with human review built in consistent, defensible, fast." },
              ].map((r) => (
                <div key={r.num} className="proof-row">
                  <span className="proof-num">{r.num}</span>
                  <div className="proof-row-copy">
                    <div className="proof-row-title">{r.title}</div>
                    <div className="proof-row-desc">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── AUDIENCE SPLIT ── */}
      <section className="section-pad" id="candidates">
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center" }}>
              <span className="kicker">Get on the list</span>
            </div>
            <h2 className="section-heading">Which side are you on?</h2>
            <p className="section-sub">
              Gainday is opening its first cohort. Tell us where you sit and we&apos;ll be in touch when your side goes live.
            </p>
          </FadeUp>
          <div className="audience-grid" style={{ alignItems: "stretch" }}>
            <FadeUp delay={0}>
              <div className="aud-card">
                <span className="kicker-sm">For candidates</span>
                <h3 className="aud-h3">I&apos;m a candidate.</h3>
                <p className="aud-desc">
                  Skip the CV black hole. Show employers what you can actually do through real-world challenges that reveal how you think.
                </p>
                <ul className="aud-list">
                  <li>
                    <span className="aud-dash">—</span>
                    <span>Your CV provides context. Your capability score is your actual application.</span>
                  </li>
                  <li>
                    <span className="aud-dash">—</span>
                    <span>Get matched with employers who&apos;ve seen your reasoning, not just your résumé.</span>
                  </li>
                </ul>
                <div className="aud-footer">
                  <Link href="/candidates" className="aud-cta-link">Join the candidate waitlist</Link>
                  <button className="circle-btn">
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <div className="aud-card dark" id="employers">
                <span className="kicker-sm" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>For employers</span>
                <h3 className="aud-h3">Stop guessing from CVs.<br />Start hiring from proof.</h3>
                <p className="aud-desc">
                  See ranked candidates based on demonstrated capability not formatting, buzzwords, or confidence theatre.
                </p>
                <ul className="aud-list">
                  <li>
                    <span className="aud-dash">—</span>
                    <span>From applicant overload to proven shortlist.</span>
                  </li>
                  <li>
                    <span className="aud-dash">—</span>
                    <span>Custom challenges for your team and role.</span>
                  </li>
                  <li>
                    <span className="aud-dash">—</span>
                    <span>Ranked candidates based on demonstrated capability, not just CV polish.</span>
                  </li>
                </ul>
                <div className="aud-footer">
                  <Link href="/employers" className="aud-cta-link">Join the employer waitlist</Link>
                  <button className="circle-btn">
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-pad-sm" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center" }}>
              <span className="kicker">Common questions</span>
            </div>
            <h2 className="section-heading" style={{ marginBottom: 56 }}>Good to know.</h2>
          </FadeUp>
          <div className="faq-grid">
            {[
              {
                q: "Do I need a CV?",
                a: "Yes. Your CV provides context. Your challenge demonstrates capability and is the first thing employers see.",
              },
              {
                q: "Who creates the challenges?",
                a: "Challenges are built from real job requirements and tailored to each role. AI assists with generation and scale; every challenge is reviewed by humans to ensure relevance and quality.",
              },
              {
                q: "How are candidates scored?",
                a: "Each submission is assessed against structured, role-specific criteria with human oversight built in to ensure quality and fairness.",
              },
            ].map((f, i) => (
              <FadeUp key={f.q} delay={i * 60}>
                <div>
                  <div className="faq-q">{f.q}</div>
                  <p className="faq-a">{f.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA DARK BAND ── */}
      <section className="cta-band">
        <div className="cta-inner">
          <FadeUp delay={0}>
            <h2 className="cta-h2">
              Built for proof,
              <span className="cta-h2-light">not paper.</span>
            </h2>
            <p className="cta-desc font-medium">
              Show employers what you can actually do not just what your CV says you&apos;ve done. Try the live challenge and get on the waitlist for what&apos;s next.
            </p>
            <p className="cta-eyebrow">Preview the future of hiring.</p>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="cta-btns">
              {[
                { label: "Try a challenge (Demo)", href: "https://forms.gle/7FnnZRmJaFxBJeM38" },
                { label: "Join candidate waitlist", href: "/candidates" },
                { label: "Join employer waitlist", href: "/employers" },
              ].map((b) => (
                <a key={b.label} href={b.href} className="cta-row-btn">
                  {b.label}
                  <span className="btn-arrow">→</span>
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <a href="#" className="nav-logo" style={{ textDecoration: "none" }}>
                <Image src={Logo} alt="Gainday" width={60} height={60} style={{ objectFit: "contain" }} />
              </a>
              <p className="footer-desc">
                Built for proof, not paper. Show employers what you can actually do not just what your CV says you&apos;ve done. London, 2026.
              </p>
            </div>
            <div>
              <div className="footer-col-title">Product</div>
              <ul className="footer-links">
                {[
                  { label: "How it works", href: "#how-it-works" },
                  { label: "Try a challenge", href: "#challenge" },
                  { label: "For candidates", href: "/candidates" },
                  { label: "For employers", href: "/employers" },
                ].map((l) => (
                  <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {["About", "Manifesto", "Careers", "Contact"].map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Get in touch</div>
              <ul className="footer-links">
                <li><a href="mailto:hello@gainday.org">hello@gainday.org</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Gainday Ltd. All rights reserved.</span>
            <span>Made in London.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}