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
import Philosophy from "../components/Philosophy.jsx";
import SkillsTicker from "../components/SkillsTicker.jsx";
import Brokers from "../components/Brokers.jsx";

export default function MainPage() {
    return (
        <div>
            <LeadModal />
            <Header />
            <main>
                <Hero />
                <SkillsTicker />
                <Philosophy />
                <About />
                <Research />
                <Program />
                <Register />
                <Pricing />
                <Brokers />
            </main>
            <Footer />
        </div>
    );
}