import { useEffect, useState, useRef, Fragment } from "react";

const IconArrow  = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3L12 7 8 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconSearch = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="3.5" stroke="currentColor" strokeWidth="1.3"/><line x1="8.5" y1="8.5" x2="12" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;

function Counter({ target, suffix = "" }) {
    const spanRef = useRef(null);
    useEffect(() => {
        const el = spanRef.current; if (!el) return;
        const n = parseInt(target);
        if (isNaN(n)) { el.textContent = target; return; }
        el.textContent = "0" + suffix;
        let raf;
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return; obs.disconnect();
            const dur = 1200, t0 = performance.now();
            const tick = now => {
                const t = Math.min((now - t0) / dur, 1);
                el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * n) + suffix;
                if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        }, { threshold: 0.4 });
        obs.observe(el);
        return () => { obs.disconnect(); cancelAnimationFrame(raf); };
    }, [target, suffix]);
    return <span ref={spanRef}>0{suffix}</span>;
}

function BgCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current; if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let W, H, pts, raf;
        const G = ["₿","Ξ","◈","◆"];
        const resize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            pts = Array.from({ length: W < 480 ? 5 : 10 }, (_, i) => ({
                x:Math.random()*W, y:Math.random()*H,
                vx:(Math.random()-.5)*.14, vy:(Math.random()-.5)*.09-.03,
                sz:8+Math.random()*10, op:.02+Math.random()*.035,
                g:G[i%4], rot:Math.random()*Math.PI*2, rv:(Math.random()-.5)*.005,
            }));
        };
        const draw = () => {
            ctx.clearRect(0,0,W,H);
            pts.forEach(p => {
                p.x+=p.vx; p.y+=p.vy; p.rot+=p.rv;
                if(p.x<-20)p.x=W+20; if(p.x>W+20)p.x=-20;
                if(p.y<-20)p.y=H+20; if(p.y>H+20)p.y=-20;
                ctx.save(); ctx.globalAlpha=p.op;
                ctx.font=`bold ${p.sz}px monospace`; ctx.fillStyle="#C8D400";
                ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillText(p.g,0,0);
                ctx.restore();
            });
            raf = requestAnimationFrame(draw);
        };
        resize(); draw();
        window.addEventListener("resize", resize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, []);
    return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}/>;
}

function BitcoinOrb() {
    return (
        <div style={{ position:"relative", width:"100%", aspectRatio:"1/1", margin:"0 auto" }}>
            <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1px dashed rgba(200,212,0,0.15)", animation:"orbSpin 22s linear infinite" }}/>
            <div style={{ position:"absolute", inset:"9%", borderRadius:"50%", border:"1px solid rgba(200,212,0,0.09)", animation:"orbSpin 14s linear infinite reverse" }}>
                {["₿","Ξ","◈","◆"].map((g,i)=>(
                    <div key={g} style={{ position:"absolute", top:"50%", left:"50%", width:16, height:16, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:9, fontWeight:700, color:"rgba(200,212,0,0.4)", transform:`rotate(${i*90}deg) translateY(-${82}%) rotate(-${i*90}deg) translate(-50%,-50%)`, lineHeight:1 }}>{g}</div>
                ))}
            </div>
            <div style={{ position:"absolute", inset:"18%", borderRadius:"50%", background:"radial-gradient(circle,rgba(200,212,0,0.07) 0%,transparent 65%)", animation:"haloBreath 3.5s ease-in-out infinite" }}/>
            <div style={{ position:"absolute", inset:"26%", borderRadius:"50%", background:"linear-gradient(145deg,#1a1c14,#0e0f0a)", border:"1.5px solid rgba(200,212,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", animation:"corePulse 4s ease-in-out infinite" }}>
                <span style={{ fontSize:"clamp(28px,5vw,52px)", color:"#C8D400", fontWeight:700, fontFamily:"var(--mono)", lineHeight:1, textShadow:"0 0 10px rgba(200,212,0,0.35)", transform:"rotate(-15deg)" }}>₿</span>
            </div>
            <div style={{ position:"absolute", inset:0, borderRadius:"50%", animation:"orbSpin 7s linear infinite" }}>
                <div style={{ position:"absolute", top:"3.5%", left:"50%", transform:"translateX(-50%)", width:7, height:7, borderRadius:"50%", background:"#C8D400", boxShadow:"0 0 10px 3px rgba(200,212,0,0.8)" }}/>
            </div>
            {[
                { label:"BTC/USD", val:"↑ 2.4%",  style:{ top:"8%",    right:"-8%" },  delay:"0s"   },
                { label:"Vol 24h", val:"$48.2B",   style:{ bottom:"10%", left:"-6%" },  delay:"0.5s" },
                { label:"Dom.",    val:"52.1%",    style:{ top:"46%",   right:"-14%"},  delay:"1s"   },
            ].map((tag,i)=>(
                <div key={i} style={{ position:"absolute", ...tag.style, background:"rgba(14,15,10,0.9)", border:"1px solid rgba(200,212,0,0.18)", borderRadius:4, padding:"5px 8px", backdropFilter:"blur(6px)", animation:"tagFloat 3s ease-in-out infinite alternate", animationDelay:tag.delay, minWidth:72 }}>
                    <div style={{ fontSize:8, color:"#6b6c60", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"monospace", marginBottom:1 }}>{tag.label}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:"#C8D400", fontFamily:"monospace" }}>{tag.val}</div>
                </div>
            ))}
            <style>{`
        @keyframes orbSpin   { to{transform:rotate(360deg)} }
        @keyframes haloBreath{ 0%,100%{opacity:.5;transform:scale(.94)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes corePulse { 0%,100%{box-shadow:0 0 32px rgba(200,212,0,.1)} 50%{box-shadow:0 0 48px rgba(200,212,0,.2)} }
        @keyframes tagFloat  { from{transform:translateY(0)} to{transform:translateY(-6px)} }
      `}</style>
        </div>
    );
}

export default function Hero() {
    const [phase, setPhase] = useState(0);
    const [h1, setH1] = useState(false);
    const [b1, setB1] = useState(false);
    const [b2, setB2] = useState(false);

    useEffect(() => {
        const t = [
            setTimeout(()=>setPhase(1),100), setTimeout(()=>setPhase(2),260),
            setTimeout(()=>setPhase(3),500), setTimeout(()=>setPhase(4),700),
            setTimeout(()=>setPhase(5),880), setTimeout(()=>setH1(true),260),
        ];
        return () => t.forEach(clearTimeout);
    }, []);

    const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    const rev = (show, d=0) => ({ opacity:show?1:0, transform:show?"none":"translateY(18px)", transition:`opacity .65s cubic-bezier(.22,1,.36,1) ${d}s,transform .65s cubic-bezier(.22,1,.36,1) ${d}s` });

    return (
        <section style={{ minHeight:"110svh", display:"flex", alignItems:"center", padding:"clamp(70px,10vw,100px) clamp(16px,5vw,48px) clamp(30px,6vw,40px)", position:"relative", overflow:"hidden" }}>
            <BgCanvas/>
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(200,212,0,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(200,212,0,.022) 1px,transparent 1px)", backgroundSize:"40px 40px" }}/>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 65% at 75% 50%,rgba(200,212,0,.05) 0%,transparent 65%)", pointerEvents:"none" }}/>

            <div className="hero-grid" style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(24px,4vw,64px)", alignItems:"center" }}>

                {/* LEFT */}
                <div>
                    {/* Badge */}
                    <div style={{ ...rev(phase>=1), display:"inline-flex", alignItems:"center", gap:7, padding:"4px 11px 4px 8px", border:"1px solid rgba(200,212,0,.22)", borderRadius:2, marginBottom:"clamp(14px,2.5vw,22px)", background:"rgba(200,212,0,.03)" }}>
            <span style={{ position:"relative", width:6, height:6, borderRadius:"50%", background:"#C8D400", flexShrink:0 }}>
              <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#C8D400", animation:"ping 1.8s ease-out infinite" }}/>
            </span>
                        <span style={{ fontSize:"clamp(8px,1.4vw,10px)", fontWeight:500, color:"#C8D400", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>17 лет на финансовых рынках</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize:"clamp(26px,5vw,60px)", fontWeight:600, lineHeight:1.08, letterSpacing:"-0.022em", marginBottom:"clamp(12px,2vw,20px)", display:"flex", flexWrap:"wrap", gap:".18em" }}>
                        {["Фундаментальный","анализ","крипторынков"].map((w,i)=>(
                            <span key={w} style={{ display:"inline-block", opacity:h1?1:0, transform:h1?"none":"translateY(24px)", transition:`opacity .7s cubic-bezier(.22,1,.36,1) ${i*.12}s,transform .7s cubic-bezier(.22,1,.36,1) ${i*.12}s`, color:i===1?"#C8D400":"inherit" }}>{w}</span>
                        ))}
                    </h1>

                    {/* Sub */}
                    <p style={{ ...rev(phase>=3), fontSize:"clamp(12px,1.8vw,15px)", color:"#9a9b8e", maxWidth:440, lineHeight:1.75, marginBottom:"clamp(20px,3vw,36px)", fontWeight:300 }}>
                        Криптовалюта без хаоса — системный подход, основанный на 17 годах опыта и строгой методологии фундаментального анализа.
                    </p>

                    {/* CTAs */}
                    <div className="hero-btns" style={{ ...rev(phase>=4), display:"flex", gap:10, flexWrap:"wrap", marginBottom:"clamp(24px,4vw,44px)" }}>
                        <button onMouseEnter={()=>setB1(true)} onMouseLeave={()=>setB1(false)} onClick={()=>scrollTo("pricing")}
                                style={{ position:"relative", overflow:"hidden", padding:"clamp(10px,1.8vw,12px) clamp(16px,2.5vw,22px)", background:"#C8D400", color:"#0e0f0a", fontFamily:"var(--ff)", fontSize:"clamp(12px,1.6vw,14px)", fontWeight:600, border:"none", borderRadius:4, cursor:"pointer", display:"flex", alignItems:"center", gap:7, transform:b1?"translateY(-2px)":"none", boxShadow:b1?"0 8px 24px rgba(200,212,0,.35)":"0 2px 8px rgba(200,212,0,.12)", transition:"all .22s ease" }}>
                            <span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,.25),transparent)", transform:b1?"translateX(100%)":"translateX(-100%)", transition:"transform .45s ease" }}/>
                            <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:7 }}>Начать обучение <IconArrow/></span>
                        </button>
                        <button onMouseEnter={()=>setB2(true)} onMouseLeave={()=>setB2(false)} onClick={()=>scrollTo("research")}
                                style={{ padding:"clamp(9px,1.8vw,11px) clamp(14px,2.5vw,20px)", background:b2?"rgba(200,212,0,.07)":"transparent", color:b2?"#C8D400":"#f2f2ec", fontFamily:"var(--ff)", fontSize:"clamp(12px,1.6vw,14px)", fontWeight:500, border:`1px solid ${b2?"rgba(200,212,0,.35)":"rgba(242,242,236,.18)"}`, borderRadius:4, cursor:"pointer", display:"flex", alignItems:"center", gap:7, transition:"all .2s ease" }}>
                            <IconSearch/> Смотреть исследования
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats" style={{ ...rev(phase>=5) }}>
                        {[{n:"17",s:"",l:"Лет опыта"},{n:"200",s:"+",l:"Исследований"},{n:"5",s:"K+",l:"Подписчиков"}].map((st,i)=>(
                            <Fragment key={st.l}>
                                {i>0&&<div className="stat-div" style={{ width:1, height:28, background:"rgba(200,212,0,.15)" }}/>}
                                <div style={{ display:"flex", flexDirection:"column", animation:`cUp .6s cubic-bezier(.22,1,.36,1) ${i*.1+.9}s both` }}>
                                    <span style={{ fontSize:"clamp(18px,3vw,24px)", fontWeight:600, color:"#C8D400", fontFamily:"var(--mono)", letterSpacing:"-0.02em", lineHeight:1 }}><Counter target={st.n} suffix={st.s}/></span>
                                    <span style={{ fontSize:"clamp(8px,1.1vw,10px)", color:"#6b6c60", letterSpacing:"0.06em", textTransform:"uppercase", marginTop:3 }}>{st.l}</span>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="hero-orb" style={{ ...rev(phase>=2,.15), display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <BitcoinOrb/>
                </div>
            </div>

            <style>{`
        @keyframes ping { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.4);opacity:0} }
        @keyframes cUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }

        /* Tablet */
        @media(max-width:860px){
          .hero-grid { grid-template-columns:1fr!important }
          .hero-orb  { max-width:220px!important; margin:0 auto; order:-1 }
        }
        /* Mobile */
       @media(max-width:540px){

  /* Make orb hero-like and bigger */
  .hero-orb{
    max-width:320px!important;
    width:100%;
    margin:-90px auto 20px auto!important;
    transform:none!important;
    order:-1; /* place above text */
  }

  /* Force single-column layout */
  .hero-grid{
    grid-template-columns:1fr!important;
    gap:24px!important;
  }

  /* Buttons stacked */
  .hero-btns{
    flex-direction:column!important;
  }
  .hero-btns button{
    width:100%!important;
    justify-content:center!important;
  }

  /* Stats as 3-col card below */
  .hero-stats{
    display:grid!important;
    grid-template-columns:repeat(3,1fr)!important;
    background:rgba(200,212,0,0.04)!important;
    border:1px solid rgba(200,212,0,0.1)!important;
    border-radius:6px!important;
    overflow:hidden!important;
    margin-top:20px;
  }
  .hero-stats > div:not(.stat-div){
    padding:12px 8px!important;
    align-items:center!important;
    border-right:1px solid rgba(200,212,0,0.08)!important;
  }
  .hero-stats > div:last-child{
    border-right:none!important;
  }
  .stat-div{
    display:none!important;
  }

  /* Reduce section padding so orb is closer to top */
  section{
    min-height: 140svh !important;
    padding:clamp(40px,8vw,60px) clamp(16px,5vw,32px) clamp(30px,5vw,40px)!important;
  }
}
      `}</style>
        </section>
    );
}