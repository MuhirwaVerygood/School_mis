
import React, { createContext, useState, useContext, ReactNode } from "react";

export type UserRole = "student" | "teacher" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for demonstration
const mockUsers = {
  student: {
    id: "STU001",
    name: "John Doe",
    email: "student@example.com",
    role: "student" as UserRole,
  },
  teacher: {
    id: "TCH001",
    name: "Dr. Sarah Wilson",
    email: "teacher@example.com",
    role: "teacher" as UserRole,
  },
  admin: {
    id: "ADM001",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin" as UserRole,
  },
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string, role: UserRole) => {
    // This is a mock implementation
    // In a real application, you would verify credentials against a backend
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (password !== "password") {
      throw new Error("Invalid credentials");
    }
    
    // Set the user based on the role they selected
    const loggedInUser = mockUsers[role];
    
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      throw new Error("User not found");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
