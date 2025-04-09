import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getSubjectsByTeacherId, students, marks, getSubjectById, getPerformanceTrend } from "@/data/mockData";
import { CalendarDays, CheckCircle, Users, BookOpen } from "lucide-react";

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Get teacher subjects and related data
  const teacherId = user?.id || "TCH001"; // Default for demo
  const teacherSubjects = getSubjectsByTeacherId(teacherId);
  
  // Calculate class performance for each subject
  const subjectPerformance = teacherSubjects.map(subject => {
    const subjectMarks = marks.filter(mark => mark.subjectId === subject.id);
    const totalScore = subjectMarks.reduce((sum, mark) => sum + mark.score, 0);
    const averageScore = totalScore / (subjectMarks.length || 1);
    
    return {
      id: subject.id,
      name: subject.name,
      code: subject.code,
      averageScore,
      examCount: subjectMarks.length,
      studentCount: new Set(subjectMarks.map(mark => mark.studentId)).size
    };
  });
  
  // Get performance trend over time
  const performanceTrend = getPerformanceTrend();
  
  // Count total unique students taught by this teacher
  const uniqueStudentIds = new Set();
  teacherSubjects.forEach(subject => {
    const subjectMarks = marks.filter(mark => mark.subjectId === subject.id);
    subjectMarks.forEach(mark => uniqueStudentIds.add(mark.studentId));
  });
  
  const totalStudents = uniqueStudentIds.size;
  const totalSubjects = teacherSubjects.length;
  const totalExams = marks.filter(mark => 
    teacherSubjects.some(subject => subject.id === mark.subjectId)
  ).length;
  
  // Get recent exams
  const recentExams = [...marks]
    .filter(mark => teacherSubjects.some(subject => subject.id === mark.subjectId))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <MainLayout userRole="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || "Teacher"}</h1>
        <p className="text-gray-600">Here's an overview of your classes and student performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">{totalStudents}</div>
                <p className="text-xs text-gray-500 mt-1">Across all subjects</p>
              </div>
              <Users className="h-8 w-8 text-edu-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Subjects Taught</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">{totalSubjects}</div>
                <p className="text-xs text-gray-500 mt-1">This semester</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Exams Conducted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">{totalExams}</div>
                <p className="text-xs text-gray-500 mt-1">Marks recorded</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">10:30 AM</div>
                <p className="text-xs text-gray-500 mt-1">Grade 10B - Math</p>
              </div>
              <CalendarDays className="h-8 w-8 text-edu-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => (typeof value === 'number' ? `${value.toFixed(1)}%` : value)} />
                  <Bar dataKey="averageScore" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
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
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Student</th>
                    <th>Exam Type</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExams.map((exam) => {
                    const subject = getSubjectById(exam.subjectId);
                    const student = students.find(s => s.id === exam.studentId);
                    const percentage = (exam.score / exam.maxScore) * 100;
                    
                    return (
                      <tr key={exam.id}>
                        <td>{subject?.name || "Unknown"}</td>
                        <td>{student?.name || "Unknown"}</td>
                        <td className="capitalize">{exam.examType}</td>
                        <td>{new Date(exam.date).toLocaleDateString()}</td>
                        <td>
                          {exam.score}/{exam.maxScore} ({percentage.toFixed(1)}%)
                        </td>
                        <td>
                          <div className="flex items-center">
                            <Progress value={percentage} className="h-2 w-24 mr-2" />
                            <span className="text-xs">
                              {percentage >= 90 ? "Excellent" : 
                               percentage >= 80 ? "Very Good" : 
                               percentage >= 70 ? "Good" : 
                               percentage >= 60 ? "Satisfactory" : "Needs Improvement"}
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

export default TeacherDashboard;
