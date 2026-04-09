import { useEffect, useState } from "react";

const TG_LINK = "https://t.me/tmn_manager_nikita?text=Hello!%20I%20have%20completed%20the%20USDT%20payment%20and%20would%20like%20to%20send%20a%20confirmation%20screenshot.%20Please%20activate%20my%20access.";
const ADDRESS = "TL8uJzoCJSwrEJonw5g2UnroBDoiEmDuxY";
const NETWORK = "TRC20 (TRON)";

const steps = [
    {
        num: "01",
        title: "Откройте кошелёк",
        body: "Используйте любую биржу или кошелёк — Binance, Bybit, OKX, Trust Wallet и другие.",
    },
    {
        num: "02",
        title: "Выберите сеть передачи",
        body: "Обязательно выберите сеть:",
        highlight: NETWORK,
        warn: "Отправка через другую сеть приведёт к безвозвратной потере средств. Проверьте дважды.",
    },
    {
        num: "03",
        title: "Скопируйте адрес и отправьте USDT",
        body: "Укажите сумму согласно выбранному тарифу, вставьте адрес ниже и подтвердите транзакцию:",
        address: true,
    },
    {
        num: "04",
        title: "Дождитесь подтверждения сети",
        body: "Транзакция подтверждается за 1–5 минут. После этого отправьте скриншот менеджеру — доступ будет активирован в течении 30 минут.",
    },
];

export default function CryptoModal({ onClose }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const copy = () => {
        navigator.clipboard.writeText(ADDRESS).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2400);
        });
    };

    return (
        <>
            <div
                onClick={onClose}
                style={{
                    position: "fixed", inset: 0, zIndex: 1000,
                    background: "rgba(0,0,0,0.88)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                }}
            />

            <div
                style={{
                    position: "fixed", zIndex: 1001,
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "min(640px,calc(100vw - 20px))",
                    maxHeight: "calc(100dvh - 36px)",
                    background: "#0c0d09",
                    border: "1px solid rgba(200,212,0,0.18)",
                    borderRadius: 10,
                    display: "flex", flexDirection: "column",
                    overflow: "hidden",
                    boxShadow: "0 0 0 1px rgba(200,212,0,0.05), 0 40px 90px rgba(0,0,0,0.75), 0 0 130px rgba(200,212,0,0.04)",
                    animation: "modalIn .32s cubic-bezier(.22,1,.36,1)",
                }}
            >
                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent 0%,#C8D400 35%,#C8D400 65%,transparent 100%)", zIndex: 2 }} />

                {/* Corner ornaments */}
                {[["top:10px","left:10px","borderTop,borderLeft"],["top:10px","right:10px","borderTop,borderRight"],["bottom:10px","left:10px","borderBottom,borderLeft"],["bottom:10px","right:10px","borderBottom,borderRight"]].map((_, idx) => (
                    <div key={idx} style={{
                        position: "absolute",
                        ...(idx===0?{top:10,left:10}:idx===1?{top:10,right:10}:idx===2?{bottom:10,left:10}:{bottom:10,right:10}),
                        width: 12, height: 12,
                        borderTop: idx<2 ? "1px solid rgba(200,212,0,0.2)" : "none",
                        borderBottom: idx>=2 ? "1px solid rgba(200,212,0,0.2)" : "none",
                        borderLeft: idx%2===0 ? "1px solid rgba(200,212,0,0.2)" : "none",
                        borderRight: idx%2===1 ? "1px solid rgba(200,212,0,0.2)" : "none",
                        pointerEvents: "none", zIndex: 2,
                    }} />
                ))}

                {/* Header */}
                <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid rgba(200,212,0,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 7, background: "rgba(200,212,0,0.07)", border: "1px solid rgba(200,212,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <rect x="1.5" y="5" width="13" height="9" rx="2" stroke="#C8D400" strokeWidth="1.3"/>
                                <circle cx="11.5" cy="9.5" r="1.2" fill="#C8D400"/>
                                <path d="M5 5V3.5a3 3 0 016 0V5" stroke="#C8D400" strokeWidth="1.3" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#eeefe8", fontFamily: "var(--ff)" }}>Оплата криптовалютой</div>
                            <div style={{ fontSize: 9, color: "#5a5b50", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--mono)" }}>USDT · TRC20 · БЕЗОПАСНО</div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        style={{ width: 28, height: 28, background: "transparent", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, cursor: "pointer", color: "#5a5b50", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,212,0,0.3)"; e.currentTarget.style.color = "#C8D400"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#5a5b50"; }}
                    >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div style={{ overflowY: "auto", padding: "18px 22px 22px", flex: 1 }}>

                    {/* Step list */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex", gap: 14,
                                    padding: "13px 0",
                                    borderBottom: i < steps.length - 1 ? "1px solid rgba(200,212,0,0.05)" : "none",
                                    animation: `stepIn .4s cubic-bezier(.22,1,.36,1) ${i * 0.08}s both`,
                                }}
                            >
                                {/* Step indicator */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 28 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(200,212,0,0.08)", border: "1px solid rgba(200,212,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#C8D400", fontFamily: "var(--mono)", letterSpacing: "0.05em", flexShrink: 0 }}>
                                        {s.num}
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div style={{ width: 1, flex: 1, minHeight: 10, marginTop: 5, background: "linear-gradient(180deg,rgba(200,212,0,0.12),transparent)" }} />
                                    )}
                                </div>

                                {/* Step content */}
                                <div style={{ flex: 1, paddingBottom: 4 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: "#dfe0d8", marginBottom: 4, fontFamily: "var(--ff)" }}>{s.title}</div>
                                    <div style={{ fontSize: 11, color: "#6b6c60", lineHeight: 1.65, fontWeight: 300 }}>{s.body}</div>

                                    {s.highlight && (
                                        <div style={{ marginTop: 7, display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 11px", background: "rgba(200,212,0,0.06)", border: "1px solid rgba(200,212,0,0.22)", borderRadius: 5 }}>
                                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8D400", boxShadow: "0 0 8px rgba(200,212,0,0.8)", flexShrink: 0 }} />
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#C8D400", fontFamily: "var(--mono)" }}>{s.highlight}</span>
                                        </div>
                                    )}

                                    {s.warn && (
                                        <div style={{ marginTop: 7, display: "flex", gap: 8, padding: "7px 11px", background: "rgba(220,70,50,0.05)", border: "1px solid rgba(220,70,50,0.18)", borderRadius: 5 }}>
                                            <span style={{ fontSize: 12, flexShrink: 0, lineHeight: 1 }}>⚠️</span>
                                            <span style={{ fontSize: 10, color: "#c05848", lineHeight: 1.55, fontWeight: 400 }}>{s.warn}</span>
                                        </div>
                                    )}

                                    {s.address && (
                                        <div style={{ marginTop: 10 }}>
                                            <div style={{ fontSize: 9, color: "#4a4b40", fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>Адрес кошелька USDT</div>
                                            <div
                                                onClick={copy}
                                                title="Нажмите, чтобы скопировать"
                                                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#090a06", border: `1px solid ${copied ? "rgba(200,212,0,0.45)" : "rgba(200,212,0,0.18)"}`, borderRadius: 6, cursor: "pointer", transition: "border-color .18s" }}
                                                onMouseEnter={e => { if (!copied) e.currentTarget.style.borderColor = "rgba(200,212,0,0.38)"; }}
                                                onMouseLeave={e => { if (!copied) e.currentTarget.style.borderColor = "rgba(200,212,0,0.18)"; }}
                                            >
                                                <span style={{ flex: 1, fontSize: 11, color: "#C8D400", fontFamily: "var(--mono)", wordBreak: "break-all", lineHeight: 1.4 }}>{ADDRESS}</span>
                                                <div style={{ flexShrink: 0, width: 26, height: 26, background: copied ? "rgba(200,212,0,0.15)" : "rgba(200,212,0,0.05)", border: `1px solid ${copied ? "rgba(200,212,0,0.35)" : "rgba(200,212,0,0.12)"}`, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .22s" }}>
                                                    {copied
                                                        ? <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 6l3.5 3.5L11 2" stroke="#C8D400" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                        : <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="5" y="1" width="8" height="10" rx="1.5" stroke="#C8D400" strokeWidth="1.3"/><rect x="1" y="4" width="8" height="10" rx="1.5" stroke="#C8D400" strokeWidth="1.3" fill="#090a06"/></svg>
                                                    }
                                                </div>
                                            </div>
                                            <div style={{ fontSize: 9, color: copied ? "#C8D400" : "#3a3b30", fontFamily: "var(--mono)", marginTop: 4, transition: "color .22s", letterSpacing: "0.06em" }}>
                                                {copied ? "✓ Адрес скопирован" : "Нажмите на адрес, чтобы скопировать"}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA block */}
                    <div style={{ marginTop: 16, padding: "14px 16px", background: "rgba(200,212,0,0.02)", border: "1px solid rgba(200,212,0,0.09)", borderRadius: 7 }}>
                        <div style={{ fontSize: 11, color: "#6b6c60", lineHeight: 1.65, marginBottom: 12, fontWeight: 300 }}>
                            После перевода отправьте скриншот транзакции менеджеру в Telegram. Доступ будет активирован в течение <span style={{ color: "#9a9b8e", fontWeight: 500 }}>30 минут</span>.
                        </div>
                        <a
                            href={TG_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                                width: "100%", padding: "13px 16px",
                                background: "linear-gradient(135deg,#C8D400 0%,#a8b200 100%)",
                                borderRadius: 6, color: "#0b0c08",
                                fontSize: 12, fontWeight: 700,
                                textDecoration: "none", fontFamily: "var(--ff)",
                                letterSpacing: "0.02em",
                                boxShadow: "0 4px 22px rgba(200,212,0,0.22)",
                                transition: "all .18s ease",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(200,212,0,0.38)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 22px rgba(200,212,0,0.22)"; }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
                            Написать менеджеру в Telegram
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes modalIn { from { opacity:0; transform:translate(-50%,-47%) scale(0.96); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
        @keyframes stepIn  { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:none; } }
      `}</style>
        </>
    );
}