import { useEffect, useState } from "react";

// Detects in-app browsers: Instagram, Telegram, Facebook, Twitter/X,
// TikTok, LinkedIn, Snapchat, WeChat, line, and generic WebView
function isInAppBrowser() {
    const ua = navigator.userAgent || "";
    return /Instagram|FBAN|FBAV|Twitter|TW\/|LinkedInApp|TikTok|Snapchat|MicroMessenger|Line\/|WebView|wv\b/.test(ua)
        || (ua.includes("iPhone") && !ua.includes("Safari"))
        || (ua.includes("Android") && ua.includes("wv"));
}

export default function BrowserWarning() {
    const [show, setShow] = useState(false);
    const [hov,  setHov]  = useState(false);

    useEffect(() => {
        if (!isInAppBrowser()) return;
        if (sessionStorage.getItem("browser_warning_dismissed")) return;
        setShow(true);
    }, []);

    const dismiss = () => {
        setShow(false);
        sessionStorage.setItem("browser_warning_dismissed", "1");
    };

    if (!show) return null;

    const isIOS     = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const browser   = isIOS ? "Safari" : "Chrome";
    const steps     = isIOS
        ? "Нажмите ··· или  внизу → «Открыть в Safari»"
        : "Нажмите ··· или ⋮ → «Открыть в браузере»";

    return (
        <>
            {/* Backdrop */}
            <div onClick={dismiss} style={{
                position:"fixed", inset:0, zIndex:9000,
                background:"rgba(0,0,0,0.82)",
                backdropFilter:"blur(8px)",
                WebkitBackdropFilter:"blur(8px)",
                animation:"bwBd .25s ease",
            }}/>

            {/* Modal */}
            <div style={{
                position:"fixed", zIndex:9001,
                bottom:0, left:0, right:0,
                background:"#0e0f0a",
                border:"1px solid rgba(200,212,0,0.2)",
                borderRadius:"20px 20px 0 0",
                padding:"0 0 max(24px, env(safe-area-inset-bottom)) 0",
                animation:"bwSheet .3s cubic-bezier(0.22,1,0.36,1)",
                boxShadow:"0 -16px 60px rgba(0,0,0,0.7)",
            }}>
                {/* Drag handle */}
                <div style={{ display:"flex", justifyContent:"center", padding:"14px 0 4px" }}>
                    <div style={{ width:36, height:4, borderRadius:2, background:"rgba(200,212,0,0.22)" }}/>
                </div>

                <div style={{ padding:"12px 24px 24px" }}>
                    {/* Icon + title */}
                    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                        <div style={{
                            width:48, height:48, borderRadius:12, flexShrink:0,
                            background:"rgba(200,212,0,0.07)",
                            border:"1.5px solid rgba(200,212,0,0.25)",
                            display:"flex", alignItems:"center", justifyContent:"center",
                        }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="#C8D400" strokeWidth="1.5"/>
                                <path d="M12 8v4M12 16h.01" stroke="#C8D400" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontSize:16, fontWeight:600, color:"#f2f2ec", letterSpacing:"-0.01em", marginBottom:3 }}>
                                Откройте в {browser}
                            </div>
                            <div style={{ fontSize:12, color:"#6b6c60", fontWeight:300 }}>
                                Встроенный браузер ограничивает функциональность сайта
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div style={{
                        padding:"14px 16px",
                        background:"rgba(200,212,0,0.04)",
                        border:"1px solid rgba(200,212,0,0.1)",
                        borderRadius:8,
                        marginBottom:20,
                    }}>
                        <p style={{ fontSize:13, color:"#9a9b8e", lineHeight:1.7, fontWeight:300, margin:"0 0 10px" }}>
                            Вы используете встроенный браузер приложения. Некоторые функции могут не работать — в частности, регистрация, вход в аккаунт и оплата.
                        </p>
                        <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                            <span style={{ color:"#C8D400", fontFamily:"monospace", fontSize:11, marginTop:2, flexShrink:0 }}>◈</span>
                            <p style={{ fontSize:12, color:"#6b6c60", lineHeight:1.6, margin:0, fontFamily:"monospace" }}>
                                {steps}
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                        {/* Copy link button */}
                        <button
                            onClick={() => {
                                navigator.clipboard?.writeText(window.location.href)
                                    .catch(() => {});
                            }}
                            onMouseEnter={() => setHov(true)}
                            onMouseLeave={() => setHov(false)}
                            style={{
                                width:"100%", padding:"14px",
                                background: hov ? "#d4e000" : "#C8D400",
                                color:"#0e0f0a",
                                fontFamily:"var(--ff)", fontSize:14, fontWeight:700,
                                border:"none", borderRadius:10, cursor:"pointer",
                                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                                transition:"background .18s",
                            }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <rect x="5" y="5" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                                <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                            </svg>
                            Скопировать ссылку
                        </button>

                        {/* Dismiss */}
                        <button onClick={dismiss} style={{
                            width:"100%", padding:"12px",
                            background:"transparent",
                            color:"#6b6c60",
                            fontFamily:"var(--ff)", fontSize:13, fontWeight:400,
                            border:"1px solid rgba(200,212,0,0.1)",
                            borderRadius:10, cursor:"pointer",
                            transition:"border-color .18s, color .18s",
                        }}
                                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.25)";e.currentTarget.style.color="#9a9b8e";}}
                                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,0.1)";e.currentTarget.style.color="#6b6c60";}}>
                            Продолжить в этом браузере
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes bwBd    { from{opacity:0} to{opacity:1} }
        @keyframes bwSheet { from{transform:translateY(100%)} to{transform:translateY(0)} }
      `}</style>
        </>
    );
}