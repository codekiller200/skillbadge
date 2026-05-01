import React, { useState, useEffect } from "react";

// ─── PALETTE & TOKENS ──────────────────────────────────────────────
const C = {
  night:   "#0A0D14",
  deep:    "#111520",
  card:    "#161C2D",
  border:  "#1E2A45",
  gold:    "#F5C842",
  amber:   "#E8A020",
  red:     "#E53E3E",
  green:   "#22C55E",
  cyan:    "#38BDF8",
  muted:   "#5A6A8A",
  text:    "#C8D4E8",
  white:   "#EEF2FF",
};

const DOMAINS = [
  { id: "web",    icon: "⬡", label: "Dev Web",       color: "#38BDF8" },
  { id: "mobile", icon: "◈", label: "Mobile",         color: "#A78BFA" },
  { id: "data",   icon: "◉", label: "Data & IA",      color: "#34D399" },
  { id: "cyber",  icon: "⬟", label: "Cybersécurité",  color: "#F87171" },
  { id: "design", icon: "◆", label: "Design UI/UX",   color: "#FBBF24" },
];

const LEVELS = [
  { id: "debut",  label: "Débutant",      stars: 1, color: "#22C55E" },
  { id: "inter",  label: "Intermédiaire", stars: 2, color: "#F5C842" },
  { id: "expert", label: "Expert",        stars: 3, color: "#F87171" },
];

const MOCK_BADGES = [
  { id: "b1", skill: "React.js", domain: "web",    level: "expert", issuer: "BF Dev Academy", date: "2024-11-03", hash: "0x4a3f…c91e", verified: true },
  { id: "b2", skill: "Flutter",  domain: "mobile", level: "inter",  issuer: "DigitalBF Hub",  date: "2024-09-17", hash: "0x7b1d…e54a", verified: true },
  { id: "b3", skill: "Python",   domain: "data",   level: "debut",  issuer: "OpenData BF",   date: "2024-07-22", hash: "0xc8f2…3b70", verified: true },
  { id: "b4", skill: "Figma",    domain: "design", level: "inter",  issuer: "CreativeLab BF", date: "2025-01-10", hash: "0x9e5c…a12f", verified: true },
];

const MOCK_APPRENANTS = [
  { id: "ap1", name: "Moussa Kaboré",    wallet: "0xAb2F…1C4d", badges: 4, score: 87 },
  { id: "ap2", name: "Aminata Traoré",   wallet: "0xD8e1…7B3a", badges: 2, score: 64 },
  { id: "ap3", name: "Issouf Ouédraogo", wallet: "0x3Fc9…E80b", badges: 6, score: 95 },
];

// ─── UTILS ─────────────────────────────────────────────────────────
function getLevelData(id) { return LEVELS.find(l => l.id === id) || LEVELS[0]; }
function getDomainData(id) { return DOMAINS.find(d => d.id === id) || DOMAINS[0]; }

function Stars({ count }) {
  return (
    <span style={{ letterSpacing: 1 }}>
      {[1,2,3].map(i => (
        <span key={i} style={{ opacity: i <= count ? 1 : 0.2, fontSize: 11 }}>★</span>
      ))}
    </span>
  );
}

function Badge({ badge, compact = false }) {
  const lvl = getLevelData(badge.level);
  const dom = getDomainData(badge.domain);
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.card} 0%, #0E1525 100%)`,
      border: `1px solid ${dom.color}33`,
      borderRadius: 16,
      padding: compact ? "14px 16px" : "20px 22px",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${dom.color}22`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
    >
      {/* Hexagon glow */}
      <div style={{
        position: "absolute", top: -18, right: -18,
        width: 70, height: 70,
        background: `radial-gradient(circle, ${dom.color}18 0%, transparent 70%)`,
        borderRadius: "50%",
      }}/>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{
          width: compact ? 38 : 46, height: compact ? 38 : 46,
          borderRadius: 12,
          background: `${dom.color}15`,
          border: `1.5px solid ${dom.color}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: compact ? 18 : 22,
          flexShrink: 0,
        }}>{dom.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: compact ? 13 : 15, color: C.white }}>{badge.skill}</span>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
              background: `${lvl.color}20`, color: lvl.color,
              border: `1px solid ${lvl.color}40`,
              borderRadius: 4, padding: "2px 7px",
            }}>{lvl.label}</span>
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{dom.label} · {badge.issuer}</div>
          {!compact && (
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}>
              <Stars count={lvl.stars} />
              <span style={{ fontSize: 10, color: C.muted, fontFamily: "monospace" }}>{badge.hash}</span>
              <span style={{
                marginLeft: "auto", fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                color: C.green, display: "flex", alignItems: "center", gap: 4,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }}/>
                VÉRIFIÉ ON-CHAIN
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── NAV ───────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const tabs = [
    { id: "formateur", icon: "✦", label: "Formateur" },
    { id: "apprenant", icon: "⬡", label: "Apprenant" },
    { id: "recruteur", icon: "◈", label: "Recruteur" },
  ];
  return (
    <nav style={{
      display: "flex", gap: 0,
      background: C.deep,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: 4,
      marginBottom: 28,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setActive(t.id)} style={{
          flex: 1,
          padding: "11px 8px",
          borderRadius: 11,
          border: "none",
          background: active === t.id ? `linear-gradient(135deg, ${C.gold}18, ${C.amber}10)` : "transparent",
          color: active === t.id ? C.gold : C.muted,
          fontFamily: "'Syne', sans-serif",
          fontWeight: active === t.id ? 700 : 500,
          fontSize: 13,
          cursor: "pointer",
          transition: "all 0.2s",
          outline: active === t.id ? `1.5px solid ${C.gold}44` : "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <span style={{ fontSize: 14 }}>{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── INTERFACE 1 : FORMATEUR ───────────────────────────────────────
function FormateurView() {
  const [step, setStep] = useState(0); // 0=form, 1=preview, 2=minted
  const [form, setForm] = useState({ skill: "", domain: "web", level: "debut", apprenant: "", note: "" });
  const [loading, setLoading] = useState(false);

  function handleMint() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 2200);
  }

  return (
    <div>
      <SectionHeader
        icon="✦"
        title="Espace Formateur"
        subtitle="Émettez des badges de compétences vérifiables"
        color={C.cyan}
      />

      {/* Step indicator */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["Créer badge", "Prévisualiser", "Certifié"].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: i <= step ? `${C.gold}20` : "transparent",
              border: `1.5px solid ${i <= step ? C.gold : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700,
              color: i <= step ? C.gold : C.muted,
            }}>{i < step ? "✓" : i + 1}</div>
            <span style={{ fontSize: 11, color: i <= step ? C.text : C.muted }}>{s}</span>
            {i < 2 && <span style={{ color: C.border, fontSize: 12 }}>›</span>}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Compétence validée" placeholder="ex: React.js, Flutter…"
              value={form.skill} onChange={v => setForm({...form, skill: v})} />
            <FormField label="Wallet apprenant" placeholder="0x…"
              value={form.apprenant} onChange={v => setForm({...form, apprenant: v})} />
          </div>

          <div>
            <label style={labelStyle}>Domaine</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
              {DOMAINS.map(d => (
                <button key={d.id} onClick={() => setForm({...form, domain: d.id})} style={{
                  padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${form.domain === d.id ? d.color : C.border}`,
                  background: form.domain === d.id ? `${d.color}15` : "transparent",
                  color: form.domain === d.id ? d.color : C.muted,
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span>{d.icon}</span> {d.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Niveau certifié</label>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              {LEVELS.map(l => (
                <button key={l.id} onClick={() => setForm({...form, level: l.id})} style={{
                  flex: 1, padding: "10px 6px", borderRadius: 10,
                  border: `1.5px solid ${form.level === l.id ? l.color : C.border}`,
                  background: form.level === l.id ? `${l.color}15` : "transparent",
                  color: form.level === l.id ? l.color : C.muted,
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 16, marginBottom: 3 }}>{"★".repeat(l.stars)}<span style={{ opacity: 0.2 }}>{"★".repeat(3 - l.stars)}</span></div>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <FormField label="Note d'évaluation (optionnel)" placeholder="Points forts observés…"
            value={form.note} onChange={v => setForm({...form, note: v})} textarea />

          <PrimaryButton
            label="Prévisualiser le badge →"
            color={C.cyan}
            disabled={!form.skill || !form.apprenant}
            onClick={() => setStep(1)}
          />
        </div>
      )}

      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: C.deep, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>Aperçu du badge NFT</div>
            <Badge badge={{ skill: form.skill || "Compétence", domain: form.domain, level: form.level, issuer: "BF Dev Academy", hash: "0x???…???", verified: false }} />
            <MetaGrid items={[
              { label: "Blockchain", value: "Polygon (MATIC)" },
              { label: "Standard", value: "ERC-721" },
              { label: "Stockage", value: "IPFS" },
              { label: "Émetteur", value: "BF Dev Academy" },
              { label: "Destinataire", value: form.apprenant || "0x…" },
              { label: "Révocable", value: "Non transférable" },
            ]} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <SecondaryButton label="← Modifier" onClick={() => setStep(0)} />
            <PrimaryButton label={loading ? "Minting on-chain…" : "⬡ Certifier & Minter"} color={C.gold} onClick={handleMint} loading={loading} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: `${C.green}15`, border: `2px solid ${C.green}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32, margin: "0 auto 16px",
            animation: "pulse 2s infinite",
          }}>✓</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: C.white, marginBottom: 6 }}>Badge certifié on-chain !</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Le badge est maintenant infalsifiable et visible dans le portfolio de l'apprenant.</div>
          <div style={{ background: C.deep, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, marginBottom: 20, fontFamily: "monospace", fontSize: 11, color: C.muted, textAlign: "left" }}>
            <div style={{ color: C.green, marginBottom: 4 }}>✓ Transaction confirmée (Polygon)</div>
            <div>TX Hash: 0x7b4f2a9c1e3d8b5f0a2c4e6d8f1b3a5c7e9d1f3a…</div>
            <div>Block: #48,291,447</div>
            <div>Gas: 0.0003 MATIC (~$0.0002)</div>
          </div>
          <PrimaryButton label="Émettre un autre badge" color={C.cyan} onClick={() => { setStep(0); setForm({ skill:"", domain:"web", level:"debut", apprenant:"", note:"" }); }} />
        </div>
      )}
    </div>
  );
}

// ─── INTERFACE 2 : APPRENANT ───────────────────────────────────────
function ApprenantView() {
  const [activeApprenant, setActiveApprenant] = useState(MOCK_APPRENANTS[0]);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <SectionHeader
        icon="⬡"
        title="Portfolio Apprenant"
        subtitle="Vos compétences certifiées, prouvées on-chain"
        color={C.gold}
      />

      {/* Profile selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {MOCK_APPRENANTS.map(a => (
          <button key={a.id} onClick={() => setActiveApprenant(a)} style={{
            padding: "8px 14px", borderRadius: 10,
            border: `1.5px solid ${activeApprenant.id === a.id ? C.gold : C.border}`,
            background: activeApprenant.id === a.id ? `${C.gold}12` : "transparent",
            color: activeApprenant.id === a.id ? C.gold : C.muted,
            fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>{a.name}</button>
        ))}
      </div>

      {/* Profile card */}
      <div style={{
        background: `linear-gradient(135deg, ${C.card} 0%, #0E1525 100%)`,
        border: `1px solid ${C.gold}33`,
        borderRadius: 16, padding: 20, marginBottom: 16,
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{
          width: 54, height: 54, borderRadius: 14,
          background: `${C.gold}15`, border: `2px solid ${C.gold}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: C.gold,
        }}>{activeApprenant.name.charAt(0)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.white }}>{activeApprenant.name}</div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace", marginTop: 2 }}>{activeApprenant.wallet}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Pill label={`${activeApprenant.badges} badges`} color={C.gold} />
            <Pill label={`Score: ${activeApprenant.score}/100`} color={C.green} />
            <Pill label="Polygon" color={C.cyan} />
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: C.gold }}>{activeApprenant.score}</div>
          <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>Score global</div>
        </div>
      </div>

      {/* Badges grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {MOCK_BADGES.slice(0, activeApprenant.badges > 3 ? 4 : 2).map(b => (
          <Badge key={b.id} badge={b} />
        ))}
      </div>

      {/* Share buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setShowQR(!showQR)} style={{
          flex: 1, padding: "12px", borderRadius: 11,
          border: `1.5px solid ${C.gold}55`,
          background: `${C.gold}10`,
          color: C.gold, fontWeight: 700, fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          ⬡ {showQR ? "Masquer QR" : "Afficher QR Code"}
        </button>
        <button onClick={handleCopy} style={{
          flex: 1, padding: "12px", borderRadius: 11,
          border: `1.5px solid ${C.border}`,
          background: "transparent",
          color: copied ? C.green : C.text, fontWeight: 600, fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "color 0.3s",
        }}>
          {copied ? "✓ Lien copié !" : "⇧ Partager portfolio"}
        </button>
      </div>

      {showQR && (
        <div style={{
          marginTop: 14, background: C.deep, border: `1px solid ${C.gold}33`,
          borderRadius: 14, padding: 20, textAlign: "center",
        }}>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>QR Code de vérification publique</div>
          <QRMock wallet={activeApprenant.wallet} />
          <div style={{ fontSize: 11, color: C.muted, marginTop: 12 }}>
            skillbadge.bf/verify/{activeApprenant.wallet.replace("…","0000")}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── INTERFACE 3 : RECRUTEUR ───────────────────────────────────────
function RecruteurView() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    setLoading(true);
    setSearched(true);
    setTimeout(() => {
      const found = MOCK_APPRENANTS.find(a =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.wallet.toLowerCase().includes(query.toLowerCase())
      ) || MOCK_APPRENANTS[2];
      setResult(found);
      setLoading(false);
    }, 1500);
  }

  const badgesForResult = result ? MOCK_BADGES.slice(0, result.badges > 3 ? 4 : 2) : [];

  return (
    <div>
      <SectionHeader
        icon="◈"
        title="Portail Recruteur"
        subtitle="Vérifiez les compétences d'un candidat en secondes"
        color="#A78BFA"
      />

      {/* Search bar */}
      <div style={{
        background: C.deep, border: `1.5px solid ${C.border}`,
        borderRadius: 14, padding: 16, marginBottom: 20,
      }}>
        <label style={{ ...labelStyle, color: "#A78BFA" }}>Adresse wallet ou nom du candidat</label>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && query && handleSearch()}
            placeholder="0x3Fc9… ou Issouf Ouédraogo"
            style={{
              flex: 1, background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 10, padding: "11px 14px",
              color: C.white, fontSize: 13, outline: "none",
              fontFamily: "monospace",
            }}
          />
          <button onClick={handleSearch} disabled={!query || loading} style={{
            padding: "11px 20px", borderRadius: 10,
            background: query ? `linear-gradient(135deg, #7C3AED, #A78BFA)` : C.border,
            border: "none", color: C.white, fontWeight: 700, fontSize: 13, cursor: "pointer",
            opacity: query ? 1 : 0.5, transition: "all 0.2s",
          }}>
            {loading ? "…" : "Vérifier →"}
          </button>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          {MOCK_APPRENANTS.map(a => (
            <button key={a.id} onClick={() => setQuery(a.name)} style={{
              padding: "4px 10px", borderRadius: 6,
              border: `1px solid ${C.border}`, background: "transparent",
              color: C.muted, fontSize: 11, cursor: "pointer",
            }}>{a.name.split(" ")[0]}</button>
          ))}
          <span style={{ fontSize: 11, color: C.muted, lineHeight: "26px" }}>← essayez ces profils</span>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 30, color: C.muted }}>
          <div style={{ fontSize: 28, animation: "spin 1s linear infinite", display: "inline-block" }}>◈</div>
          <div style={{ marginTop: 10, fontSize: 12 }}>Interrogation de la blockchain Polygon…</div>
        </div>
      )}

      {!loading && result && searched && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          {/* Candidate card */}
          <div style={{
            background: `linear-gradient(135deg, ${C.card} 0%, #0E1525 100%)`,
            border: `1px solid #A78BFA44`, borderRadius: 16, padding: 20, marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: "#A78BFA20", border: "2px solid #A78BFA44",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#A78BFA",
              }}>{result.name.charAt(0)}</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.white }}>{result.name}</div>
                <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>{result.wallet}</div>
              </div>
              <div style={{
                marginLeft: "auto",
                background: `${C.green}15`, border: `1.5px solid ${C.green}55`,
                borderRadius: 10, padding: "8px 16px", textAlign: "center",
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: C.green }}>{result.score}</div>
                <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>Score</div>
              </div>
            </div>

            <MetaGrid items={[
              { label: "Badges certifiés", value: `${result.badges} badges` },
              { label: "Réseau", value: "Polygon Mainnet" },
              { label: "Vérification", value: "✓ On-chain confirmée" },
              { label: "Infalsifiable", value: "✓ NFT ERC-721" },
            ]} />
          </div>

          {/* Badges */}
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
            Compétences certifiées ({badgesForResult.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {badgesForResult.map(b => <Badge key={b.id} badge={b} />)}
          </div>

          {/* Competency matrix */}
          <div style={{ background: C.deep, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Carte de compétences</div>
            {DOMAINS.map(d => {
              const domBadges = badgesForResult.filter(b => b.domain === d.id);
              const maxLevel = domBadges.length > 0 ? getLevelData(domBadges[0].level).stars : 0;
              return (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 22, fontSize: 14, color: d.color }}>{d.icon}</span>
                  <span style={{ width: 110, fontSize: 12, color: C.text }}>{d.label}</span>
                  <div style={{ flex: 1, height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 3,
                      width: `${(maxLevel / 3) * 100}%`,
                      background: maxLevel > 0 ? `linear-gradient(90deg, ${d.color}88, ${d.color})` : "transparent",
                      transition: "width 1s ease",
                    }}/>
                  </div>
                  <span style={{ fontSize: 11, color: maxLevel > 0 ? d.color : C.muted, width: 80, textAlign: "right" }}>
                    {maxLevel > 0 ? getLevelData(domBadges[0].level).label : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!result && !loading && !searched && (
        <div style={{
          background: C.deep, border: `1px dashed ${C.border}`,
          borderRadius: 14, padding: 32, textAlign: "center",
        }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>◈</div>
          <div style={{ color: C.muted, fontSize: 13 }}>Entrez un wallet ou un nom pour vérifier les certifications blockchain d'un candidat.</div>
        </div>
      )}
    </div>
  );
}

// ─── SHARED COMPONENTS ─────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle, color }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 18, color }}>{icon}</span>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: C.white, margin: 0 }}>{title}</h2>
      </div>
      <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>{subtitle}</p>
      <div style={{ height: 2, width: 48, background: `linear-gradient(90deg, ${color}, transparent)`, marginTop: 10, borderRadius: 2 }} />
    </div>
  );
}

const labelStyle = { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.muted };

function FormField({ label, placeholder, value, onChange, textarea }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{
          width: "100%", marginTop: 6, background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 10, padding: "10px 14px", color: C.white, fontSize: 13, outline: "none",
          resize: "none", fontFamily: "inherit", boxSizing: "border-box",
        }}/>
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
          width: "100%", marginTop: 6, background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 10, padding: "10px 14px", color: C.white, fontSize: 13, outline: "none",
          boxSizing: "border-box",
        }}/>
      )}
    </div>
  );
}

function PrimaryButton({ label, onClick, color, disabled, loading }) {
  return (
    <button onClick={onClick} disabled={disabled || loading} style={{
      width: "100%", padding: "13px", borderRadius: 11,
      background: disabled ? C.border : `linear-gradient(135deg, ${color}CC, ${color})`,
      border: "none", color: disabled ? C.muted : C.night,
      fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: loading ? 0.8 : 1, transition: "all 0.2s",
    }}>{label}</button>
  );
}

function SecondaryButton({ label, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "13px 20px", borderRadius: 11,
      border: `1px solid ${C.border}`, background: "transparent",
      color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
    }}>{label}</button>
  );
}

function MetaGrid({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", marginTop: 14 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>{item.label}</span>
          <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function Pill({ label, color }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
      background: `${color}15`, color, border: `1px solid ${color}33`,
      borderRadius: 5, padding: "2px 8px",
    }}>{label}</span>
  );
}

function QRMock({ wallet }) {
  // Fake QR grid
  const size = 11;
  const seed = wallet.charCodeAt(2) || 42;
  const cells = Array.from({ length: size * size }, (_, i) => {
    if (i < size * 2 || i >= size * (size - 2)) return true;
    if (i % size < 2 || i % size >= size - 2) return true;
    return ((i * seed * 7 + i * 13) % 17) > 8;
  });

  return (
    <div style={{ display: "inline-block", padding: 12, background: C.white, borderRadius: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 8px)`, gap: 1 }}>
        {cells.map((on, i) => (
          <div key={i} style={{ width: 8, height: 8, background: on ? C.night : "transparent" }} />
        ))}
      </div>
    </div>
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("formateur");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.night}; }
        input::placeholder, textarea::placeholder { color: ${C.muted}; opacity: 0.7; }
        input:focus, textarea:focus { border-color: ${C.gold}55 !important; }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 ${C.green}44; } 50% { box-shadow: 0 0 0 10px transparent; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 4px; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: C.night,
        fontFamily: "'Syne', sans-serif",
        color: C.text,
      }}>
        {/* Background pattern */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `radial-gradient(circle at 20% 20%, ${C.gold}06 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, ${C.cyan}05 0%, transparent 50%)`,
        }}/>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 540, margin: "0 auto", padding: "28px 16px 48px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: `linear-gradient(135deg, ${C.gold}30, ${C.amber}15)`,
                border: `2px solid ${C.gold}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>⬡</div>
              <h1 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26,
                background: `linear-gradient(135deg, ${C.white}, ${C.gold})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>SkillBadge</h1>
            </div>
            <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>
              🇧🇫 BURKINA FASO · MIABE HACKATHON 2026
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10,
              background: `${C.green}10`, border: `1px solid ${C.green}33`,
              borderRadius: 20, padding: "4px 12px",
              fontSize: 11, color: C.green, fontWeight: 600,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }}/>
              Polygon Mainnet · Phase 1 Prototype
            </div>
          </div>

          <Nav active={tab} setActive={setTab} />

          <div style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            padding: 24,
            minHeight: 400,
          }}>
            {tab === "formateur" && <FormateurView />}
            {tab === "apprenant" && <ApprenantView />}
            {tab === "recruteur" && <RecruteurView />}
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 20, fontSize: 10, color: C.muted, letterSpacing: 0.5 }}>
            ODD 4 · ODD 8 · ODD 9 — Prototype Phase 1 — Darollo Technologies
          </div>
        </div>
      </div>
    </>
  );
}
