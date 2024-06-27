"use client";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode, FC } from "react";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-background border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center border-b">
          <span
            className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground overflow-hidden transition-all line-clamp-1 ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            Sol Deck
          </span>
          <Button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-background hover:bg-background/20"
          >
            <span className="text-foreground">
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </span>
          </Button>
        </div>

        <div className="border-b flex p-3 mb-2 ">
          <Button className="bg-primary text-foreground w-full justify-center items-center group relative">
            {expanded ? (
              <span className="text-background">Add new</span>
            ) : (
              <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-primary text-background text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                Add new
              </div>
            )}
          </Button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="p-3 flex justify-between items-center">
          <ModeToggle />
        </div>

        <div className="border-t flex p-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-foreground">
              W1
            </AvatarFallback>
          </Avatar>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <span className="text-sm text-foreground line-clamp-1">
                DUMMY TEXT
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
};

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  alert,
}) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group 
        ${
          active
            ? "bg-secondary text-primary"
            : "hover:bg-secondary/50 text-foreground/30 hover:text-foreground/50"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-40 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-primary ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-primary text-background text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default Sidebar;
