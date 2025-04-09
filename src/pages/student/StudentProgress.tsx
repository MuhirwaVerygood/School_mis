
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for student progress
const progressData = [
  { month: "Jan", grade: 65, effort: 50, average: 62 },
  { month: "Feb", grade: 68, effort: 60, average: 65 },
  { month: "Mar", grade: 72, effort: 65, average: 68 },
  { month: "Apr", grade: 75, effort: 70, average: 70 },
  { month: "May", grade: 80, effort: 75, average: 72 },
  { month: "Jun", grade: 85, effort: 80, average: 75 },
  { month: "Jul", grade: 82, effort: 85, average: 78 },
  { month: "Aug", grade: 87, effort: 82, average: 80 },
  { month: "Sep", grade: 90, effort: 88, average: 83 },
];

const subjectProgress = [
  { name: "Math", value: 85 },
  { name: "Science", value: 75 },
  { name: "English", value: 90 },
  { name: "History", value: 65 },
  { name: "Geography", value: 70 },
  { name: "Physics", value: 80 },
];

const attendanceData = [
  { name: "Math", present: 90, absent: 10 },
  { name: "Science", present: 85, absent: 15 },
  { name: "English", present: 95, absent: 5 },
  { name: "History", present: 80, absent: 20 },
  { name: "Geography", present: 75, absent: 25 },
  { name: "Physics", present: 88, absent: 12 },
];

const chartConfig = {
  grade: {
    label: "Grade",
    theme: {
      light: "#4f46e5",
      dark: "#818cf8",
    },
  },
  effort: {
    label: "Effort",
    theme: {
      light: "#f97316",
      dark: "#fb923c",
    },
  },
  average: {
    label: "Class Average",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  present: {
    label: "Present",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  absent: {
    label: "Absent",
    theme: {
      light: "#f43f5e",
      dark: "#fb7185",
    },
  },
};

const StudentProgress: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <MainLayout userRole="student">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Academic Progress</h1>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Track your academic performance and see how you're progressing over time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Progress Over Time */}
          <Card className="col-span-1 lg:col-span-2 shadow-md">
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-lg md:text-xl">Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-60 md:h-80">
              <ChartContainer className="max-h-[300px] w-full" config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="grade" 
                      stroke="var(--color-grade)" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }}
                      className="animate-draw"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="effort" 
                      stroke="var(--color-effort)" 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }}
                      className="animate-draw"
                      style={{ animationDelay: "0.3s" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="average" 
                      stroke="var(--color-average)" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      className="animate-draw"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Subject Performance */}
          <Card className="shadow-md">
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-lg md:text-xl">Subject Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-60 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectProgress}
                  layout="vertical"
                  barSize={20}
                  margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: '0.75rem' }} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar 
                    dataKey="value" 
                    fill="#4f46e5" 
                    radius={[0, 4, 4, 0]}
                    className="animate-grow-bar"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attendance Rate */}
          <Card className="shadow-md">
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-lg md:text-xl">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent className="h-60 md:h-80">
              <ChartContainer className="max-h-[300px] w-full" config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={attendanceData}
                    stackOffset="expand"
                    margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: '0.75rem' }} />
                    <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="present" 
                      stackId="1" 
                      stroke="var(--color-present)" 
                      fill="var(--color-present)"
                      className="animate-fade-in"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="absent" 
                      stackId="1" 
                      stroke="var(--color-absent)" 
                      fill="var(--color-absent)"
                      className="animate-fade-in"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentProgress;
