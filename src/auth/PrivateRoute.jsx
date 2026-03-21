import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Authcontext.jsx";

export default function PrivateRoute({ children }) {
    const ctx = useContext(AuthContext);

    // Not inside AuthProvider yet — show loader
    if (!ctx) {
        return <Loader/>;
    }

    const { user, loading } = ctx;

    if (loading) {
        return <Loader/>;
    }

    if (!user) {
        return <Navigate to="/" replace state={{ scrollTo: "register" }}/>;
    }

    return children;
}

function Loader() {
    return (
        <div style={{
            position:"fixed", inset:0, background:"#0e0f0a",
            display:"flex", alignItems:"center", justifyContent:"center",
            flexDirection:"column", gap:16,
        }}>
            <div style={{
                width:36, height:36,
                border:"2px solid rgba(200,212,0,0.15)",
                borderTop:"2px solid #C8D400",
                borderRadius:"50%",
                animation:"spin .7s linear infinite",
            }}/>
            <span style={{ fontSize:11, color:"#6b6c60", fontFamily:"monospace", letterSpacing:"0.1em" }}>
                TMN ACADEMY
            </span>
            <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
        </div>
    );
}