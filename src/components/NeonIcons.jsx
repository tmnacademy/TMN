// ─────────────────────────────────────────────────────────────────────────────
// NeonIcons.jsx — 4 premium illustration components for TNM Academy
//
//  IconAnalysis1  — magnifying glass over bar chart + pie chart (dark bg)
//  IconAnalysis2  — magnifying glass over multi-chart dashboard
//  IconAnalysis3  — report document with loupe
//  BadgeResearch  — "ИНВЕСТИЦИОННЫЕ ИССЛЕДОВАНИЯ | АНАЛИЗ ЦЕННЫХ БУМАГ" text badge
//
//  Usage:
//    import { IconAnalysis1, IconAnalysis2, IconAnalysis3, BadgeResearch } from "./NeonIcons";
//    <IconAnalysis1 size={120} />
//    <BadgeResearch />
// ─────────────────────────────────────────────────────────────────────────────

// ── Icon 1: Magnifying glass over bar chart + pie ─────────────────────────
export function IconAnalysis1({ size = 120 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none"
             style={{ overflow: "visible" }}>
            <defs>
                <radialGradient id="a1glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C8D400" stopOpacity="0.18"/>
                    <stop offset="100%" stopColor="#C8D400" stopOpacity="0"/>
                </radialGradient>
                <clipPath id="a1clip">
                    <circle cx="52" cy="52" r="28"/>
                </clipPath>
            </defs>

            {/* ambient glow */}
            <circle cx="52" cy="52" r="46" fill="url(#a1glow)"/>

            {/* ── pie chart top-left ── */}
            {/* background arcs */}
            <circle cx="30" cy="32" r="16" fill="none" stroke="rgba(200,212,0,0.08)" strokeWidth="16"/>
            {/* lime slice ~70% */}
            <circle cx="30" cy="32" r="16" fill="none" stroke="#C8D400" strokeWidth="16"
                    strokeDasharray="70 30" strokeDashoffset="25" opacity="0.7"
                    style={{ transformOrigin: "30px 32px", transform: "rotate(-90deg)" }}/>
            {/* accent slice ~20% */}
            <circle cx="30" cy="32" r="16" fill="none" stroke="rgba(200,212,0,0.35)" strokeWidth="16"
                    strokeDasharray="20 80" strokeDashoffset="-45" opacity="0.9"
                    style={{ transformOrigin: "30px 32px", transform: "rotate(-90deg)" }}/>
            {/* pie center hole */}
            <circle cx="30" cy="32" r="9" fill="#0e0f0a"/>
            <circle cx="30" cy="32" r="9" fill="none" stroke="rgba(200,212,0,0.12)" strokeWidth="0.8"/>

            {/* ── bar chart bottom-right ── */}
            {/* baseline */}
            <line x1="58" y1="78" x2="98" y2="78" stroke="#C8D400" strokeWidth="0.8" opacity="0.3"/>
            {/* bars */}
            <rect x="61" y="64" width="8" height="14" rx="1.5" fill="#C8D400" opacity="0.35"/>
            <rect x="72" y="56" width="8" height="22" rx="1.5" fill="#C8D400" opacity="0.55"/>
            <rect x="83" y="50" width="8" height="28" rx="1.5" fill="#C8D400" opacity="0.78"/>
            {/* trend line */}
            <polyline points="65,63 76,55 87,49 95,43"
                      fill="none" stroke="#C8D400" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
            <circle cx="95" cy="43" r="2.5" fill="none" stroke="#C8D400" strokeWidth="1.5" opacity="0.9"/>
            <circle cx="95" cy="43" r="1" fill="#C8D400" opacity="0.9"/>

            {/* ── magnifying glass ── */}
            {/* lens rim outer */}
            <circle cx="52" cy="52" r="28" fill="rgba(200,212,0,0.04)"
                    stroke="#C8D400" strokeWidth="2.5" opacity="0.85"/>
            {/* lens inner shine arc */}
            <path d="M32 38 Q36 32 44 30" fill="none" stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2" strokeLinecap="round"/>
            {/* content inside lens (clipped) */}
            <g clipPath="url(#a1clip)" opacity="0.5">
                <circle cx="30" cy="32" r="16" fill="none" stroke="#C8D400" strokeWidth="16"
                        strokeDasharray="70 30" strokeDashoffset="25"
                        style={{ transformOrigin: "30px 32px", transform: "rotate(-90deg)" }}/>
                <circle cx="30" cy="32" r="9" fill="#0e0f0a"/>
                <rect x="61" y="64" width="8" height="14" rx="1.5" fill="#C8D400"/>
                <rect x="72" y="56" width="8" height="22" rx="1.5" fill="#C8D400"/>
                <rect x="83" y="50" width="8" height="28" rx="1.5" fill="#C8D400"/>
            </g>
            {/* handle */}
            <line x1="73" y1="73" x2="90" y2="90"
                  stroke="#C8D400" strokeWidth="5" strokeLinecap="round" opacity="0.75"/>
            <line x1="73" y1="73" x2="90" y2="90"
                  stroke="rgba(200,212,0,0.25)" strokeWidth="8" strokeLinecap="round"/>

            {/* glow dot on handle tip */}
            <circle cx="90" cy="90" r="3" fill="#C8D400" opacity="0.35"/>

            {/* scan line animation */}
            <line x1="24" y1="52" x2="80" y2="52"
                  stroke="#C8D400" strokeWidth="0.8" opacity="0.2"
                  strokeDasharray="4 3">
                <animateTransform attributeName="transform" type="translate"
                                  values="0 -28; 0 28; 0 -28" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;0.25;0" dur="3s" repeatCount="indefinite"/>
            </line>
        </svg>
    );
}

// ── Icon 2: Magnifying glass over multi-chart dashboard ───────────────────
export function IconAnalysis2({ size = 120 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none"
             style={{ overflow: "visible" }}>
            <defs>
                <radialGradient id="a2glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C8D400" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#C8D400" stopOpacity="0"/>
                </radialGradient>
                <clipPath id="a2clip">
                    <circle cx="50" cy="50" r="30"/>
                </clipPath>
            </defs>

            <circle cx="50" cy="50" r="48" fill="url(#a2glow)"/>

            {/* ── background dashboard elements ── */}
            {/* pie top-left */}
            <circle cx="24" cy="28" r="14" fill="none" stroke="rgba(200,212,0,0.08)" strokeWidth="14"/>
            <circle cx="24" cy="28" r="14" fill="none" stroke="#C8D400" strokeWidth="14"
                    strokeDasharray="60 40" strokeDashoffset="25" opacity="0.6"
                    style={{ transformOrigin: "24px 28px", transform: "rotate(-90deg)" }}/>
            <circle cx="24" cy="28" r="14" fill="none" stroke="rgba(200,212,0,0.28)" strokeWidth="14"
                    strokeDasharray="25 75" strokeDashoffset="-35" opacity="0.8"
                    style={{ transformOrigin: "24px 28px", transform: "rotate(-90deg)" }}/>
            <circle cx="24" cy="28" r="7" fill="#0e0f0a"/>

            {/* grouped bars top-right */}
            <rect x="68" y="22" width="5" height="16" rx="1" fill="#C8D400" opacity="0.6"/>
            <rect x="75" y="16" width="5" height="22" rx="1" fill="#C8D400" opacity="0.8"/>
            <rect x="82" y="20" width="5" height="18" rx="1" fill="#C8D400" opacity="0.5"/>
            <rect x="89" y="14" width="5" height="24" rx="1" fill="#C8D400" opacity="0.9"/>
            <line x1="66" y1="38" x2="96" y2="38" stroke="#C8D400" strokeWidth="0.6" opacity="0.25"/>

            {/* legend strips top-right */}
            <rect x="68" y="8" width="10" height="2.5" rx="1" fill="#C8D400" opacity="0.5"/>
            <rect x="81" y="8" width="10" height="2.5" rx="1" fill="rgba(200,212,0,0.25)"/>

            {/* dot-line chart bottom-left */}
            <polyline points="8,90 18,82 28,86 38,76"
                      fill="none" stroke="#C8D400" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
            <circle cx="8"  cy="90" r="2.5" fill="none" stroke="#C8D400" strokeWidth="1.2" opacity="0.55"/>
            <circle cx="18" cy="82" r="2.5" fill="none" stroke="#C8D400" strokeWidth="1.2" opacity="0.55"/>
            <circle cx="28" cy="86" r="2.5" fill="none" stroke="#C8D400" strokeWidth="1.2" opacity="0.55"/>
            <circle cx="38" cy="76" r="2.5" fill="none" stroke="#C8D400" strokeWidth="1.2" opacity="0.55"/>

            {/* stacked bars bottom-right */}
            <rect x="72" y="70" width="10" height="28" rx="1.5" fill="#C8D400" opacity="0.2"/>
            <rect x="72" y="70" width="10" height="18" rx="1.5" fill="#C8D400" opacity="0.45"/>
            <rect x="85" y="66" width="10" height="32" rx="1.5" fill="#C8D400" opacity="0.18"/>
            <rect x="85" y="66" width="10" height="22" rx="1.5" fill="#C8D400" opacity="0.38"/>
            <rect x="98" y="74" width="10" height="24" rx="1.5" fill="#C8D400" opacity="0.15"/>
            <rect x="98" y="74" width="10" height="14" rx="1.5" fill="#C8D400" opacity="0.3"/>

            {/* small legend strips mid */}
            <rect x="8"  y="98" width="12" height="2" rx="1" fill="#C8D400" opacity="0.3"/>
            <rect x="23" y="98" width="18" height="2" rx="1" fill="rgba(200,212,0,0.15)"/>

            {/* ── magnifying glass ── */}
            <circle cx="50" cy="50" r="30" fill="rgba(200,212,0,0.05)"
                    stroke="#C8D400" strokeWidth="2.5" opacity="0.9"/>
            {/* inner shine */}
            <path d="M28 36 Q33 28 43 26" fill="none" stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2" strokeLinecap="round"/>
            {/* lens content overlay */}
            <circle cx="50" cy="50" r="30" fill="rgba(14,15,10,0.3)"/>
            {/* handle */}
            <line x1="72" y1="72" x2="92" y2="92"
                  stroke="rgba(200,212,0,0.2)" strokeWidth="9" strokeLinecap="round"/>
            <line x1="72" y1="72" x2="92" y2="92"
                  stroke="#C8D400" strokeWidth="5" strokeLinecap="round" opacity="0.8"/>

            {/* pulsing ring */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="#C8D400" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="30;34;30" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>
    );
}

// ── Icon 3: Research report document with loupe ───────────────────────────
export function IconAnalysis3({ size = 120 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none"
             style={{ overflow: "visible" }}>
            <defs>
                <radialGradient id="a3glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C8D400" stopOpacity="0.12"/>
                    <stop offset="100%" stopColor="#C8D400" stopOpacity="0"/>
                </radialGradient>
                <clipPath id="a3docclip">
                    <rect x="22" y="18" width="62" height="82" rx="4"/>
                </clipPath>
            </defs>

            <circle cx="55" cy="60" r="52" fill="url(#a3glow)"/>

            {/* ── document ── */}
            <rect x="22" y="18" width="62" height="82" rx="4"
                  fill="#141510" stroke="#C8D400" strokeWidth="1.2" opacity="0.7"/>
            {/* top fold / header tab */}
            <rect x="22" y="18" width="62" height="10" rx="4"
                  fill="rgba(200,212,0,0.15)" stroke="#C8D400" strokeWidth="1.2" opacity="0.7"/>
            <rect x="22" y="24" width="62" height="4" fill="#141510"/>
            {/* corner fold */}
            <path d="M72 18 L84 18 L84 30 Z" fill="rgba(200,212,0,0.1)" stroke="#C8D400" strokeWidth="0.8" opacity="0.5"/>

            {/* bar chart inside doc */}
            <line x1="30" y1="58" x2="68" y2="58" stroke="#C8D400" strokeWidth="0.6" opacity="0.2"/>
            <rect x="32" y="48" width="7" height="10" rx="1" fill="#C8D400" opacity="0.3"/>
            <rect x="41" y="42" width="7" height="16" rx="1" fill="#C8D400" opacity="0.5"/>
            <rect x="50" y="36" width="7" height="22" rx="1" fill="#C8D400" opacity="0.7"/>
            <rect x="59" y="44" width="7" height="14" rx="1" fill="#C8D400" opacity="0.4"/>
            {/* y-axis */}
            <line x1="30" y1="34" x2="30" y2="58" stroke="#C8D400" strokeWidth="0.6" opacity="0.2"/>

            {/* pie chart inside doc */}
            <circle cx="36" cy="74" r="10" fill="none" stroke="rgba(200,212,0,0.08)" strokeWidth="10"/>
            <circle cx="36" cy="74" r="10" fill="none" stroke="#C8D400" strokeWidth="10"
                    strokeDasharray="65 35" strokeDashoffset="25" opacity="0.55"
                    style={{ transformOrigin: "36px 74px", transform: "rotate(-90deg)" }}/>
            <circle cx="36" cy="74" r="10" fill="none" stroke="rgba(200,212,0,0.22)" strokeWidth="10"
                    strokeDasharray="22 78" strokeDashoffset="-40" opacity="0.8"
                    style={{ transformOrigin: "36px 74px", transform: "rotate(-90deg)" }}/>
            <circle cx="36" cy="74" r="5" fill="#141510"/>

            {/* legend lines */}
            <rect x="50" y="68" width="14" height="2" rx="1" fill="#C8D400" opacity="0.4"/>
            <rect x="50" y="73" width="18" height="2" rx="1" fill="rgba(200,212,0,0.2)"/>
            <rect x="50" y="78" width="11" height="2" rx="1" fill="rgba(200,212,0,0.15)"/>

            {/* dot-line at bottom of doc */}
            <polyline points="30,90 38,86 46,88 54,83 62,85 70,80"
                      fill="none" stroke="#C8D400" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
            {[30,38,46,54,62,70].map((x, i) => (
                <circle key={i} cx={x} cy={[90,86,88,83,85,80][i]} r="1.8"
                        fill="none" stroke="#C8D400" strokeWidth="1" opacity="0.4"/>
            ))}

            {/* ── magnifying glass overlay ── */}
            <circle cx="62" cy="75" r="22" fill="rgba(14,15,10,0.55)"
                    stroke="#C8D400" strokeWidth="2.2" opacity="0.9"/>
            {/* shine arc */}
            <path d="M46 63 Q50 57 58 55" fill="none" stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.8" strokeLinecap="round"/>
            {/* handle */}
            <line x1="78" y1="91" x2="94" y2="107"
                  stroke="rgba(200,212,0,0.2)" strokeWidth="7" strokeLinecap="round"/>
            <line x1="78" y1="91" x2="94" y2="107"
                  stroke="#C8D400" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
            {/* subtle crosshair inside lens */}
            <line x1="62" y1="61" x2="62" y2="89" stroke="#C8D400" strokeWidth="0.5" opacity="0.15"/>
            <line x1="48" y1="75" x2="76" y2="75" stroke="#C8D400" strokeWidth="0.5" opacity="0.15"/>
            {/* pulsing ring */}
            <circle cx="62" cy="75" r="22" fill="none" stroke="#C8D400" strokeWidth="0.8" opacity="0.25">
                <animate attributeName="r" values="22;26;22" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite"/>
            </circle>
        </svg>
    );
}

// ── Badge: "ИНВЕСТИЦИОННЫЕ ИССЛЕДОВАНИЯ | АНАЛИЗ ЦЕННЫХ БУМАГ" ────────────
export function BadgeResearch({ width = 480 }) {
    const h = 52;
    return (
        <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none"
             style={{ overflow: "visible" }}>
            <defs>
                <radialGradient id="badgeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C8D400" stopOpacity="0.12"/>
                    <stop offset="100%" stopColor="#C8D400" stopOpacity="0"/>
                </radialGradient>
            </defs>

            {/* bg glow */}
            <rect x="0" y="0" width={width} height={h} rx="4" fill="url(#badgeGlow)"/>

            {/* outer border */}
            <rect x="1" y="1" width={width-2} height={h-2} rx="3.5"
                  fill="none" stroke="#C8D400" strokeWidth="1" opacity="0.3"/>

            {/* left accent line */}
            <rect x="0" y="12" width="3" height={h-24} rx="1.5" fill="#C8D400" opacity="0.7"/>

            {/* top scan line animation */}
            <rect x="0" y="0" width={width} height="1.5" rx="1" fill="#C8D400" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.08;0.4" dur="2s" repeatCount="indefinite"/>
            </rect>

            {/* left text — lime */}
            <text x="16" y="32"
                  fontFamily="monospace" fontSize="13" fontWeight="700"
                  fill="#C8D400" letterSpacing="3" textAnchor="start"
                  style={{ textTransform: "uppercase" }}>
                ИНВЕСТИЦИОННЫЕ ИССЛЕДОВАНИЯ
            </text>

            {/* separator */}
            <text x={width / 2 - 6} y="33"
                  fontFamily="monospace" fontSize="15" fontWeight="300"
                  fill="rgba(200,212,0,0.4)" textAnchor="middle">|</text>

            {/* right text — dim white */}
            <text x={width / 2 + 6} y="32"
                  fontFamily="monospace" fontSize="13" fontWeight="500"
                  fill="rgba(242,242,236,0.7)" letterSpacing="3" textAnchor="start">
                АНАЛИЗ ЦЕННЫХ БУМАГ
            </text>

            {/* right corner glyphs */}
            <text x={width - 14} y="20" fontFamily="monospace" fontSize="9"
                  fill="#C8D400" opacity="0.3" textAnchor="end">◈</text>
            <text x={width - 14} y="44" fontFamily="monospace" fontSize="9"
                  fill="#C8D400" opacity="0.3" textAnchor="end">₿</text>

            {/* pulsing left dot */}
            <circle cx="8" cy={h/2} r="3" fill="#C8D400" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite"/>
                <animate attributeName="r" values="3;4;3" dur="1.8s" repeatCount="indefinite"/>
            </circle>
        </svg>
    );
}

// ── Demo wrapper (remove when integrating) ────────────────────────────────
export default function NeonIconsDemo() {
    const cards = [
        { Icon: IconAnalysis1, label: "Фундаментальный анализ", desc: "Глубокий разбор финансовых отчётов и рыночных данных" },
        { Icon: IconAnalysis2, label: "Портфельный мониторинг", desc: "Мультиактивный дашборд с отслеживанием в реальном времени" },
        { Icon: IconAnalysis3, label: "Исследовательские отчёты", desc: "Структурированные выводы по каждой позиции" },
    ];

    return (
        <section style={{ background: "#0e0f0a", padding: "64px 32px", fontFamily: "var(--ff, 'DM Sans', sans-serif)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* badge */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 52 }}>
                    <BadgeResearch width={520}/>
                </div>

                {/* icon cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                    {cards.map(({ Icon, label, desc }, i) => (
                        <div key={i} style={{
                            background: "#141510",
                            border: "1px solid rgba(200,212,0,0.12)",
                            borderRadius: 6,
                            padding: "36px 28px 32px",
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
                            position: "relative", overflow: "hidden",
                            transition: "border-color .2s, box-shadow .2s",
                        }}
                             onMouseEnter={e => {
                                 e.currentTarget.style.borderColor = "rgba(200,212,0,0.3)";
                                 e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(200,212,0,0.05)";
                             }}
                             onMouseLeave={e => {
                                 e.currentTarget.style.borderColor = "rgba(200,212,0,0.12)";
                                 e.currentTarget.style.boxShadow = "none";
                             }}>

                            {/* top accent */}
                            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,rgba(200,212,0,0.5),transparent)" }}/>

                            {/* corner ornaments */}
                            <div style={{ position:"absolute", top:10, left:10, width:14, height:14, borderTop:"1px solid rgba(200,212,0,0.2)", borderLeft:"1px solid rgba(200,212,0,0.2)" }}/>
                            <div style={{ position:"absolute", top:10, right:10, width:14, height:14, borderTop:"1px solid rgba(200,212,0,0.2)", borderRight:"1px solid rgba(200,212,0,0.2)" }}/>
                            <div style={{ position:"absolute", bottom:10, left:10, width:14, height:14, borderBottom:"1px solid rgba(200,212,0,0.2)", borderLeft:"1px solid rgba(200,212,0,0.2)" }}/>
                            <div style={{ position:"absolute", bottom:10, right:10, width:14, height:14, borderBottom:"1px solid rgba(200,212,0,0.2)", borderRight:"1px solid rgba(200,212,0,0.2)" }}/>

                            {/* icon with float animation */}
                            <div style={{ animation: `float${i} 3s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
                                <Icon size={110}/>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: "#C8D400", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>
                                    ◈ {label}
                                </div>
                                <div style={{ fontSize: 13, color: "#9a9b8e", lineHeight: 1.65, fontWeight: 300 }}>
                                    {desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @media(max-width:720px){
          div[style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}
        }
      `}</style>
        </section>
    );
}