import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  DollarSign,
  Star,
  Bed,
  TrendingUp,
  Users,
  Settings,
  PlusCircle,
  BarChart3,
} from "lucide-react";

const menuItems = [
  { title: "Overview", url: "/hotel-ai/dashboard", icon: LayoutDashboard },
  { title: "Revenue", url: "/hotel-ai/dashboard/revenue", icon: DollarSign },
  { title: "Reviews", url: "/hotel-ai/dashboard/reviews", icon: Star },
  { title: "Housekeeping", url: "/hotel-ai/dashboard/housekeeping", icon: Bed },
  { title: "Forecasting", url: "/hotel-ai/dashboard/forecasting", icon: TrendingUp },
  { title: "Competitor Rates", url: "/hotel-ai/dashboard/competitor-rates", icon: BarChart3 },
  { title: "Staff", url: "/hotel-ai/dashboard/staff", icon: Users },
  { title: "Settings", url: "/hotel-ai/dashboard/settings", icon: Settings },
];

export function HotelAISidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Hotel Operations AI
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/hotel-ai/onboarding"
                    className="hover:bg-muted/50 text-primary"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Add Business</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
