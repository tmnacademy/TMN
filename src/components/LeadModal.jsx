import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase.config.js";

function useAuthLocal() {
    const [user, setUser] = useState(auth.currentUser);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => setUser(u));
        return unsub;
    }, []);
    return user;
}

const IconClose = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
const IconMail  = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><rect x="1" y="2.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5l7 4.5L15 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const IconLock  = () => <svg width="13" height="13" viewBox="0 0 15 15" fill="none"><rect x="3" y="6.5" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 6.5V4.5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const IconArrow = () => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

function fbErr(code) {
    return ({
        "auth/email-already-in-use": "Email уже зарегистрирован — попробуйте войти.",
        "auth/invalid-email":         "Некорректный email.",
        "auth/weak-password":         "Пароль — минимум 6 символов.",
        "auth/invalid-credential":    "Неверный email или пароль.",
        "auth/user-not-found":        "Пользователь не найден.",
        "auth/wrong-password":        "Неверный пароль.",
        "auth/too-many-requests":     "Слишком много попыток. Подождите.",
    })[code] ?? "Ошибка. Попробуйте снова.";
}

export default function LeadModal() {
    const user     = useAuthLocal();
    const navigate = useNavigate();

    const [open,     setOpen]     = useState(false);
    const [mode,     setMode]     = useState("register");
    const [name,     setName]     = useState("");
    const [email,    setEmail]    = useState("");
    const [password, setPassword] = useState("");
    const [err,      setErr]      = useState("");
    const [focus,    setFocus]    = useState(null);
    const [loading,  setLoading]  = useState(false);
    const [btnHov,   setBtnHov]   = useState(false);

    const hasShown = useRef(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (user) { clearTimeout(timerRef.current); return; }
        if (sessionStorage.getItem("modal_dismissed")) return;
        timerRef.current = setTimeout(() => {
            if (!hasShown.current) { hasShown.current = true; setOpen(true); }
        }, 25000);
        return () => clearTimeout(timerRef.current);
    }, [user]);

    useEffect(() => {
        if (!open) return;
        const onKey = e => { if (e.key === "Escape") dismiss(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const dismiss = () => {
        setOpen(false);
        sessionStorage.setItem("modal_dismissed", "1");
    };

    const submit = async e => {
        e.preventDefault();
        if (!email.includes("@")) { setErr("Введите корректный email"); return; }
        if (password.length < 6)  { setErr("Пароль — минимум 6 символов"); return; }
        setErr(""); setLoading(true);
        try {
            if (mode === "register") {
                await createUserWithEmailAndPassword(auth, email.trim(), password);
            } else {
                await signInWithEmailAndPassword(auth, email.trim(), password);
            }
            setOpen(false);
            navigate("/cabinet");
        } catch (e) { setErr(fbErr(e.code)); }
        finally     { setLoading(false); }
    };

    if (user || !open) return null;

    const inp = (active, hasErr = false) => ({
        width:"100%", padding:"10px 12px",
        background:"rgba(200,212,0,0.03)",
        border:`1px solid ${hasErr?"rgba(255,80,80,.5)":active?"rgba(200,212,0,0.5)":"rgba(200,212,0,0.12)"}`,
        borderRadius:4, color:"#f2f2ec", fontFamily:"var(--ff)", fontSize:13,
        outline:"none", transition:"border-color .2s", boxSizing:"border-box",
    });

    return (
        <>
            <div onClick={dismiss} style={{ position:"fixed", inset:0, zIndex:900, background:"rgba(0,0,0,0.78)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", animation:"bdIn .25s ease" }}/>

            <div className="lm-outer" style={{
                position:"fixed", zIndex:901,
                top:"50%", left:"50%",
                transform:"translate(-50%,-50%)",
                width:"min(820px,calc(100vw - 24px))",
                maxHeight:"calc(100dvh - 24px)",
                overflowY:"auto",
                borderRadius:10,
                animation:"mdIn .32s cubic-bezier(.22,1,.36,1)",
                display:"grid",
                gridTemplateColumns:"1fr 1fr",
            }}>

                {/* ── LEFT — brand ── */}
                <div className="lm-brand" style={{ background:"#141510", border:"1px solid rgba(200,212,0,0.14)", borderRight:"none", borderRadius:"10px 0 0 10px", padding:"clamp(28px,4vw,44px)", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(200,212,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,212,0,0.03) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }}/>
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:"28%", background:"linear-gradient(180deg,rgba(200,212,0,.03),transparent)", animation:"regScan 5s linear infinite", pointerEvents:"none" }}/>
                    <div style={{ position:"absolute", top:-60, left:-60, width:200, height:200, background:"radial-gradient(circle,rgba(200,212,0,0.1),transparent 65%)", pointerEvents:"none" }}/>

                    <div style={{ position:"relative", zIndex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32 }}>
                            <div style={{ width:34, height:34, border:"1.5px solid #C8D400", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:10, fontWeight:600, color:"#C8D400", background:"rgba(200,212,0,0.05)", flexShrink:0 }}>TMN</div>
                            <div style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}>
                                <span style={{ fontSize:14, fontWeight:600, color:"#f2f2ec", letterSpacing:"0.04em" }}>Academy</span>
                                <span style={{ fontSize:9, color:"#6b6c60", letterSpacing:"0.18em", textTransform:"uppercase" }}>Исследовательские отчеты</span>
                            </div>
                        </div>

                        <div style={{ fontSize:10, color:"#C8D400", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:10 }}>
                            ◈ {mode === "register" ? "Регистрация" : "Вход в аккаунт"}
                        </div>
                        <h3 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:600, color:"#f2f2ec", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:14 }}>
                            {mode === "register"
                                ? <><br/><span style={{ color:"#C8D400" }}></span></>
                                : <>С возвращением<br/><span style={{ color:"#C8D400" }}>в TMN Academy</span></>
                            }
                        </h3>
                        <p style={{ fontSize:13, color:"#9a9b8e", lineHeight:1.7, fontWeight:300 }}>
                            {mode === "register"
                                ? "17 лет опыта. Стоимостное инвестирование на NYSE и NASDAQ."
                                : "Войдите, чтобы получить доступ к личному кабинету и материалам курса."
                            }
                        </p>
                    </div>

                    <div style={{ display:"flex", gap:10, marginTop:28, position:"relative", zIndex:1 }}>
                        {["₿","Ξ","◈","◆"].map((g,i)=>(
                            <span key={i} style={{ fontFamily:"monospace", fontSize:11, fontWeight:700, color:"rgba(200,212,0,0.25)", animation:`gPulse ${1.8+i*0.4}s ease-in-out infinite alternate`, animationDelay:`${i*0.2}s` }}>{g}</span>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT — form ── */}
                <div className="lm-form" style={{ background:"#1a1c14", border:"1px solid rgba(200,212,0,0.14)", borderRadius:"0 10px 10px 0", padding:"clamp(24px,4vw,44px)", position:"relative", display:"flex", flexDirection:"column", justifyContent:"center" }}>

                    <button onClick={dismiss} style={{ position:"absolute", top:14, right:14, width:30, height:30, borderRadius:6, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(200,212,0,0.12)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#6b6c60", transition:"all .18s" }}
                            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.3)";e.currentTarget.style.color="#C8D400";}}
                            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.12)";e.currentTarget.style.color="#6b6c60";}}>
                        <IconClose/>
                    </button>

                    <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:14, paddingTop:8 }}>
                        <div>
                            <div style={{ fontSize:10, color:"#C8D400", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:6 }}>
                                ◈ {mode === "register" ? "Регистрация" : "Вход"}
                            </div>
                            <h4 style={{ fontSize:"clamp(14px,2vw,18px)", fontWeight:600, color:"#f2f2ec", letterSpacing:"-.015em", lineHeight:1.22, margin:0 }}>
                                {mode === "register" ? "Создайте аккаунт" : "Войдите в аккаунт"}
                            </h4>
                        </div>

                        {mode === "register" && (
                            <div>
                                <label style={{ display:"block", fontSize:9, color:"#6b6c60", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:5 }}>Ваше имя</label>
                                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Александр" onFocus={()=>setFocus("name")} onBlur={()=>setFocus(null)} style={inp(focus==="name")}/>
                            </div>
                        )}

                        <div>
                            <label style={{ display:"block", fontSize:9, color:"#6b6c60", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:5 }}>Email <span style={{ color:"#C8D400" }}>*</span></label>
                            <div style={{ position:"relative" }}>
                                <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:focus==="email"?"#C8D400":"#4a4b42", transition:"color .2s", display:"flex", pointerEvents:"none" }}><IconMail/></span>
                                <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} required placeholder="you@example.com" onFocus={()=>setFocus("email")} onBlur={()=>setFocus(null)} style={{ ...inp(focus==="email"), paddingLeft:32 }}/>
                            </div>
                        </div>

                        <div>
                            <label style={{ display:"block", fontSize:9, color:"#6b6c60", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:5 }}>Пароль <span style={{ color:"#C8D400" }}>*</span></label>
                            <div style={{ position:"relative" }}>
                                <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:focus==="pass"?"#C8D400":"#4a4b42", transition:"color .2s", display:"flex", pointerEvents:"none" }}><IconLock/></span>
                                <input type="password" value={password} onChange={e=>{setPassword(e.target.value);setErr("");}} required placeholder="Минимум 6 символов" onFocus={()=>setFocus("pass")} onBlur={()=>setFocus(null)} style={{ ...inp(focus==="pass", !!err), paddingLeft:32 }}/>
                            </div>
                            {err && <p style={{ fontSize:10, color:"#ff6060", marginTop:4, fontFamily:"var(--mono)" }}>{err}</p>}
                        </div>

                        <p style={{ fontSize:10, color:"#3a3b34", lineHeight:1.55, fontFamily:"var(--mono)" }}>
                            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                        </p>

                        <button type="submit" disabled={loading}
                                onMouseEnter={()=>setBtnHov(true)} onMouseLeave={()=>setBtnHov(false)}
                                style={{ position:"relative", overflow:"hidden", padding:"12px 16px", background:loading?"rgba(200,212,0,0.5)":btnHov?"#d4e000":"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:13, fontWeight:600, border:"none", borderRadius:4, cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, transform:(!loading&&btnHov)?"translateY(-1px)":"none", boxShadow:btnHov?"0 5px 18px rgba(200,212,0,.32)":"0 2px 7px rgba(200,212,0,.1)", transition:"all .2s ease" }}>
                            <span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,.2),transparent)", transform:btnHov?"translateX(100%)":"translateX(-100%)", transition:"transform .4s ease" }}/>
                            <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:7 }}>
                                {loading ? "Загрузка…" : mode === "register" ? <>Создать аккаунт <IconArrow/></> : <>Войти <IconArrow/></>}
                            </span>
                        </button>

                        <button type="button" onClick={() => { setMode(m => m==="register"?"login":"register"); setErr(""); }}
                                style={{ background:"none", border:"none", cursor:"pointer", fontSize:11, color:"#6b6c60", fontFamily:"var(--mono)", padding:0, transition:"color .18s", alignSelf:"center" }}
                                onMouseEnter={e=>e.currentTarget.style.color="#C8D400"}
                                onMouseLeave={e=>e.currentTarget.style.color="#6b6c60"}>
                            {mode === "register" ? "Уже есть аккаунт? Войти →" : "Нет аккаунта? Зарегистрироваться →"}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
        @keyframes bdIn   { from{opacity:0} to{opacity:1} }
        @keyframes mdIn   { from{opacity:0;transform:translate(-50%,-50%) scale(.93)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes regScan{ 0%{top:-28%} 100%{top:128%} }
        @keyframes gPulse { from{opacity:.15} to{opacity:.5} }
        .lm-outer { scrollbar-width:none; }
        .lm-outer::-webkit-scrollbar { display:none; }
        input::placeholder { color:#3a3b34; }
        input { -webkit-appearance:none; }
        @media(max-width:600px){
          .lm-outer{ grid-template-columns:1fr!important; }
          .lm-brand{ border-radius:10px 10px 0 0!important; border-right:1px solid rgba(200,212,0,0.14)!important; border-bottom:none!important; }
          .lm-form { border-radius:0 0 10px 10px!important; }
        }
        @media(max-width:480px){
          .lm-outer{ top:auto!important; bottom:0!important; left:0!important; right:0!important; transform:none!important; width:100%!important; max-height:92dvh!important; border-radius:18px 18px 0 0!important; animation:sheetUp .3s cubic-bezier(.22,1,.36,1)!important; }
          .lm-brand{ padding:16px 20px!important; border-radius:18px 18px 0 0!important; border-right:none!important; border-bottom:1px solid rgba(200,212,0,0.1)!important; }
          .lm-brand h3{ font-size:15px!important; margin-bottom:4px!important; }
          .lm-brand p { display:none!important; }
          .lm-form{ padding:20px!important; border-radius:0!important; }
        }
        @keyframes sheetUp{ from{transform:translateY(100%)} to{transform:translateY(0)} }
      `}</style>
        </>
    );
}