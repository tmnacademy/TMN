import { useEffect, useRef, useState } from "react";

// ── Vivid neon loupe — unique content per module ───────────────────────────
// Each variant has different inner chart/content to match the module topic
function LoupeIcon({ variant = 0, size = 96 }) {
    // variant 0: bar chart inside (fundamentals)
    // variant 1: on-chain wave/line (on-chain)
    // variant 2: pie + tokens (tokenomics)
    // variant 3: portfolio bars + shield (system)
    const inner = {
        0: ( // bar chart rising
            <>
                <line x1="22" y1="38" x2="42" y2="38" stroke="#C8D400" strokeWidth="0.6" opacity="0.3"/>
                <line x1="22" y1="33" x2="42" y2="33" stroke="#C8D400" strokeWidth="0.6" opacity="0.3"/>
                <line x1="22" y1="28" x2="42" y2="28" stroke="#C8D400" strokeWidth="0.6" opacity="0.3"/>
                <rect x="23" y="31" width="4" height="7"  rx="1" fill="#C8D400" opacity="0.5"/>
                <rect x="29" y="27" width="4" height="11" rx="1" fill="#C8D400" opacity="0.75"/>
                <rect x="35" y="23" width="4" height="15" rx="1" fill="#C8D400" opacity="1"/>
                <polyline points="25,30 31,26 37,22 41,19" fill="none" stroke="#C8D400" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="41" cy="19" r="2" fill="#C8D400"/>
            </>
        ),
        1: ( // on-chain wave
            <>
                <polyline points="20,34 25,28 30,32 35,24 40,30 45,22"
                          fill="none" stroke="#C8D400" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                {[20,25,30,35,40,45].map((x,i)=>(
                    <circle key={i} cx={x} cy={[34,28,32,24,30,22][i]} r="2"
                            fill="none" stroke="#C8D400" strokeWidth="1.2"/>
                ))}
                <line x1="20" y1="38" x2="46" y2="38" stroke="#C8D400" strokeWidth="0.6" opacity="0.25"/>
            </>
        ),
        2: ( // pie + dots
            <>
                <circle cx="28" cy="30" r="10" fill="none" stroke="rgba(200,212,0,0.15)" strokeWidth="10"/>
                <circle cx="28" cy="30" r="10" fill="none" stroke="#C8D400" strokeWidth="10"
                        strokeDasharray="60 40" strokeDashoffset="25" opacity="0.9"
                        style={{transformOrigin:"28px 30px",transform:"rotate(-90deg)"}}/>
                <circle cx="28" cy="30" r="10" fill="none" stroke="rgba(200,212,0,0.4)" strokeWidth="10"
                        strokeDasharray="25 75" strokeDashoffset="-35" opacity="0.9"
                        style={{transformOrigin:"28px 30px",transform:"rotate(-90deg)"}}/>
                <circle cx="28" cy="30" r="5" fill="#0e0f0a"/>
                <rect x="41" y="23" width="8" height="2" rx="1" fill="#C8D400" opacity="0.8"/>
                <rect x="41" y="28" width="5" height="2" rx="1" fill="#C8D400" opacity="0.5"/>
                <rect x="41" y="33" width="6" height="2" rx="1" fill="#C8D400" opacity="0.35"/>
            </>
        ),
        3: ( // portfolio diverging bars
            <>
                <line x1="32" y1="18" x2="32" y2="40" stroke="#C8D400" strokeWidth="0.6" opacity="0.3"/>
                <rect x="20" y="21" width="12" height="4" rx="1" fill="#C8D400" opacity="0.45"/>
                <rect x="20" y="27" width="9"  height="4" rx="1" fill="#C8D400" opacity="0.65"/>
                <rect x="20" y="33" width="6"  height="4" rx="1" fill="#C8D400" opacity="0.35"/>
                <rect x="32" y="21" width="10" height="4" rx="1" fill="#C8D400" opacity="0.5"/>
                <rect x="32" y="27" width="14" height="4" rx="1" fill="#C8D400" opacity="0.85"/>
                <rect x="32" y="33" width="8"  height="4" rx="1" fill="#C8D400" opacity="0.4"/>
            </>
        ),
    }[variant];

    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none"
             style={{overflow:"visible",flexShrink:0}}>
            <defs>
                <radialGradient id={`lg${variant}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#C8D400" stopOpacity="0.28"/>
                    <stop offset="100%" stopColor="#C8D400" stopOpacity="0"/>
                </radialGradient>
            </defs>

            {/* ambient glow */}
            <circle cx="32" cy="32" r="30" fill={`url(#lg${variant})`}/>

            {/* outer dashed orbit */}
            <circle cx="32" cy="32" r="29" fill="none" stroke="#C8D400"
                    strokeWidth="0.8" strokeDasharray="3 4" opacity="0.45"/>

            {/* lens body */}
            <circle cx="32" cy="30" r="18" fill="rgba(200,212,0,0.09)"
                    stroke="#C8D400" strokeWidth="2.2" opacity="1"/>

            {/* inner content */}
            {inner}

            {/* lens shine arc */}
            <path d="M20 20 Q23 16 29 15" fill="none" stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.6" strokeLinecap="round"/>

            {/* handle */}
            <line x1="45" y1="45" x2="56" y2="56"
                  stroke="rgba(200,212,0,0.4)" strokeWidth="7" strokeLinecap="round"/>
            <line x1="45" y1="45" x2="56" y2="56"
                  stroke="#C8D400" strokeWidth="4" strokeLinecap="round" opacity="1"/>

            {/* handle tip glow dot */}
            <circle cx="56" cy="56" r="3.5" fill="#C8D400" opacity="0.7"/>

            {/* pulsing ring */}
            <circle cx="32" cy="30" r="18" fill="none" stroke="#C8D400" strokeWidth="1" opacity="0.45">
                <animate attributeName="r"       values="18;23;18" dur="2.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.45;0;0.45" dur="2.8s" repeatCount="indefinite"/>
            </circle>
        </svg>
    );
}

const MODULES = [
    { num:"01", title:"Основы стоимостного инвестирования", desc:"Стоимостное инвестирование — выявление недооценённых ценных бумаг путём фундаментального анализа. Минимум теории, никакого теханализа, никаких криптовалют.", topics:["Фундаментальный анализ","Финансовые отчёты","Бухгалтерский учёт"] },
    { num:"02", title:"Анализ компаний и поиск идей",        desc:"Поиск и анализ компаний, акции которых котируются на NYSE, NASDAQ и других фондовых биржах. Практические разборы реальных кейсов.",                           topics:["NYSE / NASDAQ","Оценка компаний","Инвестиционные идеи"] },
    { num:"03",  title:"Инвестиционный портфель",             desc:"Построение и управление инвестиционным портфелем. Практические занятия по работе с различными классами активов на реальных примерах.",                           topics:["Акции / Облигации","ETF / IPO","Опционы"] },
    { num:"04", title:"Практика под нагрузкой",               desc:"Курс включает преимущественно практические занятия по поиску и анализу ценных бумаг. Работа с реальными кейсами фонда в режиме реального времени.",              topics:["Разбор кейсов","Реальные сделки","Система решений"] },
];

function ModuleCard({ mod, isOdd, isLastRow, index }) {
    const [hov, setHov] = useState(false);
    const ref  = useRef(null);
    const [vis, setVis] = useState(false);

    // Alternating direction: even cols slide from left, odd from right
    const dir = isOdd ? "translateX(-20px)" : "translateX(20px)";

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setTimeout(() => setVis(true), index * 100); obs.disconnect(); }
        }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [index]);

    return (
        <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
             style={{
                 padding:"clamp(24px,3vw,36px)", background: hov ? "#232518" : "#1e2018",
                 position:"relative", overflow:"hidden", cursor:"default",
                 borderRight: isOdd ? "1px solid rgba(200,212,0,0.1)" : "none",
                 borderBottom: !isLastRow ? "1px solid rgba(200,212,0,0.1)" : "none",
                 opacity: vis ? 1 : 0,
                 transform: vis ? "none" : dir,
                 transition:`background .22s, opacity .65s cubic-bezier(.22,1,.36,1) ${index*.08}s, transform .65s cubic-bezier(.22,1,.36,1) ${index*.08}s`,
             }}>

            {/* large bg glyph — rises on hover */}
            <div style={{ position:"absolute", top:"50%", right:-6, transform:`translateY(-50%) ${hov?"scale(1.1) translateX(-4px)":"scale(1)"}`, fontSize:90, fontWeight:700, lineHeight:1, color:hov?"rgba(200,212,0,0.08)":"rgba(200,212,0,0.03)", pointerEvents:"none", userSelect:"none", fontFamily:"var(--mono)", transition:"all .4s ease" }}>{mod.glyph}</div>

            {/* loupe illustration — bottom-right, vivid, floats */}
            <div style={{ position:"absolute", bottom:-14, right:-14, pointerEvents:"none", userSelect:"none", opacity:hov?0.75:0.45, transform:hov?"scale(1.08)":"scale(1)", transition:"opacity .4s ease, transform .4s ease", animation:`loupeFloat${index} ${3.2+index*0.3}s ease-in-out infinite`, animationDelay:`${index*0.4}s` }}>
                <LoupeIcon variant={index} size={125}/>
            </div>

            {/* animated left bar on hover */}
            <div style={{ position:"absolute", top:0, left:0, width:2, height:hov?"100%":"0%", background:"linear-gradient(180deg,#C8D400 0%,rgba(200,212,0,0) 100%)", transition:"height .35s ease" }}/>

            {/* top accent dot on hover */}
            <div style={{ position:"absolute", top:0, left:0, width:hov?2:0, height:2, background:"#C8D400", transition:"width .5s ease" }}/>

            {/* Module number */}
            <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:14 }}>
                <span style={{ fontFamily:"var(--mono)", fontSize:"clamp(20px,3vw,24px)", fontWeight:600, color:hov?"#C8D400":"rgba(200,212,0,0.4)", letterSpacing:"-0.02em", lineHeight:1, transition:"color .25s, transform .25s", transform:hov?"scale(1.05)":"scale(1)", display:"inline-block", transformOrigin:"left center" }}>{mod.num}</span>
                <span style={{ fontSize:10, color:"#6b6c60", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>/ МОДУЛЬ</span>
            </div>

            <h3 style={{ fontSize:"clamp(15px,2.2vw,18px)", fontWeight:600, color:"#f2f2ec", letterSpacing:"-0.01em", marginBottom:10, lineHeight:1.3, position:"relative", zIndex:1 }}>{mod.title}</h3>
            <p  style={{ fontSize:"clamp(12px,1.6vw,14px)", color:"#9a9b8e", lineHeight:1.75, fontWeight:300, marginBottom:20, position:"relative", zIndex:1 }}>{mod.desc}</p>

            <div style={{ display:"flex", flexWrap:"wrap", gap:7, position:"relative", zIndex:1 }}>
                {mod.topics.map((t, ti) => (
                    <span key={t} style={{
                        fontSize:11, fontWeight:500,
                        color:hov?"#C8D400":"rgba(200,212,0,0.6)",
                        background:hov?"rgba(200,212,0,0.1)":"rgba(200,212,0,0.05)",
                        border:`1px solid ${hov?"rgba(200,212,0,0.25)":"rgba(200,212,0,0.11)"}`,
                        padding:"4px 10px", borderRadius:2, letterSpacing:"0.04em", fontFamily:"var(--mono)",
                        transition:`all .2s ease ${ti*.05}s`,
                        transform:hov?"translateY(-1px)":"none",
                    }}>{t}</span>
                ))}
            </div>
        </div>
    );
}

export default function Program() {
    const ref = useRef(null);
    const [vis, setVis] = useState({});

    useEffect(() => {
        const els = ref.current?.querySelectorAll("[data-fade]") ?? [];
        const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setVis(v => ({ ...v, [e.target.dataset.fade]: true })); }), { threshold: 0.1 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const f = (k, d=0) => ({ opacity:vis[k]?1:0, transform:vis[k]?"none":"translateY(20px)", transition:`opacity .65s cubic-bezier(.22,1,.36,1) ${d}s,transform .65s cubic-bezier(.22,1,.36,1) ${d}s` });

    return (
        <section id="program" ref={ref} style={{ padding:"clamp(64px,10vw,96px) clamp(16px,5vw,48px)" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>
                <div data-fade="tag" style={f("tag")}><span style={{ fontSize:11, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>◆ Программа обучения</span></div>
                <h2 data-fade="h2" style={{ ...f("h2",.06), fontSize:"clamp(26px,5vw,44px)", fontWeight:600, lineHeight:1.12, letterSpacing:"-.02em", margin:"14px 0 clamp(14px,2.5vw,20px)" }}>
                    Программа обучения<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>Полная методология</em>
                </h2>
                <p data-fade="lead" style={{ ...f("lead",.1), fontSize:"clamp(13px,2vw,16px)", color:"#9a9b8e", lineHeight:1.75, maxWidth:580, fontWeight:300, marginBottom:"clamp(28px,4.5vw,44px)" }}>
                    От базовых принципов оценки до построения собственной инвестиционной системы.
                </p>
                <div className="prog-grid" style={{ border:"1px solid rgba(200,212,0,0.1)", borderRadius:4, overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
                    {MODULES.map((mod, i) => <ModuleCard key={mod.num} mod={mod} isOdd={i%2===0} isLastRow={i>=MODULES.length-2} index={i}/>)}
                </div>

                {/* YouTube links */}
                <div data-fade="yt" style={{ ...f("yt", .2), marginTop:"clamp(24px,4vw,36px)", display:"flex", gap:12, flexWrap:"wrap" }}>
                    {[
                        { label:"Введение в стоимостное инвестирование", url:"https://www.youtube.com/watch?v=BrjW5BPhuCY" },
                        { label:"Короткий обзор методологии", url:"https://www.youtube.com/shorts/9T95M5kkZws" },
                    ].map((v, i) => (
                        <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={{
                            display:"inline-flex", alignItems:"center", gap:8,
                            padding:"10px 16px",
                            background:"rgba(200,212,0,0.04)",
                            border:"1px solid rgba(200,212,0,0.15)",
                            borderRadius:4, textDecoration:"none",
                            color:"#9a9b8e", fontSize:"clamp(11px,1.5vw,13px)", fontWeight:400,
                            transition:"all .18s ease",
                        }}
                           onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(200,212,0,0.4)"; e.currentTarget.style.color="#C8D400"; e.currentTarget.style.background="rgba(200,212,0,0.07)"; }}
                           onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(200,212,0,0.15)"; e.currentTarget.style.color="#9a9b8e"; e.currentTarget.style.background="rgba(200,212,0,0.04)"; }}>
                            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><rect width="18" height="18" rx="4" fill="#C8D400"/><path d="M7 6l5 3-5 3V6z" fill="#0e0f0a"/></svg>
                            {v.label}
                        </a>
                    ))}
                </div>
            </div>
            <style>{`
        @keyframes loupeFloat0{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes loupeFloat1{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes loupeFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes loupeFloat3{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@media(max-width:600px){.prog-grid{grid-template-columns:1fr!important}}`}</style>
        </section>
    );
}