import Header    from "../components/Header";
import Hero      from "../components/Hero";
import About     from "../components/About";
import Research  from "../components/Research";
import Program   from "../components/Program";
import Register  from "../components/Register.jsx";
import Pricing   from "../components/Pricing";
import Footer    from "../components/Footer";
import LeadModal from "../components/LeadModal";
import "../styles/index.css";

export default function MainPage() {
    return (
        <div>
            <LeadModal />
            <Header />
            <main>
                <Hero />
                <About />
                <Research />
                <Program />
                <Register />
                <Pricing />
            </main>
            <Footer />
        </div>
    );
}