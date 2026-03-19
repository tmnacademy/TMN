import { useEffect, useRef, useState } from "react";

const MODULES = [
    { num:"01", glyph:"₿", title:"Основы фундаментального анализа", desc:"Что отличает фундаментальный подход от технического. Как читать данные, а не тренды. Построение аналитического фрейма с нуля.", topics:["Оценка стоимости","Макроконтекст","Базовые метрики"] },
    { num:"02", glyph:"◈", title:"On-Chain аналитика", desc:"Чтение блокчейн-данных как первичного источника. MVRV, SOPR, адресная активность — как сигналы, а не шум.", topics:["MVRV / SOPR","Потоки бирж","Поведение китов"] },
    { num:"03", glyph:"Ξ",  title:"Оценка проектов и токеномика", desc:"Как анализировать whitepaper, команду, токеномику и конкурентную среду. Построение собственных скорингов.", topics:["Токеномика","TVL-анализ","Конкуренты"] },
    { num:"04", glyph:"◆", title:"Построение инвестиционной системы", desc:"Интеграция всех инструментов в персональную стратегию. Риск-менеджмент, портфельные принципы и принятие решений.", topics:["Риск-менеджмент","Портфель","Система входов"] },
];

function ModuleCard({ mod, isOdd, isLastRow, index }) {
    const [hov, setHov] = useState(false);
    const ref  = useRef(null);
    const [vis, setVis] = useState(false);
    const dir = isOdd ? "translateX(-18px)" : "translateX(18px)";

    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                const t = setTimeout(() => setVis(true), index * 100);
                obs.disconnect();
                return () => clearTimeout(t);
            }
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [index]);

    return (
        <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
             style={{
                 padding:"clamp(20px,3vw,32px)", background:hov?"#232518":"#1e2018",
                 position:"relative", overflow:"hidden", cursor:"default",
                 borderRight: isOdd ? "1px solid rgba(200,212,0,0.1)" : "none",
                 borderBottom: !isLastRow ? "1px solid rgba(200,212,0,0.1)" : "none",
                 opacity:vis?1:0, transform:vis?"none":dir,
                 transition:`background .22s, opacity .6s cubic-bezier(.22,1,.36,1) ${index*.08}s, transform .6s cubic-bezier(.22,1,.36,1) ${index*.08}s`,
             }}>
            <div style={{ position:"absolute", top:"50%", right:-4, transform:`translateY(-50%) ${hov?"scale(1.1)":"scale(1)"}`, fontSize:80, fontWeight:700, lineHeight:1, color:hov?"rgba(200,212,0,.08)":"rgba(200,212,0,.03)", pointerEvents:"none", userSelect:"none", fontFamily:"var(--mono)", transition:"all .4s ease" }}>{mod.glyph}</div>
            <div style={{ position:"absolute", top:0, left:0, width:2, height:hov?"100%":"0%", background:"linear-gradient(180deg,#C8D400,transparent)", transition:"height .3s ease" }}/>

            <div style={{ display:"flex", alignItems:"baseline", gap:5, marginBottom:12 }}>
                <span style={{ fontFamily:"var(--mono)", fontSize:"clamp(18px,3vw,22px)", fontWeight:600, color:hov?"#C8D400":"rgba(200,212,0,0.4)", letterSpacing:"-0.02em", lineHeight:1, transition:"color .22s, transform .22s", transform:hov?"scale(1.04)":"scale(1)", display:"inline-block", transformOrigin:"left center" }}>{mod.num}</span>
                <span style={{ fontSize:9, color:"#6b6c60", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>/ МОДУЛЬ</span>
            </div>

            <h3 style={{ fontSize:"clamp(13px,2vw,17px)", fontWeight:600, color:"#f2f2ec", letterSpacing:"-0.01em", marginBottom:8, lineHeight:1.3, position:"relative", zIndex:1 }}>{mod.title}</h3>
            <p  style={{ fontSize:"clamp(11px,1.5vw,13px)", color:"#9a9b8e", lineHeight:1.7, fontWeight:300, marginBottom:16, position:"relative", zIndex:1 }}>{mod.desc}</p>

            <div style={{ display:"flex", flexWrap:"wrap", gap:6, position:"relative", zIndex:1 }}>
                {mod.topics.map((t, ti) => (
                    <span key={t} style={{ fontSize:10, fontWeight:500, color:hov?"#C8D400":"rgba(200,212,0,0.6)", background:hov?"rgba(200,212,0,0.1)":"rgba(200,212,0,0.05)", border:`1px solid ${hov?"rgba(200,212,0,0.25)":"rgba(200,212,0,0.1)"}`, padding:"3px 8px", borderRadius:2, letterSpacing:"0.04em", fontFamily:"var(--mono)", transition:`all .2s ease ${ti*.05}s` }}>{t}</span>
                ))}
            </div>
        </div>
    );
}

export default function Program() {
    const ref = useRef(null);
    const [vis, setVis] = useState({});

    useEffect(() => {
        const els = ref.current?.querySelectorAll("[data-fade]") ?? [];
        const timers = [];
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const key = e.target.dataset.fade;
                    const t = setTimeout(() => setVis(v => ({ ...v, [key]: true })), 0);
                    timers.push(t);
                }
            });
        }, { threshold: 0.1 });
        els.forEach(el => obs.observe(el));
        return () => { obs.disconnect(); timers.forEach(clearTimeout); };
    }, []);

    const f = (k, d=0) => ({ opacity:vis[k]?1:0, transform:vis[k]?"none":"translateY(18px)", transition:`opacity .6s cubic-bezier(.22,1,.36,1) ${d}s,transform .6s cubic-bezier(.22,1,.36,1) ${d}s` });

    return (
        <section id="program" ref={ref} style={{ padding:"clamp(48px,8vw,96px) clamp(16px,5vw,48px)" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>
                <div data-fade="tag" style={f("tag")}><span style={{ fontSize:10, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>◆ Программа обучения</span></div>
                <h2 data-fade="h2" style={{ ...f("h2",.06), fontSize:"clamp(22px,5vw,44px)", fontWeight:600, lineHeight:1.12, letterSpacing:"-.02em", margin:"12px 0 clamp(10px,2vw,16px)" }}>
                    4 модуля —<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>полная методология</em>
                </h2>
                <p data-fade="lead" style={{ ...f("lead",.1), fontSize:"clamp(12px,1.8vw,15px)", color:"#9a9b8e", lineHeight:1.75, maxWidth:520, fontWeight:300, marginBottom:"clamp(20px,4vw,40px)" }}>
                    От базовых принципов оценки до построения собственной инвестиционной системы.
                </p>

                <div className="prog-grid" style={{ border:"1px solid rgba(200,212,0,0.1)", borderRadius:4, overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
                    {MODULES.map((mod, i) => <ModuleCard key={mod.num} mod={mod} isOdd={i%2===0} isLastRow={i>=MODULES.length-2} index={i}/>)}
                </div>
            </div>

            <style>{`
        @media(max-width:580px){
          .prog-grid{
            grid-template-columns:1fr!important;
            border:none!important;
            border-radius:0!important;
            position:relative;
          }
          /* Vertical timeline connector */
          .prog-grid::before{
            content:'';
            position:absolute;
            left:17px; top:8px; bottom:8px; width:1px;
            background:linear-gradient(180deg,transparent,rgba(200,212,0,0.2) 8%,rgba(200,212,0,0.2) 92%,transparent);
            pointer-events:none;
          }
          /* Each card indented */
          .prog-grid > div{
            border-right:none!important;
            border-bottom:1px solid rgba(200,212,0,0.07)!important;
            padding-left:44px!important;
            padding-top:18px!important;
            padding-bottom:18px!important;
            padding-right:16px!important;
          }
          .prog-grid > div:last-child{border-bottom:none!important}
        }
      `}</style>
        </section>
    );
}
