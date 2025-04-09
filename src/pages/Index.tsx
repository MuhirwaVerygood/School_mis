
import React from "react";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Redirect to the homepage
    navigate("/");
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center">
        <div className="animate-pulse mb-4">
          <div className="h-12 w-12 mx-auto rounded-full bg-primary"></div>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">Redirecting to homepage...</p>
      </div>
    </div>
  );
};

export default Index;
