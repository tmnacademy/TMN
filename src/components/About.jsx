import { useEffect, useRef, useState } from "react";

const IconYT  = () => <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><rect width="18" height="18" rx="4" fill="#C8D400"/><path d="M7 6l5 3-5 3V6z" fill="#0e0f0a"/></svg>;
const IconExt = () => <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><path d="M4.5 2H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M6.5 1h3.5v3.5M10 1L6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

function useReveal(ref) {
    useEffect(() => {
        const els = ref.current?.querySelectorAll("[data-anim]") ?? [];
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                el.style.transitionDelay = `${parseFloat(el.dataset.delay??0)}s`;
                el.style.opacity   = "1";
                el.style.transform = "none";
                obs.unobserve(el);
            });
        }, { threshold: 0.1 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

const hidden = (dir="up") => ({
    opacity:0,
    transform: dir==="up" ? "translateY(24px)" : dir==="left" ? "translateX(-24px)" : "translateX(24px)",
    transition:"opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)",
});

export default function About() {
    const ref = useRef(null);
    const [ytHov, setYtHov] = useState(false);
    useReveal(ref);

    return (
        <section id="about" ref={ref} style={{ padding:"clamp(48px,8vw,96px) clamp(16px,5vw,48px)" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>

                <div data-anim data-delay="0" style={hidden()}>
                    <span style={{ fontSize:10, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>◈ Об авторе</span>
                </div>
                <h2 data-anim data-delay="0.08" style={{ ...hidden(), fontSize:"clamp(22px,5vw,44px)", fontWeight:600, lineHeight:1.12, letterSpacing:"-0.02em", margin:"12px 0 clamp(24px,4vw,48px)" }}>
                    Анализ, которому<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>можно доверять</em>
                </h2>

                <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(24px,5vw,72px)", alignItems:"center" }}>

                    {/* Card */}
                    <div data-anim data-delay="0.1" style={hidden("left")}>
                        <div className="about-card" style={{ aspectRatio:"4/5", background:"#1e2018", border:"1px solid rgba(200,212,0,0.12)", borderRadius:6, position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", animation:"borderPulse 4s ease-in-out infinite" }}>
                            <div style={{ position:"absolute", top:0, left:0, right:0, height:"30%", background:"linear-gradient(180deg,rgba(200,212,0,0.04),transparent)", animation:"scanLine 4s linear infinite", pointerEvents:"none" }}/>
                            {[{top:0,left:0,bdr:"right",bdb:"bottom"},{top:0,right:0,bdb:"bottom",bdl:"left"},{bottom:0,left:0,bdt:"top",bdr:"right"},{bottom:0,right:0,bdt:"top",bdl:"left"}].map((c,i) => (
                                <div key={i} style={{ position:"absolute", width:16, height:16, ...Object.fromEntries(Object.entries(c).filter(([k])=>!["bdr","bdb","bdl","bdt"].includes(k)).map(([k,v])=>[k,v])), borderTop:c.bdt?"2px solid rgba(200,212,0,0.6)":"none", borderBottom:c.bdb?"2px solid rgba(200,212,0,0.6)":"none", borderLeft:c.bdl?"2px solid rgba(200,212,0,0.6)":"none", borderRight:c.bdr?"2px solid rgba(200,212,0,0.6)":"none" }}/>
                            ))}
                            <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10 }}>
                                <div style={{ width:"clamp(60px,12vw,88px)", height:"clamp(60px,12vw,88px)", borderRadius:"50%", border:"1.5px solid rgba(200,212,0,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontSize:"clamp(14px,3vw,22px)", fontWeight:600, color:"#C8D400", background:"rgba(200,212,0,0.05)", animation:"pulseGlow 3s ease-in-out infinite" }}>TMN</div>
                                <div style={{ display:"flex", gap:8, marginTop:2 }}>
                                    {["₿","Ξ","◈"].map((g,i) => <span key={g} style={{ fontSize:11, color:"rgba(200,212,0,0.3)", fontWeight:700, animation:`glyphFloat ${2+i*0.7}s ease-in-out infinite alternate`, animationDelay:`${i*0.4}s` }}>{g}</span>)}
                                </div>
                            </div>
                            <div style={{ display:"flex", borderTop:"1px solid rgba(200,212,0,0.1)" }}>
                                {[{v:"17",u:"лет"},{v:"50+",u:"стран"},{v:"₿",u:"ETH"}].map((s,i) => (
                                    <div key={i} style={{ flex:1, padding:"clamp(8px,2vw,14px) 6px", textAlign:"center", borderLeft:i>0?"1px solid rgba(200,212,0,0.08)":"none" }}>
                                        <div style={{ fontFamily:"var(--mono)", fontSize:"clamp(11px,2vw,14px)", fontWeight:700, color:"#C8D400" }}>{s.v}</div>
                                        <div style={{ fontSize:"clamp(9px,1.4vw,12px)", color:"#6b6c60", textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.u}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{
                                padding: "14px 18px",
                                position: "absolute",
                                top: 40,
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: 9,
                                    color: "#6b6c60",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    fontFamily: "var(--mono)"
                                }}>
                                    Автор курса
                                </div>
                                <div style={{
                                    fontSize: "clamp(13px, 2.5vw, 18px)",
                                    fontWeight: 700,
                                    color: "#f2f2ec",
                                    marginTop: 4
                                }}>
                                    TheMyNotes
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div data-anim data-delay="0.18" style={hidden("right")}>
                        <div style={{ width:32, height:2, background:"#C8D400", marginBottom:20 }}/>
                        {["Финансовый аналитик с 17-летним опытом работы на международных рынках. Специализируюсь на фундаментальном анализе — от традиционных активов до криптовалютных рынков.", "Мой подход: никаких догадок и «лунапрогнозов». Только данные, логика и методология, проверенная годами реальной работы с капиталом.", "Веду открытый YouTube-канал, где регулярно публикую аналитику и исследования по крипторынку."].map((t,i) => (
                            <p key={i} style={{ fontSize:"clamp(12px,1.8vw,15px)", color:"#9a9b8e", lineHeight:1.75, marginBottom:12, fontWeight:300 }}>{t}</p>
                        ))}
                        <a href="https://youtube.com/@TheMyNotes" target="_blank" rel="noopener noreferrer"
                           onMouseEnter={() => setYtHov(true)} onMouseLeave={() => setYtHov(false)}
                           style={{ marginTop:12, display:"inline-flex", alignItems:"center", gap:8, padding:"10px 16px", border:`1px solid ${ytHov?"rgba(200,212,0,0.45)":"rgba(200,212,0,0.2)"}`, borderRadius:4, textDecoration:"none", color:ytHov?"#C8D400":"#f2f2ec", fontSize:"clamp(11px,1.6vw,13px)", fontWeight:500, background:ytHov?"rgba(200,212,0,0.07)":"transparent", transform:ytHov?"translateY(-1px)":"none", transition:"all 0.2s ease" }}>
                            <IconYT/> YouTube-канал — TheMyNotes <span style={{ opacity:0.5 }}><IconExt/></span>
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
  /* Base animations remain */
  @keyframes borderPulse{0%,100%{border-color:rgba(200,212,0,0.12)}50%{border-color:rgba(200,212,0,0.28)}}
  @keyframes pulseGlow{0%,100%{box-shadow:0 0 4px rgba(200,212,0,0.3)}50%{box-shadow:0 0 14px rgba(200,212,0,0.65)}}
  @keyframes glyphFloat{from{transform:translateY(0)}to{transform:translateY(-7px) rotate(5deg)}}
  @keyframes scanLine{0%{top:-30%}100%{top:120%}}

  /* Tablet: single column + smaller card */
  @media(max-width:720px){
    .about-grid{
      grid-template-columns:1fr!important;
      gap:24px!important;
    }
    .about-card{
      aspect-ratio:3/2!important;
      padding-bottom:16px;
    }
    .about-card > div[style*="flex:1"]{
      gap:6px!important;
    }
    .about-card .stats-row{
      flex-direction:column!important;
      gap:8px!important;
    }
  }

  /* Mobile: stacked avatar + footer + stats */
  @media(max-width:480px){
    .about-card{
      aspect-ratio:1/1.2!important;
      padding:12px!important;
    }
    .about-card > div[style*="flex:1"]{
      gap:8px!important;
    }
    .about-card .footer-block{
      margin-bottom:12px!important;
    }
    .about-card .stats-row{
      flex-direction:column!important;
      gap:8px!important;
      border-top:none!important;
    }
    .about-card .stats-row > div{
      border-left:none!important;
      border-bottom:1px solid rgba(200,212,0,0.08)!important;
      padding:8px 0!important;
    }
    .about-card .stats-row > div:last-child{
      border-bottom:none!important;
    }
  }
`}</style>
        </section>
    );
}