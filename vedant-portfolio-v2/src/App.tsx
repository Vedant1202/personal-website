import { LayoutGroup, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { Home } from "./sections/Home";
import { Journey } from "./sections/Journey";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";
import "./App.css";

const SECTION_IDS = ["home", "skills", "projects", "journey", "contact"];

export default function App() {
  const [homeLinksInView, setHomeLinksInView] = useState(true);
  /** false until Contact reports in-view — avoids hiding the dock on load before the observer runs */
  const [contactInView, setContactInView] = useState(false);

  const showSocialDock = !homeLinksInView && !contactInView;

  // On first load, scroll to the section (or project) referenced in the URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1); // strip '#'
    if (!hash) return;

    // #project-{id} → scroll to the projects section (ProjectGrid handles opening the panel)
    const targetId = SECTION_IDS.includes(hash)
      ? hash
      : hash.startsWith("project-")
        ? "projects"
        : hash;

    const t = setTimeout(() => {
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <div className="min-h-screen bg-black text-white">
          <NavBar showSocialDock={showSocialDock} />
          <main className="pt-20">
            <Home onLinksInViewChange={setHomeLinksInView} />
            <Projects />
            <Journey />
            <Contact onLinksInViewChange={setContactInView} />
          </main>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
