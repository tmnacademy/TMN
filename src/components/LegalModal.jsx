import { useEffect, useState } from "react";

const IconClose  = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
const IconShield = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4v4c0 3.3 2.5 6.3 6 7 3.5-.7 6-3.7 6-7V4L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>;
const IconDoc    = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="3" y="1" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><line x1="5.5" y1="5" x2="10.5" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="5.5" y1="8" x2="10.5" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="5.5" y1="11" x2="8.5" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;

// ── Content ────────────────────────────────────────────────────────────────
const DISCLAIMER = [
    {
        heading: null,
        text: "Вы должны полностью прочитать Отказ от ответственности перед использованием веб-сайта www.tmn.academy (далее – TMN Academy). Соглашаясь с нашим Отказом от ответственности, это значит, что вы прочитали и поняли полный текст уведомления. Вся информация на веб-сайте TMN Academy, относящаяся к инвестированию в ценные бумаги, должна быть принята как информация, а не инвестиционный совет. Информация, представленная на веб-сайте TMN Academy, не является рекомендацией.",
    },
    {
        heading: null,
        text: "Некоторая информация может не соответствовать действительности. TMN Academy не несёт ответственности за любые прямые или косвенные потери, или прибыли, полученные вами в результате торговых операций на финансовых рынках. Все исследовательские отчёты, представленные на веб-сайте TMN Academy, вы соглашаетесь использовать на свой страх и риск.",
    },
    {
        heading: "Источники информации",
        text: "Информация, предоставленная в отношении компаний, представленных на веб-сайте TMN Academy, предоставляется от самих компаний и содержится в официальных документах эмитентов. Исследования, представленные на веб-сайте TMN Academy, не должны рассматриваться как инвестиционное предложение или рекомендация.",
    },
    {
        heading: "Прогнозные заявления",
        text: "Веб-сайт TMN Academy и информация на веб-сайте содержат «прогнозные заявления», описывают будущие ожидания, планы, результаты или стратегии и, как правило, предшествуют такими словами, как: «возможно», «будущее», «план» или «планируется», «будет» или «должна», «ожидать», «предполагать», «проект», «в конечном счете» или «проецируется». Вы должны учесть, что подобные заявления могут нести множество рисков и неопределённостей, которые могут привести к будущим обстоятельствам, событиям и результатам, которые могут существенно отличаться от тех, которые прогнозировались. Фактические результаты могут существенно отличаться от тех, которые прогнозировались в результате влияния различных факторов. Вы должны учитывать эти факторы при оценке заявлений, а не полностью полагаться на такие заявления.",
    },
    {
        heading: "Актуальность заявлений",
        text: "Любые прогнозные заявления, найденные на веб-сайте TMN Academy, сделаны на дату выпуска заявления, и TMN Academy не берёт на себя никаких обязательств по обновлению таких заявлений.",
    },
    {
        heading: "Конфликт интересов",
        text: "Сотрудники TMN Academy (партнёры, руководители) могут также купить или продать ценные бумаги, обсуждаемые на веб-сайте TMN Academy. Купленная или проданная позиция может быть ликвидирована в любое время. Каждый инвестор должен принимать решение на основании обстоятельств и рыночных условий под защитой лицензированного финансового консультанта, брокера или дилера.",
    },
    {
        heading: "Ответственность за точность информации",
        text: "TMN Academy не несёт ответственности за подтверждение и точность документов, относящихся к эмитентам. Эмитенты несут полную ответственность за точность любой информации, касающейся их деятельности, которая была предоставлена для распространения. Инвесторам настоятельно рекомендуется подтвердить достоверность информации, полученной с веб-сайта TMN Academy, до принятия любого инвестиционного решения.",
    },
    {
        heading: null,
        text: "По вопросам, относительно Отказа от ответственности, вы можете связаться с нами, используя форму обратной связи.",
    },
];

const PRIVACY = [
    {
        heading: null,
        text: "Ваша информация не будет продана, обменяна или передана какой-либо другой компании без вашего согласия.",
    },
    {
        heading: "Какую информацию мы собираем?",
        items: [
            "Мы собираем информацию, когда вы подписываетесь на нашу рассылку.",
            "При регистрации на сайте вас могут попросить ввести имя, адрес электронной почты и номер телефона.",
            "Вы можете посещать наш сайт анонимно.",
        ],
    },
    {
        heading: "Использование информации",
        text: "Любая информация, которую мы собираем о вас, может использоваться в одном из следующих случаев:",
        items: [
            "Персонализация вашего опыта.",
            "Улучшение сайта.",
            "Повышение качества обслуживания.",
            "Отправка периодических писем.",
        ],
    },
    {
        heading: "Защита личной информации",
        text: "Мы применяем различные меры безопасности для поддержания безопасности вашей личной информации.",
    },
    {
        heading: "Раскрытие информации третьим лицам",
        text: "Мы не продаём и не передаём вашу личную информацию третьим лицам. Это не распространяется на доверенных третьих лиц, которые помогают нам в обслуживании сайта и ведении бизнеса при условии сохранения конфиденциальности.",
    },
    {
        heading: "Внешние ссылки",
        text: "Иногда мы можем включать или предлагать продукты или услуги третьих лиц на нашем сайте. У них есть отдельная и независимая политика конфиденциальности. TMN Academy не несёт ответственности за содержание таких внешних сайтов.",
    },
    {
        heading: "Ваше согласие",
        text: "Используя наш сайт, вы соглашаетесь с нашей Политикой конфиденциальности. Если вы больше не хотите получать нашу рассылку, вы можете отписаться в любое время, нажав ссылку «Отписаться» в нижней части письма.",
    },
    {
        heading: "Изменения политики",
        text: "Если мы решим изменить нашу политику конфиденциальности, мы обновим страницу с Политикой конфиденциальности.",
    },
    {
        heading: "Свяжитесь с нами",
        text: "По вопросам, связанным с настоящей политикой конфиденциальности, вы можете связаться с нами, используя контактную информацию в футере.",
    },
];

// ── Section renderer ───────────────────────────────────────────────────────
function Section({ heading, text, items }) {
    return (
        <div style={{ marginBottom: 28 }}>
            {heading && (
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#f2f2ec", letterSpacing: "-0.01em", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 3, height: 14, background: "#C8D400", borderRadius: 2, flexShrink: 0, display: "inline-block" }}/>
                    {heading}
                </h3>
            )}
            {text && (
                <p style={{ fontSize: 13, color: "#9a9b8e", lineHeight: 1.75, fontWeight: 300, margin: 0, marginBottom: items ? 10 : 0 }}>
                    {text}
                </p>
            )}
            {items && (
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {items.map((item, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#9a9b8e", lineHeight: 1.65, fontWeight: 300 }}>
                            <span style={{ color: "#C8D400", fontFamily: "var(--mono)", fontSize: 10, marginTop: 4, flexShrink: 0 }}>◈</span>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ── Modal ──────────────────────────────────────────────────────────────────
export default function LegalModal({ initialTab = "disclaimer", onClose }) {
    const [tab, setTab] = useState(initialTab);

    // Close on Escape
    useEffect(() => {
        const onKey = e => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const sections = tab === "disclaimer" ? DISCLAIMER : PRIVACY;

    return (
        <>
            {/* Backdrop */}
            <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", animation:"bdIn .2s ease" }}/>

            {/* Modal */}
            <div style={{
                position:"fixed", zIndex:1001,
                top:"50%", left:"50%",
                transform:"translate(-50%,-50%)",
                width:"min(720px,calc(100vw - 24px))",
                maxHeight:"calc(100dvh - 48px)",
                background:"#0e0f0a",
                border:"1px solid rgba(200,212,0,0.18)",
                borderRadius:8,
                display:"flex", flexDirection:"column",
                animation:"mdIn .3s cubic-bezier(.22,1,.36,1)",
                overflow:"hidden",
            }}>
                {/* Header */}
                <div style={{ padding:"20px 24px 0", borderBottom:"1px solid rgba(200,212,0,0.1)", flexShrink:0 }}>
                    {/* Top row: title + close */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <div style={{ width:30, height:30, border:"1.5px solid #C8D400", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontSize:9, fontWeight:600, color:"#C8D400", background:"rgba(200,212,0,0.05)" }}>TMN</div>
                            <div style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}>
                                <span style={{ fontSize:14, fontWeight:600, color:"#f2f2ec", letterSpacing:"0.04em", marginBottom: "2px" }}>Academy</span>
                                <span className="hdr-sub" style={{ fontSize:8, color:"#6b6c60", letterSpacing:"0.18em", textTransform:"uppercase" }}>ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ</span>
                            </div>
                        </div>
                        <button onClick={onClose} style={{ width:30, height:30, borderRadius:6, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(200,212,0,0.12)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#6b6c60", transition:"all .18s" }}
                                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.35)";e.currentTarget.style.color="#C8D400";}}
                                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.12)";e.currentTarget.style.color="#6b6c60";}}>
                            <IconClose/>
                        </button>
                    </div>
                    {/* Tabs */}
                    <div style={{ display:"flex", gap:4 }}>
                        {[
                            { key:"disclaimer", label:"Отказ от ответственности", icon:<IconDoc/> },
                            { key:"privacy",    label:"Политика конфиденциальности", icon:<IconShield/> },
                        ].map(({ key, label, icon }) => (
                            <button key={key} onClick={() => setTab(key)} style={{
                                display:"flex", alignItems:"center", gap:6,
                                padding:"8px 14px",
                                background:"transparent",
                                color: tab===key ? "#C8D400" : "#6b6c60",
                                border:"none",
                                borderBottom: `2px solid ${tab===key ? "#C8D400" : "transparent"}`,
                                cursor:"pointer",
                                fontSize:12, fontWeight: tab===key ? 600 : 400,
                                fontFamily:"var(--ff)",
                                transition:"all .18s",
                                marginBottom:-1,
                            }}>
                                <span style={{ opacity: tab===key ? 1 : 0.5 }}>{icon}</span>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable content */}
                <div style={{ overflowY:"auto", padding:"24px 24px 32px", flex:1, scrollbarWidth:"thin", scrollbarColor:"rgba(200,212,0,0.15) transparent" }}>
                    {/* Section title */}
                    <h2 style={{ fontSize:"clamp(18px,3vw,24px)", fontWeight:600, color:"#f2f2ec", letterSpacing:"-0.02em", marginBottom:24, lineHeight:1.2 }}>
                        {tab === "disclaimer" ? (
                            <>Отказ от<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>ответственности</em></>
                        ) : (
                            <>Политика<br/><em style={{ fontStyle:"normal", color:"#C8D400" }}>конфиденциальности</em></>
                        )}
                    </h2>

                    {sections.map((s, i) => <Section key={i} {...s}/>)}

                    {/* Divider */}
                    <div style={{ borderTop:"1px solid rgba(200,212,0,0.08)", paddingTop:16, marginTop:8 }}>
                        <p style={{ fontSize:11, color:"#3a3b34", fontFamily:"var(--mono)", lineHeight:1.6, margin:0 }}>
                            © {new Date().getFullYear()} TMN Academy · Все права защищены
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes bdIn { from{opacity:0} to{opacity:1} }
        @keyframes mdIn { from{opacity:0;transform:translate(-50%,-50%) scale(.94)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        ::-webkit-scrollbar { width:4px }
        ::-webkit-scrollbar-track { background:transparent }
        ::-webkit-scrollbar-thumb { background:rgba(200,212,0,0.15); border-radius:2px }
      `}</style>
        </>
    );
}