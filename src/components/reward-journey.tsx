"use client";

import { useState } from "react";
import { Icon } from "./ui";

const steps = ["Choose a reward", "Request pending", "Reward fulfilled"];
export default function RewardJourney() {
  const [step, setStep] = useState(0);
  return <div className="reward-demo">
    <div className="demo-top"><span className="mini-brand"><Icon name="gift" />Your reward journey</span><span className="demo-label">Interactive example</span></div>
    <div className="reward-item"><span className="reward-art"><Icon name="book" /></span><div><p className="eyebrow">A little motivation</p><h3>Study essentials</h3><p>Illustrative catalogue reward</p></div></div>
    <ol className="reward-steps">{steps.map((label, index) => <li key={label} className={index <= step ? "step-done" : ""}><span>{index < step ? <Icon name="check" /> : index + 1}</span>{label}</li>)}</ol>
    <div className="demo-status" aria-live="polite"><span className={`status-dot status-${step}`} />{step === 0 ? "Browse a reward and check its coin cost." : step === 1 ? "The request is pending fulfilment." : "An Admin has marked the request fulfilled."}</div>
    <button type="button" className="button button-primary" onClick={() => setStep((step + 1) % steps.length)}>{step === 0 ? "Preview a request" : step === 1 ? "Preview fulfilment" : "Replay example"}<Icon name="arrow" /></button>
    <p className="demo-disclaimer">An illustration only. No coins are spent or rewards requested.</p>
  </div>;
}
