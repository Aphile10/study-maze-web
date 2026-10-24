export type Details = Record<string, string>;
export type Person = { id: string; details: Details };
export type RegistrationDraft = { organization: Details; contact: Details; teachers: Person[]; students: Person[] };
export type Field = { key: string; label: string; required?: boolean; type?: "email" | "tel" | "url" | "number" | "textarea"; options?: string[]; autocomplete?: string };
export const steps = ["Organization", "Main contact", "Teachers", "Students", "Documents", "Review"];
export const organizationFields: Field[] = [
  { key: "name", label: "School / organization name", required: true, autocomplete: "organization" },
  { key: "type", label: "Organization type", required: true, options: ["Public school", "Private school", "College", "University", "Training provider", "Other"] },
  { key: "registrationNumber", label: "Registration / institution number" },
  { key: "province", label: "Province", required: true, options: ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"] },
  { key: "city", label: "City / town", required: true, autocomplete: "address-level2" },
  { key: "address", label: "Physical address", required: true, type: "textarea", autocomplete: "street-address" },
  { key: "website", label: "Website", type: "url" },
  { key: "studentCount", label: "Estimated number of students", required: true, type: "number" },
  { key: "teacherCount", label: "Estimated number of teachers", required: true, type: "number" },
];
export const contactFields: Field[] = [
  { key: "firstName", label: "First name", required: true, autocomplete: "given-name" },
  { key: "lastName", label: "Last name", required: true, autocomplete: "family-name" },
  { key: "jobTitle", label: "Role / job title", required: true, autocomplete: "organization-title" },
  { key: "email", label: "Work email", required: true, type: "email", autocomplete: "email" },
  { key: "phone", label: "Contact number", required: true, type: "tel", autocomplete: "tel" },
];
export const teacherFields: Field[] = [
  { key: "firstName", label: "First name", required: true }, { key: "lastName", label: "Last name", required: true },
  { key: "email", label: "Email", type: "email", required: true }, { key: "staffNumber", label: "Staff / employee number" }, { key: "department", label: "Subject / department" },
];
export const studentFields: Field[] = [
  { key: "firstName", label: "First name", required: true }, { key: "lastName", label: "Last name", required: true },
  { key: "email", label: "Email", type: "email" }, { key: "studentNumber", label: "Student number", required: true },
  { key: "level", label: "Grade / year / level", required: true }, { key: "group", label: "Class / group" },
];
export function emptyDraft(): RegistrationDraft { return { organization: {}, contact: {}, teachers: [], students: [] }; }
export function validateStep(draft: RegistrationDraft, step: number): Record<string, string> {
  const errors: Record<string, string> = {};
  function fields(values: Details, config: Field[], prefix: string) {
    for (const f of config) {
      const value = (values[f.key] || "").trim(), key = `${prefix}-${f.key}`;
      if (!value) { if (f.required) errors[key] = `${f.label} is required.`; continue; }
      if (value.length > (f.type === "textarea" ? 500 : 200)) errors[key] = "Please shorten this value.";
      else if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[key] = "Enter a valid email address.";
      else if (f.type === "tel" && (!/^[+()\d\s.-]+$/.test(value) || !/^[0-9]{7,15}$/.test(value.replace(/\D/g, "")))) errors[key] = "Enter a valid contact number (7-15 digits).";
      else if (f.type === "number" && (!/^\d+$/.test(value) || Number(value) > 10000000)) errors[key] = "Enter a whole number between 0 and 10,000,000.";
      else if (f.options && !f.options.includes(value)) errors[key] = "Choose an option from the list.";
      else if (f.type === "url") { try { const url = new URL(value); if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) throw Error(); } catch { errors[key] = "Enter a full website URL, such as https://school.example."; } }
    }
  }
  if (step === 0) fields(draft.organization, organizationFields, "organization");
  if (step === 1) fields(draft.contact, contactFields, "contact");
  if (step === 2 || step === 3) {
    const kind = step === 2 ? "teachers" : "students", seen = new Set<string>();
    draft[kind].forEach(person => {
      const prefix = `${kind}-${person.id}`;
      fields(person.details, step === 2 ? teacherFields : studentFields, prefix);
      const key = step === 2 ? "email" : "studentNumber", value = person.details[key]?.trim().toLowerCase();
      if (value && seen.has(value)) errors[`${prefix}-${key}`] = step === 2 ? "This teacher email is already listed." : "This student number is already listed.";
      if (value) seen.add(value);
    });
  }
  return errors;
}
export function validateRegistration(draft: RegistrationDraft) {
  return Object.assign({}, ...steps.map((_, i) => validateStep(draft, i))) as Record<string, string>;
}
export type DemoReceipt = { mode: "demo"; status: "pending_verification"; submittedAt: string };
// Replace only this boundary with an authenticated, server-validated submission later.
// No HTTP, browser storage, account creation, approval or permission changes occur here.
export async function submitRegistrationDemo(draft: RegistrationDraft): Promise<DemoReceipt> {
  if (Object.keys(validateRegistration(draft)).length) throw new Error("Please check the registration details before submitting.");
  return { mode: "demo", status: "pending_verification", submittedAt: new Date().toISOString() };
}
