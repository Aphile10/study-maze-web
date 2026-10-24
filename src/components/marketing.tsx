import Link from "next/link";
import { Brand, ButtonLink, FeatureCard, Icon, SectionHeading, type IconName } from "./ui";
import RewardJourney from "./reward-journey";

function MazeDrawing() {
  return <svg viewBox="0 0 320 260" className="maze-drawing" fill="none" aria-hidden="true">
    <path className="maze-wall" d="M20 20h280v220H20V20Zm0 55h55V20m0 55v55h55V75h65V20M20 185h55v55m0-55h55v-55m0 55h65v55m0-55v-55h50V75h55M195 75h-65m115 55v55h55M75 130H20M245 20v25M130 240v-25M300 130h-25" />
    <path className="maze-route" d="M47 46v55h55v55h65V48h51v164h55" />
    <circle cx="47" cy="46" r="11" fill="var(--gold)" /><circle cx="273" cy="212" r="12" fill="var(--gold)" />
    <path d="m268 212 4 4 7-8" stroke="var(--violet-dark)" strokeWidth="3" strokeLinecap="round" />
    {[ [102,101], [167,101], [218,156], [47,212], [273,48] ].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="currentColor" opacity=".5" />)}
  </svg>;
}

export function Hero() {
  return <section id="home" className="hero section-anchor"><div className="hero-glow" aria-hidden="true" /><div className="container hero-grid">
    <div className="hero-copy">
      <p className="hero-eyebrow"><span />A brighter way to learn</p>
      <h1>Study. Play.<br /><span>Compete.</span> <span className="earn-word">Earn.<svg viewBox="0 0 210 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 10Q105-3 207 6" /></svg></span></h1>
      <p className="hero-description">Less going through the motions.<br className="desktop-break" /> More finding your way.</p>
      <p className="hero-body">Turn revision into an interactive journey with learning games, AI study tools, class challenges and rewards worth working towards.</p>
      <div className="hero-actions"><ButtonLink href="#games">Explore Study Maze</ButtonLink><ButtonLink href="#how-it-works" secondary>See how it works</ButtonLink></div>
      <div className="hero-footnote"><span className="little-star"><Icon name="sparkles" /></span>Made for curious minds. Built for the next step.</div>
    </div>
    <div className="hero-visual" aria-label="Illustrated preview of the Study Maze experience">
      <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
      <span className="decor-star star-one" aria-hidden="true">✦</span><span className="decor-star star-two" aria-hidden="true">✦</span>
      <div className="hero-stage"><div className="stage-top"><Brand /><span className="stage-pill"><span />Learning in motion</span></div>
        <div className="stage-maze"><span className="maze-caption">FIND YOUR NEXT CHAPTER</span><MazeDrawing /><span className="maze-level"><Icon name="bolt" />A little practice. A new possibility.</span></div>
        <div className="stage-bottom"><span><Icon name="book" />Study</span><span><Icon name="grid" />Play</span><span><Icon name="star" />Grow</span></div>
      </div>
      <div className="floating-card float-notes"><span className="icon-box"><Icon name="file" /></span><div><strong>Your notes, simplified.</strong><span>Big ideas. Clearer steps.</span></div><span className="check-chip"><Icon name="check" /></span></div>
      <div className="floating-card float-reward"><span className="coin-symbol"><Icon name="star" /></span><div><strong>Small wins add up.</strong><span>Learn. Earn. Keep going.</span></div></div>
    </div>
  </div><div className="container hero-bottom"><span>ONE APP. MORE WAYS TO GROW.</span><div><Icon name="grid" />Learning games</div><div><Icon name="sparkles" />AI study tools</div><div><Icon name="users" />Class challenges</div><div><Icon name="gift" />Meaningful rewards</div></div></section>;
}

export function AboutSection() {
  return <section id="how-it-works" className="section section-anchor about-section"><div className="container reveal">
    <div className="about-intro"><SectionHeading eyebrow="Meet Study Maze" title={<>Revision doesn’t have<br />to stand <span>still.</span></>}>Traditional revision can feel repetitive. Study Maze gives students more ways to engage: understand an idea, put it into practice, and find a reason to come back.</SectionHeading><p className="handwritten">A little less “have to”.<br />A little more “let’s go”.<span aria-hidden="true">↴</span></p></div>
    <div className="journey-grid">{[
      ["01", "Study", "Start with understanding.", "Turn your material into clearer notes and explore ideas with AI assistance.", "book"],
      ["02", "Play", "Put learning in motion.", "Switch between maze challenges, rapid-fire questions and matching pairs.", "grid"],
      ["03", "Compete", "Make progress together.", "Join your class challenge and follow your place in the XP standings.", "star"],
      ["04", "Earn", "Give small wins meaning.", "Earn trusted coins through supported activities and redeem available rewards.", "gift"],
    ].map(([number, title, line, text, icon]) => <article key={number} className="journey-card"><span className="journey-number">{number}</span><span className="icon-box"><Icon name={icon as IconName} /></span><h3>{title}</h3><strong>{line}</strong><p>{text}</p></article>)}</div>
  </div></section>;
}

function GameCard({ kind, number, name, tag, description }: { kind: "maze" | "quiz" | "memory"; number: string; name: string; tag: string; description: string }) {
  return <article className={`game-card game-${kind}`}><div className="game-art"><span className="game-tag">{tag}</span>
    {kind === "maze" ? <div className="game-mini-maze"><MazeDrawing /></div> : kind === "quiz" ? <div className="quiz-preview"><div className="quiz-preview-top"><Icon name="bolt" /><span>THINK QUICK</span><span className="quiz-timer">00:10</span></div><strong>Which habit helps<br />you remember?</strong><span className="quiz-option"><span>A</span>Practise a little, often<Icon name="check" /></span><span className="quiz-option muted"><span>B</span>Leave it all for later</span></div> : <div className="memory-preview">{["book", "star", "grid", "gift", "book", "grid"].map((icon, index) => <span key={index} className={index === 0 || index === 4 ? "memory-tile tile-matched" : "memory-tile"}><Icon name={icon as IconName} /></span>)}</div>}
  </div><div className="game-content"><span className="game-number">{number} / PLAY YOUR WAY</span><h3>{name}</h3><p>{description}</p><span className="game-detail"><Icon name={kind === "maze" ? "grid" : kind === "quiz" ? "clock" : "sparkles"} />{kind === "maze" ? "Three levels. One adventure." : kind === "quiz" ? "Three lives. Ten correct answers." : "Find pairs. Beat the clock."}</span></div></article>;
}
export function GamesSection() {
  return <section id="games" className="section section-anchor games-section"><div className="container"><div className="section-top reveal"><SectionHeading eyebrow="Three ways to play" title={<>Different games.<br />The same <span>curious mind.</span></>}>A quick round can look different every time. Find the challenge that keeps you thinking.</SectionHeading><span className="section-note"><Icon name="grid" />A fresh way to practise</span></div>
    <div className="games-grid reveal"><GameCard kind="maze" number="01" name="Maze Runner" tag="Explore & discover" description="Navigate corridors, dodge ghosts, collect dots and answer quiz nodes across three maze levels." /><GameCard kind="quiz" number="02" name="Quiz Rush" tag="Think on your feet" description="Take on rapid-fire questions. Make each answer count as you work towards ten correct answers." /><GameCard kind="memory" number="03" name="Memory Match" tag="Find your focus" description="Flip cards, connect matching pairs and finish before the timer runs out." /></div>
  </div></section>;
}

export function StudyWorkflow() {
  return <section id="study" className="section section-anchor study-section"><div className="container split-grid"><div className="study-visual reveal"><div className="study-paper"><div className="paper-title"><span className="pdf-icon">PDF</span><div><strong>Your study material</strong><span>The starting point</span></div></div><div className="paper-lines"><i /><i /><i /><i /></div><div className="diagram-placeholder"><Icon name="book" /></div></div><div className="transform-badge"><Icon name="sparkles" /><span>Make it clearer</span><Icon name="arrow" /></div><div className="study-notes"><div className="notes-top"><Icon name="sparkles" />Your study notes<span className="mini-check"><Icon name="check" /></span></div><div className="note-block"><span>01 / THE BIG PICTURE</span><strong>A summary you can start with.</strong><div className="paper-lines"><i /><i /></div></div><div className="note-block"><span>02 / CONNECT THE IDEAS</span><div className="concept-tags"><span>Key concepts</span><span>Examples</span></div></div><div className="revision-strip"><Icon name="book" />Your revision summary</div></div><span className="visual-label">PDF → STRUCTURED NOTES · ILLUSTRATIVE PREVIEW</span></div>
    <div className="reveal"><SectionHeading eyebrow="Study smarter" title={<>Big ideas.<br /><span>Clearer steps.</span></>}>Give your study material a new starting point. Upload a supported PDF and turn it into structured notes you can revisit.</SectionHeading><ul className="check-list"><li><Icon name="check" />Summaries that bring the main ideas together</li><li><Icon name="check" />Key concepts with explanations and examples</li><li><Icon name="check" />A revision summary for your next review</li></ul><div className="mentor-note"><span className="icon-box"><Icon name="sparkles" /></span><div><strong>A study companion, too.</strong><p>Ask Maze Mentor questions and work through explanations when you need another way into an idea.</p></div></div><p className="small-print">AI is a study aid. Check important details against your learning material.</p></div>
  </div></section>;
}

export function ChallengeSection() {
  return <section id="challenges" className="section section-anchor challenge-section"><div className="container split-grid"><div className="reveal"><SectionHeading eyebrow="Better, together" title={<>Your class.<br />Your next <span>challenge.</span></>}>Make learning a shared goal. Eligible students can take part in class challenges and follow their progress on the XP leaderboard.</SectionHeading><div className="currency-note"><div><span className="icon-box"><Icon name="bolt" /></span><strong>XP</strong><p>Progression & competition</p></div><span className="currency-divider" /><div><span className="icon-box gold-box"><Icon name="star" /></span><strong>Coins</strong><p>Spendable rewards currency</p></div></div><p className="small-print">Two different purposes. XP powers challenge standings; coins are for the Rewards Shop.</p></div>
    <div className="leaderboard-card reveal"><div className="demo-top"><span className="mini-brand"><Icon name="users" />Class challenge</span><span className="status-pill">Active</span></div><h3>A little progress. Together.</h3><p className="leaderboard-subtitle">An example of your class standings</p><div className="leaderboard-rows">{[["1", "Classmate A", "Keep showing up", "360"], ["2", "You", "Your next step starts here", "320"], ["3", "Classmate B", "Learning in motion", "280"]].map(([rank, name, label, xp]) => <div key={rank} className={`leaderboard-row ${rank === "2" ? "your-row" : ""}`}><span className={`rank rank-${rank}`}>{rank}</span><span className="avatar-placeholder"><Icon name="users" /></span><div><strong>{name}</strong><span>{label}</span></div><span className="xp-value">{xp}<small>XP</small></span></div>)}</div><div className="leaderboard-bottom"><Icon name="shield" />Follow your class challenge progress.</div><p className="demo-disclaimer">Illustrative names and values. Not live student data.</p></div>
  </div></section>;
}

export function RewardsSection() {
  return <section id="rewards" className="section section-anchor rewards-section"><div className="container split-grid"><div className="reveal"><RewardJourney /></div><div className="reveal"><SectionHeading eyebrow="Small wins. Real motivation." title={<>Keep learning.<br />Make it <span>rewarding.</span></>}>Earn trusted coins through supported games and daily rewards. Explore the available catalogue and choose what to work towards.</SectionHeading><div className="reward-benefits"><FeatureCard icon="star" title="A balance you can follow">See your available coins before choosing a reward.</FeatureCard><FeatureCard icon="gift" title="A clear redemption journey">Check the cost and availability, then follow your request from pending to fulfilled.</FeatureCard></div><p className="small-print">Rewards depend on the current catalogue and availability. Fulfilment is managed by an Admin.</p></div></div></section>;
}

export function TeacherSection() {
  return <section className="section teacher-section"><div className="container reveal"><SectionHeading eyebrow="Teachers in the loop" centered title={<>Your material.<br />More ways to <span>bring it to life.</span></>}>Create content students can come back to. Quiz Studio brings generation, review and publishing into one practical workflow.</SectionHeading><div className="teacher-workflow">{[
    ["01", "Bring your material", "Start with supported PDF or text files, or add a question by hand.", "file"],
    ["02", "Make it yours", "Generate questions, review the answers and edit before publishing.", "sparkles"],
    ["03", "Share the learning", "Publish quizzes and share revision notes for students to explore.", "book"],
  ].map(([number, title, text, icon]) => <div key={number} className="teacher-step"><div className="teacher-step-top"><span className="icon-box"><Icon name={icon as IconName} /></span><span>{number}</span></div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>;
}

export function SchoolSection() {
  return <section id="schools" className="section section-anchor school-section"><div className="container school-panel reveal"><div><SectionHeading eyebrow="Built for real school use" title={<>Playful for students.<br /><span>Practical behind the scenes.</span></>}>Keep classes, challenges and rewards in view, with clear tools for the people running them.</SectionHeading><div className="hero-actions"><Link className="button button-primary" href="/portal">Register your school<Icon name="arrow" /></Link><a className="text-link" href="#experience">Explore the whole experience<Icon name="arrow" /></a></div></div><div className="school-features"><FeatureCard icon="users" title="Know your classes">View classes and their student and teacher rosters.</FeatureCard><FeatureCard icon="star" title="Run class challenges">Create drafts, assign a class and manage challenge lifecycles.</FeatureCard><FeatureCard icon="gift" title="Manage rewards">Maintain the catalogue and fulfil or cancel redemption requests.</FeatureCard></div></div></section>;
}

export function CTASection() {
  return <section className="section-anchor cta-section"><div className="container cta-panel reveal"><span className="cta-star" aria-hidden="true">✦</span><p className="eyebrow">Your next chapter</p><h2>See Study Maze<br />in <span>action.</span></h2><p>{"Whether you're a student, teacher, school or potential partner, discover how Study Maze turns learning into an experience worth coming back to."}</p><ButtonLink href="#experience">Explore the experience</ButtonLink><span className="cta-loop" aria-hidden="true" /></div></section>;
}

export function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-main"><div><a href="#home" aria-label="Study Maze home"><Brand /></a><p>A brighter way to study,<br />play and find your next step.</p></div><nav aria-label="Footer navigation"><a href="#games">Games</a><a href="#study">Study tools</a><a href="#challenges">Challenges</a><a href="#rewards">Rewards</a><a href="#schools">For schools</a></nav><div className="footer-contact"><span>Contact Study Maze</span><p>Explore Study Maze and our school onboarding demo.</p><a className="text-link" href="#experience">Explore Study Maze<Icon name="arrow" /></a></div></div><div className="footer-bottom"><span>© 2026 Study Maze. All rights reserved.</span><span>Study. Play. Compete. Earn.</span></div></div></footer>;
}
