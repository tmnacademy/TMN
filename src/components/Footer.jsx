import { useState } from "react";

const IconYT = () => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5.5 5.5l4 2-4 2V5.5z" fill="currentColor"/></svg>;
const IconExternal = () => <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><path d="M4.5 2H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M6.5 1h3.5v3.5M10 1L6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

function FooterLink({ href, onClick, children, icon }) {
    const [hov, setHov] = useState(false);
    return (
        <a href={href} onClick={onClick}
           target={href?"_blank":undefined} rel={href?"noopener noreferrer":undefined}
           onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
           style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:"clamp(12px,1.6vw,13px)", textDecoration:"none", cursor:"pointer", color:hov?"#C8D400":"#9a9b8e", transition:"color 0.18s" }}>
            {icon && <span style={{ opacity:hov?1:0.45, display:"flex", transition:"opacity 0.18s" }}>{icon}</span>}
            {children}
            {href && <span style={{ opacity:hov?0.5:0.2, display:"flex", transition:"opacity 0.18s", marginLeft:1 }}><IconExternal/></span>}
        </a>
    );
}

export default function Footer() {
    const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

    return (
        <footer style={{ padding:"clamp(28px,5vw,44px) clamp(16px,5vw,24px)", borderTop:"1px solid rgba(200,212,0,0.1)" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>

                <div className="footer-top" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:24, flexWrap:"wrap", marginBottom:28 }}>

                    {/* Logo */}
                    <div className="footer-brand">
                        <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none", marginBottom:10 }}>
                            <div style={{ width:30, height:30, border:"1.5px solid #C8D400", borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontSize:9, fontWeight:600, color:"#C8D400", background:"rgba(200,212,0,0.05)" }}>TMN</div>
                            <div style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}>
                                <span style={{ fontSize:14, fontWeight:600, color:"#f2f2ec", letterSpacing:"0.04em" }}>Academy</span>
                                <span style={{ fontSize:8, color:"#6b6c60", letterSpacing:"0.2em", textTransform:"uppercase" }}>Research & Education</span>
                            </div>
                        </a>
                        <p style={{ fontSize:"clamp(11px,1.5vw,13px)", color:"#4a4b42", maxWidth:240, lineHeight:1.55 }}>
                            Фундаментальный анализ криптовалютных рынков. 17 лет опыта.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="footer-links" style={{ display:"flex", gap:40, flexWrap:"wrap" }}>
                        <div>
                            <div style={{ fontSize:9, fontWeight:500, color:"#6b6c60", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:12 }}>Платформа</div>
                            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                                <FooterLink onClick={() => scrollTo("program")}>Программа</FooterLink>
                                <FooterLink onClick={() => scrollTo("pricing")}>Тарифы</FooterLink>
                                <FooterLink onClick={() => scrollTo("about")}>Об авторе</FooterLink>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize:9, fontWeight:500, color:"#6b6c60", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"var(--mono)", marginBottom:12 }}>Ресурсы</div>
                            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                                <FooterLink href="https://youtube.com/@TheMyNotes" icon={<IconYT/>}>YouTube</FooterLink>
                                <FooterLink href="https://themynotes.com">Research Archive</FooterLink>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div style={{ borderTop:"1px solid rgba(200,212,0,0.07)", paddingTop:18, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                    <p style={{ fontSize:11, color:"#4a4b42", fontFamily:"var(--mono)" }}>© {new Date().getFullYear()} TheMyNotes Academy</p>
                    <div style={{ display:"flex", gap:7, alignItems:"center" }}>
                        {["₿","Ξ","◈","◆"].map((g,i) => <span key={i} style={{ fontSize:9, color:"rgba(200,212,0,0.2)", fontWeight:700, fontFamily:"var(--mono)" }}>{g}</span>)}
                    </div>
                </div>
            </div>

            <style>{`
        @media(max-width:500px){
          .footer-top{flex-direction:column!important;align-items:center!important;text-align:center!important;gap:20px!important}
          .footer-brand{display:flex;flex-direction:column;align-items:center}
          .footer-brand p{text-align:center!important;max-width:100%!important}
          .footer-links{gap:28px!important;justify-content:center!important;width:100%}
          .footer-links > div{text-align:center!important;flex:1!important;min-width:90px}
          .footer-links a{justify-content:center!important}
        }
      `}</style>
        </footer>
    );
}