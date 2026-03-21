import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage.jsx";
import Cabinet from "./pages/cabinet.jsx";
import { AuthProvider } from "./auth/Authcontext.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";

const Router = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/"       element={<MainPage/>}/>
                    <Route path="/home"   element={<Navigate to="/"/>}/>
                    <Route path="/cabinet" element={
                        <PrivateRoute>
                            <Cabinet/>
                        </PrivateRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default Router;