
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, MoreHorizontal, FileSpreadsheet, UserCheck, UserX } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
// Mock data for students
const mockStudents = [
  { id: "STU001", name: "John Doe", email: "john@example.com", grade: "A", status: "active", department: "Science" },
  { id: "STU002", name: "Jane Smith", email: "jane@example.com", grade: "B", status: "active", department: "Arts" },
  { id: "STU003", name: "Michael Johnson", email: "michael@example.com", grade: "C", status: "inactive", department: "Commerce" },
  { id: "STU004", name: "Emily Brown", email: "emily@example.com", grade: "A", status: "active", department: "Science" },
  { id: "STU005", name: "David Wilson", email: "david@example.com", grade: "B", status: "active", department: "Arts" },
  { id: "STU006", name: "Sarah Davis", email: "sarah@example.com", grade: "D", status: "inactive", department: "Science" },
  { id: "STU007", name: "James Miller", email: "james@example.com", grade: "A", status: "active", department: "Commerce" },
  { id: "STU008", name: "Linda Clark", email: "linda@example.com", grade: "C", status: "active", department: "Arts" },
];

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(mockStudents);
  const { toast } = useToast();

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: "active" | "inactive") => {
    const updatedStudents = students.map(student => 
      student.id === id ? { ...student, status: newStatus } : student
    );
    setStudents(updatedStudents);
    
    toast({
      title: "Status Updated",
      description: `Student status has been updated to ${newStatus}.`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    
    toast({
      title: "Student Removed",
      description: "The student has been removed from the system.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Student data is being exported to Excel.",
    });
  };

  return (
    <MainLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Students Management</h1>
            <p className="text-muted-foreground">Manage all students in the system</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2 whitespace-nowrap">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button className="flex items-center gap-2 whitespace-nowrap">
              <UserPlus className="h-4 w-4" />
              <span>Add Student</span>
            </Button>
          </div>
        </div>
      
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <CardTitle>All Students</CardTitle>
                <CardDescription>
                  Showing {filteredStudents.length} of {students.length} students
                </CardDescription>
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
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-32">
                        No students found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} />
                              <AvatarFallback>
                                {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span>{student.name}</span>
                              <span className="text-xs text-muted-foreground">{student.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>
                          <Badge variant={
                            student.grade === 'A' ? "default" :
                            student.grade === 'B' ? "secondary" :
                            student.grade === 'C' ? "outline" : "destructive"
                          }>
                            {student.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.status === "active" ? "outline" : "secondary"} className={
                            student.status === "active" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800" 
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800"
                          }>
                            {student.status === "active" ? (
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                Active
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                                Inactive
                              </span>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Edit student</DropdownMenuItem>
                              {student.status === "active" ? (
                                <DropdownMenuItem onClick={() => handleStatusChange(student.id, "inactive")} className="flex items-center gap-2">
                                  <UserX className="h-4 w-4" /> Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleStatusChange(student.id, "active")} className="flex items-center gap-2">
                                  <UserCheck className="h-4 w-4" /> Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600" 
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                Delete student
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Students;
