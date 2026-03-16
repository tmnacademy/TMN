import { useEffect, useState, useRef } from "react";

const IconClose = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
const IconMail  = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="2.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5l7 4.5L15 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const IconArrow = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const PERKS = [
    "Еженедельный фундаментальный разбор рынков",
    "Сигналы на основе данных, а не чутья",
    "Ранний доступ к новым исследованиям",
    "Уведомления о запуске программы",
];

export default function LeadModal() {
    const [open,       setOpen]      = useState(false);
    const [email,      setEmail]     = useState("");
    const [name,       setName]      = useState("");
    const [sent,       setSent]      = useState(false);
    const [err,        setErr]       = useState("");
    const [btnHov,     setBtnHov]    = useState(false);
    const [emailFocus, setEmailFocus]= useState(false);
    const [nameFocus,  setNameFocus] = useState(false);
    const hasShown = useRef(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (sessionStorage.getItem("modal_dismissed")) return;
        timerRef.current = setTimeout(() => {
            if (!hasShown.current) { hasShown.current = true; setOpen(true); }
        }, 25000);
        return () => clearTimeout(timerRef.current);
    }, []);

    const dismiss = () => {
        setOpen(false);
        sessionStorage.setItem("modal_dismissed", "1");
    };

    const submit = e => {
        e.preventDefault();
        if (!email.includes("@")) { setErr("Введите корректный email"); return; }
        setErr("");
        setSent(true);
        // TODO: connect to email service
    };

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const onKey = e => { if (e.key === "Escape") dismiss(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    if (!open) return null;

    const inputStyle = active => ({
        width:"100%", padding:"11px 14px", background:"rgba(200,212,0,0.03)",
        border:`1px solid ${active?"rgba(200,212,0,0.5)":"rgba(200,212,0,0.12)"}`,
        borderRadius:4, color:"#f2f2ec", fontFamily:"var(--ff)", fontSize:14,
        outline:"none", transition:"border-color 0.2s", boxSizing:"border-box",
    });

    return (
        <>
            {/* Backdrop */}
            <div onClick={dismiss} style={{ position:"fixed", inset:0, zIndex:900, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", animation:"bdIn 0.25s ease" }}/>

            {/* Modal */}
            <div className="lead-modal-grid lead-modal-outer" style={{
                position:"fixed", zIndex:901,
                top:"50%", left:"50%",
                transform:"translate(-50%,-50%)",
                width:"min(820px,calc(100vw - 24px))",
                maxHeight:"calc(100dvh - 24px)",
                overflowY:"auto",
                borderRadius:10,
                animation:"mdIn 0.32s cubic-bezier(0.22,1,0.36,1)",
                display:"grid",
                gridTemplateColumns:"1fr 1fr",
            }}>

                {/* ── LEFT PANEL ── */}
                <div className="lead-modal-brand" style={{
                    background:"#0e0f0a",
                    border:"1px solid rgba(200,212,0,0.15)",
                    borderRight:"none",
                    borderRadius:"10px 0 0 10px",
                    padding:"clamp(28px,4vw,44px)",
                    display:"flex", flexDirection:"column", justifyContent:"space-between",
                    position:"relative", overflow:"hidden",
                }}>
                    {/* Grid bg */}
                    <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(200,212,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,212,0,0.03) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }}/>
                    {/* Glow */}
                    <div style={{ position:"absolute", top:-60, left:-60, width:200, height:200, background:"radial-gradient(circle,rgba(200,212,0,0.1),transparent 65%)", pointerEvents:"none" }}/>

                    <div className="lead-modal-brand-main" style={{ position:"relative", zIndex:1 }}>
                        {/* Logo */}
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
                            <div style={{ width:34, height:34, border:"1.5px solid #C8D400", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:10, fontWeight:600, color:"#C8D400", background:"rgba(200,212,0,0.05)", flexShrink:0 }}>TMN</div>
                            <div style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}>
                                <span style={{ fontSize:14, fontWeight:600, color:"#f2f2ec", letterSpacing:"0.04em" }}>Academy</span>
                                <span style={{ fontSize:9, color:"#6b6c60", letterSpacing:"0.18em", textTransform:"uppercase" }}>Research & Education</span>
                            </div>
                        </div>

                        <div style={{ fontSize:10, color:"#C8D400", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:10 }}>◈ Бесплатная подписка</div>
                        <h3 style={{ fontSize:"clamp(18px,2.5vw,24px)", fontWeight:600, color:"#f2f2ec", lineHeight:1.18, letterSpacing:"-0.02em", marginBottom:12 }}>
                            Получайте аналитику<br/><span style={{ color:"#C8D400" }}>раньше всех</span>
                        </h3>
                        <p style={{ fontSize:13, color:"#9a9b8e", lineHeight:1.7, fontWeight:300, marginBottom:24 }}>
                            17 лет опыта в одной рассылке. Только важное.
                        </p>

                        {/* Perks */}
                        <div className="lead-modal-perks" style={{ display:"flex", flexDirection:"column", gap:11 }}>
                            {PERKS.map((b, i) => (
                                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, animation:`perkIn 0.45s cubic-bezier(0.22,1,0.36,1) ${0.08+i*0.07}s both` }}>
                                    <div style={{ width:16, height:16, borderRadius:3, background:"rgba(200,212,0,0.1)", border:"1px solid rgba(200,212,0,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#C8D400" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                    <span style={{ fontSize:13, color:"#9a9b8e", lineHeight:1.5, fontWeight:300 }}>{b}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="lead-modal-brand-bottom" style={{ display:"flex", gap:10, marginTop:28, position:"relative", zIndex:1 }}>
                        {["₿","Ξ","◈","◆"].map((g,i)=>(
                            <span key={i} style={{ fontFamily:"monospace", fontSize:11, fontWeight:700, color:"rgba(200,212,0,0.25)", animation:`gPulse ${1.8+i*0.4}s ease-in-out infinite alternate`, animationDelay:`${i*0.2}s` }}>{g}</span>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="lead-modal-form" style={{
                    background:"#1a1c14",
                    border:"1px solid rgba(200,212,0,0.15)",
                    borderRadius:"0 10px 10px 0",
                    padding:"clamp(24px,4vw,44px)",
                    position:"relative",
                    display:"flex", flexDirection:"column",
                }}>
                    {/* Close */}
                    <button onClick={dismiss} aria-label="Закрыть"
                            style={{ position:"absolute", top:14, right:14, width:30, height:30, borderRadius:6, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(200,212,0,0.1)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#6b6c60", transition:"all 0.18s" }}
                            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.3)";e.currentTarget.style.color="#C8D400";}}
                            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.1)";e.currentTarget.style.color="#6b6c60";}}>
                        <IconClose/>
                    </button>

                    {!sent ? (
                        <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:16, flex:1, paddingTop:4 }}>
                            <div>
                                <div style={{ fontSize:10, color:"#C8D400", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:8 }}>₿ Подписаться бесплатно</div>
                                <h4 style={{ fontSize:"clamp(16px,2.2vw,20px)", fontWeight:600, color:"#f2f2ec", lineHeight:1.22, letterSpacing:"-0.015em", marginBottom:6 }}>
                                    Войдите в круг<br/>профессиональных инвесторов
                                </h4>
                                <p style={{ fontSize:12, color:"#6b6c60", lineHeight:1.6 }}>Введите email — первый выпуск придёт сразу после подтверждения.</p>
                            </div>

                            {/* Name */}
                            <div>
                                <label style={{ display:"block", fontSize:10, color:"#6b6c60", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:6 }}>Ваше имя</label>
                                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Александр"
                                       onFocus={()=>setNameFocus(true)} onBlur={()=>setNameFocus(false)}
                                       style={inputStyle(nameFocus)}/>
                            </div>

                            {/* Email */}
                            <div>
                                <label style={{ display:"block", fontSize:10, color:"#6b6c60", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:6 }}>Email <span style={{ color:"#C8D400" }}>*</span></label>
                                <div style={{ position:"relative" }}>
                                    <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", color:emailFocus?"#C8D400":"#4a4b42", transition:"color 0.2s", display:"flex", pointerEvents:"none" }}><IconMail/></span>
                                    <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} required
                                           placeholder="you@example.com"
                                           onFocus={()=>setEmailFocus(true)} onBlur={()=>setEmailFocus(false)}
                                           style={{ ...inputStyle(emailFocus || !!err), paddingLeft:36, borderColor:err?"rgba(255,80,80,0.5)":undefined }}/>
                                </div>
                                {err && <p style={{ fontSize:11, color:"#ff6060", marginTop:4, fontFamily:"monospace" }}>{err}</p>}
                            </div>

                            <p style={{ fontSize:10, color:"#3a3b34", lineHeight:1.6, fontFamily:"monospace" }}>
                                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Отписаться можно в любое время.
                            </p>

                            <button type="submit" onMouseEnter={()=>setBtnHov(true)} onMouseLeave={()=>setBtnHov(false)}
                                    style={{ marginTop:"auto", position:"relative", overflow:"hidden", padding:"12px 18px", background:btnHov?"#d4e000":"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:13, fontWeight:600, border:"none", borderRadius:4, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transform:btnHov?"translateY(-1px)":"none", boxShadow:btnHov?"0 6px 20px rgba(200,212,0,0.35)":"0 2px 8px rgba(200,212,0,0.12)", transition:"all 0.2s ease" }}>
                                <span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)", transform:btnHov?"translateX(100%)":"translateX(-100%)", transition:"transform 0.4s ease" }}/>
                                <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:8 }}>Подписаться <IconArrow/></span>
                            </button>

                            <p style={{ fontSize:10, color:"#3a3b34", textAlign:"center", fontFamily:"monospace" }}>5,000+ подписчиков · Бесплатно навсегда</p>
                        </form>
                    ) : (
                        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", gap:18, padding:"16px 0" }}>
                            <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(200,212,0,0.08)", border:"1px solid rgba(200,212,0,0.28)", display:"flex", alignItems:"center", justifyContent:"center", animation:"successGlow 2s ease-in-out infinite" }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3.5 12l5.5 5.5L20.5 6" stroke="#C8D400" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <div>
                                <h4 style={{ fontSize:18, fontWeight:600, color:"#f2f2ec", marginBottom:6 }}>Вы в списке!</h4>
                                <p style={{ fontSize:13, color:"#9a9b8e", lineHeight:1.6, maxWidth:220 }}>Проверьте {email} — письмо уже в пути.</p>
                            </div>
                            <button onClick={dismiss} style={{ padding:"9px 22px", background:"transparent", border:"1px solid rgba(200,212,0,0.18)", borderRadius:4, color:"#9a9b8e", cursor:"pointer", fontFamily:"var(--ff)", fontSize:13, transition:"all 0.18s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.4)";e.currentTarget.style.color="#C8D400";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.18)";e.currentTarget.style.color="#9a9b8e";}}>
                                Закрыть
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes bdIn   { from{opacity:0} to{opacity:1} }
        @keyframes mdIn   { from{opacity:0;transform:translate(-50%,-50%) scale(0.93)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes perkIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:none} }
        @keyframes gPulse { from{opacity:0.15} to{opacity:0.5} }
        @keyframes successGlow { 0%,100%{box-shadow:0 0 6px rgba(200,212,0,0.3)} 50%{box-shadow:0 0 20px rgba(200,212,0,0.7)} }
        .lead-modal-grid { scrollbar-width:none; }
        .lead-modal-grid::-webkit-scrollbar { display:none; }
        input::placeholder { color:#3a3b34; }
        input { -webkit-appearance:none; }

        /* Tablet — single column */
        @media(max-width:580px){
          .lead-modal-grid {
            grid-template-columns:1fr !important;
          }
          .lead-modal-grid > div:first-child {
            border-radius:10px 10px 0 0 !important;
            border-right:1px solid rgba(200,212,0,0.15) !important;
            border-bottom:none !important;
          }
          .lead-modal-grid > div:last-child {
            border-radius:0 0 10px 10px !important;
          }
        }

        /* Mobile — full-screen bottom sheet */
        @media(max-width:480px){
          /* Override the centered positioning to a bottom sheet */
          .lead-modal-outer{
            top:auto!important;
            bottom:0!important;
            left:0!important;
            right:0!important;
            transform:none!important;
            width:100%!important;
            max-height:92dvh!important;
            border-radius:16px 16px 0 0!important;
            animation:sheetUp 0.3s cubic-bezier(0.22,1,0.36,1)!important;
          }
          /* Left brand panel becomes a compact strip on mobile */
          .lead-modal-brand{
            padding:16px 20px!important;
            flex-direction:row!important;
            align-items:center!important;
            gap:14px!important;
            border-radius:16px 16px 0 0!important;
            border-right:none!important;
            border-bottom:1px solid rgba(200,212,0,0.1)!important;
          }
          .lead-modal-brand-main{flex:1!important}
          .lead-modal-brand h3{font-size:16px!important;margin-bottom:2px!important}
          .lead-modal-brand p{display:none!important}
          .lead-modal-perks{display:none!important}
          .lead-modal-brand-bottom{display:none!important}
          .lead-modal-form{
            padding:20px!important;
            border-radius:0!important;
          }
          /* Pull handle */
          .lead-modal-outer::before{
            content:'';
            display:block;
            width:36px; height:4px;
            background:rgba(200,212,0,0.25);
            border-radius:2px;
            margin:10px auto -4px;
          }
        }
        @keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      `}</style>
        </>
    );
}