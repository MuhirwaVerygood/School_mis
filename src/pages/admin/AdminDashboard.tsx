import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { students, teachers, subjects, marks, getClassPerformanceStats, getPerformanceTrend } from "@/data/mockData";
import { Users, GraduationCap, BookOpen, Award } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Get performance statistics
  const performanceTrend = getPerformanceTrend();
  const class10AStats = getClassPerformanceStats("Grade 10A");
  const class10BStats = getClassPerformanceStats("Grade 10B");
  
  // Subject distribution data
  const subjectDistribution = subjects.map(subject => {
    const subjectMarks = marks.filter(mark => mark.subjectId === subject.id);
    const averageScore = subjectMarks.reduce((sum, mark) => sum + mark.score, 0) / (subjectMarks.length || 1);
    
    return {
      name: subject.name,
      students: new Set(subjectMarks.map(mark => mark.studentId)).size,
      averageScore,
    };
  });
  
  // Class comparison data
  const classComparisonData = [
    {
      name: "Grade 10A",
      averageScore: class10AStats.averageScore,
      students: class10AStats.totalStudents,
    },
    {
      name: "Grade 10B",
      averageScore: class10BStats.averageScore,
      students: class10BStats.totalStudents,
    },
  ];
  
  // Top students data
  const topStudents = [...students].map(student => {
    const studentMarks = marks.filter(mark => mark.studentId === student.id);
    const totalScore = studentMarks.reduce((sum, mark) => sum + mark.score, 0);
    const averageScore = totalScore / (studentMarks.length || 1);
    
    return {
      ...student,
      averageScore,
      examCount: studentMarks.length,
    };
  })
  .sort((a, b) => b.averageScore - a.averageScore)
  .slice(0, 5);
  
  // Piechart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  return (
    <MainLayout userRole="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || "Administrator"}</h1>
        <p className="text-gray-600">School performance and statistics overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">{students.length}</div>
                <p className="text-xs text-gray-500 mt-1">Enrolled this semester</p>
              </div>
              <GraduationCap className="h-8 w-8 text-edu-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">{teachers.length}</div>
                <p className="text-xs text-gray-500 mt-1">Faculty members</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">{subjects.length}</div>
                <p className="text-xs text-gray-500 mt-1">Academic subjects</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Overall Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {(performanceTrend.reduce((sum, item) => sum + item.average, 0) / 
                    (performanceTrend.length || 1)).toFixed(1)}%
                </div>
                <p className="text-xs text-gray-500 mt-1">School performance</p>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
            <Progress 
              value={(performanceTrend.reduce((sum, item) => sum + item.average, 0) / 
                (performanceTrend.length || 1))} 
              className="h-2 mt-3" 
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>School Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrend} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => (typeof value === 'number' ? `${value.toFixed(1)}%` : value)} />
                  <Legend />
                  <Line type="monotone" dataKey="average" stroke="#4f46e5" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Class Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classComparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => (typeof value === 'number' ? `${value.toFixed(1)}%` : value)} />
                  <Legend />
                  <Bar dataKey="averageScore" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Average Score" />
                  <Bar dataKey="students" fill="#818cf8" radius={[4, 4, 0, 0]} name="Number of Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Subject Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="students"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} students`, "Enrollment"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Average Score</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {topStudents.map((student) => {
                    return (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.class}</td>
                        <td>{student.averageScore.toFixed(1)}%</td>
                        <td>
                          <div className="flex items-center">
                            <Progress value={student.averageScore} className="h-2 w-24 mr-2" />
                            <span className="text-xs">
                              {student.averageScore >= 90 ? "Excellent" : 
                               student.averageScore >= 80 ? "Very Good" : 
                               student.averageScore >= 70 ? "Good" : 
                               student.averageScore >= 60 ? "Satisfactory" : "Needs Improvement"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
