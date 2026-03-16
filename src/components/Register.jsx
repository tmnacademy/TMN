import { useEffect, useRef, useState } from "react";

const IconMail  = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><rect x="1" y="2.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5l7 4.5L15 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const IconArrow = () => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const REASONS = [
    { g:"₿", title:"Еженедельная аналитика", desc:"Фундаментальный разбор крипторынков каждую неделю" },
    { g:"◈", title:"Ранний доступ", desc:"Новые исследования до публичной публикации" },
    { g:"Ξ",  title:"Без шума", desc:"Только данные и логика — никаких лунапрогнозов" },
];

export default function Register() {
    const ref  = useRef(null);
    const [vis,    setVis]    = useState({});
    const [inView, setInView] = useState(false);
    const [email,  setEmail]  = useState("");
    const [name,   setName]   = useState("");
    const [sent,   setSent]   = useState(false);
    const [err,    setErr]    = useState("");
    const [btnHov, setBtnHov] = useState(false);
    const [focus,  setFocus]  = useState(null);

    useEffect(() => {
        const els = ref.current?.querySelectorAll("[data-fade]") ?? [];
        const timers = [];
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const key = e.target.dataset.fade;
                    const t = setTimeout(() => {
                        setVis(v => ({ ...v, [key]: true }));
                        setInView(true);
                    }, 0);
                    timers.push(t);
                }
            });
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
        return () => { obs.disconnect(); timers.forEach(clearTimeout); };
    }, []);

    const f = (k, d=0) => ({
        opacity:vis[k]?1:0,
        transform:vis[k]?"none":"translateY(16px)",
        transition:`opacity .6s cubic-bezier(.22,1,.36,1) ${d}s,transform .6s cubic-bezier(.22,1,.36,1) ${d}s`,
    });

    const submit = e => {
        e.preventDefault();
        if (!email.includes("@")) { setErr("Введите корректный email"); return; }
        setErr(""); setSent(true);
    };

    const inp = active => ({
        width:"100%", padding:"10px 12px", background:"rgba(200,212,0,0.03)",
        border:`1px solid ${active?"rgba(200,212,0,0.5)":"rgba(200,212,0,0.12)"}`,
        borderRadius:4, color:"#f2f2ec", fontFamily:"var(--ff)", fontSize:13,
        outline:"none", transition:"border-color .2s", boxSizing:"border-box",
    });

    return (
        <section id="register" ref={ref} style={{ padding:"clamp(48px,8vw,96px) clamp(16px,5vw,48px)", background:"#0e0f0a", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(200,212,0,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(200,212,0,.02) 1px,transparent 1px)", backgroundSize:"36px 36px", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, background:"radial-gradient(circle,rgba(200,212,0,.06),transparent 65%)", pointerEvents:"none" }}/>

            <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>
                <div data-fade="tag" style={f("tag")}><span style={{ fontSize:10, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>◈ Бесплатная рассылка</span></div>

                <div data-fade="box" className="reg-grid" style={{ ...f("box",.1), marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", border:"1px solid rgba(200,212,0,0.14)", borderRadius:8, overflow:"hidden" }}>

                    {/* LEFT — why subscribe */}
                    <div className="reg-left" style={{ background:"#141510", padding:"clamp(22px,3.5vw,44px)", position:"relative", overflow:"hidden", borderRight:"1px solid rgba(200,212,0,0.1)" }}>
                        <div style={{ position:"absolute", top:0, left:0, right:0, height:"28%", background:"linear-gradient(180deg,rgba(200,212,0,.03),transparent)", animation:"regScan 5s linear infinite", pointerEvents:"none" }}/>

                        <h2 style={{ fontSize:"clamp(18px,3vw,30px)", fontWeight:600, lineHeight:1.12, letterSpacing:"-.02em", color:"#f2f2ec", marginBottom:10, opacity:inView?1:0, transform:inView?"none":"translateX(-20px)", transition:"opacity .65s cubic-bezier(.22,1,.36,1) .1s,transform .65s cubic-bezier(.22,1,.36,1) .1s" }}>
                            Получайте аналитику<br/><span style={{ color:"#C8D400" }}>раньше всех</span>
                        </h2>
                        <p style={{ fontSize:"clamp(11px,1.5vw,14px)", color:"#9a9b8e", lineHeight:1.7, fontWeight:300, marginBottom:"clamp(18px,2.5vw,28px)", opacity:inView?1:0, transform:inView?"none":"translateX(-16px)", transition:"opacity .65s cubic-bezier(.22,1,.36,1) .17s,transform .65s cubic-bezier(.22,1,.36,1) .17s" }}>
                            17 лет опыта в одной рассылке. Только фундаментальный анализ.
                        </p>

                        <div style={{ display:"flex", flexDirection:"column", gap:"clamp(12px,2vw,18px)" }}>
                            {REASONS.map((r, i) => (
                                <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", opacity:inView?1:0, transform:inView?"none":"translateX(-14px)", transition:`opacity .55s cubic-bezier(.22,1,.36,1) ${.24+i*.1}s,transform .55s cubic-bezier(.22,1,.36,1) ${.24+i*.1}s` }}>
                                    <div style={{ width:"clamp(30px,4vw,36px)", height:"clamp(30px,4vw,36px)", borderRadius:7, background:"rgba(200,212,0,0.07)", border:"1px solid rgba(200,212,0,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"clamp(13px,2vw,15px)", fontWeight:700, color:"#C8D400", flexShrink:0 }}>{r.g}</div>
                                    <div>
                                        <div style={{ fontSize:"clamp(12px,1.6vw,13px)", fontWeight:500, color:"#f2f2ec", marginBottom:2 }}>{r.title}</div>
                                        <div style={{ fontSize:"clamp(10px,1.3vw,12px)", color:"#6b6c60", lineHeight:1.5, fontWeight:300 }}>{r.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop:"clamp(18px,3vw,32px)", paddingTop:14, borderTop:"1px solid rgba(200,212,0,0.08)", display:"flex", alignItems:"center", gap:8, opacity:inView?1:0, transition:"opacity .6s ease .55s" }}>
                            <div style={{ display:"flex", gap:7 }}>
                                {["₿","Ξ","◈","◆"].map((g,i)=><span key={i} style={{ fontFamily:"monospace", fontSize:10, fontWeight:700, color:"rgba(200,212,0,0.28)", animation:`gPulse ${1.8+i*.4}s ease-in-out infinite alternate`, animationDelay:`${i*.25}s` }}>{g}</span>)}
                            </div>
                            <span style={{ fontSize:10, color:"#3a3b34", fontFamily:"var(--mono)" }}>5,000+ · бесплатно</span>
                        </div>
                    </div>

                    {/* RIGHT — form */}
                    <div className="reg-right" style={{ background:"#1a1c14", padding:"clamp(22px,3.5vw,44px)", display:"flex", flexDirection:"column", justifyContent:"center", opacity:inView?1:0, transform:inView?"none":"translateX(20px)", transition:"opacity .65s cubic-bezier(.22,1,.36,1) .14s,transform .65s cubic-bezier(.22,1,.36,1) .14s" }}>
                        {!sent ? (
                            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
                                <div>
                                    <div style={{ fontSize:10, color:"#C8D400", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:6 }}>₿ Подписаться</div>
                                    <h3 style={{ fontSize:"clamp(14px,2vw,18px)", fontWeight:600, color:"#f2f2ec", letterSpacing:"-.015em", lineHeight:1.22, marginBottom:2 }}>
                                        Войдите в круг<br/>профессиональных инвесторов
                                    </h3>
                                </div>

                                <div>
                                    <label style={{ display:"block", fontSize:9, color:"#6b6c60", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:5 }}>Ваше имя</label>
                                    <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Александр" onFocus={()=>setFocus("name")} onBlur={()=>setFocus(null)} style={inp(focus==="name")}/>
                                </div>

                                <div>
                                    <label style={{ display:"block", fontSize:9, color:"#6b6c60", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:5 }}>Email <span style={{ color:"#C8D400" }}>*</span></label>
                                    <div style={{ position:"relative" }}>
                                        <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:focus==="email"?"#C8D400":"#4a4b42", transition:"color .2s", display:"flex", pointerEvents:"none" }}><IconMail/></span>
                                        <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} required placeholder="you@example.com" onFocus={()=>setFocus("email")} onBlur={()=>setFocus(null)} style={{ ...inp(focus==="email"||!!err), paddingLeft:32, borderColor:err?"rgba(255,80,80,.5)":undefined }}/>
                                    </div>
                                    {err && <p style={{ fontSize:10, color:"#ff6060", marginTop:3, fontFamily:"var(--mono)" }}>{err}</p>}
                                </div>

                                <p style={{ fontSize:10, color:"#3a3b34", lineHeight:1.55, fontFamily:"var(--mono)" }}>Нажимая «Подписаться», вы соглашаетесь с политикой конфиденциальности.</p>

                                <button type="submit" onMouseEnter={()=>setBtnHov(true)} onMouseLeave={()=>setBtnHov(false)}
                                        style={{ position:"relative", overflow:"hidden", padding:"12px 16px", background:btnHov?"#d4e000":"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:13, fontWeight:600, border:"none", borderRadius:4, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, transform:btnHov?"translateY(-1px)":"none", boxShadow:btnHov?"0 5px 18px rgba(200,212,0,.32)":"0 2px 7px rgba(200,212,0,.1)", transition:"all .2s ease" }}>
                                    <span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,.2),transparent)", transform:btnHov?"translateX(100%)":"translateX(-100%)", transition:"transform .4s ease" }}/>
                                    <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:7 }}>Подписаться <IconArrow/></span>
                                </button>
                            </form>
                        ) : (
                            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", gap:16, padding:"16px 0" }}>
                                <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(200,212,0,0.08)", border:"1px solid rgba(200,212,0,0.28)", display:"flex", alignItems:"center", justifyContent:"center", animation:"successGlow 2s ease-in-out infinite" }}>
                                    <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><path d="M4 14l7 7L24 7" stroke="#C8D400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                                <div>
                                    <h4 style={{ fontSize:16, fontWeight:600, color:"#f2f2ec", marginBottom:6 }}>Подписка оформлена!</h4>
                                    <p style={{ fontSize:12, color:"#9a9b8e", lineHeight:1.6, maxWidth:220 }}>Проверьте <strong style={{ color:"#C8D400" }}>{email}</strong> — письмо уже в пути.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes regScan   { 0%{top:-28%} 100%{top:128%} }
        @keyframes gPulse    { from{opacity:.15} to{opacity:.45} }
        @keyframes successGlow{ 0%,100%{box-shadow:0 0 5px rgba(200,212,0,.25)} 50%{box-shadow:0 0 20px rgba(200,212,0,.65)} }
        input::placeholder { color:#3a3b34; }
        input { -webkit-appearance:none; }
        /* Tablet: stack */
        @media(max-width:640px){ .reg-grid{grid-template-columns:1fr!important} }
        /* Mobile: form first */
        @media(max-width:480px){
          .reg-left{ order:2!important; border-right:none!important; border-top:1px solid rgba(200,212,0,0.08)!important }
          .reg-right{ order:1!important }
        }
      `}</style>
        </section>
    );
}