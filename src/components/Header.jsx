import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase.config.js";
import { useAuth } from "../auth/useauth.js";

const IconChart = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><polyline points="1,10 4,6 7,8 10,3 12,5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconBook  = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="2" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><line x1="4" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="4" y1="7.5" x2="9" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IconTag   = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 1.5h4.5l5 5-4.5 4.5-5-5V1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="4" cy="4" r="0.9" fill="currentColor"/></svg>;
const IconArrow = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7.5 3L11 6.5 7.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const NAV    = [{ id:"research", label:"Исследовательские отчеты", icon:<IconChart/> }, { id:"program", label:"Программа", icon:<IconBook/> }, { id:"pricing", label:"Тарифы", icon:<IconTag/> }];
const GLYPHS = ["₿","◈","Ξ","◆","₿","◈","Ξ","◆"];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [ctaHov,   setCtaHov]   = useState(false);
    const { user, loading } = useAuth();
    const navigate   = useNavigate();
    const barFillRef = useRef(null);
    const barOrbRef  = useRef(null);
    const rafRef     = useRef(null);

    const handleCabinet = () => { navigate("/cabinet"); setMenuOpen(false); };
    const handleLogout  = async () => { await signOut(auth); setMenuOpen(false); };

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
            <div style={{ position:"fixed", top:0, left:0, width:"100%", height:3, zIndex:200, background:"rgba(200,212,0,0.06)", overflow:"hidden" }}>
                <div ref={barFillRef} style={{ position:"absolute", top:0, left:0, width:"0%", height:"100%", background:"linear-gradient(90deg,#7a8800,#C8D400 70%,#ecf500)", willChange:"width", boxShadow:"0 0 10px rgba(200,212,0,0.7)" }}/>
                <div ref={barOrbRef}  style={{ position:"absolute", top:"50%", left:"0%", transform:"translate(-50%,-50%)", width:7, height:7, borderRadius:"50%", opacity:0, background:"#f0ff00", boxShadow:"0 0 8px 3px rgba(200,212,0,0.9)", willChange:"left,opacity", pointerEvents:"none" }}/>
                {GLYPHS.map((g,i) => { const pos=((i+1)/(GLYPHS.length+1))*100; return <div key={i} className="bar-glyph" data-pos={pos} style={{ position:"absolute", top:"50%", left:`${pos}%`, transform:"translate(-50%,-50%)", fontSize:7, fontWeight:700, color:"rgba(200,212,0,0.22)", pointerEvents:"none", zIndex:2 }}>{g}</div>; })}
            </div>

            <header style={{ position:"fixed", top:3, left:0, width:"100%", zIndex:100, padding:"0 clamp(14px,4vw,20px)", transition:"background 0.3s, border-color 0.3s", ...(scrolled ? { background:"rgba(14,15,10,0.93)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", borderBottom:"1px solid rgba(200,212,0,0.12)" } : {}) }}>
                <div style={{ maxWidth:1100, margin:"0 auto", height:"clamp(50px,7vw,60px)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

                    <a href="#" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none", flexShrink:0 }}>
                        <div style={{ width:30, height:30, border:"1.5px solid #C8D400", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontSize:9, fontWeight:600, color:"#C8D400", background:"rgba(200,212,0,0.05)" }}>TMN</div>
                        <div style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}>
                            <span style={{ fontSize:14, fontWeight:600, color:"#f2f2ec", letterSpacing:"0.04em" }}>Academy</span>
                            <span className="hdr-sub" style={{ fontSize:8, color:"#6b6c60", letterSpacing:"0.18em", textTransform:"uppercase" }}>Исследовательские отчеты</span>
                        </div>
                    </a>

                    <nav className="hdr-nav" style={{ display:"flex", gap:2 }}>
                        {NAV.map(({ id, label, icon }) => <NavLink key={id} id={id} label={label} icon={icon} onNav={scrollTo}/>)}
                    </nav>

                    {loading ? (
                        <div style={{ width:36, height:36, flexShrink:0 }}/>
                    ) : user ? (
                        <Avatar user={user} onCabinet={handleCabinet} onLogout={handleLogout}/>
                    ) : (
                        <button onClick={() => scrollTo("register")} onMouseEnter={() => setCtaHov(true)} onMouseLeave={() => setCtaHov(false)} className="hdr-cta"
                                style={{ position:"relative", overflow:"hidden", padding:"8px 14px", background:ctaHov?"#d4e000":"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:12, fontWeight:600, border:"none", borderRadius:4, cursor:"pointer", display:"flex", alignItems:"center", gap:6, transition:"all 0.2s ease" }}>
                            <span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)", transform:ctaHov?"translateX(100%)":"translateX(-100%)", transition:"transform 0.4s ease" }}/>
                            <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:6 }}><IconArrow/> Начать обучение</span>
                        </button>
                    )}

                    <BurgerBtn open={menuOpen} onClick={() => setMenuOpen(v=>!v)}/>
                </div>
            </header>

            {menuOpen && (
                <>
                    <div onClick={() => setMenuOpen(false)} style={{ position:"fixed", inset:0, zIndex:998, background:"rgba(0,0,0,0.65)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)", animation:"bdFade .2s ease" }}/>
                    <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:999, background:"#0e0f0a", border:"1px solid rgba(200,212,0,0.18)", borderRadius:"18px 18px 0 0", paddingBottom:"max(20px,env(safe-area-inset-bottom))", animation:"sheetUp .28s cubic-bezier(0.22,1,0.36,1)", boxShadow:"0 -16px 60px rgba(0,0,0,0.6)" }}>
                        <div style={{ display:"flex", justifyContent:"center", padding:"14px 0 6px" }}>
                            <div style={{ width:40, height:4, borderRadius:2, background:"rgba(200,212,0,0.22)" }}/>
                        </div>
                        {NAV.map(({ id, label, icon }) => (
                            <button key={id} onClick={() => scrollTo(id)} style={{ display:"flex", width:"100%", alignItems:"center", gap:14, padding:"16px 22px", color:"#9a9b8e", background:"none", border:"none", borderBottom:"1px solid rgba(200,212,0,0.06)", fontSize:16, cursor:"pointer", fontFamily:"var(--ff)", textAlign:"left", boxSizing:"border-box" }}>
                                <span style={{ opacity:0.5, display:"flex", flexShrink:0 }}>{icon}</span>{label}
                            </button>
                        ))}
                        <div style={{ padding:"16px 22px 0", display:"flex", flexDirection:"column", gap:10 }}>
                            {!loading && user ? (
                                <>
                                    <button onClick={handleCabinet} style={{ width:"100%", padding:"15px", background:"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:15, fontWeight:600, border:"none", borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxSizing:"border-box" }}>
                                        Личный кабинет
                                    </button>
                                    <button onClick={handleLogout} style={{ width:"100%", padding:"12px", background:"transparent", color:"#6b6c60", fontFamily:"var(--ff)", fontSize:13, fontWeight:500, border:"1px solid rgba(200,212,0,0.15)", borderRadius:8, cursor:"pointer", boxSizing:"border-box" }}>
                                        Выйти из аккаунта
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => scrollTo("register")} style={{ width:"100%", padding:"15px", background:"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:15, fontWeight:600, border:"none", borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxSizing:"border-box" }}>
                                    <IconArrow/> Начать обучение
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}

            <style>{`
        .hdr-nav,.hdr-cta{display:flex!important}
        .burger-btn{display:none!important}
        @keyframes bdFade{from{opacity:0}to{opacity:1}}
        @keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes dropIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
        @media(max-width:768px){
          .hdr-nav,.hdr-cta,.hdr-avatar{display:none!important}
          .burger-btn{display:flex!important}
          .hdr-sub{display:none!important}
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

function Avatar({ user, onCabinet, onLogout }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [open]);

    const letter = (user?.email?.[0] ?? "?").toUpperCase();
    const email  = user?.email ?? "";
    const short  = email.length > 22 ? email.slice(0,20)+"…" : email;

    return (
        <div ref={ref} className="hdr-avatar" style={{ position:"relative", flexShrink:0 }}>
            <button onClick={() => setOpen(v=>!v)} style={{
                width:36, height:36, borderRadius:"50%",
                background:open?"#C8D400":"rgba(200,212,0,0.08)",
                border:`1.5px solid ${open?"#C8D400":"rgba(200,212,0,0.4)"}`,
                color:open?"#0e0f0a":"#C8D400",
                fontFamily:"monospace", fontSize:14, fontWeight:700,
                cursor:"pointer", outline:"none",
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative", transition:"all .2s",
            }}>
                {letter}
                <span style={{ position:"absolute", bottom:1, right:1, width:8, height:8, borderRadius:"50%", background:"#C8D400", border:"2px solid #0e0f0a", boxShadow:"0 0 6px rgba(200,212,0,0.9)", display:"block" }}/>
            </button>

            {open && (
                <div style={{ position:"fixed", top:64, right:16, width:220, background:"#0e0f0a", border:"1px solid rgba(200,212,0,0.25)", borderRadius:8, overflow:"hidden", boxShadow:"0 16px 48px rgba(0,0,0,0.8)", zIndex:9999, animation:"dropIn .18s ease" }}>
                    <div style={{ padding:"12px 14px", borderBottom:"1px solid rgba(200,212,0,0.08)" }}>
                        <div style={{ fontSize:9, color:"rgba(200,212,0,0.5)", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:3 }}>Аккаунт</div>
                        <div style={{ fontSize:12, color:"#9a9b8e", fontFamily:"monospace", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{short}</div>
                    </div>
                    <button onClick={() => { setOpen(false); onCabinet(); }}
                            style={{ width:"100%", padding:"11px 14px", background:"none", border:"none", borderBottom:"1px solid rgba(200,212,0,0.06)", cursor:"pointer", display:"flex", alignItems:"center", gap:10, color:"#f2f2ec", fontSize:13, fontFamily:"var(--ff)", textAlign:"left", boxSizing:"border-box" }}
                            onMouseEnter={e=>e.currentTarget.style.background="rgba(200,212,0,0.07)"}
                            onMouseLeave={e=>e.currentTarget.style.background="none"}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2.5" stroke="#C8D400" strokeWidth="1.3"/><circle cx="7" cy="5.5" r="2" stroke="#C8D400" strokeWidth="1.2"/><path d="M2.5 12c0-2.2 2-3.5 4.5-3.5s4.5 1.3 4.5 3.5" stroke="#C8D400" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        Личный кабинет
                    </button>
                    <button onClick={() => { setOpen(false); onLogout(); }}
                            style={{ width:"100%", padding:"11px 14px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10, color:"#6b6c60", fontSize:13, fontFamily:"var(--ff)", textAlign:"left", boxSizing:"border-box" }}
                            onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,80,80,0.06)"; e.currentTarget.style.color="#ff6060"; }}
                            onMouseLeave={e=>{ e.currentTarget.style.background="none"; e.currentTarget.style.color="#6b6c60"; }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Выйти
                    </button>
                </div>
            )}
        </div>
    );
}