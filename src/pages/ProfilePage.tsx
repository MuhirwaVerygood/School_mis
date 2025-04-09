
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2, Lock, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!user) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would call an API to update the profile
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Basic validation
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to change the password
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });

    // Reset the password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <MainLayout userRole={user.role}>
      <div className="w-full max-w-4xl mx-auto px-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 shadow-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                  <AvatarFallback className="text-xl sm:text-2xl">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-lg sm:text-xl">{user.name}</CardTitle>
              <CardDescription className="text-sm">{user.email}</CardDescription>
              <CardDescription className="capitalize mt-1 text-sm">{user.role} Account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium text-gray-500">User ID:</span>
                  <span className="text-xs sm:text-sm text-gray-700">{user.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium text-gray-500">Role:</span>
                  <span className="text-xs sm:text-sm capitalize text-gray-700">{user.role}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Account Settings</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Manage your profile and security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="profile" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" /> Profile
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <Lock className="h-3 w-3 sm:h-4 sm:w-4" /> Security
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="mt-2 sm:mt-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="name" className="text-xs sm:text-sm">Full Name</Label>
                      <div className="flex gap-2">
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="text-xs sm:text-sm h-8 sm:h-10"
                        />
                        {!isEditing && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsEditing(true)}
                            title="Edit Profile"
                            className="h-8 w-8 sm:h-10 sm:w-10"
                          >
                            <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-8 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="flex justify-end space-x-2 pt-2 sm:pt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                          className="text-xs sm:text-sm h-8 sm:h-10"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSaveProfile}
                          className="text-xs sm:text-sm h-8 sm:h-10"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="mt-2 sm:mt-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="currentPassword" className="text-xs sm:text-sm">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm h-8 sm:h-10"
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="newPassword" className="text-xs sm:text-sm">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm h-8 sm:h-10"
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="confirmPassword" className="text-xs sm:text-sm">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm h-8 sm:h-10"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2 sm:pt-4">
                      <Button 
                        onClick={handleChangePassword}
                        className="text-xs sm:text-sm h-8 sm:h-10"
                      >
                        Change Password
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
