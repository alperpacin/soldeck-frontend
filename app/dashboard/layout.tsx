import Sidebar, { SidebarItem } from "@/components/shared/nav-bar";
import { Home, Settings } from "lucide-react";

export default function AppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text={"Home"} active />
        <SidebarItem icon={<Settings size={20} />} text={"Settings"} />
      </Sidebar>

      <section>{children}</section>
    </main>
  );
}
