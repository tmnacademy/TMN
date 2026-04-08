import { useEffect, useRef, useState } from "react";

const IconArrow = () => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconExt   = () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M4.5 2H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M6.5 1h3.5v3.5M10 1L6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconCheck = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#C8D400" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconGlobe = () => <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#C8D400" strokeWidth="1.4"/><path d="M10 2C8 5 7 7.5 7 10s1 5 3 8M10 2c2 3 3 5.5 3 8s-1 5-3 8" stroke="#C8D400" strokeWidth="1.4"/><line x1="2" y1="10" x2="18" y2="10" stroke="#C8D400" strokeWidth="1.4"/><line x1="3" y1="6" x2="17" y2="6" stroke="#C8D400" strokeWidth="1.4" opacity="0.5"/><line x1="3" y1="14" x2="17" y2="14" stroke="#C8D400" strokeWidth="1.4" opacity="0.5"/></svg>;

const BROKERS = [
    {
        name: "EXANTE",
        tag: "Прямой доступ к рынкам",
        desc: "Профессиональная платформа с прямым доступом к NYSE, NASDAQ и более 50 мировым биржам. Единый счёт для всех классов активов.",
        perks: ["Прямой доступ NYSE / NASDAQ", "50+ мировых бирж", "Единый счёт для всех активов"],
        href: "https://exante.eu/p/10863/",
        accent: "#C8D400",
    },
    {
        name: "Just2Trade",
        tag: "Широкий выбор инструментов",
        desc: "Брокер с широким набором инвестиционных инструментов, низкими комиссиями и удобным интерфейсом для долгосрочных инвесторов.",
        perks: ["Низкие комиссии", "Акции, ETF, опционы", "Удобный интерфейс"],
        href: "https://just2trade.online/ref/D110FBF46",
        accent: "#C8D400",
    },
    {
        name: "UTEX",
        tag: "Инновации в трейдинге",
        desc: "Современная платформа с инновационными инструментами анализа. Подходит для активных инвесторов, работающих с американскими рынками.",
        perks: ["Инновационные инструменты", "Рынки США", "Расширенная аналитика"],
        href: "https://utex.io/ru/?campaignId=THEMYNOTES",
        accent: "#C8D400",
    },
];

function BrokerCard({ broker, index, vis }) {
    const [hov, setHov] = useState(false);
    const [btnHov, setBtnHov] = useState(false);

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? "#1e2018" : "#141510",
                border: `1px solid ${hov ? "rgba(200,212,0,0.3)" : "rgba(200,212,0,0.12)"}`,
                borderRadius: 6,
                padding: "clamp(22px,2.8vw,32px)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateY(24px)",
                boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,212,0,0.1)" : "none",
                transition: `background .2s, border-color .2s, box-shadow .25s, opacity .65s cubic-bezier(.22,1,.36,1) ${index * .12}s, transform .65s cubic-bezier(.22,1,.36,1) ${index * .12}s`,
            }}>

            {/* Top accent line */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#C8D400,transparent)", opacity:hov?1:0.3, transition:"opacity .2s" }}/>

            {/* Corner ornament */}
            <div style={{ position:"absolute", top:12, right:12, width:14, height:14, borderTop:"1.5px solid rgba(200,212,0,0.3)", borderRight:"1.5px solid rgba(200,212,0,0.3)" }}/>
            <div style={{ position:"absolute", bottom:12, left:12, width:14, height:14, borderBottom:"1.5px solid rgba(200,212,0,0.3)", borderLeft:"1.5px solid rgba(200,212,0,0.3)" }}/>

            {/* Globe icon */}
            <div style={{ marginBottom:18, opacity:hov?1:0.6, transition:"opacity .2s, transform .25s", transform:hov?"translateY(-2px)":"none" }}>
                <IconGlobe/>
            </div>

            {/* Name + tag */}
            <div style={{ marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, flexWrap:"wrap" }}>
                    <span style={{ fontSize:"clamp(18px,2.5vw,22px)", fontWeight:700, color:"#f2f2ec", fontFamily:"var(--mono)", letterSpacing:"-0.02em" }}>
                        {broker.name}
                    </span>
                    <span style={{ fontSize:10, fontWeight:500, color:"#C8D400", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--mono)", padding:"3px 8px", background:"rgba(200,212,0,0.08)", border:"1px solid rgba(200,212,0,0.2)", borderRadius:3 }}>
                        {broker.tag}
                    </span>
                </div>
                <p style={{ fontSize:"clamp(12px,1.5vw,14px)", color:"#9a9b8e", lineHeight:1.7, fontWeight:300, margin:0 }}>
                    {broker.desc}
                </p>
            </div>

            {/* Perks */}
            <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:24, marginTop:4 }}>
                {broker.perks.map((perk, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:"clamp(11px,1.4vw,12px)", color:"#6b6c60", fontWeight:300 }}>
                        <span style={{ flexShrink:0 }}><IconCheck/></span>
                        {perk}
                    </div>
                ))}
            </div>

            {/* CTA button — pushes to bottom */}
            <div style={{ marginTop:"auto" }}>
                <a href={broker.href}
                   target="_blank" rel="noopener noreferrer"
                   onMouseEnter={() => setBtnHov(true)}
                   onMouseLeave={() => setBtnHov(false)}
                   style={{
                       display:"inline-flex", alignItems:"center", gap:8,
                       padding:"10px 18px",
                       background: btnHov ? "#C8D400" : "transparent",
                       color: btnHov ? "#0e0f0a" : "#C8D400",
                       border:"1px solid rgba(200,212,0,0.4)",
                       borderRadius:4, textDecoration:"none",
                       fontSize:"clamp(11px,1.4vw,13px)", fontWeight:600,
                       fontFamily:"var(--ff)",
                       transition:"all .18s ease",
                       transform:btnHov?"translateY(-1px)":"none",
                       boxShadow:btnHov?"0 4px 16px rgba(200,212,0,0.25)":"none",
                   }}>
                    Открыть счёт <span style={{ display:"flex", gap:4 }}><IconArrow/><IconExt/></span>
                </a>
            </div>

        </div>
    );
}

export default function Brokers() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setVis(true); obs.disconnect(); }
        }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="brokers" ref={ref} style={{ padding:"clamp(64px,10vw,96px) clamp(16px,5vw,48px)", background:"#0e0f0a" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>

                {/* Header */}
                <div style={{ opacity:vis?1:0, transform:vis?"none":"translateY(18px)", transition:"opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)" }}>
                    <span style={{ fontSize:11, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>◈ Партнёры</span>
                </div>

                <div className="brokers-hdr" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:24, flexWrap:"wrap", margin:"14px 0 clamp(28px,4vw,48px)" }}>
                    <h2 style={{ fontSize:"clamp(26px,5vw,44px)", fontWeight:600, lineHeight:1.1, letterSpacing:"-0.02em", margin:0, opacity:vis?1:0, transform:vis?"none":"translateY(18px)", transition:"opacity .65s cubic-bezier(.22,1,.36,1) .06s, transform .65s cubic-bezier(.22,1,.36,1) .06s" }}>
                        Наши<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>партнёры</em>
                    </h2>
                </div>

                {/* Cards */}
                <div className="brokers-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                    {BROKERS.map((b, i) => (
                        <BrokerCard key={b.name} broker={b} index={i} vis={vis}/>
                    ))}
                </div>
            </div>

            <style>{`
        @media(max-width:860px){ .brokers-grid{grid-template-columns:1fr!important} }
        @media(max-width:580px){ .brokers-hdr{flex-direction:column!important;align-items:flex-start!important} }
      `}</style>
        </section>
    );
}