import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useTheme } from "@/contexts/ThemeContext"
import {
  LayoutDashboard,
  FileText,
  Upload,
  Folder,
  CreditCard,
  Settings,
  Shield,
} from "lucide-react"
import logo from '/logo.svg'
import logoDark from '/logo-dark.svg'

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({
  ...props
}) {
  const { user } = useAuthStore()
  const { theme } = useTheme()
  const location = useLocation()

  const navMain = [
    {
      title: "لوحة التحكم",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: location.pathname === "/dashboard",
    },
    {
      title: "الملاحظات",
      url: "/dashboard/notes",
      icon: FileText,
      isActive: location.pathname.startsWith("/dashboard/notes"),
    },
    {
      title: "رفع الملاحظات",
      url: "/dashboard/upload",
      icon: Upload,
      isActive: location.pathname === "/dashboard/upload",
    },
    {
      title: "المجلدات",
      url: "/dashboard/folders",
      icon: Folder,
      isActive: location.pathname === "/dashboard/folders",
    },
    {
      title: "الفوترة",
      url: "/dashboard/billing",
      icon: CreditCard,
      isActive: location.pathname === "/dashboard/billing",
    },
    {
      title: "الإعدادات",
      url: "/dashboard/settings",
      icon: Settings,
      isActive: location.pathname === "/dashboard/settings",
    },
  ]

  if (user?.role === 'ADMIN') {
    navMain.push({
      title: "لوحة المشرف",
      url: "/admin",
      icon: Shield,
      isActive: location.pathname.startsWith("/admin"),
    })
  }

  const userData = {
    name: user?.name || user?.email || "المستخدم",
    email: user?.email || "",
    avatar: user?.avatar || "/avatars/default.jpg",
  }

  return (
    <Sidebar variant="inset" side="right" className="text-right" dir="rtl" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard" className="flex items-center gap-3 flex-row-reverse justify-between w-full">
                
                <ThemeToggle className="flex-shrink-0" />
                <div className="flex items-center gap-3 flex-row">
                  <img
                    src={theme === 'dark' ? logoDark : logo}
                    alt="دفتر الملاحظات الذكي"
                    className="h-8 w-auto"
                  />
                  
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
