import { useEffect, useState, useRef } from "react";

const IconChart = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><polyline points="1,10 4,6 7,8 10,3 12,5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconBook  = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="2" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><line x1="4" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="4" y1="7.5" x2="9" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IconTag   = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 1.5h4.5l5 5-4.5 4.5-5-5V1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="4" cy="4" r="0.9" fill="currentColor"/></svg>;
const IconArrow = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7.5 3L11 6.5 7.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const NAV = [{ id:"research", label:"Research", icon:<IconChart/> }, { id:"program", label:"Программа", icon:<IconBook/> }, { id:"pricing", label:"Тарифы", icon:<IconTag/> }];
const GLYPHS = ["₿","◈","Ξ","◆","₿","◈","Ξ","◆"];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [ctaHov,   setCtaHov]   = useState(false);
    const barFillRef = useRef(null);
    const barOrbRef  = useRef(null);
    const rafRef     = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const top = window.scrollY;
                const h   = document.documentElement.scrollHeight - window.innerHeight;
                const pct = h > 0 ? (top / h) * 100 : 0;
                setScrolled(top > 30);
                if (barFillRef.current) barFillRef.current.style.width = `${pct}%`;
                if (barOrbRef.current) {
                    barOrbRef.current.style.left    = `${pct}%`;
                    barOrbRef.current.style.opacity = pct > 0.5 ? "1" : "0";
                }
                document.querySelectorAll(".bar-glyph").forEach(el => {
                    el.style.color = pct >= parseFloat(el.dataset.pos) ? "#0e0f0a" : "rgba(200,212,0,0.22)";
                });
            });
        };
        window.addEventListener("scroll", onScroll, { passive:true });
        return () => { window.removeEventListener("scroll", onScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const scrollTo = id => {
        document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
        setMenuOpen(false);
    };

    return (
        <>
            {/* Scroll progress bar */}
            <div style={{ position:"fixed", top:0, left:0, width:"100%", height:3, zIndex:200, background:"rgba(200,212,0,0.06)", overflow:"hidden" }}>
                <div ref={barFillRef} style={{ position:"absolute", top:0, left:0, width:"0%", height:"100%", background:"linear-gradient(90deg,#7a8800,#C8D400 70%,#ecf500)", willChange:"width", boxShadow:"0 0 10px rgba(200,212,0,0.7)" }}/>
                <div ref={barOrbRef}  style={{ position:"absolute", top:"50%", left:"0%", transform:"translate(-50%,-50%)", width:7, height:7, borderRadius:"50%", opacity:0, background:"#f0ff00", boxShadow:"0 0 8px 3px rgba(200,212,0,0.9)", willChange:"left,opacity", pointerEvents:"none" }}/>
                {GLYPHS.map((g,i) => { const pos=((i+1)/(GLYPHS.length+1))*100; return <div key={i} className="bar-glyph" data-pos={pos} style={{ position:"absolute", top:"50%", left:`${pos}%`, transform:"translate(-50%,-50%)", fontSize:7, fontWeight:700, color:"rgba(200,212,0,0.22)", pointerEvents:"none", zIndex:2 }}>{g}</div>; })}
            </div>

            {/* Header bar — height 56px on desktop, 52px on mobile */}
            <header style={{ position:"fixed", top:3, left:0, width:"100%", zIndex:100, padding:"0 clamp(14px,4vw,20px)", transition:"background 0.3s, border-color 0.3s", ...(scrolled ? { background:"rgba(14,15,10,0.93)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", borderBottom:"1px solid rgba(200,212,0,0.12)" } : {}) }}>
                <div style={{ maxWidth:1100, margin:"0 auto", height:"clamp(50px,7vw,60px)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

                    <a href="#" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none", flexShrink:0 }}>
                        <div style={{ width:30, height:30, border:"1.5px solid #C8D400", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontSize:9, fontWeight:600, color:"#C8D400", background:"rgba(200,212,0,0.05)" }}>TMN</div>
                        <div style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}>
                            <span style={{ fontSize:14, fontWeight:600, color:"#f2f2ec", letterSpacing:"0.04em" }}>Academy</span>
                            <span className="hdr-sub" style={{ fontSize:8, color:"#6b6c60", letterSpacing:"0.18em", textTransform:"uppercase" }}>Research & Education</span>
                        </div>
                    </a>

                    <nav className="hdr-nav" style={{ display:"flex", gap:2 }}>
                        {NAV.map(({ id, label, icon }) => <NavLink key={id} id={id} label={label} icon={icon} onNav={scrollTo}/>)}
                    </nav>

                    <button onClick={() => scrollTo("pricing")} onMouseEnter={() => setCtaHov(true)} onMouseLeave={() => setCtaHov(false)} className="hdr-cta"
                            style={{ position:"relative", overflow:"hidden", padding:"8px 14px", background:ctaHov?"#d4e000":"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:12, fontWeight:600, border:"none", borderRadius:4, cursor:"pointer", display:"flex", alignItems:"center", gap:6, transition:"all 0.2s ease" }}>
                        <span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)", transform:ctaHov?"translateX(100%)":"translateX(-100%)", transition:"transform 0.4s ease" }}/>
                        <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:6 }}><IconArrow/> Начать обучение</span>
                    </button>

                    <BurgerBtn open={menuOpen} onClick={() => setMenuOpen(v=>!v)}/>
                </div>
            </header>

            {/* ─── MOBILE MENU: completely outside <header>, rendered at root level ─── */}
            {menuOpen && (
                <>
                    {/* Backdrop */}
                    <div onClick={() => setMenuOpen(false)}
                         style={{ position:"fixed", inset:0, zIndex:998, background:"rgba(0,0,0,0.65)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)", animation:"bdFade .2s ease" }}/>
                    {/* Sheet */}
                    <div style={{
                        position:"fixed", bottom:0, left:0, right:0, zIndex:999,
                        background:"#0e0f0a",
                        border:"1px solid rgba(200,212,0,0.18)",
                        borderRadius:"18px 18px 0 0",
                        paddingBottom:"max(20px,env(safe-area-inset-bottom))",
                        animation:"sheetUp .28s cubic-bezier(0.22,1,0.36,1)",
                        boxShadow:"0 -16px 60px rgba(0,0,0,0.6)",
                    }}>
                        {/* Drag handle */}
                        <div style={{ display:"flex", justifyContent:"center", padding:"14px 0 6px" }}>
                            <div style={{ width:40, height:4, borderRadius:2, background:"rgba(200,212,0,0.22)" }}/>
                        </div>
                        {/* Nav items */}
                        {NAV.map(({ id, label, icon }) => (
                            <button key={id} onClick={() => scrollTo(id)}
                                    style={{ display:"flex", width:"100%", alignItems:"center", gap:14, padding:"16px 22px", color:"#9a9b8e", background:"none", border:"none", borderBottom:"1px solid rgba(200,212,0,0.06)", fontSize:16, cursor:"pointer", fontFamily:"var(--ff)", textAlign:"left", boxSizing:"border-box" }}>
                                <span style={{ opacity:0.5, display:"flex", flexShrink:0 }}>{icon}</span>
                                {label}
                            </button>
                        ))}
                        {/* CTA */}
                        <div style={{ padding:"16px 22px 0" }}>
                            <button onClick={() => scrollTo("pricing")}
                                    style={{ width:"100%", padding:"15px", background:"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:15, fontWeight:600, border:"none", borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxSizing:"border-box" }}>
                                <IconArrow/> Начать обучение
                            </button>
                        </div>
                    </div>
                </>
            )}

            <style>{`
        .hdr-nav,.hdr-cta { display:flex!important }
        .burger-btn        { display:none!important }
        @keyframes bdFade  { from{opacity:0} to{opacity:1} }
        @keyframes sheetUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @media(max-width:768px){
          .hdr-nav,.hdr-cta  { display:none!important }
          .burger-btn        { display:flex!important }
          .hdr-sub           { display:none!important }
        }
      `}</style>
        </>
    );
}

function NavLink({ id, label, icon, onNav }) {
    const [hov, setHov] = useState(false);
    return (
        <a onClick={() => onNav(id)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
           style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 10px", borderRadius:4, cursor:"pointer", textDecoration:"none", fontSize:12, color:hov?"#C8D400":"#9a9b8e", background:hov?"rgba(200,212,0,0.07)":"transparent", border:`1px solid ${hov?"rgba(200,212,0,0.2)":"transparent"}`, transition:"all 0.18s ease", fontFamily:"var(--ff)" }}>
            <span style={{ opacity:hov?1:0.45, transition:"opacity 0.18s", display:"flex" }}>{icon}</span>{label}
        </a>
    );
}

function BurgerBtn({ open, onClick }) {
    return (
        <button onClick={onClick} className="burger-btn"
                style={{ display:"none", flexDirection:"column", gap:5, padding:"7px 8px", background:"none", border:"1px solid rgba(200,212,0,0.18)", borderRadius:6, cursor:"pointer" }} aria-label="Меню">
            {[0,1,2].map(i => (
                <span key={i} style={{ display:"block", width:19, height:1.5, background:"#f2f2ec", transformOrigin:"center", transition:"transform 0.3s, opacity 0.3s",
                    transform: open ? i===0 ? "translateY(6.5px) rotate(45deg)" : i===2 ? "translateY(-6.5px) rotate(-45deg)" : "" : "",
                    opacity: open && i===1 ? 0 : 1 }}/>
            ))}
        </button>
    );
}