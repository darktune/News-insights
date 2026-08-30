import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to ACHIHI Media",
};

export default function LoginPage() {
  return <LoginForm />;
}
