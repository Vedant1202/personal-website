import { LayoutGroup, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { InkFilters } from "./components/ink/InkFilters";
import { Home } from "./sections/Home";
import { Journey } from "./sections/Journey";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import "./App.css";

/** Scroll order. Kept in the same order the sections render, so the two can be read together. */
const SECTION_IDS = ["home", "projects", "journey", "skills", "contact"];

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
        <InkFilters />
        <div className="bg-paper text-ink min-h-screen">
          <NavBar showSocialDock={showSocialDock} />
          <main className="pt-20">
            {/*
              Work first, then the record behind it, then the stack. Projects is
              the strongest and most differentiating evidence, so it gets the
              highest-attention slot after the hero; Skills is a claim the
              projects have already demonstrated, so it reads as an appendix.
            */}
            <Home onLinksInViewChange={setHomeLinksInView} />
            <Projects />
            <Journey />
            <Skills />
            <Contact onLinksInViewChange={setContactInView} />
          </main>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
