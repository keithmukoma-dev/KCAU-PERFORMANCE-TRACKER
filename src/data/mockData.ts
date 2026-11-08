import type { User, Student, Subject, Grade, Attendance, Quiz, ClassData, PerformanceMetrics, DashboardStats, Notification, GradeType } from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'Dr. Sarah Kimani',
  email: 's.kimani@kcau.ac.ke',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  subjects: ['Mathematics', 'Physics'],
};

export const students: Student[] = [
  {
    id: 's1',
    name: 'John Kamau',
    email: 'john.kamau@student.kcau.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    class: 'Form 4A',
    admissionNumber: 'KC/2021/001',
    dateOfBirth: '2005-03-15',
    gender: 'male',
    parentContact: '+254712345678',
    enrollmentDate: '2021-01-15',
  },
  {
    id: 's2',
    name: 'Sarah Ochieng',
    email: 'sarah.ochieng@student.kcau.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    class: 'Form 4A',
    admissionNumber: 'KC/2021/002',
    dateOfBirth: '2005-07-22',
    gender: 'female',
    parentContact: '+254723456789',
    enrollmentDate: '2021-01-15',
  },
  {
    id: 's3',
    name: 'Michael Otieno',
    email: 'michael.otieno@student.kcau.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    class: 'Form 4A',
    admissionNumber: 'KC/2021/003',
    dateOfBirth: '2004-11-08',
    gender: 'male',
    parentContact: '+254734567890',
    enrollmentDate: '2021-01-15',
  },
  {
    id: 's4',
    name: 'Emily Wanjiku',
    email: 'emily.wanjiku@student.kcau.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    class: 'Form 4A',
    admissionNumber: 'KC/2021/004',
    dateOfBirth: '2005-01-30',
    gender: 'female',
    parentContact: '+254745678901',
    enrollmentDate: '2021-01-15',
  },
  {
    id: 's5',
    name: 'David Mwangi',
    email: 'david.mwangi@student.kcau.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    class: 'Form 4A',
    admissionNumber: 'KC/2021/005',
    dateOfBirth: '2004-09-12',
    gender: 'male',
    parentContact: '+254756789012',
    enrollmentDate: '2021-01-15',
  },
  {
    id: 's6',
    name: 'Grace Njeri',
    email: 'grace.njeri@student.kcau.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    class: 'Form 4A',
    admissionNumber: 'KC/2021/006',
    dateOfBirth: '2005-05-18',
    gender: 'female',
    parentContact: '+254767890123',
    enrollmentDate: '2021-01-15',
  },
  {
    id: 's7',
    name: 'Peter Njoroge',
    email: 'peter.njoroge@student.kcau.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    class: 'Form 4A',
    admissionNumber: 'KC/2021/007',
    dateOfBirth: '2004-12-03',
    gender: 'male',
    parentContact: '+254778901234',
    enrollmentDate: '2021-01-15',
  },
  {
    id: 's8',
    name: 'Anna Kariuki',
    email: 'anna.kariuki@student.kcau.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
    class: 'Form 4A',
    admissionNumber: 'KC/2021/008',
    dateOfBirth: '2005-02-25',
    gender: 'female',
    parentContact: '+254789012345',
    enrollmentDate: '2021-01-15',
  },
];

export const subjects: Subject[] = [
  { id: 'sub1', name: 'Mathematics', code: 'MATH', teacherId: '1', teacherName: 'Dr. Sarah Kimani', color: '#60a5fa' },
  { id: 'sub2', name: 'Science', code: 'SCI', teacherId: '2', teacherName: 'Prof. James Oduor', color: '#3b82f6' },
  { id: 'sub3', name: 'English', code: 'ENG', teacherId: '3', teacherName: 'Ms. Jane Wambui', color: '#2563eb' },
  { id: 'sub4', name: 'Kiswahili', code: 'KIS', teacherId: '4', teacherName: 'Mr. Ali Hassan', color: '#1d4ed8' },
  { id: 'sub5', name: 'History', code: 'HIST', teacherId: '5', teacherName: 'Dr. Mary Atieno', color: '#1e40af' },
  { id: 'sub6', name: 'Geography', code: 'GEO', teacherId: '6', teacherName: 'Mr. Paul Kipchoge', color: '#93c5fd' },
];

export const classes: ClassData[] = [
  { id: 'c1', name: 'Form 4A', stream: 'East', capacity: 40, enrolled: 38, classTeacher: 'Dr. Sarah Kimani', subjects: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'] },
  { id: 'c2', name: 'Form 4B', stream: 'West', capacity: 40, enrolled: 36, classTeacher: 'Prof. James Oduor', subjects: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'] },
  { id: 'c3', name: 'Form 3A', stream: 'East', capacity: 42, enrolled: 40, classTeacher: 'Ms. Jane Wambui', subjects: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'] },
  { id: 'c4', name: 'Form 3B', stream: 'West', capacity: 42, enrolled: 39, classTeacher: 'Mr. Ali Hassan', subjects: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'] },
];

export const grades: Grade[] = [
  // John Kamau
  { id: 'g1', studentId: 's1', subjectId: 'sub1', subjectName: 'Mathematics', term: 1, year: 2024, examScore: 72, catScore: 18, totalScore: 90, grade: 'A', remarks: 'Excellent work', dateRecorded: '2024-03-15' },
  { id: 'g2', studentId: 's1', subjectId: 'sub2', subjectName: 'Science', term: 1, year: 2024, examScore: 68, catScore: 17, totalScore: 85, grade: 'A', remarks: 'Very good', dateRecorded: '2024-03-15' },
  { id: 'g3', studentId: 's1', subjectId: 'sub3', subjectName: 'English', term: 1, year: 2024, examScore: 65, catScore: 16, totalScore: 81, grade: 'A', remarks: 'Good performance', dateRecorded: '2024-03-15' },
  
  // Sarah Ochieng
  { id: 'g4', studentId: 's2', subjectId: 'sub1', subjectName: 'Mathematics', term: 1, year: 2024, examScore: 75, catScore: 19, totalScore: 94, grade: 'A', remarks: 'Outstanding', dateRecorded: '2024-03-15' },
  { id: 'g5', studentId: 's2', subjectId: 'sub2', subjectName: 'Science', term: 1, year: 2024, examScore: 78, catScore: 20, totalScore: 98, grade: 'A', remarks: 'Exceptional', dateRecorded: '2024-03-15' },
  { id: 'g6', studentId: 's2', subjectId: 'sub3', subjectName: 'English', term: 1, year: 2024, examScore: 70, catScore: 18, totalScore: 88, grade: 'A', remarks: 'Excellent', dateRecorded: '2024-03-15' },
  
  // Michael Otieno
  { id: 'g7', studentId: 's3', subjectId: 'sub1', subjectName: 'Mathematics', term: 1, year: 2024, examScore: 55, catScore: 14, totalScore: 69, grade: 'B', remarks: 'Good effort', dateRecorded: '2024-03-15' },
  { id: 'g8', studentId: 's3', subjectId: 'sub2', subjectName: 'Science', term: 1, year: 2024, examScore: 58, catScore: 15, totalScore: 73, grade: 'B', remarks: 'Improving', dateRecorded: '2024-03-15' },
  { id: 'g9', studentId: 's3', subjectId: 'sub4', subjectName: 'Kiswahili', term: 1, year: 2024, examScore: 62, catScore: 16, totalScore: 78, grade: 'B', remarks: 'Good', dateRecorded: '2024-03-15' },
  
  // Emily Wanjiku
  { id: 'g10', studentId: 's4', subjectId: 'sub3', subjectName: 'English', term: 1, year: 2024, examScore: 74, catScore: 19, totalScore: 93, grade: 'A', remarks: 'Excellent', dateRecorded: '2024-03-15' },
  { id: 'g11', studentId: 's4', subjectId: 'sub5', subjectName: 'History', term: 1, year: 2024, examScore: 71, catScore: 18, totalScore: 89, grade: 'A', remarks: 'Very good', dateRecorded: '2024-03-15' },
  { id: 'g12', studentId: 's4', subjectId: 'sub1', subjectName: 'Mathematics', term: 1, year: 2024, examScore: 60, catScore: 15, totalScore: 75, grade: 'B', remarks: 'Good', dateRecorded: '2024-03-15' },
  
  // David Mwangi
  { id: 'g13', studentId: 's5', subjectId: 'sub1', subjectName: 'Mathematics', term: 1, year: 2024, examScore: 48, catScore: 12, totalScore: 60, grade: 'C', remarks: 'Needs improvement', dateRecorded: '2024-03-15' },
  { id: 'g14', studentId: 's5', subjectId: 'sub2', subjectName: 'Science', term: 1, year: 2024, examScore: 52, catScore: 13, totalScore: 65, grade: 'C', remarks: 'Average', dateRecorded: '2024-03-15' },
  { id: 'g15', studentId: 's5', subjectId: 'sub6', subjectName: 'Geography', term: 1, year: 2024, examScore: 56, catScore: 14, totalScore: 70, grade: 'B', remarks: 'Good', dateRecorded: '2024-03-15' },
  
  // Grace Njeri
  { id: 'g16', studentId: 's6', subjectId: 'sub2', subjectName: 'Science', term: 1, year: 2024, examScore: 76, catScore: 19, totalScore: 95, grade: 'A', remarks: 'Outstanding', dateRecorded: '2024-03-15' },
  { id: 'g17', studentId: 's6', subjectId: 'sub3', subjectName: 'English', term: 1, year: 2024, examScore: 73, catScore: 18, totalScore: 91, grade: 'A', remarks: 'Excellent', dateRecorded: '2024-03-15' },
  { id: 'g18', studentId: 's6', subjectId: 'sub1', subjectName: 'Mathematics', term: 1, year: 2024, examScore: 69, catScore: 17, totalScore: 86, grade: 'A', remarks: 'Very good', dateRecorded: '2024-03-15' },
  
  // Peter Njoroge
  { id: 'g19', studentId: 's7', subjectId: 'sub1', subjectName: 'Mathematics', term: 1, year: 2024, examScore: 42, catScore: 11, totalScore: 53, grade: 'C', remarks: 'Below average', dateRecorded: '2024-03-15' },
  { id: 'g20', studentId: 's7', subjectId: 'sub4', subjectName: 'Kiswahili', term: 1, year: 2024, examScore: 50, catScore: 13, totalScore: 63, grade: 'C', remarks: 'Average', dateRecorded: '2024-03-15' },
  { id: 'g21', studentId: 's7', subjectId: 'sub5', subjectName: 'History', term: 1, year: 2024, examScore: 58, catScore: 15, totalScore: 73, grade: 'B', remarks: 'Good', dateRecorded: '2024-03-15' },
  
  // Anna Kariuki
  { id: 'g22', studentId: 's8', subjectId: 'sub3', subjectName: 'English', term: 1, year: 2024, examScore: 77, catScore: 20, totalScore: 97, grade: 'A', remarks: 'Exceptional', dateRecorded: '2024-03-15' },
  { id: 'g23', studentId: 's8', subjectId: 'sub2', subjectName: 'Science', term: 1, year: 2024, examScore: 74, catScore: 19, totalScore: 93, grade: 'A', remarks: 'Excellent', dateRecorded: '2024-03-15' },
  { id: 'g24', studentId: 's8', subjectId: 'sub6', subjectName: 'Geography', term: 1, year: 2024, examScore: 68, catScore: 17, totalScore: 85, grade: 'A', remarks: 'Very good', dateRecorded: '2024-03-15' },
];

export const attendance: Attendance[] = [
  { id: 'a1', studentId: 's1', date: '2024-02-12', status: 'present', subjectId: 'sub1' },
  { id: 'a2', studentId: 's1', date: '2024-02-13', status: 'present', subjectId: 'sub2' },
  { id: 'a3', studentId: 's1', date: '2024-02-14', status: 'late', subjectId: 'sub3', remarks: 'Traffic delay' },
  { id: 'a4', studentId: 's2', date: '2024-02-12', status: 'present', subjectId: 'sub1' },
  { id: 'a5', studentId: 's2', date: '2024-02-13', status: 'present', subjectId: 'sub2' },
  { id: 'a6', studentId: 's2', date: '2024-02-14', status: 'present', subjectId: 'sub3' },
  { id: 'a7', studentId: 's3', date: '2024-02-12', status: 'absent', subjectId: 'sub1', remarks: 'Sick leave' },
  { id: 'a8', studentId: 's3', date: '2024-02-13', status: 'present', subjectId: 'sub2' },
  { id: 'a9', studentId: 's3', date: '2024-02-14', status: 'present', subjectId: 'sub4' },
];

export const quizzes: Quiz[] = [
  { id: 'q1', studentId: 's1', subjectId: 'sub1', subjectName: 'Mathematics', title: 'Algebra Quiz 1', score: 18, maxScore: 20, percentage: 90, dateTaken: '2024-02-05' },
  { id: 'q2', studentId: 's1', subjectId: 'sub2', subjectName: 'Science', title: 'Physics Quiz 1', score: 16, maxScore: 20, percentage: 80, dateTaken: '2024-02-08' },
  { id: 'q3', studentId: 's2', subjectId: 'sub1', subjectName: 'Mathematics', title: 'Algebra Quiz 1', score: 20, maxScore: 20, percentage: 100, dateTaken: '2024-02-05' },
  { id: 'q4', studentId: 's2', subjectId: 'sub2', subjectName: 'Science', title: 'Physics Quiz 1', score: 19, maxScore: 20, percentage: 95, dateTaken: '2024-02-08' },
  { id: 'q5', studentId: 's3', subjectId: 'sub1', subjectName: 'Mathematics', title: 'Algebra Quiz 1', score: 14, maxScore: 20, percentage: 70, dateTaken: '2024-02-05' },
  { id: 'q6', studentId: 's4', subjectId: 'sub3', subjectName: 'English', title: 'Essay Writing', score: 17, maxScore: 20, percentage: 85, dateTaken: '2024-02-06' },
];

export const dashboardStats: DashboardStats = {
  totalStudents: 1247,
  averageGPA: 3.4,
  attendanceRate: 94,
  examsCompleted: 87,
  studentGrowth: 12,
  gpaChange: 0.3,
  attendanceChange: 2,
  examsChange: 5,
};

export const performanceMetrics: PerformanceMetrics = {
  totalStudents: 1247,
  averageGPA: 3.4,
  attendanceRate: 94,
  examsCompleted: 87,
  gradeDistribution: {
    A: 35,
    B: 40,
    C: 15,
    D: 7,
    E: 3,
  },
  subjectAverages: [
    { subjectId: 'sub1', subjectName: 'Mathematics', average: 78 },
    { subjectId: 'sub2', subjectName: 'Science', average: 82 },
    { subjectId: 'sub3', subjectName: 'English', average: 85 },
    { subjectId: 'sub4', subjectName: 'Kiswahili', average: 76 },
    { subjectId: 'sub5', subjectName: 'History', average: 80 },
    { subjectId: 'sub6', subjectName: 'Geography', average: 79 },
  ],
  trendData: [
    { month: 'Jan', average: 72, attendance: 91 },
    { month: 'Feb', average: 74, attendance: 92 },
    { month: 'Mar', average: 76, attendance: 93 },
    { month: 'Apr', average: 75, attendance: 92 },
    { month: 'May', average: 78, attendance: 94 },
    { month: 'Jun', average: 80, attendance: 95 },
    { month: 'Jul', average: 79, attendance: 94 },
    { month: 'Aug', average: 81, attendance: 95 },
    { month: 'Sep', average: 82, attendance: 94 },
    { month: 'Oct', average: 83, attendance: 95 },
    { month: 'Nov', average: 84, attendance: 96 },
    { month: 'Dec', average: 85, attendance: 94 },
  ],
};

export const notifications: Notification[] = [
  { id: 'n1', title: 'New Grade Entry', message: 'John Kamau\'s Mathematics grade has been updated.', type: 'info', timestamp: '2024-02-15T10:30:00Z', read: false },
  { id: 'n2', title: 'Attendance Alert', message: 'Michael Otieno was absent from Mathematics class.', type: 'warning', timestamp: '2024-02-14T08:15:00Z', read: false },
  { id: 'n3', title: 'Quiz Completed', message: 'Sarah Ochieng scored 100% on Algebra Quiz 1.', type: 'success', timestamp: '2024-02-13T14:20:00Z', read: true },
  { id: 'n4', title: 'Term End Approaching', message: 'Term 1 exams will begin in 2 weeks.', type: 'info', timestamp: '2024-02-12T09:00:00Z', read: true },
];

// Helper functions
export const getStudentGrades = (studentId: string): Grade[] => {
  return grades.filter(g => g.studentId === studentId);
};

export const getStudentAttendance = (studentId: string): Attendance[] => {
  return attendance.filter(a => a.studentId === studentId);
};

export const getStudentQuizzes = (studentId: string): Quiz[] => {
  return quizzes.filter(q => q.studentId === studentId);
};

export const getSubjectGrades = (subjectId: string): Grade[] => {
  return grades.filter(g => g.subjectId === subjectId);
};

export const calculateStudentGPA = (studentId: string): number => {
  const studentGrades = getStudentGrades(studentId);
  if (studentGrades.length === 0) return 0;
  
  const gradePoints: Record<GradeType, number> = { A: 4, B: 3, C: 2, D: 1, E: 0 };
  const totalPoints = studentGrades.reduce((sum, g) => sum + gradePoints[g.grade], 0);
  return parseFloat((totalPoints / studentGrades.length).toFixed(2));
};

export const getStudentAverage = (studentId: string): number => {
  const studentGrades = getStudentGrades(studentId);
  if (studentGrades.length === 0) return 0;
  
  const total = studentGrades.reduce((sum, g) => sum + g.totalScore, 0);
  return Math.round(total / studentGrades.length);
};
