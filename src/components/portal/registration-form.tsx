"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { steps, emptyDraft, organizationFields, contactFields, teacherFields, studentFields, validateStep, validateRegistration, submitRegistrationDemo, type Details, type Field, type DemoReceipt } from "@/lib/portal-registration";

function Fields({ config, values, prefix, errors, update }: { config: Field[]; values: Details; prefix: string; errors: Record<string, string>; update: (key: string, value: string) => void }) {
  return <div className="portal-fields">{config.map(field => {
    const id = `${prefix}-${field.key}`, error = errors[id];
    const props = { id, name: id, value: values[field.key] || "", required: field.required, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(field.key, e.target.value) };
    return <div className={`portal-field ${field.type === "textarea" ? "portal-field-wide" : ""}`} key={id}>
      <label htmlFor={id}>{field.label}{!field.required && <span> (optional)</span>}</label>
      {field.options ? <select {...props}><option value="">Select an option</option>{field.options.map(value => <option key={value}>{value}</option>)}</select> : field.type === "textarea" ? <textarea {...props} autoComplete={field.autocomplete} rows={3} maxLength={500} /> : <input {...props} type={field.type || "text"} autoComplete={field.autocomplete || "off"} maxLength={200} min={field.type === "number" ? 0 : undefined} step={field.type === "number" ? 1 : undefined} placeholder={field.type === "url" ? "https://school.example" : undefined} />}
      {error && <p className="portal-field-error" id={`${id}-error`}>{error}</p>}
    </div>;
  })}</div>;
}
function ImportPlaceholder({ documents = false }: { documents?: boolean }) {
  return <div className="portal-import"><span className="icon-box"><Icon name={documents ? "shield" : "file"} /></span><div><h3>{documents ? "Supporting documents" : "Already have your student or staff list?"}</h3><p>{documents ? "Supporting documents may be requested during verification. Please do not provide documents in this exhibition preview." : "Bulk import will be available in the organization onboarding release. Manual entries are available now."}</p><div className="portal-import-tags"><span>{documents ? "Institution registration" : ".xlsx"}</span><span>{documents ? "Authorization letter" : ".csv"}</span></div><button type="button" disabled>{documents ? "Document upload - not available yet" : "Choose file - coming later"}</button><p className="portal-caption">No files are selected, uploaded or stored.</p></div></div>;
}
export default function RegistrationForm() {
  const [draft, setDraft] = useState(emptyDraft);
  const [step, setStep] = useState(0), [furthest, setFurthest] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<DemoReceipt | null>(null);
  const [submitting, setSubmitting] = useState(false), [submissionError, setSubmissionError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null), guard = useRef(false), active = useRef(true);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  useEffect(() => { heading.current?.focus(); }, [step, receipt]);
  function go(target: number) { setStep(target); setErrors({}); setSubmissionError(""); }
  function next() {
    const found = validateStep(draft, step); setErrors(found);
    if (Object.keys(found).length) { setTimeout(() => document.getElementById(Object.keys(found)[0])?.focus(), 0); return; }
    setFurthest(Math.max(furthest, step + 1)); go(step + 1);
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); if (guard.current) return;
    if (step !== 5) { next(); return; }
    const found = validateRegistration(draft);
    if (Object.keys(found).length) {
      const invalidStep = steps.findIndex((_, i) => Object.keys(validateStep(draft, i)).length > 0);
      setStep(invalidStep); setErrors(found); return;
    }
    guard.current = true; setSubmitting(true); setSubmissionError("");
    try { const result = await submitRegistrationDemo(draft); if (active.current) setReceipt(result); }
    catch (error) { if (active.current) setSubmissionError(error instanceof Error ? error.message : "Could not complete the demo. Please try again."); }
    finally { guard.current = false; if (active.current) setSubmitting(false); }
  }
  function updateDetails(kind: "organization" | "contact", key: string, value: string) { setDraft(current => ({ ...current, [kind]: { ...current[kind], [key]: value } })); }
  function addPerson(kind: "teachers" | "students") { setDraft(current => ({ ...current, [kind]: [...current[kind], { id: crypto.randomUUID(), details: {} }] })); }
  function summary(title: string, values: Details, fields: Field[], target: number) {
    return <section className="portal-review-block"><div className="portal-review-title"><h3>{title}</h3><button type="button" onClick={() => go(target)}>Edit {title.toLowerCase()}</button></div><dl>{fields.map(field => <div key={field.key}><dt>{field.label}</dt><dd>{values[field.key]?.trim() || "Not provided"}</dd></div>)}</dl></section>;
  }
  if (receipt) return <div className="portal-shell portal-confirm"><div className="portal-card"><span className="portal-confirm-icon"><Icon name="check" /></span><p className="eyebrow">Exhibition demo completed</p><h1 ref={heading} tabIndex={-1}>Your school registration has been submitted.</h1><span className="portal-status">Status: Pending verification - demo</span><p>Thank you for preparing your organization registration with Study Maze.</p><div className="portal-demo"><Icon name="shield" /><p><strong>This was a demo submission.</strong>Your details have not been sent to Study Maze, saved permanently or placed in a real review queue. No accounts have been created.</p></div><h2>What happens in the live service?</h2><p>Our team will review the information provided and contact your primary representative after verification. Please allow approximately 3 business days for review; timing may vary.</p><p>Next steps will be sent to the contact email provided during registration once live onboarding is available.</p><Link href="/" className="button button-primary">Back to homepage<Icon name="arrow" /></Link></div></div>;
  const kind = step === 2 ? "teachers" : "students";
  const config = step === 2 ? teacherFields : studentFields;
  return <div className="portal-shell portal-registration">
    <div className="portal-registration-intro"><Link href="/portal" className="text-link">School onboarding</Link><h1>One step closer to Study Maze.</h1><p>Prepare your organization and team for a connected learning experience.</p></div>
    <div className="portal-demo"><Icon name="shield" /><p><strong>Exhibition preview - fictional details only</strong>Nothing is sent or saved permanently. Your entries stay while moving between steps, but are cleared when you reload or leave this form.</p></div>
    <div className="portal-registration-grid"><aside className="portal-progress" aria-label="Registration progress"><ol>{steps.map((label,i)=><li key={label}><button type="button" disabled={i > furthest || submitting} aria-current={i === step ? "step" : undefined} onClick={() => go(i)}><span>{i < step ? <Icon name="check" /> : i + 1}</span><div>{label}<small>{i === step ? "Current step" : i < step ? "Ready to review" : ""}</small></div></button></li>)}</ol><p><Icon name="shield" />Review comes before activation.</p></aside>
    <div className="portal-card portal-form-card"><p className="eyebrow">Step {step+1} of 6</p><h2 ref={heading} tabIndex={-1}>{steps[step]}</h2><p className="portal-step-description">{["Tell us where your learning community begins. Fields without an optional label are required.", "The person we would contact about verification and next steps.", "Add your teaching team, or continue without entries and prepare them later. This does not create accounts.", "Prepare student entries, or continue without them. Email is optional; no accounts or invitations are created.", "Plan ahead for verification. Document collection is not active in this preview.", "Check your details. This demonstration ends with pending verification, not approval."][step]}</p>
    <form noValidate onSubmit={submit}>
      {Object.keys(errors).length > 0 && <div className="portal-error" role="alert">Please check the highlighted fields before continuing.</div>}
      {submissionError && <div className="portal-error" role="alert">{submissionError}</div>}
      {step === 0 && <Fields config={organizationFields} values={draft.organization} prefix="organization" errors={errors} update={(key,value)=>updateDetails("organization",key,value)} />}
      {step === 1 && <Fields config={contactFields} values={draft.contact} prefix="contact" errors={errors} update={(key,value)=>updateDetails("contact",key,value)} />}
      {(step === 2 || step === 3) && <>
        <div className="portal-roster-heading"><h3>{draft[kind].length} {draft[kind].length === 1 ? kind.slice(0, -1) : kind} added</h3><button type="button" className="portal-add" onClick={() => addPerson(kind)}>+ Add {draft[kind].length ? "another " : "a "}{step === 2 ? "teacher" : "student"}</button></div>
        {!draft[kind].length && <div className="portal-empty"><Icon name="users" /><h3>Your {kind} start here.</h3><p>Add people individually, or move on and prepare your list later.</p></div>}
        {draft[kind].map((person,i)=><section className="portal-person" key={person.id}><div className="portal-review-title"><h3>{step === 2 ? "Teacher" : "Student"} {i+1}</h3><button type="button" aria-label={`Remove ${step === 2 ? "teacher" : "student"} ${i+1}`} onClick={()=>setDraft(current=>({...current,[kind]:current[kind].filter(p=>p.id!==person.id)}))}>Remove</button></div><Fields config={config} values={person.details} prefix={`${kind}-${person.id}`} errors={errors} update={(key,value)=>setDraft(current=>({...current,[kind]:current[kind].map(p=>p.id===person.id?{...p,details:{...p.details,[key]:value}}:p)}))} /></section>)}
        <ImportPlaceholder />
      </>}
      {step === 4 && <><ImportPlaceholder documents /><div className="portal-note"><Icon name="file" /><p>Institution registration, an authorization letter or a roster may be requested later. No supporting documents are needed to complete this demo.</p></div></>}
      {step === 5 && <>
        {summary("Organization",draft.organization,organizationFields,0)}
        {summary("Main contact",draft.contact,contactFields,1)}
        {(["teachers","students"] as const).map((group,i)=><section className="portal-review-block" key={group}><div className="portal-review-title"><h3>{draft[group].length} {draft[group].length === 1 ? group.slice(0, -1) : group} added</h3><button type="button" onClick={()=>go(i+2)}>Edit {group}</button></div>{draft[group].length ? <ul className="portal-review-people">{draft[group].map(p=><li key={p.id}><strong>{p.details.firstName} {p.details.lastName}</strong><span>{group === "teachers" ? p.details.email : `${p.details.studentNumber} / ${p.details.level}`}</span></li>)}</ul> : <p>No entries added. Can be prepared later.</p>}</section>)}
        <section className="portal-review-block"><div className="portal-review-title"><h3>Documents &amp; bulk import</h3><button type="button" onClick={()=>go(4)}>View documents</button></div><p>No files uploaded. Bulk import and supporting documents will be available in a later release.</p></section>
        <div className="portal-note"><Icon name="clock" /><p>Submitting demonstrates a pending-verification state. Activation will always require a review by Study Maze in the live service.</p></div>
      </>}
      <div className="portal-form-actions"><button type="button" className="button button-secondary" disabled={step === 0 || submitting} onClick={()=>go(step-1)}>Previous</button><button type="submit" className="button button-primary" disabled={submitting}>{step === 5 ? submitting ? "Submitting demo..." : "Submit registration" : "Continue"}<Icon name="arrow" /></button></div>
      {furthest === 5 && step < 5 && <button type="button" className="portal-return-review" onClick={()=>{const found=validateStep(draft,step);setErrors(found);if(!Object.keys(found).length)go(5);}}>Return to review</button>}
    </form></div></div>
  </div>;
}
