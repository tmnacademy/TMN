import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase.config.js";
import { useAuth } from "../auth/useauth.js";

const IconArrow  = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconLogout = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconTG     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21.5 4L2.5 11.5l6.5 2 2 6 3-4 5 3.5L21.5 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 13.5l8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const IconStar   = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 4H13l-3.5 2.5L11 12 7 9.5 3 12l1.5-4.5L1 5h4.5L7 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>;

const PLANS = [
    { name:"Базовый старт",         tag:"Basic",        price:"$50-100"    },
    { name:"Инвестор-практик",      tag:"Pro",          price:"$200-300"   },
    { name:"Личное наставничество", tag:"VIP",          price:"$1500-2500" },
];

const FEATURES = [
    "Основы стоимостного инвестирования",
    "Разбор финансовой отчётности компаний",
    "Квартальный интенсив (3–5 занятий)",
    "Мастер-группа по субботам — 1 год",
    "Доступ к архиву исследований TheMyNotes",
];

export default function Cabinet() {
    const { user }   = useAuth();
    const navigate   = useNavigate();
    const [btnHov,   setBtnHov]   = useState(false);
    const [logHov,   setLogHov]   = useState(false);
    const [planIdx,  setPlanIdx]  = useState(1);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    const selectedPlan = PLANS[planIdx];

    return (
        <div style={{ minHeight:"100dvh", background:"#0e0f0a", fontFamily:"var(--ff, 'DM Sans', sans-serif)", color:"#f2f2ec" }}>

            {/* ── Top bar ── */}
            <header style={{ position:"sticky", top:0, zIndex:50, borderBottom:"1px solid rgba(200,212,0,0.1)", background:"rgba(14,15,10,0.92)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", padding:"0 clamp(16px,5vw,48px)" }}>
                <div style={{ maxWidth:1100, margin:"0 auto", height:56, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    {/* Logo */}
                    <a href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
                        <div style={{ width:28, height:28, border:"1.5px solid #C8D400", borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:8, fontWeight:600, color:"#C8D400", background:"rgba(200,212,0,0.05)" }}>TMN</div>
                        <div style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}>
                            <span style={{ fontSize:13, fontWeight:600, color:"#f2f2ec", letterSpacing:"0.04em" }}>Academy</span>
                            <span style={{ fontSize:7, color:"#6b6c60", letterSpacing:"0.2em", textTransform:"uppercase" }}>Личный кабинет</span>
                        </div>
                    </a>

                    {/* User info + logout */}
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 12px", background:"rgba(200,212,0,0.05)", border:"1px solid rgba(200,212,0,0.12)", borderRadius:4 }}>
                            <div style={{ width:6, height:6, borderRadius:"50%", background:"#C8D400", boxShadow:"0 0 6px rgba(200,212,0,0.8)" }}/>
                            <span style={{ fontSize:12, color:"#9a9b8e", fontFamily:"monospace" }}>
                                {user?.email}
                            </span>
                        </div>
                        <button onClick={handleLogout}
                                onMouseEnter={() => setLogHov(true)}
                                onMouseLeave={() => setLogHov(false)}
                                style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", background:"transparent", border:`1px solid ${logHov?"rgba(200,212,0,0.3)":"rgba(200,212,0,0.12)"}`, borderRadius:4, cursor:"pointer", color:logHov?"#C8D400":"#6b6c60", fontSize:12, fontFamily:"var(--ff)", transition:"all .18s" }}>
                            <IconLogout/> Выйти
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Main content ── */}
            <main style={{ maxWidth:1100, margin:"0 auto", padding:"clamp(32px,6vw,64px) clamp(16px,5vw,48px)" }}>

                {/* Welcome */}
                <div style={{ marginBottom:"clamp(32px,5vw,52px)" }}>
                    <span style={{ fontSize:10, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"monospace" }}>◈ Личный кабинет</span>
                    <h1 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:600, lineHeight:1.1, letterSpacing:"-0.02em", margin:"10px 0 6px" }}>
                        Добро пожаловать,<br/>
                        <em style={{ fontStyle:"normal", color:"#C8D400" }}>
                            {user?.email?.split("@")[0] ?? "инвестор"}
                        </em>
                    </h1>
                    <p style={{ fontSize:"clamp(12px,1.6vw,14px)", color:"#6b6c60", fontWeight:300, margin:0 }}>
                        Выберите тариф и оформите доступ к обучению через Telegram.
                    </p>
                </div>

                <div className="cab-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(16px,3vw,32px)", alignItems:"start" }}>

                    {/* Left — plan selector */}
                    <div>
                        <div style={{ fontSize:11, color:"#6b6c60", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:14 }}>Выберите тариф</div>
                        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                            {PLANS.map((plan, i) => {
                                const sel = planIdx === i;
                                return (
                                    <button key={i} onClick={() => setPlanIdx(i)}
                                            style={{
                                                display:"flex", alignItems:"center", justifyContent:"space-between",
                                                padding:"clamp(14px,2vw,18px) clamp(16px,2.5vw,20px)",
                                                background: sel ? "#1e2018" : "#141510",
                                                border: `1px solid ${sel ? "rgba(200,212,0,0.35)" : "rgba(200,212,0,0.1)"}`,
                                                borderRadius:6, cursor:"pointer", textAlign:"left",
                                                boxShadow: sel ? "0 0 0 1px rgba(200,212,0,0.1), 0 8px 24px rgba(0,0,0,0.3)" : "none",
                                                transition:"all .2s ease", position:"relative", overflow:"hidden",
                                            }}>
                                        {sel && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#C8D400,transparent)" }}/>}
                                        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                                            <span style={{ fontSize:9, fontWeight:500, color: sel?"#C8D400":"#6b6c60", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"monospace" }}>{plan.tag}</span>
                                            <span style={{ fontSize:"clamp(13px,1.8vw,15px)", fontWeight:600, color:"#f2f2ec" }}>{plan.name}</span>
                                        </div>
                                        <span style={{ fontSize:"clamp(14px,2vw,18px)", fontWeight:700, color: sel?"#C8D400":"#9a9b8e", fontFamily:"monospace", letterSpacing:"-0.02em" }}>{plan.price}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Features list */}
                        <div style={{ marginTop:20, padding:"16px 18px", background:"#141510", border:"1px solid rgba(200,212,0,0.08)", borderRadius:6 }}>
                            <div style={{ fontSize:10, color:"#6b6c60", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:12 }}>Что входит</div>
                            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                                {FEATURES.map((f, i) => (
                                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:9, fontSize:"clamp(11px,1.4vw,13px)", color:"#9a9b8e", fontWeight:300, lineHeight:1.5 }}>
                                        <span style={{ color:"#C8D400", flexShrink:0, marginTop:1 }}><IconStar/></span>
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — pay card */}
                    <div>
                        <div style={{ fontSize:11, color:"#6b6c60", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:14 }}>Оформление доступа</div>
                        <div style={{
                            background:"#141510",
                            border:"1px solid rgba(200,212,0,0.18)",
                            borderRadius:6, padding:"clamp(24px,3vw,36px)",
                            position:"relative", overflow:"hidden",
                            animation:"borderPulse 4s ease-in-out infinite",
                        }}>
                            {/* Scan line */}
                            <div style={{ position:"absolute", top:0, left:0, right:0, height:"25%", background:"linear-gradient(180deg,rgba(200,212,0,0.03),transparent)", animation:"scanLine 5s linear infinite", pointerEvents:"none" }}/>
                            {/* Corner brackets */}
                            {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
                                <div key={i} style={{ position:"absolute", width:16, height:16, zIndex:2,
                                    ...pos,
                                    borderTop:    (pos.top    !== undefined) ? "2px solid rgba(200,212,0,0.5)" : "none",
                                    borderBottom: (pos.bottom !== undefined) ? "2px solid rgba(200,212,0,0.5)" : "none",
                                    borderLeft:   (pos.left   !== undefined) ? "2px solid rgba(200,212,0,0.5)" : "none",
                                    borderRight:  (pos.right  !== undefined) ? "2px solid rgba(200,212,0,0.5)" : "none",
                                }}/>
                            ))}

                            {/* Selected plan summary */}
                            <div style={{ marginBottom:24 }}>
                                <div style={{ fontSize:9, color:"rgba(200,212,0,0.6)", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:8 }}>Выбранный тариф</div>
                                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:4 }}>
                                    <span style={{ fontSize:"clamp(20px,3.5vw,28px)", fontWeight:700, color:"#f2f2ec", fontFamily:"monospace", letterSpacing:"-0.03em" }}>{selectedPlan.price}</span>
                                    <span style={{ fontSize:11, color:"#6b6c60", fontFamily:"monospace" }}>единоразово</span>
                                </div>
                                <div style={{ fontSize:"clamp(13px,1.8vw,15px)", fontWeight:600, color:"#C8D400" }}>{selectedPlan.name}</div>
                            </div>

                            <div style={{ width:"100%", height:1, background:"rgba(200,212,0,0.1)", marginBottom:24 }}/>

                            {/* Info */}
                            <p style={{ fontSize:"clamp(11px,1.4vw,13px)", color:"#6b6c60", lineHeight:1.7, fontWeight:300, marginBottom:24 }}>
                                После нажатия кнопки вы перейдёте в Telegram к куратору. Укажите выбранный тариф — он ответит в течение нескольких часов и организует оплату.
                            </p>

                            {/* PAY BUTTON */}
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    const email = user?.email ?? "";
                                    window.open(`https://t.me/ba_n_di_t_7_7_7?text=Hello! I want to buy a course. Plan: ${selectedPlan.tag} ${selectedPlan.price}. Email: ${email}`, "_blank");
                                }}
                                target="_blank" rel="noopener noreferrer"
                                onMouseEnter={() => setBtnHov(true)}
                                onMouseLeave={() => setBtnHov(false)}
                                style={{
                                    display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                                    width:"100%", padding:"clamp(14px,2vw,18px)",
                                    background: btnHov ? "#d4e000" : "#C8D400",
                                    color:"#0e0f0a",
                                    fontFamily:"var(--ff)", fontSize:"clamp(13px,1.8vw,15px)", fontWeight:700,
                                    borderRadius:4, textDecoration:"none",
                                    position:"relative", overflow:"hidden",
                                    transform: btnHov ? "translateY(-2px)" : "none",
                                    boxShadow: btnHov ? "0 8px 28px rgba(200,212,0,0.35)" : "0 2px 10px rgba(200,212,0,0.15)",
                                    transition:"all .2s ease",
                                    boxSizing:"border-box",
                                }}>
                                <span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)", transform:btnHov?"translateX(100%)":"translateX(-100%)", transition:"transform .45s ease" }}/>
                                <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:10 }}>
                                    <IconTG/> Оплатить через Telegram <IconArrow/>
                                </span>
                            </a>

                            <p style={{ fontSize:10, color:"#3a3b34", fontFamily:"monospace", textAlign:"center", marginTop:12 }}>
                                Переход в Telegram · @ba_n_di_t_7_7_7
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
        @keyframes borderPulse { 0%,100%{border-color:rgba(200,212,0,0.18)} 50%{border-color:rgba(200,212,0,0.38)} }
        @keyframes scanLine    { 0%{top:-25%} 100%{top:110%} }
        @media(max-width:680px){ .cab-grid{ grid-template-columns:1fr!important; } }
      `}</style>
        </div>
    );
}