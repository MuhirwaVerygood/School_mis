
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Calendar, TrendingUp, Users, BarChart3, PieChart as PieChartIcon } from "lucide-react";

// Mock data for performance trends
const performanceTrends = [
  { month: "Jan", average: 68, attendance: 88, classSize: 120 },
  { month: "Feb", average: 70, attendance: 85, classSize: 122 },
  { month: "Mar", average: 72, attendance: 90, classSize: 118 },
  { month: "Apr", average: 75, attendance: 87, classSize: 125 },
  { month: "May", average: 78, attendance: 92, classSize: 130 },
  { month: "Jun", average: 80, attendance: 89, classSize: 128 },
  { month: "Jul", average: 77, attendance: 84, classSize: 126 },
  { month: "Aug", average: 82, attendance: 91, classSize: 132 },
  { month: "Sep", average: 85, attendance: 93, classSize: 135 },
  { month: "Oct", average: 88, attendance: 95, classSize: 140 },
  { month: "Nov", average: 86, attendance: 92, classSize: 138 },
];

// Department performance data
const departmentPerformance = [
  { name: "Science", average: 82, students: 80 },
  { name: "Mathematics", average: 76, students: 95 },
  { name: "Languages", average: 70, students: 60 },
  { name: "Humanities", average: 74, students: 45 },
  { name: "Arts", average: 80, students: 30 },
  { name: "Physical Ed", average: 88, students: 50 },
];

// Gender distribution
const genderData = [
  { name: "Male", value: 55, color: "#4f46e5" },
  { name: "Female", value: 45, color: "#ec4899" },
];

// Grade distribution
const gradeDistribution = [
  { name: "A", value: 30, color: "#4f46e5" },
  { name: "B", value: 35, color: "#10b981" },
  { name: "C", value: 25, color: "#f59e0b" },
  { name: "D", value: 8, color: "#ef4444" },
  { name: "F", value: 2, color: "#6b7280" },
];

// Chart configuration
const chartConfig = {
  average: {
    label: "Average Score",
    theme: {
      light: "#4f46e5",
      dark: "#818cf8",
    },
  },
  attendance: {
    label: "Attendance Rate",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  classSize: {
    label: "Class Size",
    theme: {
      light: "#f97316",
      dark: "#fb923c",
    },
  },
  students: {
    label: "Students",
    theme: {
      light: "#f97316",
      dark: "#fb923c",
    },
  },
};

// Custom PieChart label
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Analytics: React.FC = () => {
  return (
    <MainLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive overview of school performance metrics</p>
        </div>
      
        {/* Academic Performance Trends */}
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Academic Performance Trends
                </CardTitle>
                <CardDescription>Monthly averages and attendance rates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer className="max-h-[330px] w-full" config={chartConfig}>
                <AreaChart
                  data={performanceTrends}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="average" 
                    stroke="var(--color-average)" 
                    fill="var(--color-average)" 
                    fillOpacity={0.3}
                    className="animate-draw"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="var(--color-attendance)" 
                    fill="var(--color-attendance)" 
                    fillOpacity={0.3}
                    className="animate-draw"
                    style={{ animationDelay: "0.3s" }}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Second row statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Performance */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Department Performance
              </CardTitle>
              <CardDescription>Average scores by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 ">
                <ChartContainer className="h-[320px] w-full " config={chartConfig}>
                  <BarChart
                    data={departmentPerformance}
                    margin={{
                      top: 10,
                      right: 30,
                      // left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar 
                      dataKey="average" 
                      fill="var(--color-average)" 
                      radius={[4, 4, 0, 0]}
                      className="animate-grow-bar"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <Bar 
                      dataKey="students" 
                      fill="var(--color-students)" 
                      radius={[4, 4, 0, 0]}
                      className="animate-grow-bar"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Demographics */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Student Demographics
              </CardTitle>
              <CardDescription>Distribution by gender and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="gender" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="gender" className="flex items-center gap-2 text-xs">
                    <Users className="h-3 w-3" /> Gender
                  </TabsTrigger>
                  <TabsTrigger value="grades" className="flex items-center gap-2 text-xs">
                    <Calendar className="h-3 w-3" /> Grades
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="gender" className="mt-4">
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={1000}
                          animationBegin={200}
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="grades" className="mt-4">
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gradeDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={1000}
                          animationBegin={200}
                        >
                          {gradeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
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

export default Analytics;
