import { useEffect, useRef} from "react";

const IconYT = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect width="18" height="18" rx="4" fill="#C8D400"/><path d="M7 6l5 3-5 3V6z" fill="#0e0f0a"/></svg>;
const IconExt = () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M4.5 2H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M6.5 1h3.5v3.5M10 1L6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

function useReveal(ref) {
    useEffect(() => {
        const els = ref.current?.querySelectorAll("[data-anim]") ?? [];
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                const delay = parseFloat(el.dataset.delay ?? 0);
                el.style.transitionDelay = `${delay}s`;
                el.style.opacity    = "1";
                el.style.transform  = "none";
                obs.unobserve(el);
            });
        }, { threshold: 0.1 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

const hidden = (dir = "up") => ({
    opacity: 0,
    transform: dir === "up" ? "translateY(28px)" : dir === "left" ? "translateX(-28px)" : "translateX(28px)",
    transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
});

export default function About() {
    const ref = useRef(null);
    useReveal(ref);

    return (
        <section id="about" ref={ref} style={{ padding:"clamp(64px,10vw,96px) clamp(16px,5vw,48px)" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>

                <div data-anim data-delay="0" style={hidden()}>
                    <span style={{ fontSize:11, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>◈ Об авторе</span>
                </div>
                <h2 data-anim data-delay="0.08" style={{ ...hidden(), fontSize:"clamp(26px,5vw,44px)", fontWeight:600, lineHeight:1.12, letterSpacing:"-0.02em", margin:"14px 0 clamp(32px,5vw,56px)" }}>
                    Дмитрий<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>Федоренко</em>
                </h2>

                <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(32px,6vw,80px)", alignItems:"center" }}>

                    {/* Card */}
                    <div data-anim data-delay="0.1" style={{ ...hidden("left") }}>
                        <div style={{ aspectRatio:"4/5", background:"#0a0b08", border:"1px solid rgba(200,212,0,0.12)", borderRadius:4, position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", animation:"borderPulse 4s ease-in-out infinite" }}>

                            {/* Illustration image */}
                            <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
                                <img
                                    src="/aboutImage.png"
                                    alt="TheMyNotes"
                                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block", pointerEvents:"none", userSelect:"none" }}
                                />
                                {/* scan line — floats above image */}
                                <div style={{ position:"absolute", top:0, left:0, right:0, height:"30%", background:"linear-gradient(180deg,rgba(200,212,0,0.04) 0%,transparent 100%)", animation:"scanLine 4s linear infinite", pointerEvents:"none" }}/>
                                {/* bottom fade into stats bar */}
                                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"30%", background:"linear-gradient(0deg,#0a0b08 0%,transparent 100%)", pointerEvents:"none" }}/>
                            </div>

                            {/* corner brackets — above everything */}
                            {[{top:0,left:0,bdr:"right",bdb:"bottom"},{top:0,right:0,bdb:"bottom",bdl:"left"},{bottom:0,left:0,bdt:"top",bdr:"right"},{bottom:0,right:0,bdt:"top",bdl:"left"}].map((c,i) => (
                                <div key={i} style={{ position:"absolute", zIndex:3, width:20, height:20, ...Object.fromEntries(Object.entries(c).filter(([k])=>!["bdr","bdb","bdl","bdt"].includes(k)).map(([k,v])=>[k,v])), borderTop: c.bdt ? "2px solid rgba(200,212,0,0.6)" : "none", borderBottom: c.bdb ? "2px solid rgba(200,212,0,0.6)" : "none", borderLeft: c.bdl ? "2px solid rgba(200,212,0,0.6)" : "none", borderRight: c.bdr ? "2px solid rgba(200,212,0,0.6)" : "none" }}/>
                            ))}

                            {/* stats bar */}
                            <div style={{ display:"flex", borderTop:"1px solid rgba(200,212,0,0.1)", position:"relative", zIndex:2, background:"rgba(10,11,8,0.95)" }}>
                                {[{v:"17",u:"лет опыта"},{v:"NYSE",u:"NASDAQ"},{v:"US",u:"рынки"}].map((s,i) => (
                                    <div key={i} style={{ flex:1, padding:"14px 8px", textAlign:"center", borderLeft: i>0 ? "1px solid rgba(200,212,0,0.08)" : "none" }}>
                                        <div style={{ fontFamily:"var(--mono)", fontSize:13, fontWeight:600, color:"#C8D400" }}>{s.v}</div>
                                        <div style={{ fontSize:10, color:"#6b6c60", textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.u}</div>
                                    </div>
                                ))}
                            </div>

                            {/* name badge — top left, above image */}
                            <div style={{ position:"absolute", top:14, left:14, zIndex:4, background:"rgba(10,11,8,0.78)", border:"1px solid rgba(200,212,0,0.22)", borderRadius:3, padding:"5px 10px", backdropFilter:"blur(6px)" }}>
                                <div style={{ fontSize:9, color:"rgba(200,212,0,0.7)", textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:"var(--mono)" }}>Автор курса</div>
                                <div style={{ fontSize:13, fontWeight:600, color:"#f2f2ec", marginTop:2 }}>Дмитрий Федоренко</div>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div data-anim data-delay="0.18" style={hidden("right")}>
                        <div style={{ width:40, height:2, background:"#C8D400", marginBottom:24 }}/>
                        {["Инвестор-практик с опытом более 17 лет на мировых финансовых рынках NYSE и NASDAQ. Специализируюсь на поиске недооцененных компаний с высоким потенциалом роста.", "Автор уникальной методики обучения под нагрузкой для профессиональных инвесторов. Никаких графиков и гадания — только глубокий анализ финансовой отчётности."].map((t,i) => (
                            <p key={i} style={{ fontSize:"clamp(13px,1.8vw,15px)", color:"#9a9b8e", lineHeight:1.8, marginBottom:14, fontWeight:300 }}>{t}</p>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes borderPulse{0%,100%{border-color:rgba(200,212,0,0.12)}50%{border-color:rgba(200,212,0,0.28)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 4px rgba(200,212,0,0.3)}50%{box-shadow:0 0 16px rgba(200,212,0,0.7)}}
        @keyframes glyphFloat{from{transform:translateY(0) rotate(0)}to{transform:translateY(-8px) rotate(6deg)}}
        @keyframes scanLine{0%{top:-30%}100%{top:120%}}
        @media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:32px!important}}
      `}</style>
        </section>
    );
}