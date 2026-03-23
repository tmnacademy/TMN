import { useEffect, useRef, useState } from "react";

// ── Philosophy card icons ──────────────────────────────────────────────────
const PILLARS = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="10" width="6" height="14" rx="1.5" stroke="#C8D400" strokeWidth="1.5"/>
                <rect x="11" y="6"  width="6" height="18" rx="1.5" stroke="#C8D400" strokeWidth="1.5"/>
                <rect x="19" y="2"  width="6" height="22" rx="1.5" stroke="#C8D400" strokeWidth="1.5" fill="rgba(200,212,0,0.12)"/>
                <polyline points="4,22 8,16 14,10 22,4" stroke="#C8D400" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            </svg>
        ),
        title: "Финансовая отчетность",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="11" stroke="#C8D400" strokeWidth="1.5"/>
                <circle cx="14" cy="14" r="5" stroke="#C8D400" strokeWidth="1.5" fill="rgba(200,212,0,0.1)"/>
                <line x1="14" y1="3"  x2="14" y2="7"  stroke="#C8D400" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="14" y1="21" x2="14" y2="25" stroke="#C8D400" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3"  y1="14" x2="7"  y2="14" stroke="#C8D400" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="21" y1="14" x2="25" y2="14" stroke="#C8D400" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
        title: "Недооценённые активы",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 24 L4 10 L10 16 L14 8 L18 14 L22 6 L24 8" stroke="#C8D400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="7" r="2.5" fill="#C8D400" opacity="0.9"/>
                <line x1="4" y1="24" x2="24" y2="24" stroke="#C8D400" strokeWidth="1" opacity="0.3"/>
            </svg>
        ),
        title: "Долгосрочное инвестирование",
    },
];

export default function Philosophy() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    const [cardHov, setCardHov] = useState(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setVis(true); obs.disconnect(); }
        }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="philosophy" ref={ref} style={{ padding:"clamp(64px,10vw,96px) 0", background:"#0e0f0a", overflow:"hidden" }}>

            {/* ── Header + text (padded) ── */}
            <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 clamp(16px,5vw,48px)", marginBottom:"clamp(32px,5vw,56px)" }}>
                <div style={{ opacity:vis?1:0, transform:vis?"none":"translateY(20px)", transition:"opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)" }}>
                    <span style={{ fontSize:11, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>◈ Философия</span>
                </div>

                <div className="phil-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(32px,6vw,80px)", alignItems:"start", marginTop:16 }}>
                    {/* Left — heading */}
                    <div style={{ opacity:vis?1:0, transform:vis?"none":"translateX(-24px)", transition:"opacity .7s cubic-bezier(.22,1,.36,1) .06s, transform .7s cubic-bezier(.22,1,.36,1) .06s" }}>
                        <h2 style={{ fontSize:"clamp(26px,5vw,44px)", fontWeight:600, lineHeight:1.1, letterSpacing:"-0.02em", margin:0 }}>
                            Почему<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>TMN Academy?</em>
                        </h2>
                    </div>
                    {/* Right — text */}
                    <div style={{ opacity:vis?1:0, transform:vis?"none":"translateX(24px)", transition:"opacity .7s cubic-bezier(.22,1,.36,1) .12s, transform .7s cubic-bezier(.22,1,.36,1) .12s" }}>
                        <div style={{ width:32, height:2, background:"#C8D400", marginBottom:20 }}/>
                        <p style={{ fontSize:"clamp(13px,1.8vw,16px)", color:"#9a9b8e", lineHeight:1.8, fontWeight:300, margin:0 }}>
                            Стоимостное инвестирование - это выявление недооцененных
                            ценных бумаг путем фундаментального анализа.
                            Наша задача состоит в том, чтобы с помощью Фундаментального анализа, отыскать недооцененные активы задолго до того, как о них начнут говорит именитые СМИ и за долго до того, как на них обратит внимание инвестиционное
                            сообщество.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Three pillars ── */}
            <div style={{ maxWidth:1100, margin:"0 auto clamp(40px,6vw,64px)", padding:"0 clamp(16px,5vw,48px)" }}>
                <div className="phil-pillars" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                    {PILLARS.map((p, i) => (
                        <div key={i}
                             onMouseEnter={() => setCardHov(i)}
                             onMouseLeave={() => setCardHov(null)}
                             style={{
                                 padding:"clamp(20px,2.5vw,28px)",
                                 background: cardHov===i ? "#1e2018" : "#141510",
                                 border:`1px solid ${cardHov===i ? "rgba(200,212,0,0.28)" : "rgba(200,212,0,0.1)"}`,
                                 borderRadius:6,
                                 position:"relative",
                                 overflow:"hidden",
                                 opacity:vis?1:0,
                                 transform:vis?"none":"translateY(24px)",
                                 transition:`background .2s, border-color .2s, opacity .65s cubic-bezier(.22,1,.36,1) ${.18+i*.1}s, transform .65s cubic-bezier(.22,1,.36,1) ${.18+i*.1}s`,
                             }}>
                            {/* top accent */}
                            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,#C8D400,transparent)`, opacity:cardHov===i?1:0, transition:"opacity .2s" }}/>
                            {/* icon */}
                            <div style={{ marginBottom:16, opacity:cardHov===i?1:0.7, transition:"opacity .2s", transform:cardHov===i?"translateY(-2px)":"none" }}>
                                {p.icon}
                            </div>
                            <div style={{ fontSize:13, fontWeight:600, color:"#f2f2ec", marginBottom:8, letterSpacing:"-0.01em" }}>{p.title}</div>
                            <div style={{ fontSize:"clamp(11px,1.4vw,13px)", color:"#6b6c60", lineHeight:1.65, fontWeight:300 }}>{p.desc}</div>
                        </div>
                    ))}
                </div>
            </div>



            <style>{`
        @media(max-width:720px){
          .phil-grid{ grid-template-columns:1fr!important; gap:20px!important; }
          .phil-pillars{ grid-template-columns:1fr!important; }
        }
        @media(max-width:480px){
          .phil-pillars{ grid-template-columns:1fr 1fr!important; }
        }
      `}</style>
        </section>
    );
}