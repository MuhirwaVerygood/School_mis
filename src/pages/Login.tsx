
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole, useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, UserCog } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password, role);
      toast({
        title: "Login successful",
        description: `Welcome to the ${role} portal.`,
      });
      navigate(`/${role}`);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-edu-light rounded-full mb-4">
            <GraduationCap className="h-12 w-12 text-edu-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scholar Progress Hub</h1>
          <p className="text-gray-600">Access your educational portal</p>
        </div>
        
        <Card className="border-edu-accent/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Select your portal and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="student" onValueChange={(value) => setRole(value as UserRole)} className="mb-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="student" className="flex flex-col py-2 px-3 items-center gap-1">
                    <GraduationCap className="h-5 w-5" />
                    <span className="text-xs">Student</span>
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="flex flex-col py-2 px-3 items-center gap-1">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-xs">Teacher</span>
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex flex-col py-2 px-3 items-center gap-1">
                    <UserCog className="h-5 w-5" />
                    <span className="text-xs">Admin</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="student">
                  <p className="text-sm text-gray-500 mb-4">
                    Access your grades, attendance, and track your academic progress.
                  </p>
                </TabsContent>
                <TabsContent value="teacher">
                  <p className="text-sm text-gray-500 mb-4">
                    Record student grades, manage attendance, and view class performance.
                  </p>
                </TabsContent>
                <TabsContent value="admin">
                  <p className="text-sm text-gray-500 mb-4">
                    Oversee all academic activities, manage users, and view institution analytics.
                  </p>
                </TabsContent>
              </Tabs>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`${role}@example.com`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-edu-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For demo, use password: "password"
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-edu-primary hover:bg-edu-dark text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-500">
              <span>Don't have an account? </span>
              <a href="#" className="text-edu-primary hover:underline">
                Contact your administrator
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
