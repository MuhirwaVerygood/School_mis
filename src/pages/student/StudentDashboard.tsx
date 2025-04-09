
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getMarksByStudentId, getStudentPerformanceStats, subjects } from "@/data/mockData";
import { CalendarDays, CheckCircle, Clock, Trophy } from "lucide-react";

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Get student marks and performance stats
  const studentId = user?.id || "STU001"; // Default for demo
  const marks = getMarksByStudentId(studentId);
  const stats = getStudentPerformanceStats(studentId);
  
  // Prepare data for charts
  const subjectPerformanceData = stats.subjectPerformance.map(subject => ({
    name: subject.subjectName,
    score: subject.average,
  }));
  
  const trendData = stats.trend.map(item => ({
    name: `${item.subjectName} (${item.examType})`,
    date: new Date(item.date).toLocaleDateString(),
    score: item.score,
  }));
  
  const attendanceRate = 92; // Mock attendance rate
  const upcomingAssignments = 3; // Mock number of upcoming assignments
  const totalClasses = 15; // Mock total attended classes
  
  return (
    <MainLayout userRole="student">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Welcome back, {user?.name || "Student"}</h1>
        <p className="text-sm md:text-base text-gray-600">Here's an overview of your academic performance</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
        <Card className="stat-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Overall Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.averageScore.toFixed(1)}%</div>
                <p className="text-xs text-gray-500 mt-1">Across {stats.totalExams} exams</p>
              </div>
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
            </div>
            <Progress value={stats.averageScore} className="h-1.5 sm:h-2 mt-2 sm:mt-3" />
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{attendanceRate}%</div>
                <p className="text-xs text-gray-500 mt-1">Present in most classes</p>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
            <Progress value={attendanceRate} className="h-1.5 sm:h-2 mt-2 sm:mt-3" />
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{upcomingAssignments}</div>
                <p className="text-xs text-gray-500 mt-1">Due this week</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-edu-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Classes Attended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{totalClasses}</div>
                <p className="text-xs text-gray-500 mt-1">This semester</p>
              </div>
              <CalendarDays className="h-6 w-6 sm:h-8 sm:w-8 text-edu-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Performance by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56 sm:h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60} 
                    tick={{ fontSize: 10, fill: '#666' }}
                    interval={0}
                  />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#666' }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                  <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Recent Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56 sm:h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: '#666' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#666' }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                  <Area type="monotone" dataKey="score" stroke="#4f46e5" fill="#c7d2fe" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Recent Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="data-table min-w-full text-xs sm:text-sm">
                <thead>
                  <tr>
                    <th className="py-2 sm:py-3 px-4">Subject</th>
                    <th className="py-2 sm:py-3 px-4">Exam Type</th>
                    <th className="py-2 sm:py-3 px-4">Date</th>
                    <th className="py-2 sm:py-3 px-4">Score</th>
                    <th className="py-2 sm:py-3 px-4">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.slice(0, 5).map((mark) => {
                    const subject = subjects.find(s => s.id === mark.subjectId);
                    const percentage = (mark.score / mark.maxScore) * 100;
                    
                    return (
                      <tr key={mark.id}>
                        <td className="py-2 sm:py-3 px-4">{subject?.name || "Unknown"}</td>
                        <td className="py-2 sm:py-3 px-4 capitalize">{mark.examType}</td>
                        <td className="py-2 sm:py-3 px-4">{new Date(mark.date).toLocaleDateString()}</td>
                        <td className="py-2 sm:py-3 px-4">
                          {mark.score}/{mark.maxScore} ({percentage.toFixed(1)}%)
                        </td>
                        <td className="py-2 sm:py-3 px-4">
                          <div className="flex items-center">
                            <Progress value={percentage} className="h-1.5 w-16 sm:w-24 mr-2" />
                            <span className="text-xs whitespace-nowrap hidden sm:inline">
                              {percentage >= 90 ? "Excellent" : 
                               percentage >= 80 ? "Very Good" : 
                               percentage >= 70 ? "Good" : 
                               percentage >= 60 ? "Satisfactory" : "Needs Improvement"}
                            </span>
                            <span className="text-xs sm:hidden">
                              {percentage >= 90 ? "Excel" : 
                               percentage >= 80 ? "VGood" : 
                               percentage >= 70 ? "Good" : 
                               percentage >= 60 ? "Satis" : "Improv"}
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

export default StudentDashboard;
