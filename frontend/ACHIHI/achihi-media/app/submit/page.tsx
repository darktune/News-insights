import type { Metadata } from "next";
import SubmitView from "./SubmitView";

export const metadata: Metadata = {
  title: "Write an Article",
  description: "Submit a story to ACHIHI Media",
};

export default function SubmitPage() {
  return <SubmitView />;
}
