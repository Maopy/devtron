import { Dispatch, SetStateAction } from "react"
import { BookAudio, ChevronsLeftRightEllipsis, ShieldAlert, Accessibility, BadgeInfo } from "lucide-react"
import { Pane } from "./pane"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    id: "event-listener",
    title: "Event Listener",
    icon: BookAudio,
  },
  {
    id: "ipc",
    title: "IPC",
    icon: ChevronsLeftRightEllipsis,
  },
  {
    id: "lint",
    title: "Lint",
    icon: ShieldAlert,
  },
  {
    id: "accessibility",
    title: "Accessibility",
    icon: Accessibility,
  },
  {
    id: "about",
    title: "About",
    icon: BadgeInfo,
  },
] as const

interface AppSidebarProps {
  onPaneChange: Dispatch<SetStateAction<Pane>>,
  activePane: Pane
}

export function AppSidebar({ onPaneChange, activePane }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Devtron</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activePane === item.id as Pane}
                    onClick={() => onPaneChange(item.id as Pane)}
                  >
                    <button>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
