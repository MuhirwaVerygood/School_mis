
export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  enrollmentDate: string;
  profilePic?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  department: string;
  profilePic?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
}

export interface Mark {
  id: string;
  studentId: string;
  subjectId: string;
  examType: "quiz" | "midterm" | "final";
  score: number;
  maxScore: number;
  date: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  status: "present" | "absent" | "late";
}

// Mock Students
export const students: Student[] = [
  {
    id: "STU001",
    name: "John Doe",
    email: "john.doe@example.com",
    class: "Grade 10A",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "STU002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    class: "Grade 10B",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "STU003",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    class: "Grade 10A",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "STU004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    class: "Grade 10B",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "STU005",
    name: "Robert Williams",
    email: "robert.w@example.com",
    class: "Grade 10A",
    enrollmentDate: "2023-09-01",
  },
];

// Mock Teachers
export const teachers: Teacher[] = [
  {
    id: "TCH001",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@example.com",
    subject: "Mathematics",
    department: "Science",
  },
  {
    id: "TCH002",
    name: "Prof. Mark Brown",
    email: "mark.brown@example.com",
    subject: "Physics",
    department: "Science",
  },
  {
    id: "TCH003",
    name: "Ms. Linda Taylor",
    email: "linda.taylor@example.com",
    subject: "English Literature",
    department: "Arts",
  },
];

// Mock Subjects
export const subjects: Subject[] = [
  {
    id: "SUB001",
    name: "Mathematics",
    code: "MAT101",
    teacherId: "TCH001",
  },
  {
    id: "SUB002",
    name: "Physics",
    code: "PHY101",
    teacherId: "TCH002",
  },
  {
    id: "SUB003",
    name: "English",
    code: "ENG101",
    teacherId: "TCH003",
  },
  {
    id: "SUB004",
    name: "Chemistry",
    code: "CHM101",
    teacherId: "TCH001",
  },
  {
    id: "SUB005",
    name: "History",
    code: "HIS101",
    teacherId: "TCH003",
  },
];

// Mock Marks
export const marks: Mark[] = [
  // John Doe's marks
  {
    id: "MRK001",
    studentId: "STU001",
    subjectId: "SUB001",
    examType: "quiz",
    score: 85,
    maxScore: 100,
    date: "2024-03-15",
  },
  {
    id: "MRK002",
    studentId: "STU001",
    subjectId: "SUB002",
    examType: "midterm",
    score: 78,
    maxScore: 100,
    date: "2024-03-20",
  },
  {
    id: "MRK003",
    studentId: "STU001",
    subjectId: "SUB003",
    examType: "final",
    score: 92,
    maxScore: 100,
    date: "2024-04-10",
  },
  // Jane Smith's marks
  {
    id: "MRK004",
    studentId: "STU002",
    subjectId: "SUB001",
    examType: "quiz",
    score: 90,
    maxScore: 100,
    date: "2024-03-15",
  },
  {
    id: "MRK005",
    studentId: "STU002",
    subjectId: "SUB002",
    examType: "midterm",
    score: 85,
    maxScore: 100,
    date: "2024-03-20",
  },
  {
    id: "MRK006",
    studentId: "STU002",
    subjectId: "SUB003",
    examType: "final",
    score: 88,
    maxScore: 100,
    date: "2024-04-10",
  },
  // Add more marks for other students
  {
    id: "MRK007",
    studentId: "STU003",
    subjectId: "SUB001",
    examType: "quiz",
    score: 75,
    maxScore: 100,
    date: "2024-03-15",
  },
  {
    id: "MRK008",
    studentId: "STU003",
    subjectId: "SUB002",
    examType: "midterm",
    score: 82,
    maxScore: 100,
    date: "2024-03-20",
  },
  {
    id: "MRK009",
    studentId: "STU004",
    subjectId: "SUB001",
    examType: "quiz",
    score: 95,
    maxScore: 100,
    date: "2024-03-15",
  },
  {
    id: "MRK010",
    studentId: "STU004",
    subjectId: "SUB002",
    examType: "midterm",
    score: 91,
    maxScore: 100,
    date: "2024-03-20",
  },
  {
    id: "MRK011",
    studentId: "STU005",
    subjectId: "SUB001",
    examType: "quiz",
    score: 88,
    maxScore: 100,
    date: "2024-03-15",
  },
  {
    id: "MRK012",
    studentId: "STU005",
    subjectId: "SUB003",
    examType: "final",
    score: 79,
    maxScore: 100,
    date: "2024-04-10",
  },
];

// Helper functions to simulate API calls
export const getStudentById = (id: string): Student | undefined => {
  return students.find(student => student.id === id);
};

export const getTeacherById = (id: string): Teacher | undefined => {
  return teachers.find(teacher => teacher.id === id);
};

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};

export const getSubjectsByTeacherId = (teacherId: string): Subject[] => {
  return subjects.filter(subject => subject.teacherId === teacherId);
};

export const getMarksByStudentId = (studentId: string): Mark[] => {
  return marks.filter(mark => mark.studentId === studentId);
};

export const getMarksBySubjectId = (subjectId: string): Mark[] => {
  return marks.filter(mark => mark.subjectId === subjectId);
};

export const getStudentPerformanceStats = (studentId: string) => {
  const studentMarks = getMarksByStudentId(studentId);
  
  // Calculate average score across subjects
  const totalScore = studentMarks.reduce((sum, mark) => sum + mark.score, 0);
  const averageScore = totalScore / (studentMarks.length || 1);
  
  // Calculate performance by subject
  const subjectPerformance = subjects.map(subject => {
    const subjectMarks = studentMarks.filter(mark => mark.subjectId === subject.id);
    const subjectTotal = subjectMarks.reduce((sum, mark) => sum + mark.score, 0);
    const subjectAverage = subjectTotal / (subjectMarks.length || 1);
    
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      average: subjectAverage || 0,
      examCount: subjectMarks.length
    };
  }).filter(subj => subj.examCount > 0);
  
  // Calculate performance trend (last 5 exams)
  const sortedByDate = [...studentMarks].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const trend = sortedByDate.slice(0, 5).map(mark => {
    const subject = getSubjectById(mark.subjectId);
    return {
      date: mark.date,
      score: mark.score,
      subjectName: subject?.name || mark.subjectId,
      examType: mark.examType
    };
  });
  
  return {
    averageScore,
    subjectPerformance,
    trend,
    totalExams: studentMarks.length,
  };
};

export const getClassPerformanceStats = (className: string) => {
  // Get students in the class
  const classStudents = students.filter(student => student.class === className);
  const studentIds = classStudents.map(student => student.id);
  
  // Get all marks for these students
  const allClassMarks: Mark[] = [];
  studentIds.forEach(id => {
    const studentMarks = getMarksByStudentId(id);
    allClassMarks.push(...studentMarks);
  });
  
  // Calculate average score across all students
  const totalScore = allClassMarks.reduce((sum, mark) => sum + mark.score, 0);
  const averageScore = totalScore / (allClassMarks.length || 1);
  
  // Calculate performance by subject
  const subjectPerformance = subjects.map(subject => {
    const subjectMarks = allClassMarks.filter(mark => mark.subjectId === subject.id);
    const subjectTotal = subjectMarks.reduce((sum, mark) => sum + mark.score, 0);
    const subjectAverage = subjectTotal / (subjectMarks.length || 1);
    
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      average: subjectAverage || 0,
      examCount: subjectMarks.length
    };
  }).filter(subj => subj.examCount > 0);
  
  // Calculate student ranking within class
  const studentRankings = classStudents.map(student => {
    const studentMarks = getMarksByStudentId(student.id);
    const studentTotal = studentMarks.reduce((sum, mark) => sum + mark.score, 0);
    const studentAverage = studentTotal / (studentMarks.length || 1);
    
    return {
      studentId: student.id,
      studentName: student.name,
      average: studentAverage || 0,
      examCount: studentMarks.length
    };
  }).sort((a, b) => b.average - a.average);
  
  return {
    averageScore,
    subjectPerformance,
    studentRankings,
    totalStudents: classStudents.length,
    totalExams: allClassMarks.length,
  };
};

// Function to add a new mark
export const addMark = (mark: Omit<Mark, 'id'>) => {
  const newMark: Mark = {
    ...mark,
    id: `MRK${marks.length + 1}`.padStart(6, '0'),
  };
  
  marks.push(newMark);
  return newMark;
};

// Function to get the class performance trend over time
export const getPerformanceTrend = () => {
  // Group marks by month
  const marksByMonth: { [key: string]: Mark[] } = {};
  
  marks.forEach(mark => {
    const date = new Date(mark.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    
    if (!marksByMonth[monthYear]) {
      marksByMonth[monthYear] = [];
    }
    
    marksByMonth[monthYear].push(mark);
  });
  
  // Calculate average for each month
  const trend = Object.keys(marksByMonth).map(monthYear => {
    const monthMarks = marksByMonth[monthYear];
    const total = monthMarks.reduce((sum, mark) => sum + mark.score, 0);
    const average = total / monthMarks.length;
    
    return {
      month: monthYear,
      average,
      totalExams: monthMarks.length
    };
  }).sort((a, b) => {
    const [aMonth, aYear] = a.month.split('/').map(Number);
    const [bMonth, bYear] = b.month.split('/').map(Number);
    
    if (aYear !== bYear) return aYear - bYear;
    return aMonth - bMonth;
  });
  
  return trend;
};
