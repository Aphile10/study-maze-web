import type { Metadata } from "next";
import RegistrationForm from "@/components/portal/registration-form";
export const metadata: Metadata = { title: "Register Your School | Study Maze", description: "Try the exhibition school registration demo. No accounts are created and submissions do not enter a real review queue.", openGraph: { title: "Register Your School | Study Maze", description: "An exhibition registration demonstration, without live processing." } };
export default function RegisterPage() { return <RegistrationForm />; }
