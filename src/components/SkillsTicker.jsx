import { useEffect, useRef } from "react";

const ROW1 = [
    "Стоимостное инвестирование","Анализ P/E","Финансовая отчётность",
    "DCF-модели","EV / EBITDA","Балансовый отчёт","Недооценённые активы",
    "Margin of Safety","ROIC","Свободный денежный поток",
    "Стоимостное инвестирование","Анализ P/E","Финансовая отчётность",
    "DCF-модели","EV / EBITDA","Балансовый отчёт","Недооценённые активы",
    "Margin of Safety","ROIC","Свободный денежный поток",
];

const ROW2 = [
    "NYSE","NASDAQ","P/B Ratio","Дивидендная политика","Долговая нагрузка",
    "Graham Number","Качество прибыли","Отчёт о прибылях","S&P 500",
    "Риск-менеджмент","Широкий ров","Piotroski Score","Net Margin","FCF Yield",
    "NYSE","NASDAQ","P/B Ratio","Дивидендная политика","Долговая нагрузка",
    "Graham Number","Качество прибыли","Отчёт о прибылях","S&P 500",
    "Риск-менеджмент","Широкий ров","Piotroski Score","Net Margin","FCF Yield",
];

const HIGHLIGHTED = new Set([
    "DCF-модели","Margin of Safety","Недооценённые активы",
    "NASDAQ","Graham Number","Широкий ров","FCF Yield",
]);

function Tag({ label }) {
    const hi = HIGHLIGHTED.has(label);
    return (
        <span style={{
            display:"inline-flex", alignItems:"center", whiteSpace:"nowrap",
            padding:"10px 22px", borderRadius:50, flexShrink:0,
            border:`1.5px solid ${hi?"#C8D400":"rgba(200,212,0,0.18)"}`,
            background:hi?"rgba(200,212,0,0.07)":"rgba(200,212,0,0.03)",
            color:hi?"#C8D400":"#9a9b8e",
            fontSize:"clamp(12px,1.5vw,14px)",
            fontWeight:hi?600:400,
        }}>
            {label}
        </span>
    );
}

function ScrollRow({ items, reverse=false, speed=30 }) {
    const trackRef = useRef(null);
    useEffect(() => {
        const track = trackRef.current; if (!track) return;
        let pos = reverse ? -track.scrollWidth / 2 : 0;
        const px = speed / 60;
        let raf;
        const tick = () => {
            pos += reverse ? px : -px;
            const half = track.scrollWidth / 2;
            if (!reverse && pos <= -half) pos = 0;
            if (reverse  && pos >= 0)    pos = -half;
            track.style.transform = `translateX(${pos}px)`;
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [reverse, speed]);

    return (
        <div style={{ overflow:"hidden", width:"100%" }}>
            <div ref={trackRef} style={{ display:"flex", gap:10, willChange:"transform", width:"max-content" }}>
                {items.map((label, i) => <Tag key={i} label={label}/>)}
            </div>
        </div>
    );
}

export default function SkillsTicker() {
    return (
        <div style={{ background:"#0e0f0a", padding:"clamp(20px,3vw,32px) 0", overflow:"hidden", borderTop:"1px solid rgba(200,212,0,0.07)", borderBottom:"1px solid rgba(200,212,0,0.07)" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[ROW1, ROW2].map((row, i) => (
                    <div key={i} style={{ position:"relative" }}>
                        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:80, background:"linear-gradient(90deg,#0e0f0a,transparent)", zIndex:2, pointerEvents:"none" }}/>
                        <div style={{ position:"absolute", right:0, top:0, bottom:0, width:80, background:"linear-gradient(-90deg,#0e0f0a,transparent)", zIndex:2, pointerEvents:"none" }}/>
                        <ScrollRow items={row} reverse={i%2!==0} speed={i===0?28:22}/>
                    </div>
                ))}
            </div>
        </div>
    );
}