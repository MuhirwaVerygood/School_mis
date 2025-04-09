
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addMark, getSubjectsByTeacherId, students, Mark } from "@/data/mockData";

const EnterMarks: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Get teacher's subjects
  const teacherId = user?.id || "TCH001"; // Default for demo
  const teacherSubjects = getSubjectsByTeacherId(teacherId);
  
  // Form state
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [examType, setExamType] = useState<"quiz" | "midterm" | "final">("quiz");
  const [score, setScore] = useState<number | "">("");
  const [maxScore, setMaxScore] = useState<number>(100);
  const [examDate, setExamDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // List of students for dropdown (in real app, this would be filtered by class/subject)
  const availableStudents = students;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSubject || !selectedStudent || !score) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (typeof score === "number" && score > maxScore) {
      toast({
        title: "Invalid score",
        description: `Score cannot be greater than the maximum score (${maxScore}).`,
        variant: "destructive",
      });
      return;
    }
    
    // Create and add the new mark
    const newMark: Omit<Mark, "id"> = {
      studentId: selectedStudent,
      subjectId: selectedSubject,
      examType,
      score: typeof score === "number" ? score : 0,
      maxScore,
      date: examDate,
    };
    
    try {
      const added = addMark(newMark);
      
      // Show success toast
      toast({
        title: "Mark added successfully",
        description: "The student's mark has been recorded.",
      });
      
      // Reset form
      setScore("");
      // Optionally reset other fields if needed
      
    } catch (error) {
      toast({
        title: "Error adding mark",
        description: "There was a problem recording the mark. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding mark:", error);
    }
  };
  
  return (
    <MainLayout userRole="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Enter Student Marks</h1>
        <p className="text-gray-600">Record new examination results for your students</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New Examination Record</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={selectedSubject} 
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherSubjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name} ({subject.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select 
                    value={selectedStudent} 
                    onValueChange={setSelectedStudent}
                  >
                    <SelectTrigger id="student">
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStudents.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.class})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="examType">Examination Type</Label>
                  <Select 
                    value={examType} 
                    onValueChange={(value) => setExamType(value as "quiz" | "midterm" | "final")}
                  >
                    <SelectTrigger id="examType">
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="midterm">Midterm</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="examDate">Examination Date</Label>
                  <Input 
                    id="examDate" 
                    type="date" 
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="score">Score</Label>
                  <Input 
                    id="score" 
                    type="number" 
                    placeholder="Enter score" 
                    value={score}
                    onChange={(e) => setScore(e.target.value ? Number(e.target.value) : "")}
                    min={0}
                    max={maxScore}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxScore">Maximum Score</Label>
                  <Input 
                    id="maxScore" 
                    type="number" 
                    placeholder="Enter maximum score" 
                    value={maxScore}
                    onChange={(e) => setMaxScore(Number(e.target.value))}
                    min={1}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-edu-primary hover:bg-edu-dark">
                  Save Mark
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Marking Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Grade Scales</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>A (Excellent): 90-100%</li>
                  <li>B (Very Good): 80-89%</li>
                  <li>C (Good): 70-79%</li>
                  <li>D (Satisfactory): 60-69%</li>
                  <li>F (Needs Improvement): Below 60%</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Examination Weights</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Quiz: 20% of final grade</li>
                  <li>Midterm: 30% of final grade</li>
                  <li>Final: 50% of final grade</li>
                </ul>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="mb-2">Please ensure accuracy when entering marks. Once submitted, you may need administrator approval to make changes.</p>
                <p>For any issues with the marking system, please contact technical support.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EnterMarks;
