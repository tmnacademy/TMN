import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase.config.js";

// ─── local auth hook (no context needed) ──────────────────────────────────
function useAuthLocal() {
    const [user, setUser] = useState(auth.currentUser);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => setUser(u));
        return unsub;
    }, []);
    return user;
}

const IconMail  = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><rect x="1" y="2.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5l7 4.5L15 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const IconLock  = () => <svg width="13" height="13" viewBox="0 0 15 15" fill="none"><rect x="3" y="6.5" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 6.5V4.5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const IconArrow = () => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

function fbErr(code) {
    return ({
        "auth/email-already-in-use":  "Email уже зарегистрирован — попробуйте войти.",
        "auth/invalid-email":          "Некорректный email.",
        "auth/weak-password":          "Пароль — минимум 6 символов.",
        "auth/invalid-credential":     "Неверный email или пароль.",
        "auth/user-not-found":         "Пользователь не найден.",
        "auth/wrong-password":         "Неверный пароль.",
        "auth/too-many-requests":      "Слишком много попыток. Подождите.",
    })[code] ?? "Ошибка. Попробуйте снова.";
}

export default function Register() {
    const user     = useAuthLocal();
    const navigate = useNavigate();
    const ref      = useRef(null);

    const [vis,      setVis]      = useState({});
    const [inView,   setInView]   = useState(false);
    const [mode,     setMode]     = useState("register");
    const [email,    setEmail]    = useState("");
    const [name,     setName]     = useState("");
    const [password, setPassword] = useState("");
    const [err,      setErr]      = useState("");
    const [btnHov,   setBtnHov]   = useState(false);
    const [cabHov,   setCabHov]   = useState(false);
    const [focus,    setFocus]    = useState(null);
    const [loading,  setLoading]  = useState(false);

    useEffect(() => {
        const els = ref.current?.querySelectorAll("[data-fade]") ?? [];
        const timers = [];
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const key = e.target.dataset.fade;
                    const t = setTimeout(() => { setVis(v => ({ ...v, [key]: true })); setInView(true); }, 0);
                    timers.push(t);
                }
            });
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
        return () => { obs.disconnect(); timers.forEach(clearTimeout); };
    }, []);

    const f = (k, d=0) => ({
        opacity: vis[k]?1:0,
        transform: vis[k]?"none":"translateY(16px)",
        transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${d}s, transform .6s cubic-bezier(.22,1,.36,1) ${d}s`,
    });

    const inp = (active, hasErr=false) => ({
        width:"100%", padding:"10px 12px",
        background:"rgba(200,212,0,0.03)",
        border:`1px solid ${hasErr?"rgba(255,80,80,.5)":active?"rgba(200,212,0,0.5)":"rgba(200,212,0,0.12)"}`,
        borderRadius:4, color:"#f2f2ec", fontFamily:"var(--ff)", fontSize:13,
        outline:"none", transition:"border-color .2s", boxSizing:"border-box",
    });

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
            navigate("/cabinet");
        } catch(e) { setErr(fbErr(e.code)); }
        finally    { setLoading(false); }
    };

    return (
        <section id="register" ref={ref} style={{ padding:"clamp(48px,8vw,96px) clamp(16px,5vw,48px)", background:"#0e0f0a", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(200,212,0,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(200,212,0,.02) 1px,transparent 1px)", backgroundSize:"36px 36px", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, background:"radial-gradient(circle,rgba(200,212,0,.06),transparent 65%)", pointerEvents:"none" }}/>

            <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>
                <div data-fade="tag" style={f("tag")}>
                    <span style={{ fontSize:10, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>◈ {user ? "Личный кабинет" : "Регистрация"}</span>
                </div>

                <div data-fade="box" className="reg-grid" style={{ ...f("box",.1), marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", border:"1px solid rgba(200,212,0,0.14)", borderRadius:8, overflow:"hidden" }}>

                    {/* LEFT */}
                    <div className="reg-left" style={{ background:"#141510", padding:"clamp(22px,3.5vw,44px)", position:"relative", overflow:"hidden", borderRight:"1px solid rgba(200,212,0,0.1)" }}>
                        <div style={{ position:"absolute", top:0, left:0, right:0, height:"28%", background:"linear-gradient(180deg,rgba(200,212,0,.03),transparent)", animation:"regScan 5s linear infinite", pointerEvents:"none" }}/>

                        <h2 style={{ fontSize:"clamp(18px,3vw,30px)", fontWeight:600, lineHeight:1.12, letterSpacing:"-.02em", color:"#f2f2ec", marginBottom:10, opacity:inView?1:0, transform:inView?"none":"translateX(-20px)", transition:"opacity .65s .1s,transform .65s .1s" }}>
                            {user ? <>Добро пожаловать<br/><span style={{ color:"#C8D400" }}>в кабинет</span></> : <>Получайте аналитику<br/><span style={{ color:"#C8D400" }}>раньше всех</span></>}
                        </h2>
                        <p style={{ fontSize:"clamp(11px,1.5vw,14px)", color:"#9a9b8e", lineHeight:1.7, fontWeight:300, marginBottom:"clamp(18px,2.5vw,28px)", opacity:inView?1:0, transform:inView?"none":"translateX(-16px)", transition:"opacity .65s .17s,transform .65s .17s" }}>
                            {user ? "Вы уже вошли в систему. Перейдите в личный кабинет для оформления обучения." : "Стоимостное инвестирование на финансовых рынках."}
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="reg-right" style={{ background:"#1a1c14", padding:"clamp(22px,3.5vw,44px)", display:"flex", flexDirection:"column", justifyContent:"center", opacity:inView?1:0, transform:inView?"none":"translateX(20px)", transition:"opacity .65s .14s,transform .65s .14s" }}>

                        {user ? (
                            /* ── LOGGED IN: show cabinet button ── */
                            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20, textAlign:"center" }}>
                                {/* Avatar */}
                                <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(200,212,0,0.08)", border:"2px solid rgba(200,212,0,0.35)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:28, fontWeight:700, color:"#C8D400", position:"relative" }}>
                                    {user.email?.[0]?.toUpperCase() ?? "?"}
                                    <span style={{ position:"absolute", bottom:2, right:2, width:14, height:14, borderRadius:"50%", background:"#C8D400", border:"3px solid #1a1c14", boxShadow:"0 0 8px rgba(200,212,0,0.8)" }}/>
                                </div>
                                {/* Email */}
                                <div>
                                    <div style={{ fontSize:9, color:"rgba(200,212,0,0.5)", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:4 }}>Вы вошли как</div>
                                    <div style={{ fontSize:13, color:"#9a9b8e", fontFamily:"monospace", wordBreak:"break-all" }}>{user.email}</div>
                                </div>
                                {/* Cabinet button */}
                                <button
                                    onClick={() => navigate("/cabinet")}
                                    onMouseEnter={() => setCabHov(true)}
                                    onMouseLeave={() => setCabHov(false)}
                                    style={{ position:"relative", overflow:"hidden", padding:"14px 32px", background:cabHov?"#d4e000":"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:14, fontWeight:700, border:"none", borderRadius:4, cursor:"pointer", display:"flex", alignItems:"center", gap:9, transform:cabHov?"translateY(-2px)":"none", boxShadow:cabHov?"0 8px 28px rgba(200,212,0,.4)":"0 2px 10px rgba(200,212,0,.15)", transition:"all .2s ease" }}>
                                    <span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,.22),transparent)", transform:cabHov?"translateX(100%)":"translateX(-100%)", transition:"transform .4s ease" }}/>
                                    <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:9 }}>
                                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="7" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2.5 12c0-2.2 2-3.5 4.5-3.5s4.5 1.3 4.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                                        Перейти в кабинет
                                    </span>
                                </button>
                            </div>
                        ) : (
                            /* ── NOT LOGGED IN: show auth form ── */
                            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
                                <div>
                                    <div style={{ fontSize:10, color:"#C8D400", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:6 }}>◈ {mode === "register" ? "Регистрация" : "Вход"}</div>
                                    <h3 style={{ fontSize:"clamp(14px,2vw,18px)", fontWeight:600, color:"#f2f2ec", letterSpacing:"-.015em", lineHeight:1.22, marginBottom:2 }}>
                                        {mode === "register" ? <div></div> : <>С возвращением</>}
                                    </h3>
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

                                <p style={{ fontSize:10, color:"#3a3b34", lineHeight:1.55, fontFamily:"var(--mono)" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>

                                <button type="submit" disabled={loading} onMouseEnter={()=>setBtnHov(true)} onMouseLeave={()=>setBtnHov(false)}
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
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes regScan { 0%{top:-28%} 100%{top:128%} }
        @keyframes gPulse  { from{opacity:.15} to{opacity:.45} }
        input::placeholder { color:#3a3b34; }
        input { -webkit-appearance:none; }
        @media(max-width:640px){ .reg-grid{grid-template-columns:1fr!important} }
        @media(max-width:480px){
          .reg-left{ order:2!important; border-right:none!important; border-top:1px solid rgba(200,212,0,0.08)!important }
          .reg-right{ order:1!important }
        }
      `}</style>
        </section>
    );
}