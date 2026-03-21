import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faBitcoinSign, faFire, faGem } from "@fortawesome/free-solid-svg-icons";

// ── Plan icons ─────────────────────────────────────────────────────────────

const IconCoin = () => (
    <svg width="82" height="82" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" stroke="#C8D400" strokeWidth="1" strokeDasharray="4 3" opacity="0.22"/>
        <circle cx="32" cy="32" r="24" fill="rgba(200,212,0,0.07)" stroke="#C8D400" strokeWidth="1.8" opacity="0.85"/>
        <circle cx="32" cy="32" r="17" fill="none" stroke="#C8D400" strokeWidth="0.8" opacity="0.3"/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
            const rad = Math.PI * deg / 180;
            return <line key={i} x1={32+24*Math.cos(rad)} y1={32+24*Math.sin(rad)} x2={32+20*Math.cos(rad)} y2={32+20*Math.sin(rad)} stroke="#C8D400" strokeWidth="1.5" strokeLinecap="round" opacity="0.45"/>;
        })}
        <text x="32" y="32" textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="700" fontFamily="monospace" fill="#C8D400" opacity="0.9">₿</text>
        <ellipse cx="24" cy="22" rx="6" ry="3" fill="white" opacity="0.07" transform="rotate(-30 24 22)"/>
    </svg>
);

const IconChartUp = () => (
    <svg width="82" height="82" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" stroke="#C8D400" strokeWidth="1" strokeDasharray="4 3" opacity="0.28"/>
        <circle cx="32" cy="32" r="24" fill="rgba(200,212,0,0.1)" stroke="#C8D400" strokeWidth="2" opacity="1"/>
        <line x1="15" y1="41" x2="49" y2="41" stroke="#C8D400" strokeWidth="0.5" opacity="0.22"/>
        <line x1="15" y1="35" x2="49" y2="35" stroke="#C8D400" strokeWidth="0.5" opacity="0.22"/>
        <line x1="15" y1="29" x2="49" y2="29" stroke="#C8D400" strokeWidth="0.5" opacity="0.22"/>
        <rect x="16" y="35" width="9" height="7"  rx="1.5" fill="#C8D400" opacity="0.45"/>
        <rect x="27" y="29" width="9" height="13" rx="1.5" fill="#C8D400" opacity="0.65"/>
        <rect x="38" y="23" width="9" height="19" rx="1.5" fill="#C8D400" opacity="0.95"/>
        <polyline points="20,34 31,28 42,22 48,18" fill="none" stroke="#C8D400" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M43,16 L48,18 L45,23" fill="none" stroke="#C8D400" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="24" cy="26" rx="6" ry="3" fill="white" opacity="0.08" transform="rotate(-20 24 26)"/>
    </svg>
);

const IconCrown = () => (
    <svg width="82" height="82" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" stroke="#FFB800" strokeWidth="1" strokeDasharray="4 3" opacity="0.38"/>
        <circle cx="32" cy="32" r="24" fill="rgba(255,184,0,0.07)" stroke="#FFB800" strokeWidth="1.8" opacity="0.9"/>
        <path d="M14 43 L14 27 L21 34 L32 18 L43 34 L50 27 L50 43 Z"
              fill="rgba(255,184,0,0.13)" stroke="#FFB800" strokeWidth="1.7" strokeLinejoin="round" opacity="0.95"/>
        <rect x="14" y="41" width="36" height="7" rx="2.5"
              fill="rgba(255,184,0,0.2)" stroke="#FFB800" strokeWidth="1" opacity="0.9"/>
        <polygon points="32,14 36.5,21 32,25 27.5,21"
                 fill="rgba(255,210,60,0.55)" stroke="#FFD43B" strokeWidth="1.2" opacity="1"/>
        <line x1="29" y1="17" x2="33" y2="15" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        <circle cx="22" cy="44.5" r="1.8" fill="#FFB800" opacity="0.65"/>
        <circle cx="32" cy="44.5" r="1.8" fill="#FFD43B" opacity="1"/>
        <circle cx="42" cy="44.5" r="1.8" fill="#FFB800" opacity="0.65"/>
        <ellipse cx="24" cy="21" rx="5" ry="3" fill="white" opacity="0.13" transform="rotate(-25 24 21)"/>
    </svg>
);

const PLAN_ICONS = [IconCoin, IconChartUp, IconCrown];

// ── Data ───────────────────────────────────────────────────────────────────

const CRYPTOS = ["BTC","ETH","USDT","USDC","BNB","SOL","TON","MATIC"];
const PLANS = [
    { tier:"Модуль 1", name:"Базовый старт", price:"50–100", type:"basic", features:[
            {t:"2 занятия в месяц по 1.5–2 часа",     ok:true },
            {t:"Основы стоимостного инвестирования",  ok:true },
            {t:"Разбор финансовых отчётов компаний",  ok:true },
            {t:"Мастер-группа по субботам",           ok:false},
            {t:"Личное сопровождение",                ok:false},
        ]},
    { tier:"Модуль 2", name:"Инвестор-практик", price:"200–300", type:"pro", features:[
            {t:"3–5 занятий в квартал по 1.5–2 часа", ok:true },
            {t:"Мастер-группа по субботам на 1 год",  ok:true },
            {t:"Разбор компаний NYSE / NASDAQ",        ok:true },
            {t:"Поддержка и сопровождение +$100–200", ok:true },
            {t:"Личное сопровождение",                ok:false},
        ]},
    { tier:"Модуль 3", name:"Личное наставничество", price:"1500–2500", type:"premium", features:[
            {t:"Личное сопровождение 1–2 квартала",   ok:true },
            {t:"Ежедневный контакт до 30 минут",      ok:true },
            {t:"Задания по поиску и анализу компаний",ok:true },
            {t:"Мастер-группа по субботам включена",  ok:true },
            {t:"Требуется прохождение Модуля 2",      ok:true },
        ]},
];

// ── Per-type design tokens ─────────────────────────────────────────────────
const CARD_THEME = {
    basic: {
        bg:           "#1a1c14",
        bgHov:        "#1e2018",
        border:       "rgba(200,212,0,0.08)",
        borderHov:    "rgba(200,212,0,0.2)",
        accent:       "#C8D400",
        accentDim:    "rgba(200,212,0,0.5)",
        checkBg:      "#C8D400",
        checkFg:      "#0e0f0a",
        checkBorder:  "#C8D400",
        featureColor: "#6b6c60",
        btnBg:        "transparent",
        btnBgHov:     "rgba(200,212,0,0.07)",
        btnColor:     "#6b6c60",
        btnColorHov:  "#C8D400",
        btnBorder:    "rgba(200,212,0,0.14)",
        btnBorderHov: "rgba(200,212,0,0.3)",
        btnWeight:    400,
        shadow:       "none",
        shadowHov:    "0 12px 32px rgba(0,0,0,0.4)",
        scale:        1,
        scaleHov:     1.005,
        glowColor:    "rgba(200,212,0,0.04)",
        tierColor:    "#6b6c60",
        priceColor:   "#9a9b8e",
    },
    pro: {
        bg:           "#222616",
        bgHov:        "#272b18",
        border:       "rgba(200,212,0,0.35)",
        borderHov:    "rgba(200,212,0,0.6)",
        accent:       "#C8D400",
        accentDim:    "#C8D400",
        checkBg:      "#C8D400",
        checkFg:      "#0e0f0a",
        checkBorder:  "#C8D400",
        featureColor: "#b8b9ac",
        btnBg:        "#C8D400",
        btnBgHov:     "#d8e800",
        btnColor:     "#0e0f0a",
        btnColorHov:  "#0e0f0a",
        btnBorder:    "#C8D400",
        btnBorderHov: "#d8e800",
        btnWeight:    700,
        shadow:       "0 0 0 1px rgba(200,212,0,0.2), 0 12px 48px rgba(0,0,0,0.5), 0 0 60px rgba(200,212,0,0.06)",
        shadowHov:    "0 0 0 1px rgba(200,212,0,0.4), 0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(200,212,0,0.12)",
        scale:        1.02,
        scaleHov:     1.04,
        glowColor:    "rgba(200,212,0,0.1)",
        tierColor:    "#C8D400",
        priceColor:   "#f2f2ec",
    },
    premium: {
        bg:           "#1c1a0e",
        bgHov:        "#211e10",
        border:       "rgba(255,184,0,0.28)",
        borderHov:    "rgba(255,184,0,0.55)",
        accent:       "#FFB800",
        accentDim:    "rgba(255,184,0,0.6)",
        checkBg:      "rgba(255,184,0,0.2)",
        checkFg:      "#FFB800",
        checkBorder:  "rgba(255,184,0,0.5)",
        featureColor: "#a8a090",
        btnBg:        "transparent",
        btnBgHov:     "rgba(255,184,0,0.09)",
        btnColor:     "rgba(255,184,0,0.55)",
        btnColorHov:  "#FFB800",
        btnBorder:    "rgba(255,184,0,0.25)",
        btnBorderHov: "rgba(255,184,0,0.55)",
        btnWeight:    500,
        shadow:       "0 0 0 1px rgba(255,184,0,0.12), 0 6px 32px rgba(0,0,0,0.45), 0 0 48px rgba(255,184,0,0.05)",
        shadowHov:    "0 0 0 1px rgba(255,184,0,0.3), 0 14px 44px rgba(0,0,0,0.55), 0 0 70px rgba(255,184,0,0.1)",
        scale:        1,
        scaleHov:     1.005,
        glowColor:    "rgba(255,184,0,0.08)",
        tierColor:    "rgba(255,184,0,0.7)",
        priceColor:   "#f0d080",
    },
};

// ── Card ───────────────────────────────────────────────────────────────────

function PriceCard({ plan, index, Icon }) {
    const [hov,  setHov]  = useState(false);
    const [bHov, setBHov] = useState(false);
    const ref = useRef(null);
    const [vis, setVis]   = useState(false);
    const tk = CARD_THEME[plan.type];
    const isPro     = plan.type === "pro";
    const isPremium = plan.type === "premium";

    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                const t = setTimeout(() => setVis(true), index * 120);
                obs.disconnect();
                return () => clearTimeout(t);
            }
        }, { threshold: 0.08 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [index]);

    return (
        <div ref={ref}
             className={`price-card price-card-${plan.type}`}
             onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
             style={{
                 background: hov ? tk.bgHov : tk.bg,
                 border: `1px solid ${hov ? tk.borderHov : tk.border}`,
                 borderRadius: 6,
                 padding: isPro ? "clamp(24px,3vw,36px)" : "clamp(20px,2.5vw,28px)",
                 position:"relative", overflow:"hidden",
                 opacity: vis ? 1 : 0,
                 transform: vis
                     ? `scale(${hov ? tk.scaleHov : tk.scale}) ${isPro && !hov ? "translateY(-8px)" : hov ? "translateY(-4px)" : "translateY(0)"}`
                     : "translateY(28px) scale(0.96)",
                 boxShadow: hov ? tk.shadowHov : tk.shadow,
                 transitionProperty: "opacity,transform,border-color,box-shadow,background",
                 transitionDuration: ".65s,.65s,.2s,.25s,.2s",
                 transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
                 zIndex: isPro ? 2 : 1,
             }}>

            {/* PRO: ambient glow backdrop */}
            {isPro && (
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,212,0,0.1), transparent)", pointerEvents:"none" }}/>
            )}

            {/* PREMIUM: gold ambient glow */}
            {isPremium && (
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 55% at 50% -5%, rgba(255,184,0,0.09), transparent)", pointerEvents:"none" }}/>
            )}

            {/* PRO: animated scan line */}
            {isPro && (
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(200,212,0,0.04) 0%,transparent 40%)", animation:"scanLine 4s linear infinite", pointerEvents:"none" }}/>
            )}

            {/* PREMIUM: subtle corner ornaments */}
            {isPremium && (<>
                <div style={{ position:"absolute", top:10, left:10, width:16, height:16, borderTop:"1px solid rgba(255,184,0,0.3)", borderLeft:"1px solid rgba(255,184,0,0.3)", pointerEvents:"none" }}/>
                <div style={{ position:"absolute", top:10, right:10, width:16, height:16, borderTop:"1px solid rgba(255,184,0,0.3)", borderRight:"1px solid rgba(255,184,0,0.3)", pointerEvents:"none" }}/>
                <div style={{ position:"absolute", bottom:10, left:10, width:16, height:16, borderBottom:"1px solid rgba(255,184,0,0.3)", borderLeft:"1px solid rgba(255,184,0,0.3)", pointerEvents:"none" }}/>
                <div style={{ position:"absolute", bottom:10, right:10, width:16, height:16, borderBottom:"1px solid rgba(255,184,0,0.3)", borderRight:"1px solid rgba(255,184,0,0.3)", pointerEvents:"none" }}/>
            </>)}

            {/* Watermark */}
            <div style={{ position:"absolute", bottom:-12, right:-6, fontSize:100, fontWeight:700, color:hov?tk.glowColor.replace(/[\d.]+\)/, "0.09)"):"transparent", fontFamily:"var(--mono)", lineHeight:1, pointerEvents:"none", userSelect:"none", transition:"color .4s ease",
                backgroundImage: isPro ? "none" : "none",
            }}>₿</div>

            {/* Top accent line */}
            <div style={{ position:"absolute", top:0, left:0, height: isPro ? 3 : 2, width:"100%", background: isPro
                    ? `linear-gradient(90deg,transparent,#C8D400,transparent)`
                    : isPremium
                        ? `linear-gradient(90deg,transparent,#FFB800,transparent)`
                        : `linear-gradient(90deg,rgba(200,212,0,0.5),transparent)`,
                opacity: isPro ? 1 : isPremium ? (hov ? 1 : 0.65) : (hov ? 0.6 : 0.2),
                transition:"opacity .3s",
            }}/>

            {/* PRO top badge — urgency */}
            {isPro && (
                <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(90deg,#9a9f00,#C8D400,#9a9f00)", color:"#0e0f0a", fontSize:10, fontWeight:700, letterSpacing:"0.1em", padding:"5px 18px", borderRadius:"0 0 6px 6px", fontFamily:"var(--mono)", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:6 }}>
                    <FontAwesomeIcon icon={faFire} style={{ fontSize:9 }}/> САМЫЙ ПОПУЛЯРНЫЙ
                </div>
            )}

            {/* PREMIUM badge */}
            {isPremium && (
                <div style={{ position:"absolute", top:14, right:14, display:"flex", alignItems:"center", gap:5, padding:"3px 9px", background:"rgba(255,184,0,0.08)", border:"1px solid rgba(255,184,0,0.28)", borderRadius:3, fontSize:9, fontWeight:600, color:"rgba(255,184,0,0.75)", fontFamily:"var(--mono)", letterSpacing:"0.12em" }}>
                    <FontAwesomeIcon icon={faGem} style={{ fontSize:8 }}/> ПРЕМИУМ
                </div>
            )}

            {/* Plan icon */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:14, marginTop: isPro ? 16 : 8, position:"relative", zIndex:1 }}>
                <div style={{ position:"relative", width:88, height:88, display:"flex", alignItems:"center", justifyContent:"center", animation:"iconFloat 3s ease-in-out infinite", animationDelay:`${index*0.45}s` }}>
                    <div style={{ position:"absolute", inset:-8, borderRadius:"50%", background:`radial-gradient(circle,${tk.glowColor} 0%,transparent 70%)`, animation:`glowPulse ${2.8+index*.4}s ease-in-out infinite`, animationDelay:`${index*.3}s` }}/>
                    <Icon/>
                </div>
            </div>

            {/* Tier label */}
            <div style={{ fontSize:10, fontWeight:600, color:tk.tierColor, letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:6, textAlign:"center" }}>
                {plan.tier}
            </div>

            {/* Plan name */}
            <div style={{ fontSize: isPro ? "clamp(16px,2.3vw,20px)" : "clamp(13px,1.9vw,16px)", fontWeight: isPro ? 700 : 500, color:"#f2f2ec", marginBottom:12, letterSpacing:"-0.01em", textAlign:"center" }}>
                {plan.name}
            </div>

            {/* Price */}
            <div style={{ display:"flex", alignItems:"baseline", gap:2, marginBottom:4, justifyContent:"center" }}>
                <span style={{ fontSize: isPro ? 16 : 13, fontWeight:500, color: isPro ? "#9a9b8e" : "#4a4b42", fontFamily:"var(--mono)" }}>$</span>
                <span style={{ fontSize: isPro ? "clamp(36px,5.5vw,48px)" : "clamp(28px,4vw,36px)", fontWeight: isPro ? 700 : 600, color:tk.priceColor, letterSpacing:"-0.04em", fontFamily:"var(--mono)", lineHeight:1 }}>
                    {plan.price}
                </span>
            </div>
            <div style={{ fontSize:10, color: "#4a4b42", fontFamily:"var(--mono)", marginBottom: isPro ? 20 : 16, textAlign:"center" }}>
                единоразово
            </div>

            <div style={{ width:"100%", height:1, background: isPro ? "rgba(200,212,0,0.18)" : isPremium ? "rgba(255,184,0,0.15)" : "rgba(200,212,0,0.07)", marginBottom: isPro ? 18 : 14 }}/>

            {/* Features */}
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap: isPro ? 11 : 8, marginBottom: isPro ? 24 : 18 }}>
                {plan.features.map((ft, fi) => (
                    <li key={fi} style={{
                        display:"flex", alignItems:"flex-start", gap:10,
                        fontSize: isPro ? "clamp(12px,1.6vw,14px)" : "clamp(11px,1.4vw,12px)",
                        color: ft.ok ? (isPremium ? "rgba(255,210,120,0.6)" : tk.featureColor) : (isPremium ? "rgba(255,184,0,0.15)" : "#2e2f28"),
                        fontWeight: isPro ? 400 : 300, lineHeight:1.5,
                        opacity: vis ? 1 : 0,
                        transform: vis ? "none" : "translateX(-6px)",
                        transition: `opacity .35s ease ${.28+index*.1+fi*.04}s, transform .35s ease ${.28+index*.1+fi*.04}s`,
                    }}>
                        <span style={{ width: isPro ? 16 : 13, height: isPro ? 16 : 13, minWidth: isPro ? 16 : 13, borderRadius:2, marginTop:1, background:ft.ok ? tk.checkBg : "transparent", border:`1px solid ${ft.ok ? tk.checkBorder : (isPremium ? "rgba(255,184,0,0.1)" : "rgba(200,212,0,0.08)")}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            {ft.ok && <FontAwesomeIcon icon={faCheck} style={{ fontSize: isPro ? 9 : 7, color:tk.checkFg }}/>}
                        </span>
                        {ft.t}
                    </li>
                ))}
            </ul>

            {/* CTA button */}
            <button onMouseEnter={() => setBHov(true)} onMouseLeave={() => setBHov(false)}
                    style={{
                        width:"100%", padding: isPro ? "14px 16px" : "10px 14px",
                        position:"relative", overflow:"hidden",
                        background: bHov ? tk.btnBgHov : tk.btnBg,
                        color: bHov ? tk.btnColorHov : tk.btnColor,
                        fontFamily:"var(--ff)", fontSize: isPro ? "clamp(12px,1.8vw,14px)" : "clamp(10px,1.5vw,12px)",
                        fontWeight: tk.btnWeight,
                        border:`1px solid ${bHov ? tk.btnBorderHov : tk.btnBorder}`,
                        borderRadius:4, cursor:"pointer",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                        transform: bHov ? "translateY(-2px)" : "none",
                        boxShadow: bHov && isPro ? "0 6px 24px rgba(200,212,0,0.35)" : "none",
                        letterSpacing: isPremium ? "0.08em" : "0",
                        transition:"all .18s ease",
                    }}>
                {isPro && <span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)", transform:bHov?"translateX(100%)":"translateX(-100%)", transition:"transform .45s ease" }}/>}
                <a href="https://t.me/ba_n_di_t_7_7_7" style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:8 }}>
                    <FontAwesomeIcon icon={faBitcoinSign} style={{ fontSize: isPro ? 13 : 11 }}/>
                    Оплатить крипто
                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: isPro ? 12 : 10 }}/>
                </a>
            </button>

        </div>
    );
}

// ── Section ────────────────────────────────────────────────────────────────

export default function Pricing() {
    const ref = useRef(null);
    const [vis, setVis]           = useState({});
    const [cryptoIdx, setCryptoIdx] = useState(0);

    useEffect(() => {
        const els = ref.current?.querySelectorAll("[data-fade]") ?? [];
        const timers = [];
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const key = e.target.dataset.fade;
                    const t = setTimeout(() => setVis(v => ({ ...v, [key]: true })), 0);
                    timers.push(t);
                }
            });
        }, { threshold: 0.1 });
        els.forEach(el => obs.observe(el));
        return () => { obs.disconnect(); timers.forEach(clearTimeout); };
    }, []);

    useEffect(() => {
        const t = setInterval(() => setCryptoIdx(i => (i + 1) % CRYPTOS.length), 1800);
        return () => clearInterval(t);
    }, []);

    const f = (k, d = 0) => ({
        opacity: vis[k] ? 1 : 0,
        transform: vis[k] ? "none" : "translateY(18px)",
        transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${d}s, transform .65s cubic-bezier(.22,1,.36,1) ${d}s`,
    });

    return (
        <section id="pricing" ref={ref} style={{ padding:"clamp(48px,8vw,96px) clamp(16px,5vw,48px)", background:"#141510" }}>
            <div style={{ maxWidth:1120, margin:"0 auto" }}>

                <div data-fade="tag" style={f("tag")}>
                    <span style={{ fontSize:10, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>◈ Тарифы и оплата</span>
                </div>
                <h2 data-fade="h2" style={{ ...f("h2",.06), fontSize:"clamp(22px,5vw,44px)", fontWeight:600, lineHeight:1.12, letterSpacing:"-.02em", margin:"12px 0 clamp(10px,2vw,14px)" }}>
                    Выберите<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>свой модуль</em>
                </h2>
                <p data-fade="lead" style={{ ...f("lead",.1), fontSize:"clamp(12px,1.8vw,15px)", color:"#9a9b8e", lineHeight:1.75, maxWidth:520, fontWeight:300, marginBottom:"clamp(20px,4vw,40px)" }}>
                    Выберите формат обучения, который соответствует вашему уровню и целям. Принимаем оплату в криптовалюте.
                </p>

                {/* Cards — pro card is larger via CSS align-items stretch + padding */}
                <div className="price-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:14, alignItems:"start" }}>
                    {PLANS.map((p, i) => (
                        <PriceCard key={p.tier} plan={p} index={i} Icon={PLAN_ICONS[i]}/>
                    ))}
                </div>

                {/* Crypto ticker */}
                <div data-fade="ticker" style={{ ...f("ticker",.3), padding:"clamp(10px,2vw,14px) clamp(14px,3vw,18px)", border:"1px solid rgba(200,212,0,0.07)", borderRadius:4, background:"rgba(200,212,0,0.01)" }}>
                    <div style={{ fontSize:9, color:"#4a4b42", letterSpacing:"0.1em", fontFamily:"var(--mono)", textTransform:"uppercase", marginBottom:7, textAlign:"center" }}>Принимаем оплату</div>
                    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"clamp(4px,1.5vw,10px)", flexWrap:"wrap" }}>
                        {CRYPTOS.map((c, i) => (
                            <span key={c} style={{ fontSize:"clamp(9px,1.4vw,11px)", fontWeight:600, fontFamily:"var(--mono)", letterSpacing:"0.08em", color:i===cryptoIdx?"#C8D400":"#3a3b34", background:i===cryptoIdx?"rgba(200,212,0,0.08)":"transparent", padding:"2px 7px", borderRadius:3, border:`1px solid ${i===cryptoIdx?"rgba(200,212,0,0.22)":"transparent"}`, transition:"all .4s ease" }}>{c}</span>
                        ))}
                    </div>
                </div>

                {/* Individual consultation */}
                <div data-fade="consult" style={{ ...f("consult",.38), marginTop:14, padding:"clamp(16px,2.5vw,22px) clamp(18px,3vw,28px)", border:"1px solid rgba(200,212,0,0.1)", borderRadius:4, background:"rgba(200,212,0,0.02)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(200,212,0,0.07)", border:"1px solid rgba(200,212,0,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="#C8D400" strokeWidth="1.3"/><path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="#C8D400" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        </div>
                        <div>
                            <div style={{ fontSize:"clamp(12px,1.6vw,14px)", fontWeight:500, color:"#f2f2ec", marginBottom:2 }}>Индивидуальная консультация</div>
                            <div style={{ fontSize:"clamp(10px,1.3vw,12px)", color:"#6b6c60", fontWeight:300 }}>1 час персональной работы с Дмитрием Федоренко</div>
                        </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:16, flexShrink:0 }}>
                        <div style={{ textAlign:"right" }}>
                            <div style={{ fontSize:"clamp(18px,2.8vw,24px)", fontWeight:700, color:"#C8D400", fontFamily:"var(--mono)", letterSpacing:"-0.03em", lineHeight:1 }}>$100</div>
                            <div style={{ fontSize:9, color:"#4a4b42", fontFamily:"var(--mono)", marginTop:2 }}>за 1 час</div>
                        </div>
                        <a href="https://t.me/ba_n_di_t_7_7_7?text=Hello! I want to book an individual consultation. Email: " target="_blank" rel="noopener noreferrer"
                           style={{ padding:"9px 16px", background:"transparent", border:"1px solid rgba(200,212,0,0.22)", borderRadius:4, color:"rgba(200,212,0,0.7)", fontSize:12, fontFamily:"var(--ff)", fontWeight:500, textDecoration:"none", whiteSpace:"nowrap", transition:"all .18s" }}
                           onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.5)";e.currentTarget.style.color="#C8D400";e.currentTarget.style.background="rgba(200,212,0,0.06)";}}
                           onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.22)";e.currentTarget.style.color="rgba(200,212,0,0.7)";e.currentTarget.style.background="transparent";}}>
                            Записаться
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes priceIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @keyframes iconFloat{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes glowPulse{ 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.14)} }
        @keyframes scanLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        @media(max-width:800px){
          .price-grid{grid-template-columns:1fr!important;max-width:400px;margin-left:auto;margin-right:auto}
          .price-card-pro{order:-1!important}
        }
        @media(max-width:480px){ .price-grid{max-width:100%!important} }
      `}</style>
        </section>
    );
}