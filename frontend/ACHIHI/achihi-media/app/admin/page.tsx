import type { Metadata } from "next";
import AdminView from "./AdminView";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "ACHIHI Media moderation and admin panel",
};

export default function AdminPage() {
  return <AdminView />;
}
