
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getMarksByStudentId, subjects, getSubjectById } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentMarks: React.FC = () => {
  const { user } = useAuth();
  
  // Get student marks
  const studentId = user?.id || "STU001"; // Default for demo
  const studentMarks = getMarksByStudentId(studentId);
  
  // Group marks by subject
  const marksBySubject = subjects.map(subject => {
    const subjectMarks = studentMarks.filter(mark => mark.subjectId === subject.id);
    
    // Calculate average for this subject
    const totalScore = subjectMarks.reduce((sum, mark) => sum + (mark.score / mark.maxScore) * 100, 0);
    const averagePercentage = subjectMarks.length > 0 ? totalScore / subjectMarks.length : 0;
    
    return {
      subject,
      marks: subjectMarks,
      averagePercentage,
    };
  }).filter(item => item.marks.length > 0);
  
  // Separate marks by exam type
  const quizzes = studentMarks.filter(mark => mark.examType === "quiz");
  const midterms = studentMarks.filter(mark => mark.examType === "midterm");
  const finals = studentMarks.filter(mark => mark.examType === "final");
  
  // Helper function to determine grade letter
  const getGradeLetter = (percentage: number) => {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  };
  
  // Helper function to determine color class based on percentage
  const getColorClass = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-emerald-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };
  
  return (
    <MainLayout userRole="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Academic Marks</h1>
        <p className="text-gray-600">View your performance in all subjects and examinations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {marksBySubject.map(({ subject, marks, averagePercentage }) => (
          <Card key={subject.id} className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="font-medium text-gray-900">{subject.name}</CardTitle>
              <p className="text-xs text-gray-500">{subject.code}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Overall Grade:</span>
                  <span className={`font-bold ${getColorClass(averagePercentage)}`}>
                    {getGradeLetter(averagePercentage)} ({averagePercentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={averagePercentage} className="h-2" />
              </div>
              
              <div className="text-sm">
                {marks.map(mark => (
                  <div key={mark.id} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                    <span className="capitalize">{mark.examType}</span>
                    <span className="font-medium">
                      {mark.score}/{mark.maxScore} ({((mark.score / mark.maxScore) * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Examination Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Exams</TabsTrigger>
                <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                <TabsTrigger value="midterms">Midterms</TabsTrigger>
                <TabsTrigger value="finals">Finals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Exam Type</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Grade</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentMarks.map(mark => {
                        const subject = getSubjectById(mark.subjectId);
                        const percentage = (mark.score / mark.maxScore) * 100;
                        const gradeLetter = getGradeLetter(percentage);
                        
                        return (
                          <tr key={mark.id}>
                            <td>{subject?.name || "Unknown"}</td>
                            <td className="capitalize">{mark.examType}</td>
                            <td>{new Date(mark.date).toLocaleDateString()}</td>
                            <td>
                              {mark.score}/{mark.maxScore} ({percentage.toFixed(1)}%)
                            </td>
                            <td className={getColorClass(percentage)}>
                              {gradeLetter}
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
              </TabsContent>
              
              <TabsContent value="quizzes">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Grade</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizzes.map(mark => {
                        const subject = getSubjectById(mark.subjectId);
                        const percentage = (mark.score / mark.maxScore) * 100;
                        const gradeLetter = getGradeLetter(percentage);
                        
                        return (
                          <tr key={mark.id}>
                            <td>{subject?.name || "Unknown"}</td>
                            <td>{new Date(mark.date).toLocaleDateString()}</td>
                            <td>
                              {mark.score}/{mark.maxScore} ({percentage.toFixed(1)}%)
                            </td>
                            <td className={getColorClass(percentage)}>
                              {gradeLetter}
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
              </TabsContent>
              
              <TabsContent value="midterms">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Grade</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {midterms.map(mark => {
                        const subject = getSubjectById(mark.subjectId);
                        const percentage = (mark.score / mark.maxScore) * 100;
                        const gradeLetter = getGradeLetter(percentage);
                        
                        return (
                          <tr key={mark.id}>
                            <td>{subject?.name || "Unknown"}</td>
                            <td>{new Date(mark.date).toLocaleDateString()}</td>
                            <td>
                              {mark.score}/{mark.maxScore} ({percentage.toFixed(1)}%)
                            </td>
                            <td className={getColorClass(percentage)}>
                              {gradeLetter}
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
              </TabsContent>
              
              <TabsContent value="finals">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Grade</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finals.map(mark => {
                        const subject = getSubjectById(mark.subjectId);
                        const percentage = (mark.score / mark.maxScore) * 100;
                        const gradeLetter = getGradeLetter(percentage);
                        
                        return (
                          <tr key={mark.id}>
                            <td>{subject?.name || "Unknown"}</td>
                            <td>{new Date(mark.date).toLocaleDateString()}</td>
                            <td>
                              {mark.score}/{mark.maxScore} ({percentage.toFixed(1)}%)
                            </td>
                            <td className={getColorClass(percentage)}>
                              {gradeLetter}
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StudentMarks;
