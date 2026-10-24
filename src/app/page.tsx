import ExperienceSection from "@/components/experience";
import Navbar from "@/components/navbar";
import Reveal from "@/components/reveal";
import { AboutSection, ChallengeSection, CTASection, Footer, GamesSection, Hero, RewardsSection, SchoolSection, StudyWorkflow, TeacherSection } from "@/components/marketing";

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar />
    <main id="main-content"><Hero /><Reveal><AboutSection /><GamesSection /><StudyWorkflow /><ChallengeSection /><RewardsSection /><TeacherSection /><SchoolSection /><CTASection /><ExperienceSection /></Reveal></main>
    <Footer />
  </>;
}
