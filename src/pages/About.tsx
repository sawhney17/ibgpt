import { links } from "./ChatbotSelector";
import HeaderAction from "./components/HeaderAction";
import { HeroContentLeft } from "./components/HeroContentLeft";

export default function About() {
    return (
        <div>
        <HeaderAction links={links}></HeaderAction>
        <HeroContentLeft></HeroContentLeft>
        </div>
    );
    }