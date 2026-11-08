export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  class?: string;
  subjects?: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  class: string;
  admissionNumber: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  parentContact: string;
  enrollmentDate: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacherName: string;
  color: string;
}

export type GradeType = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  term: number;
  year: number;
  examScore: number;
  catScore: number;
  totalScore: number;
  grade: GradeType;
  remarks: string;
  dateRecorded: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subjectId?: string;
  remarks?: string;
}

export interface Quiz {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  dateTaken: string;
}

export interface TermData {
  term: number;
  year: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface ClassData {
  id: string;
  name: string;
  stream: string;
  capacity: number;
  enrolled: number;
  classTeacher: string;
  subjects: string[];
}

export interface PerformanceMetrics {
  totalStudents: number;
  averageGPA: number;
  attendanceRate: number;
  examsCompleted: number;
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
  };
  subjectAverages: {
    subjectId: string;
    subjectName: string;
    average: number;
  }[];
  trendData: {
    month: string;
    average: number;
    attendance: number;
  }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface DashboardStats {
  totalStudents: number;
  averageGPA: number;
  attendanceRate: number;
  examsCompleted: number;
  studentGrowth: number;
  gpaChange: number;
  attendanceChange: number;
  examsChange: number;
}
