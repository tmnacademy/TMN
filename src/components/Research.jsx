import { useEffect, useRef, useState } from "react";

const IconArrow   = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconExt     = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6 2H3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M9 1.5h4V6M13 1.5L8 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconRefresh = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11 6.5A4.5 4.5 0 102 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M11 3v3.5H7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconSignal  = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="7" width="2" height="4" rx=".5" fill="currentColor" opacity=".4"/><rect x="5" y="4" width="2" height="7" rx=".5" fill="currentColor" opacity=".7"/><rect x="9" y="1" width="2" height="10" rx=".5" fill="currentColor"/></svg>;

const TAGS = { bitcoin:"₿",btc:"₿",крипто:"₿",crypto:"₿", defi:"Ξ",дефи:"Ξ",eth:"Ξ",ethereum:"Ξ", анализ:"◈",analysis:"◈",фунда:"◈", ai:"◆",искусственный:"◆",интеллект:"◆",портфел:"◆",invest:"◆",инвест:"◆" };
const COLORS = { "₿":"rgba(200,212,0,.9)", "Ξ":"rgba(100,200,255,.85)", "◈":"rgba(160,255,180,.8)", "◆":"rgba(255,180,80,.8)" };
const LABELS = { "₿":"Крипто", "Ξ":"DeFi", "◈":"Анализ", "◆":"Инвестиции" };

function classify(title=""){
    const t=title.toLowerCase();
    for(const [kw,g] of Object.entries(TAGS)) if(t.includes(kw)) return{glyph:g,color:COLORS[g],tag:LABELS[g]};
    return{glyph:"◈",color:COLORS["◈"],tag:"Research"};
}
const strip  = h => h?.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&#8230;/g,"…").replace(/&#\d+;/g,"").trim()??"";
const fmtDate= r => { if(!r)return""; const d=new Date(r); return isNaN(d)?r:d.toLocaleDateString("ru-RU",{day:"numeric",month:"short",year:"numeric"}); };

function Skeleton(){
    return(
        <div style={{padding:"24px 24px 44px",background:"#1e2018",border:"1px solid rgba(200,212,0,.07)",borderRadius:4,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(200,212,0,.04),transparent)",animation:"skim 1.6s ease-in-out infinite"}}/>
            <div style={{width:56,height:12,background:"rgba(200,212,0,.08)",borderRadius:2,marginBottom:14}}/>
            <div style={{width:"85%",height:16,background:"rgba(200,212,0,.07)",borderRadius:2,marginBottom:7}}/>
            <div style={{width:"60%",height:16,background:"rgba(200,212,0,.05)",borderRadius:2,marginBottom:14}}/>
            <div style={{width:"90%",height:11,background:"rgba(255,255,255,.04)",borderRadius:2,marginBottom:5}}/>
            <div style={{width:"70%",height:11,background:"rgba(255,255,255,.03)",borderRadius:2}}/>
        </div>
    );
}

function Card({ post, index }){
    const [hov,setHov]=useState(false);
    const ref=useRef(null);
    const [vis,setVis]=useState(false);
    useEffect(()=>{
        const obs=new IntersectionObserver(([e])=>{
            if(e.isIntersecting){setTimeout(()=>setVis(true),index*70);obs.disconnect();}
        },{threshold:.08});
        if(ref.current)obs.observe(ref.current);
        return()=>obs.disconnect();
    },[index]);

    const{glyph,color,tag}=classify(post.title?.rendered??"");
    const title  =strip(post.title?.rendered??"").slice(0,80);
    const excerpt=strip(post.excerpt?.rendered??"").slice(0,110)+"…";
    const date   =fmtDate(post.date);

    return(
        <a ref={ref} href={post.link} target="_blank" rel="noopener noreferrer"
           onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
           style={{
               display:"block",padding:"24px 24px 48px",
               background:hov?"#232518":"#1e2018",
               border:`1px solid ${hov?"rgba(200,212,0,.28)":"rgba(200,212,0,.1)"}`,
               borderRadius:4,textDecoration:"none",position:"relative",overflow:"hidden",
               opacity:vis?1:0,
               transform:vis?(hov?"translateY(-3px)":"translateY(0)"):"translateY(20px)",
               boxShadow:hov?"0 12px 32px rgba(0,0,0,.45)":"none",
               transition:`opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s,background .2s,box-shadow .2s`,
           }}>
            {/* colour top line */}
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${color},transparent)`,opacity:hov?1:.45,transition:"opacity .2s"}}/>
            {/* watermark */}
            <div style={{position:"absolute",bottom:-8,right:-2,fontSize:66,fontWeight:700,lineHeight:1,color:hov?"rgba(200,212,0,.07)":"rgba(200,212,0,.025)",fontFamily:"var(--mono)",transform:hov?"translateY(-4px) scale(1.05)":"none",transition:"all .35s ease",pointerEvents:"none",userSelect:"none"}}>{glyph}</div>
            {/* tag */}
            <div style={{display:"inline-flex",alignItems:"center",gap:4,marginBottom:12,padding:"3px 8px",background:`${color}18`,border:`1px solid ${color}33`,borderRadius:3}}>
                <span style={{fontSize:10,fontWeight:600,color,fontFamily:"var(--mono)",letterSpacing:".1em",textTransform:"uppercase"}}>{glyph} {tag}</span>
            </div>
            <h3 style={{fontSize:"clamp(14px,1.8vw,16px)",fontWeight:600,color:"#f2f2ec",lineHeight:1.35,marginBottom:8,letterSpacing:"-.01em"}}>{title}</h3>
            <p style={{fontSize:13,color:"#9a9b8e",lineHeight:1.7,fontWeight:300}}>{excerpt}</p>
            <div style={{position:"absolute",bottom:14,left:22,fontSize:11,color:"#4a4b42",fontFamily:"var(--mono)"}}>{date}</div>
            <div style={{position:"absolute",bottom:14,right:18,color:hov?"#C8D400":"#6b6c60",transform:hov?"translate(2px,-2px)":"none",transition:"all .2s"}}><IconArrow/></div>
        </a>
    );
}

const SITE = "https://themynotes.com";
const FEED = `${SITE}/feed/`;

// ── Proxy strategies, tried in order ──────────────────────────────────────
// Strategy 1: allorigins /raw  — returns raw bytes (no JSON wrapper), avoids
//             the "contents is HTML" issue that /get suffers from
// Strategy 2: corsproxy.io new URL format (url= param, no bare concat)
// Strategy 3: proxy.cors.sh  — cors-anywhere compatible, no rate limit
// Strategy 4: allorigins /get — fallback with JSON wrapper
// Strategy 5: HTML scrape     — last resort, extracts titles from homepage

async function tryFetch(url, asText = true) {
    const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return asText ? res.text() : res.json();
}

async function fetchWithStrategy(strategy) {
    if (strategy === "raw_allorigins") {
        const xml = await tryFetch(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(FEED)}`
        );
        if (!xml?.includes("<item") && !xml?.includes("<entry"))
            throw new Error("no feed items in raw response");
        return parseRSS(xml);
    }

    if (strategy === "corsproxy") {
        const xml = await tryFetch(
            `https://corsproxy.io/?url=${encodeURIComponent(FEED)}`
        );
        if (!xml?.includes("<item") && !xml?.includes("<entry"))
            throw new Error("no feed items");
        return parseRSS(xml);
    }

    if (strategy === "corssh") {
        const xml = await tryFetch(
            `https://proxy.cors.sh/${FEED}`,
        );
        if (!xml?.includes("<item") && !xml?.includes("<entry"))
            throw new Error("no feed items");
        return parseRSS(xml);
    }

    if (strategy === "get_allorigins") {
        const json = await tryFetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(FEED)}`,
            false
        );
        const xml = json?.contents ?? "";
        if (!xml.includes("<item") && !xml.includes("<entry"))
            throw new Error("allorigins /get: no items in contents");
        return parseRSS(xml);
    }

    if (strategy === "html_scrape") {
        const json = await tryFetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(SITE + "/")}`,
            false
        );
        return parseHTML(json?.contents ?? "");
    }

    throw new Error("unknown strategy");
}
function parseRSS(xml){
    const doc=new DOMParser().parseFromString(xml,"text/xml");
    const items=[...doc.querySelectorAll("item,entry")].slice(0,6);
    if(!items.length)throw new Error("0 items");
    return items.map((el,i)=>{
        const lk=el.querySelector("link");
        return{id:el.querySelector("guid,id")?.textContent?.trim()||`${i}`,title:{rendered:el.querySelector("title")?.textContent?.trim()||""},link:lk?.getAttribute("href")||lk?.textContent?.trim()||"#",date:el.querySelector("pubDate,published,updated")?.textContent?.trim()||"",excerpt:{rendered:el.querySelector("description,summary,content")?.textContent?.trim()||""}};
    });
}
function parseHTML(html){
    const doc=new DOMParser().parseFromString(html,"text/html");
    const links=[...doc.querySelectorAll("h2 a[href]")].filter(a=>a.href?.includes("themynotes.com/20")).slice(0,6);
    if(!links.length)throw new Error("no links");
    return links.map((a,i)=>({id:a.href||`${i}`,title:{rendered:a.textContent?.trim()||""},link:a.href,date:"",excerpt:{rendered:""}}));
}

export default function Research(){
    const ref=useRef(null);
    const [vis,setVis]=useState({});
    const [posts,setPosts]=useState([]);
    const [status,setStatus]=useState("loading");
    const [mainHov,setMainHov]=useState(false);
    const [lastFetched,setLastFetched]=useState(null);

    // ESLint fix: defer setState to next tick so it's not synchronous inside observer callback
    useEffect(()=>{
        const els=ref.current?.querySelectorAll("[data-fade]")??[];
        const timers=[];
        const obs=new IntersectionObserver(entries=>{
            entries.forEach(e=>{
                if(e.isIntersecting){
                    const key=e.target.dataset.fade;
                    const t=setTimeout(()=>setVis(v=>({...v,[key]:true})),0);
                    timers.push(t);
                }
            });
        },{threshold:.1});
        els.forEach(el=>obs.observe(el));
        return()=>{ obs.disconnect(); timers.forEach(clearTimeout); };
    },[]);

    // fetchPosts defined outside useEffect so it can also be called by the Refresh button,
    // and wrapped in useRef to keep a stable reference without adding it to effect deps
    const fetchPostsRef = useRef(null);
    fetchPostsRef.current = async()=>{
        setStatus("loading");
        const strategies = ["raw_allorigins","corsproxy","corssh","get_allorigins","html_scrape"];
        for(const s of strategies){
            try{
                const data=await fetchWithStrategy(s);
                if(!data.length) continue;
                setPosts(data); setStatus("ok"); setLastFetched(new Date());
                console.log(`[Research] success via: ${s}`);
                return;
            }catch(e){
                console.warn(`[Research] ${s} failed:`,e.message);
            }
        }
        setStatus("error");
    };
    const fetchPosts = () => fetchPostsRef.current?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{ fetchPosts(); },[]);

    const f=(k,d=0)=>({opacity:vis[k]?1:0,transform:vis[k]?"none":"translateY(20px)",transition:`opacity .65s cubic-bezier(.22,1,.36,1) ${d}s,transform .65s cubic-bezier(.22,1,.36,1) ${d}s`});

    return(
        <section id="research" ref={ref} style={{padding:"clamp(64px,10vw,96px) clamp(16px,5vw,48px)",background:"#141510"}}>
            <div style={{maxWidth:1100,margin:"0 auto"}}>

                {/* Header */}
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,flexWrap:"wrap",marginBottom:0}}>
                    <div>
                        <div data-fade="tag" style={f("tag")}><span style={{fontSize:11,fontWeight:500,color:"#C8D400",letterSpacing:".16em",textTransform:"uppercase",fontFamily:"var(--mono)"}}>◈ Исследовательские отчеты</span></div>
                        <h2 data-fade="h2" style={{...f("h2",.06),fontSize:"clamp(26px,5vw,44px)",fontWeight:600,lineHeight:1.12,letterSpacing:"-.02em",margin:"14px 0 0"}}>
                            Последние<br/><em style={{fontStyle:"normal",color:"#C8D400"}}>публикации</em>
                        </h2>
                    </div>
                    {/* Live badge */}
                    <div data-fade="badge" style={{...f("badge",.1),display:"flex",alignItems:"center",gap:8,marginTop:4,flexWrap:"wrap"}}>
                        {status==="ok"&&(
                            <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",background:"rgba(200,212,0,.06)",border:"1px solid rgba(200,212,0,.18)",borderRadius:4,fontSize:11,fontFamily:"var(--mono)",color:"#9a9b8e"}}>
                                <span style={{width:6,height:6,borderRadius:"50%",background:"#C8D400",boxShadow:"0 0 6px rgba(200,212,0,.8)",display:"block"}}/>
                                <IconSignal/> LIVE · themynotes.com
                                {lastFetched&&<span style={{color:"#4a4b42",marginLeft:4}}>· {lastFetched.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})}</span>}
                            </div>
                        )}
                        {status==="error"&&(
                            <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",background:"rgba(255,80,80,.05)",border:"1px solid rgba(255,80,80,.15)",borderRadius:4,fontSize:11,fontFamily:"var(--mono)",color:"#ff6060"}}>
                                <span style={{width:6,height:6,borderRadius:"50%",background:"#ff4444",display:"block"}}/>Нет соединения
                            </div>
                        )}
                        {(status==="error"||status==="ok")&&(
                            <button onClick={fetchPosts} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 10px",background:"transparent",border:"1px solid rgba(200,212,0,.15)",borderRadius:4,cursor:"pointer",color:"#6b6c60",fontFamily:"var(--mono)",fontSize:11,transition:"all .18s"}}
                                    onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,.35)";e.currentTarget.style.color="#C8D400";}}
                                    onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,212,0,.15)";e.currentTarget.style.color="#6b6c60";}}>
                                <IconRefresh/> Обновить
                            </button>
                        )}
                    </div>
                </div>

                <p data-fade="lead" style={{...f("lead",.1),fontSize:"clamp(13px,1.8vw,16px)",color:"#9a9b8e",lineHeight:1.75,maxWidth:520,fontWeight:300,margin:"16px 0 clamp(28px,4vw,44px)"}}>
                    Исследовательские отчеты из архива TheMyNotes
                </p>

                {/* Cards */}
                <div className="res-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:14}}>
                    {status==="loading"&&[...Array(6)].map((_,i)=><Skeleton key={i}/>)}
                    {status==="ok"&&posts.map((p,i)=><Card key={p.id} post={p} index={i}/>)}
                    {status==="error"&&(
                        <div style={{gridColumn:"1/-1",padding:"48px 24px",textAlign:"center",background:"#1e2018",border:"1px solid rgba(200,212,0,.1)",borderRadius:4}}>
                            <div style={{fontSize:32,opacity:.2,marginBottom:12}}>◈</div>
                            <div style={{fontSize:13,color:"#6b6c60",marginBottom:16,fontFamily:"var(--mono)"}}>Не удалось загрузить публикации</div>
                            <button onClick={fetchPosts} style={{padding:"9px 20px",background:"rgba(200,212,0,.08)",border:"1px solid rgba(200,212,0,.2)",borderRadius:4,cursor:"pointer",color:"#C8D400",fontFamily:"var(--mono)",fontSize:12,display:"inline-flex",alignItems:"center",gap:7}}>
                                <IconRefresh/> Попробовать снова
                            </button>
                        </div>
                    )}
                </div>

                {/* Archive CTA */}
                <a data-fade="cta" href="https://themynotes.com" target="_blank" rel="noopener noreferrer"
                   onMouseEnter={()=>setMainHov(true)} onMouseLeave={()=>setMainHov(false)}
                   style={{...f("cta",.3),display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,padding:"clamp(24px,3.5vw,34px) clamp(20px,3.5vw,36px)",background:mainHov?"#232518":"#1e2018",border:`1px solid ${mainHov?"rgba(200,212,0,.3)":"rgba(200,212,0,.16)"}`,borderRadius:4,textDecoration:"none",position:"relative",overflow:"hidden",transform:mainHov?"translateY(-2px)":"none",boxShadow:mainHov?"0 12px 32px rgba(0,0,0,.35)":"none",transition:"all .22s ease",flexWrap:"wrap"}}>
                    <div style={{position:"absolute",right:-40,top:-40,width:200,height:200,background:"radial-gradient(circle,rgba(200,212,0,.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
                    <div style={{flex:1,minWidth:200}}>
                        <div style={{fontSize:11,fontWeight:500,color:"#C8D400",letterSpacing:".14em",textTransform:"uppercase",fontFamily:"var(--mono)",marginBottom:8}}>Полный архив → themynotes.com</div>
                        <div style={{fontSize:"clamp(16px,2.2vw,20px)",fontWeight:600,color:"#f2f2ec",lineHeight:1.25,letterSpacing:"-.01em",marginBottom:6}}>{posts.length>0?`${posts.length}+ актуальных исследований`:" "}</div>
                    </div>
                    <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 22px",background:mainHov?"#d4e000":"#C8D400",color:"#0e0f0a",fontFamily:"var(--ff)",fontSize:13,fontWeight:600,borderRadius:4,whiteSpace:"nowrap",flexShrink:0,transform:mainHov?"translateX(3px)":"none",transition:"all .2s ease"}}>
                        Открыть архив <IconExt/>
                    </div>
                </a>
            </div>
            <style>{`
        @keyframes skim{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
        @media(max-width:900px){.res-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:560px){.res-grid{grid-template-columns:1fr!important}}
      `}</style>
        </section>
    );
}