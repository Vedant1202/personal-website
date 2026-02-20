import { LayoutGroup } from "framer-motion";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Home } from "./sections/Home";
import { Journey } from "./sections/Journey";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";
import "./App.css";

export default function App() {
  const [homeLinksInView, setHomeLinksInView] = useState(true);

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-black text-white">
        <NavBar showSocialDock={!homeLinksInView} />
        <main className="pt-20">
          <Home onLinksInViewChange={setHomeLinksInView} />
          <Projects />
          <Journey />
          <Contact />
        </main>
      </div>
    </LayoutGroup>
  );
}
