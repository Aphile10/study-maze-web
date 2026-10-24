import Image from "next/image";
import { Icon, SectionHeading, type IconName } from "./ui";

const audiences: { title: string; label: string; icon: IconName; description: string }[] = [
  { title: "For Students", label: "Find your momentum", icon: "bolt", description: "Turn revision into progress with study tools, games, challenges, XP and rewards." },
  { title: "For Teachers", label: "Bring ideas to life", icon: "book", description: "Support revision, create engaging learning activities and give students more ways to practise." },
  { title: "For Schools", label: "Make progress together", icon: "users", description: "Run class challenges, track participation and manage learning rewards from one connected experience." },
  { title: "AI Learning", label: "Find another way in", icon: "sparkles", description: "Ask questions, generate study notes from your own material and practise explaining ideas out loud with AI support." },
];

function ExperienceArt({ file, className = "" }: { file: string; className?: string }) {
  return <div className={`experience-art ${className}`}>
    <Image src={`/artwork/${file}`} alt="" fill sizes="(max-width: 700px) 85vw, (max-width: 1000px) 45vw, 560px" />
  </div>;
}

export default function ExperienceSection() {
  return <section id="experience" aria-labelledby="experience-heading" className="section section-anchor experience-section">
    <div className="container">
      <div className="experience-intro reveal">
        <p className="eyebrow">Study. Play. Compete. Earn.</p>
        <h2 id="experience-heading">One platform.<br /><span>Different ways to learn.</span></h2>
        <p>Study Maze brings studying, gameplay, competition and rewards together in one connected learning experience.</p>
      </div>

      <div className="experience-audiences reveal">
        {audiences.map(({ title, label, icon, description }, index) => <article className={`experience-audience experience-audience-${index}`} key={title}>
          <span className="icon-box"><Icon name={icon} /></span>
          <h3>{title}</h3>
          <p className="experience-audience-label">{label}</p>
          <p>{description}</p>
        </article>)}
      </div>

      <div className="experience-chapter reveal">
        <span>01 / PLAY</span><p>A little practice. A new adventure.</p>
      </div>
      <div className="experience-games">
        <article className="experience-game experience-maze reveal">
          <div className="experience-game-copy">
            <span className="experience-label">Explore &amp; discover</span>
            <h3>Maze Runner</h3>
            <p>Navigate the maze, complete levels and turn study progress into play.</p>
          </div>
          <ExperienceArt file="game-maze-runner.png" />
          <span className="experience-footnote"><Icon name="grid" />Three levels. Keep finding your way.</span>
        </article>
        <article className="experience-game experience-quiz reveal">
          <div className="experience-game-copy">
            <span className="experience-label">Think on your feet</span>
            <h3>Quiz Rush</h3>
            <p>Race through questions, build momentum and test what you know.</p>
          </div>
          <ExperienceArt file="game-quiz-rush.png" />
        </article>
        <article className="experience-game experience-memory reveal">
          <div className="experience-game-copy">
            <span className="experience-label">Make connections</span>
            <h3>Memory Match</h3>
            <p>Strengthen recall through fast-paced matching challenges.</p>
          </div>
          <ExperienceArt file="game-memory-flip.png" />
        </article>
      </div>

      <div className="experience-chapter reveal">
        <span>02 / GROW</span><p>More than a game. Your next step.</p>
      </div>
      <div className="experience-paths">
        <article className="experience-path experience-study reveal">
          <ExperienceArt file="icon-notes.png" />
          <div className="experience-path-copy">
            <SectionHeading eyebrow="Study smarter" title={<>Your material.<br /><span>New understanding.</span></>}>
              Upload your own study material, generate structured notes and ask for help when you need it.
            </SectionHeading>
            <ul className="experience-tags" aria-label="Study tools"><li>Personal PDF notes</li><li>Maze Mentor</li><li>Voice Lab</li></ul>
            <p className="experience-detail">Read it. Ask about it. Practise explaining it out loud.</p>
          </div>
        </article>
        <article className="experience-path experience-compete reveal">
          <ExperienceArt file="icon-scoreboard.png" />
          <div className="experience-path-copy">
            <SectionHeading eyebrow="Compete together" title={<>Small steps.<br /><span>Shared goals.</span></>}>
              Join class challenges, climb the leaderboard and turn progress into friendly competition.
            </SectionHeading>
            <p className="experience-detail"><Icon name="bolt" />XP powers your challenge standings.</p>
          </div>
        </article>
        <article className="experience-path experience-earn reveal">
          <ExperienceArt file="maze-reward-chest.png" />
          <div className="experience-path-copy">
            <SectionHeading eyebrow="Earn rewards" title={<>Keep showing up.<br /><span>Make it count.</span></>}>
              Earn trusted coins through learning activities and redeem them through the Study Maze rewards experience.
            </SectionHeading>
            <p className="experience-detail"><Icon name="gift" />Choose from the available rewards catalogue.</p>
            <p className="experience-disclaimer">Availability varies. Reward fulfilment is managed by an Admin.</p>
          </div>
        </article>
      </div>
    </div>
  </section>;
}
