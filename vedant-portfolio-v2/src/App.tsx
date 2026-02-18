import { NavBar } from "./components/NavBar";
import { Home } from "./sections/Home";
import { Education } from "./sections/Education";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <main className="pt-20">
        <Home />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
