
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Search, UserCheck, ChevronRight, BookOpen, Calendar } from "lucide-react";

// Mock data for students
const students = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", grade: "A", attendance: 95, subjects: ["Math", "Science", "English"] },
  { id: "2", name: "Bob Smith", email: "bob@example.com", grade: "B", attendance: 85, subjects: ["History", "Art", "Math"] },
  { id: "3", name: "Charlie Davis", email: "charlie@example.com", grade: "C", attendance: 75, subjects: ["Science", "Geography", "Music"] },
  { id: "4", name: "Diana Miller", email: "diana@example.com", grade: "A", attendance: 92, subjects: ["Math", "Physics", "Chemistry"] },
  { id: "5", name: "Edward Wilson", email: "edward@example.com", grade: "B", attendance: 88, subjects: ["English", "History", "Economics"] },
  { id: "6", name: "Fiona Brown", email: "fiona@example.com", grade: "A", attendance: 97, subjects: ["Biology", "Chemistry", "Math"] },
  { id: "7", name: "George Taylor", email: "george@example.com", grade: "D", attendance: 65, subjects: ["Geography", "History", "Art"] },
  { id: "8", name: "Hannah Lewis", email: "hannah@example.com", grade: "B", attendance: 82, subjects: ["Physics", "Math", "Computer Science"] },
];

// Data for class performance
const performanceData = [
  { name: "A Grade", value: 35, color: "#4f46e5" },
  { name: "B Grade", value: 40, color: "#10b981" },
  { name: "C Grade", value: 15, color: "#f59e0b" },
  { name: "D Grade", value: 10, color: "#ef4444" },
];

const attendanceData = [
  { name: ">90%", value: 45, color: "#10b981" },
  { name: "80-90%", value: 30, color: "#4f46e5" },
  { name: "70-80%", value: 15, color: "#f59e0b" },
  { name: "<70%", value: 10, color: "#ef4444" },
];

// Custom animation for the pie chart
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

const ViewStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout userRole="teacher">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Students</h1>
            <p className="text-muted-foreground">View and manage your students' progress</p>
          </div>
          
          <div className="w-full sm:w-auto flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student List */}
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" /> 
                  Student Roster
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredStudents.length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">No students found.</p>
                  ) : (
                    filteredStudents.map((student) => (
                      <div 
                        key={student.id}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            student.grade === 'A' ? "default" :
                            student.grade === 'B' ? "secondary" :
                            student.grade === 'C' ? "outline" : "destructive"
                          }>
                            Grade {student.grade}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Class Performance */}
          <div className="lg:col-span-1">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Class Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="grades">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grades" className="flex items-center gap-2 text-xs">
                      <BookOpen className="h-3 w-3" /> Grades
                    </TabsTrigger>
                    <TabsTrigger value="attendance" className="flex items-center gap-2 text-xs">
                      <Calendar className="h-3 w-3" /> Attendance
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="grades" className="mt-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={performanceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            animationDuration={1000}
                            animationBegin={200}
                          >
                            {performanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="attendance" className="mt-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={attendanceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            animationDuration={1000}
                            animationBegin={200}
                          >
                            {attendanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
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
      </div>
    </MainLayout>
  );
};

export default ViewStudents;
