import type { Metadata } from "next";
import ProfileView from "./ProfileView";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your ACHIHI Media profile and settings",
};

export default function ProfilePage() {
  return <ProfileView />;
}
