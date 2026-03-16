import { useEffect, useRef, useState } from "react";

const IconBTC   = () => <svg width="13" height="13" viewBox="0 0 15 15" fill="none"><path d="M10 6c.6-.6.6-1.7-.5-2.2s-4.5-.5-4.5-.5V7s3.5.5 5 0zM5 7v4s4 .5 5 0 1.7-1.7.5-2.8S5 7 5 7z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/><line x1="6.5" y1="1.5" x2="6.5" y2="3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="8.5" y1="1.5" x2="8.5" y2="3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6.5" y1="11.5" x2="6.5" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="8.5" y1="11.5" x2="8.5" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IconCheck = () => <svg width="8" height="8" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2" stroke="#0e0f0a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconArrow = () => <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7.5 3L11 6.5 7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const CRYPTOS = ["BTC","ETH","USDT","USDC","BNB","SOL","TON","MATIC"];
const PLANS = [
    { tier:"Базовый", name:"Самостоятельно", price:"199", features:[{t:"Доступ ко всем 4 модулям",ok:true},{t:"Видеоматериалы + конспекты",ok:true},{t:"Исследовательские шаблоны",ok:true},{t:"Обратная связь от автора",ok:false},{t:"Разбор личного портфеля",ok:false}], featured:false },
    { tier:"Профессиональный", name:"С поддержкой", price:"399", features:[{t:"Всё из базового тарифа",ok:true},{t:"Обратная связь от автора",ok:true},{t:"Закрытый Telegram-канал",ok:true},{t:"Ежемесячные live-сессии",ok:true},{t:"Разбор личного портфеля",ok:false}], featured:true },
    { tier:"Премиум", name:"Персональный", price:"899", features:[{t:"Всё из профессионального",ok:true},{t:"Разбор личного портфеля",ok:true},{t:"3 персональные сессии",ok:true},{t:"Персональный roadmap",ok:true},{t:"Приоритетный доступ",ok:true}], featured:false },
];

function PriceCard({ plan, index }) {
    const [hov, setHov]   = useState(false);
    const [bHov, setBHov] = useState(false);
    const ref  = useRef(null);
    const [vis, setVis]   = useState(false);

    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                const t = setTimeout(() => setVis(true), index * 110);
                obs.disconnect();
                return () => clearTimeout(t);
            }
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [index]);

    return (
        <div ref={ref}
             className={plan.featured ? "price-card price-card-featured" : "price-card"}
             onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
             style={{
                 background:plan.featured?"#232518":"#1e2018",
                 border:`1px solid ${hov||plan.featured?"rgba(200,212,0,0.28)":"rgba(200,212,0,0.1)"}`,
                 borderRadius:4, padding:"clamp(18px,2.5vw,28px)",
                 position:"relative", overflow:"hidden",
                 opacity:vis?1:0,
                 transform:vis?(hov?"translateY(-4px) scale(1.01)":plan.featured?"translateY(-2px)":"none"):"translateY(24px) scale(0.97)",
                 boxShadow:hov?"0 18px 44px rgba(0,0,0,0.5),0 0 0 1px rgba(200,212,0,0.14)":plan.featured?"0 6px 24px rgba(0,0,0,0.28)":"none",
                 transitionProperty:"opacity,transform,border-color,box-shadow",
                 transitionDuration:".6s,.6s,.18s,.18s",
                 transitionTimingFunction:"cubic-bezier(.22,1,.36,1)",
             }}>

            {plan.featured && <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)", background:"#C8D400", color:"#0e0f0a", fontSize:9, fontWeight:700, letterSpacing:"0.12em", padding:"3px 14px", borderRadius:"0 0 4px 4px", fontFamily:"var(--mono)", whiteSpace:"nowrap" }}>◈ ПОПУЛЯРНЫЙ</div>}

            <div style={{ position:"absolute", bottom:-8, right:-2, fontSize:80, fontWeight:700, color:hov?"rgba(200,212,0,.06)":"rgba(200,212,0,.03)", fontFamily:"var(--mono)", lineHeight:1, pointerEvents:"none", userSelect:"none", transition:"all .4s ease" }}>₿</div>
            <div style={{ position:"absolute", top:0, left:0, height:2, width:hov||plan.featured?"100%":"0%", background:"linear-gradient(90deg,#C8D400,transparent)", transition:"width .4s ease" }}/>

            <div style={{ fontSize:9, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:8 }}>{plan.tier}</div>
            <div style={{ fontSize:"clamp(14px,2.2vw,18px)", fontWeight:600, color:"#f2f2ec", marginBottom:14, letterSpacing:"-0.01em" }}>{plan.name}</div>

            <div style={{ display:"flex", alignItems:"baseline", gap:2, marginBottom:3 }}>
                <span style={{ fontSize:13, fontWeight:500, color:"#6b6c60", fontFamily:"var(--mono)" }}>$</span>
                <span style={{ fontSize:"clamp(28px,4.5vw,38px)", fontWeight:600, color:"#f2f2ec", letterSpacing:"-0.03em", fontFamily:"var(--mono)", lineHeight:1 }}>{plan.price}</span>
            </div>
            <div style={{ fontSize:11, color:"#6b6c60", fontFamily:"var(--mono)", marginBottom:16 }}>единоразово</div>
            <div style={{ width:"100%", height:1, background:"rgba(200,212,0,0.1)", marginBottom:14 }}/>

            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8, marginBottom:18 }}>
                {plan.features.map((ft, fi) => (
                    <li key={fi} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:"clamp(11px,1.5vw,13px)", color:ft.ok?"#9a9b8e":"#3a3b34", fontWeight:300, lineHeight:1.45, opacity:vis?1:0, transform:vis?"none":"translateX(-6px)", transition:`opacity .35s ease ${.28+index*.1+fi*.04}s,transform .35s ease ${.28+index*.1+fi*.04}s` }}>
            <span style={{ width:13, height:13, minWidth:13, borderRadius:2, marginTop:1, background:ft.ok?"#C8D400":"transparent", border:`1px solid ${ft.ok?"#C8D400":"rgba(200,212,0,0.12)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {ft.ok&&<IconCheck/>}
            </span>
                        {ft.t}
                    </li>
                ))}
            </ul>

            <button onMouseEnter={() => setBHov(true)} onMouseLeave={() => setBHov(false)}
                    style={{ width:"100%", padding:"11px 14px", position:"relative", overflow:"hidden", background:plan.featured?(bHov?"#d4e000":"#C8D400"):(bHov?"rgba(200,212,0,0.1)":"transparent"), color:plan.featured?"#0e0f0a":(bHov?"#C8D400":"#f2f2ec"), fontFamily:"var(--ff)", fontSize:"clamp(11px,1.6vw,13px)", fontWeight:plan.featured?600:500, border:`1px solid ${plan.featured?"#C8D400":(bHov?"rgba(200,212,0,0.4)":"rgba(200,212,0,0.2)")}`, borderRadius:4, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, transition:"all .18s ease" }}>
                {plan.featured&&<span style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)", transform:bHov?"translateX(100%)":"translateX(-100%)", transition:"transform .4s ease" }}/>}
                <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:7 }}><IconBTC/> Оплатить крипто <IconArrow/></span>
            </button>
        </div>
    );
}

export default function Pricing() {
    const ref = useRef(null);
    const [vis, setVis] = useState({});
    const [cryptoIdx, setCryptoIdx] = useState(0);

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

    useEffect(() => {
        const t = setInterval(() => setCryptoIdx(i => (i + 1) % CRYPTOS.length), 1800);
        return () => clearInterval(t);
    }, []);

    const f = (k, d=0) => ({ opacity:vis[k]?1:0, transform:vis[k]?"none":"translateY(18px)", transition:`opacity .6s cubic-bezier(.22,1,.36,1) ${d}s,transform .6s cubic-bezier(.22,1,.36,1) ${d}s` });

    return (
        <section id="pricing" ref={ref} style={{ padding:"clamp(48px,8vw,96px) clamp(16px,5vw,48px)", background:"#141510" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>
                <div data-fade="tag" style={f("tag")}><span style={{ fontSize:10, fontWeight:500, color:"#C8D400", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>₿ Тарифы и оплата</span></div>
                <h2 data-fade="h2" style={{ ...f("h2",.06), fontSize:"clamp(22px,5vw,44px)", fontWeight:600, lineHeight:1.12, letterSpacing:"-.02em", margin:"12px 0 clamp(10px,2vw,14px)" }}>
                    Выберите<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>формат работы</em>
                </h2>
                <p data-fade="lead" style={{ ...f("lead",.1), fontSize:"clamp(12px,1.8vw,15px)", color:"#9a9b8e", lineHeight:1.75, maxWidth:520, fontWeight:300, marginBottom:"clamp(20px,4vw,40px)" }}>
                    Оплата принимается в криптовалюте через защищённый эквайринг.
                </p>

                <div className="price-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:12 }}>
                    {PLANS.map((p, i) => <PriceCard key={p.tier} plan={p} index={i}/>)}
                </div>

                <div data-fade="ticker" style={{ ...f("ticker",.3), padding:"clamp(10px,2vw,14px) clamp(14px,3vw,18px)", border:"1px solid rgba(200,212,0,0.08)", borderRadius:4, background:"rgba(200,212,0,0.012)" }}>
                    <div style={{ fontSize:9, color:"#6b6c60", letterSpacing:"0.1em", fontFamily:"var(--mono)", textTransform:"uppercase", marginBottom:7, textAlign:"center" }}>Принимаем оплату</div>
                    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"clamp(4px,1.5vw,10px)", flexWrap:"wrap" }}>
                        {CRYPTOS.map((c, i) => (
                            <span key={c} style={{ fontSize:"clamp(9px,1.4vw,11px)", fontWeight:600, fontFamily:"var(--mono)", letterSpacing:"0.08em", color:i===cryptoIdx?"#C8D400":"#3a3b34", background:i===cryptoIdx?"rgba(200,212,0,0.08)":"transparent", padding:"2px 7px", borderRadius:3, border:`1px solid ${i===cryptoIdx?"rgba(200,212,0,0.22)":"transparent"}`, transition:"all .4s ease" }}>{c}</span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media(max-width:800px){
          .price-grid{grid-template-columns:1fr!important;max-width:380px;margin-left:auto;margin-right:auto}
          .price-card-featured{order:-1!important}
        }
        @media(max-width:480px){
          .price-grid{max-width:100%!important}
        }
      `}</style>
        </section>
    );
}