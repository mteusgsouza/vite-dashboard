import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { BarChart3, LayoutDashboard, Menu, Settings, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from '../mode-toggle'

interface DashboardLayoutProps {
    children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const isMobile = useIsMobile()

    // Menu items configuration
    const menuItems = [
        { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { to: '/dashboard/users', label: 'Users', icon: Users },
        { to: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
        { to: '/dashboard/settings', label: 'Settings', icon: Settings },
    ]

    const menuContent = (
        <SidebarMenu>
            {menuItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild>
                        <Link to={item.to} className="flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                {/* Desktop Sidebar */}
                {!isMobile && (
                    <Sidebar>
                        <SidebarHeader className="flex items-center justify-between">
                            <h2 className="text-lg font-bold">Dashboard</h2>
                        </SidebarHeader>
                        <SidebarContent>
                            {menuContent}
                        </SidebarContent>
                    </Sidebar>
                )}

                {/* Main Content */}
                <div className="flex flex-col flex-1">
                    {/* Header */}
                    <header className="border-b bg-background">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-4">
                                {isMobile && (
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <button className="md:hidden p-2 hover:bg-accent rounded-md">
                                                <Menu className="w-5 h-5" />
                                            </button>
                                        </SheetTrigger>
                                        <SheetContent side="left" className="w-64 p-0">
                                            <div className="space-y-4">
                                                <div className="px-6 py-4">
                                                    <h2 className="text-lg font-bold">Dashboard</h2>
                                                </div>
                                                <div className="px-2">
                                                    {menuContent}
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                )}
                                <h1 className="text-2xl font-bold">My Dashboard</h1>
                            </div>
                            <ModeToggle />
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
