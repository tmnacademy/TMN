import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./pages/mainPage.jsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/home" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;