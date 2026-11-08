import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  Mail,
  Save,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { students, subjects, getStudentGrades, getStudentAverage, calculateStudentGPA } from '@/data/mockData';
import type { Student } from '@/types';

const Students: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
  const [isStudentDetailOpen, setIsStudentDetailOpen] = useState(false);
  const [filterClass, setFilterClass] = useState('all');

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  const classes = [...new Set(students.map((s) => s.class))];

  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddGradeOpen(false);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-700 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'D': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'E': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1f2937]">Students</h1>
          <p className="text-[#6b7280] mt-1">Manage student records and performance data</p>
        </div>
        <Button
          onClick={() => setIsAddGradeOpen(true)}
          className="bg-gradient-to-r from-[#C9A84C] to-[#003366] text-white hover:from-[#003366] hover:to-[#004080]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Grade
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
          <Input
            placeholder="Search by name or admission number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-[#e5e7eb] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
          />
        </div>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-full sm:w-48 h-12 border-[#e5e7eb]">
            <Filter className="w-4 h-4 mr-2 text-[#9ca3af]" />
            <SelectValue placeholder="Filter by class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {classes.map((cls) => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Students Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredStudents.map((student, index) => {
            const average = getStudentAverage(student.id);
            const gpa = calculateStudentGPA(student.id);
            const studentGrades = getStudentGrades(student.id);

            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="border-0 shadow-lg shadow-[#C9A84C]/5 hover:shadow-xl hover:shadow-[#C9A84C]/10 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsStudentDetailOpen(true);
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16 border-2 border-white shadow-lg group-hover:scale-105 transition-transform">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-[#C9A84C] to-[#003366] text-white text-xl">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#1f2937] truncate">{student.name}</h3>
                        <p className="text-sm text-[#6b7280]">{student.admissionNumber}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="bg-[#fff8e6] text-[#C9A84C]">
                            {student.class}
                          </Badge>
                          <Badge variant="outline" className={getGradeColor(gpa >= 3.5 ? 'A' : gpa >= 3.0 ? 'B' : gpa >= 2.0 ? 'C' : 'D')}>
                            GPA: {gpa}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-[#9ca3af]">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#6b7280]">Average Score</span>
                          <span className="font-semibold text-[#1f2937]">{average}%</span>
                        </div>
                        <Progress value={average} className="h-2" />
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-[#6b7280]">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{student.email}</span>
                        </div>
                      </div>

                      {studentGrades.length > 0 && (
                        <div className="pt-4 border-t border-[#e5e7eb]">
                          <p className="text-xs text-[#9ca3af] mb-2">Recent Grades</p>
                          <div className="flex flex-wrap gap-2">
                            {studentGrades.slice(0, 3).map((grade) => (
                              <Badge
                                key={grade.id}
                                variant="outline"
                                className={getGradeColor(grade.grade)}
                              >
                                {grade.subjectName}: {grade.grade}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Add Grade Dialog */}
      <Dialog open={isAddGradeOpen} onOpenChange={setIsAddGradeOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1f2937]">Add New Grade</DialogTitle>
            <DialogDescription className="text-[#6b7280]">
              Enter student performance data for the current term.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddGrade} className="space-y-5 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Student</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CAT Score (out of 30)</Label>
                <Input type="number" min="0" max="30" placeholder="25" />
              </div>
              <div className="space-y-2">
                <Label>Exam Score (out of 70)</Label>
                <Input type="number" min="0" max="70" placeholder="60" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Remarks</Label>
              <Input placeholder="Optional comments..." />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddGradeOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#003366] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Grade
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Student Detail Dialog */}
      <Dialog open={isStudentDetailOpen} onOpenChange={setIsStudentDetailOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-2 border-white shadow-lg">
                    <AvatarImage src={selectedStudent.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#C9A84C] to-[#003366] text-white text-2xl">
                      {selectedStudent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-[#1f2937]">{selectedStudent.name}</DialogTitle>
                    <DialogDescription className="text-[#6b7280]">
                      {selectedStudent.admissionNumber} • {selectedStudent.class}
                    </DialogDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-700">
                        GPA: {calculateStudentGPA(selectedStudent.id)}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700">
                        Avg: {getStudentAverage(selectedStudent.id)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="grades" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="grades">Grades</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                </TabsList>

                <TabsContent value="grades" className="space-y-4 mt-4">
                  {getStudentGrades(selectedStudent.id).map((grade) => (
                    <Card key={grade.id} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-[#1f2937]">{grade.subjectName}</h4>
                            <p className="text-sm text-[#6b7280]">Term {grade.term}, {grade.year}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getGradeColor(grade.grade)}>{grade.grade}</Badge>
                            <p className="text-lg font-bold text-[#1f2937] mt-1">{grade.totalScore}%</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-[#e5e7eb]">
                          <div>
                            <p className="text-xs text-[#9ca3af]">CAT Score</p>
                            <p className="font-medium text-[#1f2937]">{grade.catScore}/30</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#9ca3af]">Exam Score</p>
                            <p className="font-medium text-[#1f2937]">{grade.examScore}/70</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="attendance" className="mt-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center h-40 text-[#9ca3af]">
                        <div className="text-center">
                          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Attendance records will appear here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="info" className="space-y-4 mt-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-[#9ca3af]">Email</p>
                          <p className="font-medium text-[#1f2937]">{selectedStudent.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#9ca3af]">Phone</p>
                          <p className="font-medium text-[#1f2937]">{selectedStudent.parentContact}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-[#9ca3af]">Date of Birth</p>
                          <p className="font-medium text-[#1f2937]">{selectedStudent.dateOfBirth}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#9ca3af]">Gender</p>
                          <p className="font-medium text-[#1f2937] capitalize">{selectedStudent.gender}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[#9ca3af]">Enrollment Date</p>
                        <p className="font-medium text-[#1f2937]">{selectedStudent.enrollmentDate}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
