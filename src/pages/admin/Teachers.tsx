
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, MoreHorizontal, FileSpreadsheet, BookOpen } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock data for teachers
const mockTeachers = [
  { id: "TCH001", name: "Dr. Sarah Wilson", email: "sarah@example.com", department: "Mathematics", subjects: ["Algebra", "Calculus"], experience: "10 years" },
  { id: "TCH002", name: "Prof. James Miller", email: "james@example.com", department: "Science", subjects: ["Physics", "Chemistry"], experience: "15 years" },
  { id: "TCH003", name: "Ms. Mary Johnson", email: "mary@example.com", department: "English", subjects: ["Literature", "Grammar"], experience: "8 years" },
  { id: "TCH004", name: "Dr. Robert Brown", email: "robert@example.com", department: "History", subjects: ["World History", "Ancient Civilizations"], experience: "12 years" },
  { id: "TCH005", name: "Mrs. Patricia Davis", email: "patricia@example.com", department: "Geography", subjects: ["Physical Geography", "Human Geography"], experience: "9 years" },
  { id: "TCH006", name: "Mr. Thomas Wilson", email: "thomas@example.com", department: "Computer Science", subjects: ["Programming", "Data Structures"], experience: "7 years" },
];

const Teachers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredTeachers = mockTeachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Teacher data is being exported to Excel.",
    });
  };

  return (
    <MainLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Teachers Management</h1>
            <p className="text-muted-foreground">Manage all teachers in the system</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2 whitespace-nowrap">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button className="flex items-center gap-2 whitespace-nowrap">
              <UserPlus className="h-4 w-4" />
              <span>Add Teacher</span>
            </Button>
          </div>
        </div>
      
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <CardTitle>Faculty Members</CardTitle>
                <CardDescription>
                  Total {filteredTeachers.length} teachers
                </CardDescription>
              </div>
              <div className="w-full sm:w-auto flex relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search teachers..."
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
                    <TableHead>Subjects</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-32">
                        No teachers found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id} className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        <TableCell className="font-medium">{teacher.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${teacher.name}`} />
                              <AvatarFallback>
                                {teacher.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span>{teacher.name}</span>
                              <span className="text-xs text-muted-foreground">{teacher.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
                            {teacher.department}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {teacher.subjects.map((subject, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                <BookOpen className="h-3 w-3 mr-1" />
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{teacher.experience}</TableCell>
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
                              <DropdownMenuItem>Edit teacher</DropdownMenuItem>
                              <DropdownMenuItem>View assigned classes</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete teacher</DropdownMenuItem>
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

export default Teachers;
