
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { GraduationCap, Users, UserCog, LogOut, Home, BookOpen, BarChart, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: ReactNode;
  userRole: "student" | "teacher" | "admin";
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, userRole }) => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    // In a real app, this would handle the authentication logout
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system.",
    });
    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <div className="py-4 px-3 flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center mb-2">
              <GraduationCap className="h-8 w-8 text-edu-primary" />
            </div>
            <h1 className="text-lg font-bold text-edu-primary">Scholar Hub</h1>
            <p className="text-xs text-gray-500 mt-1 uppercase">
              {userRole === "student" 
                ? "Student Portal" 
                : userRole === "teacher" 
                  ? "Teacher Portal" 
                  : "Admin Portal"
              }
            </p>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={`/${userRole}`}>
                        <Home className="h-4 w-4 mr-2" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {userRole === "student" && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to={`/${userRole}/marks`}>
                            <FileText className="h-4 w-4 mr-2" />
                            <span>My Marks</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to={`/${userRole}/progress`}>
                            <BarChart className="h-4 w-4 mr-2" />
                            <span>Progress</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                  
                  {userRole === "teacher" && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to={`/${userRole}/marks`}>
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Enter Marks</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to={`/${userRole}/students`}>
                            <Users className="h-4 w-4 mr-2" />
                            <span>View Students</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                  
                  {userRole === "admin" && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to={`/${userRole}/students`}>
                            <Users className="h-4 w-4 mr-2" />
                            <span>Students</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to={`/${userRole}/teachers`}>
                            <BookOpen className="h-4 w-4 mr-2" />
                            <span>Teachers</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to={`/${userRole}/analytics`}>
                            <BarChart className="h-4 w-4 mr-2" />
                            <span>Analytics</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={`/${userRole}/profile`}>
                        {userRole === "admin" ? (
                          <UserCog className="h-4 w-4 mr-2" />
                        ) : (
                          <Users className="h-4 w-4 mr-2" />
                        )}
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                <h2 className="text-xl font-semibold">
                  {userRole === "student" 
                    ? "Student Portal" 
                    : userRole === "teacher" 
                      ? "Teacher Portal" 
                      : "Admin Portal"
                  }
                </h2>
              </div>
              <div>
                <span className="text-sm text-gray-600">Welcome, {userRole}</span>
              </div>
            </div>
          </header>

          <main className={cn("flex-1 p-6 bg-gray-50")}>
            {children}
          </main>

          <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Scholar Progress Hub. All rights reserved.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
