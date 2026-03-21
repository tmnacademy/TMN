import { useEffect, useState } from "react";

const IconClose  = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
const IconShield = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4v4c0 3.3 2.5 6.3 6 7 3.5-.7 6-3.7 6-7V4L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>;
const IconDoc    = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="3" y="1" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><line x1="5.5" y1="5" x2="10.5" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="5.5" y1="8" x2="10.5" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="5.5" y1="11" x2="8.5" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;

// ── Content ────────────────────────────────────────────────────────────────
const DISCLAIMER = [
    {
        heading: null,
        text: "Вы соглашаетесь использовать все материалы, представленные на TMN Academy, на свой страх и риск. В наших отчётах используется только официальная информация, полученная из SEC-файлингов, пресс-релизов и документов, предоставленных компаниями. Профили эмитентов не являются предложением или рекомендацией покупать, продавать или удерживать те или иные акции. Исследования TMN Academy не должны рассматриваться как рекомендация к покупке ценных бумаг.",
    },
    {
        heading: "Прошлые показатели",
        text: "Прошлые показатели не являются индикаторами будущих результатов. Вы не должны предполагать, что будущие инвестиции будут такими же прибыльными, как предыдущие. Вы должны принимать решения на основе доступной информации по каждой компании и не рассматривать успех прошлых рекомендаций как основу для инвестиционного решения.",
    },
    {
        heading: "Прогнозные заявления",
        text: "Этот сайт и информация на нём содержат «прогнозные заявления» и описывают будущие ожидания, планы, результаты или стратегии, как правило, обозначаемые словами «может», «будущее», «план», «запланировано», «будет», «следует», «ожидается», «предполагается», «проектируется» и т.д. Вы должны осознавать, что эти заявления несут ряд рисков и неопределённостей, которые могут привести к тому, что будущие обстоятельства, события или результаты будут существенно отличаться от прогноза. Фактические результаты могут существенно отличаться от прогнозов из-за влияния различных факторов.",
    },
    {
        heading: "Прогнозные заявления на сайте",
        text: "Любые прогнозные заявления, размещённые на сайте TMN Academy, делаются на дату публикации, и Academy не берёт на себя никаких обязательств по обновлению таких заявлений.",
    },
    {
        heading: "Конфликт интересов",
        text: "Сотрудники и партнёры TMN Academy могут также покупать или продавать ценные бумаги, обсуждаемые на сайте. Купленная или проданная позиция может быть ликвидирована в любое время. Каждый инвестор должен принимать решения самостоятельно на основе обстоятельств и рыночных условий, под защитой лицензированного финансового советника, брокера или дилера.",
    },
    {
        heading: "Ответственность за информацию",
        text: "TMN Academy не рассматривает и не несёт ответственности за проверку точности документов, относящихся к эмитентам, котирующимся на фондовой бирже. Компании и их руководство несут полную ответственность за точность любой информации, касающейся их ценных бумаг. Перед принятием инвестиционного решения инвесторам настоятельно рекомендуется подтвердить достоверность информации, полученной с сайта TMN Academy.",
    },
    {
        heading: null,
        text: "По вопросам, связанным с настоящим отказом от ответственности, вы можете связаться с нами, используя контактную информацию в футере.",
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
                            <div style={{ width:28, height:28, border:"1.5px solid #C8D400", borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontSize:8, fontWeight:600, color:"#C8D400", background:"rgba(200,212,0,0.05)" }}>TMN</div>
                            <span style={{ fontSize:11, fontWeight:500, color:"#6b6c60", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>Юридическая информация</span>
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