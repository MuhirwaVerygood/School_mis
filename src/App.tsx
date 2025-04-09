
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMarks from "./pages/student/StudentMarks";
import StudentProgress from "./pages/student/StudentProgress";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import EnterMarks from "./pages/teacher/EnterMarks";
import ViewStudents from "./pages/teacher/ViewStudents";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";
import Analytics from "./pages/admin/Analytics";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Private route wrapper component
interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"student" | "teacher" | "admin">;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  allowedRoles = ["student", "teacher", "admin"] 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to={`/${user?.role}`} /> : <Login />} />
      
      {/* Student Routes */}
      <Route 
        path="/student" 
        element={
          <PrivateRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/student/marks" 
        element={
          <PrivateRoute allowedRoles={["student"]}>
            <StudentMarks />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/student/progress" 
        element={
          <PrivateRoute allowedRoles={["student"]}>
            <StudentProgress />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/student/profile" 
        element={
          <PrivateRoute allowedRoles={["student"]}>
            <ProfilePage />
          </PrivateRoute>
        } 
      />
      
      {/* Teacher Routes */}
      <Route 
        path="/teacher" 
        element={
          <PrivateRoute allowedRoles={["teacher"]}>
            <TeacherDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/teacher/marks" 
        element={
          <PrivateRoute allowedRoles={["teacher"]}>
            <EnterMarks />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/teacher/students" 
        element={
          <PrivateRoute allowedRoles={["teacher"]}>
            <ViewStudents />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/teacher/profile" 
        element={
          <PrivateRoute allowedRoles={["teacher"]}>
            <ProfilePage />
          </PrivateRoute>
        } 
      />
      
      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/admin/students" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Students />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/admin/teachers" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Teachers />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/admin/analytics" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Analytics />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/admin/profile" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <ProfilePage />
          </PrivateRoute>
        } 
      />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
