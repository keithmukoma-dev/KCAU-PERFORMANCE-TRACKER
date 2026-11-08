import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, Plus, Search, GraduationCap, TrendingUp,
  Trash2, UserPlus, UserMinus, X, Check,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { subjects as initialSubjects, students, classes as initialClasses, getSubjectGrades } from '@/data/mockData';
import BarChart from '@/components/charts/BarChart';
import type { Subject, ClassData } from '@/types';

const Subjects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isSubjectDetailOpen, setIsSubjectDetailOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isManageClassOpen, setIsManageClassOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [subjectList, setSubjectList] = useState(initialSubjects);
  const [classList, setClassList] = useState(initialClasses);
  const [newSubject, setNewSubject] = useState({ name: '', code: '', teacherName: '', color: '#003366' });
  const [studentSearch, setStudentSearch] = useState('');
  const [subjectSearch, setSubjectSearch] = useState('');

  // Enrolled students per subject (using grades as proxy)
  const getEnrolledStudents = (subjectId: string) =>
    students.filter(s => getSubjectGrades(subjectId).some(g => g.studentId === s.id));

  const getSubjectStats = (subjectId: string) => {
    const grades = getSubjectGrades(subjectId);
    if (!grades.length) return { average: 0, highest: 0, lowest: 0, total: 0 };
    const scores = grades.map(g => g.totalScore);
    return {
      average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      highest: Math.max(...scores), lowest: Math.min(...scores), total: grades.length,
    };
  };

  const getGradeDistribution = (subjectId: string) => {
    const grades = getSubjectGrades(subjectId);
    const dist: Record<string, number> = { A:0, B:0, C:0, D:0, E:0 };
    grades.forEach(g => { dist[g.grade] = (dist[g.grade] || 0) + 1; });
    return dist;
  };

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.code) return;
    const sub: Subject = {
      id: `sub${Date.now()}`, ...newSubject,
      teacherId: String(Date.now()),
    };
    setSubjectList(prev => [...prev, sub]);
    setNewSubject({ name:'', code:'', teacherName:'', color:'#003366' });
    setIsAddSubjectOpen(false);
  };

  const handleRemoveSubject = (subjectId: string) => {
    setSubjectList(prev => prev.filter(s => s.id !== subjectId));
    if (selectedSubject?.id === subjectId) setIsSubjectDetailOpen(false);
  };

  // Class: add/remove subject
  const toggleSubjectInClass = (classId: string, subjectId: string) => {
    setClassList(prev => prev.map(c => {
      if (c.id !== classId) return c;
      const has = c.subjects.includes(subjectId);
      return { ...c, subjects: has ? c.subjects.filter(s => s !== subjectId) : [...c.subjects, subjectId] };
    }));
    setSelectedClass(prev => {
      if (!prev || prev.id !== classId) return prev;
      const has = prev.subjects.includes(subjectId);
      return { ...prev, subjects: has ? prev.subjects.filter(s => s !== subjectId) : [...prev.subjects, subjectId] };
    });
  };

  // Class: add/remove student (tracked by class name in student.class field — here simulated with local state)
  const [classStudents, setClassStudents] = useState<Record<string, string[]>>(() => {
    const map: Record<string, string[]> = {};
    initialClasses.forEach(c => {
      map[c.id] = students.filter(s => s.class === c.name).map(s => s.id);
    });
    return map;
  });

  const toggleStudentInClass = (classId: string, studentId: string) => {
    setClassStudents(prev => {
      const list = prev[classId] || [];
      const has = list.includes(studentId);
      return { ...prev, [classId]: has ? list.filter(id => id !== studentId) : [...list, studentId] };
    });
  };

  const filteredSubjects = subjectList.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1f2937]">Subjects</h1>
          <p className="text-[#6b7280] mt-1">Manage subjects, classes and enrolments</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsManageClassOpen(true)}
            variant="outline" className="border-[#003366] text-[#003366] hover:bg-[#003366]/5">
            <Users className="w-4 h-4 mr-2" />Manage Classes
          </Button>
          <Button onClick={() => setIsAddSubjectOpen(true)}
            className="bg-gradient-to-r from-[#003366] to-[#004080] text-white">
            <Plus className="w-4 h-4 mr-2" />Add Subject
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
        <Input placeholder="Search subjects..." value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10 h-12 border-[#e5e7eb] focus:border-[#C9A84C]" />
      </div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSubjects.map((subject, index) => {
          const stats = getSubjectStats(subject.id);
          const dist = getGradeDistribution(subject.id);
          return (
            <motion.div key={subject.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: index * 0.05 }}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-2" style={{ backgroundColor: subject.color }} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 cursor-pointer flex-1"
                      onClick={() => { setSelectedSubject(subject); setIsSubjectDetailOpen(true); }}>
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${subject.color}20` }}>
                        <BookOpen className="w-7 h-7" style={{ color: subject.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1f2937] text-lg">{subject.name}</h3>
                        <p className="text-sm text-[#6b7280]">{subject.code}</p>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveSubject(subject.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <GraduationCap className="w-4 h-4" />
                        <span>{subject.teacherName || 'Unassigned'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <Users className="w-4 h-4" />
                        <span>{stats.total} students</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#e5e7eb]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#6b7280]">Class Average</span>
                        <span className="font-bold text-[#1f2937]">{stats.average}%</span>
                      </div>
                      <Progress value={stats.average} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="text-center p-2 rounded-lg bg-green-50">
                        <p className="text-xs text-green-600">Highest</p>
                        <p className="font-bold text-green-700">{stats.highest}%</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#003366]/5">
                        <p className="text-xs text-[#003366]">Average</p>
                        <p className="font-bold text-[#003366]">{stats.average}%</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-orange-50">
                        <p className="text-xs text-orange-600">Lowest</p>
                        <p className="font-bold text-orange-700">{stats.lowest}%</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {Object.entries(dist).filter(([_,c]) => c > 0).map(([grade, count]) => (
                        <Badge key={grade} variant="outline" className={
                          grade==='A' ? 'bg-green-100 text-green-700 border-green-200'
                          : grade==='B' ? 'bg-blue-100 text-blue-700 border-blue-200'
                          : grade==='C' ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          : grade==='D' ? 'bg-orange-100 text-orange-700 border-orange-200'
                          : 'bg-red-100 text-red-700 border-red-200'
                        }>{grade}: {count}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* ── ADD SUBJECT DIALOG ── */}
      <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#003366]">Add New Subject</DialogTitle>
            <DialogDescription>Fill in subject details below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#374151]">Subject Name</label>
              <Input placeholder="e.g. Computer Science" value={newSubject.name}
                onChange={e => setNewSubject(p => ({...p, name: e.target.value}))} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#374151]">Subject Code</label>
              <Input placeholder="e.g. CS101" value={newSubject.code}
                onChange={e => setNewSubject(p => ({...p, code: e.target.value}))} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#374151]">Teacher Name</label>
              <Input placeholder="e.g. Dr. John Doe" value={newSubject.teacherName}
                onChange={e => setNewSubject(p => ({...p, teacherName: e.target.value}))} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#374151]">Colour</label>
              <div className="flex items-center gap-3">
                <input type="color" value={newSubject.color}
                  onChange={e => setNewSubject(p => ({...p, color: e.target.value}))}
                  className="w-12 h-10 rounded cursor-pointer border border-[#e5e7eb]" />
                <span className="text-sm text-[#6b7280]">{newSubject.color}</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsAddSubjectOpen(false)}>Cancel</Button>
              <Button className="flex-1 bg-[#003366] text-white" onClick={handleAddSubject}>
                <Plus className="w-4 h-4 mr-2" />Add Subject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── MANAGE CLASSES DIALOG ── */}
      <Dialog open={isManageClassOpen} onOpenChange={setIsManageClassOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#003366]">Manage Classes</DialogTitle>
            <DialogDescription>Add or remove students and subjects from each class</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {classList.map(cls => (
              <Card key={cls.id} className="border border-[#e5e7eb] shadow-sm">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-[#003366]">{cls.name} — {cls.stream}</CardTitle>
                    <Button size="sm" variant="outline"
                      className="border-[#003366] text-[#003366] hover:bg-[#003366]/5 h-8 text-xs"
                      onClick={() => { setSelectedClass(cls); }}>
                      Edit
                    </Button>
                  </div>
                  <p className="text-xs text-[#6b7280]">
                    {classStudents[cls.id]?.length || 0} students · {cls.subjects.length} subjects
                  </p>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {cls.subjects.map(sId => {
                      const sub = subjectList.find(s => s.id === sId);
                      if (!sub) return null;
                      return (
                        <span key={sId} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: sub.color }}>
                          {sub.name}
                          <button onClick={() => toggleSubjectInClass(cls.id, sId)} className="ml-1 hover:text-red-200">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                    {subjectList.filter(s => !cls.subjects.includes(s.id)).map(sub => (
                      <button key={sub.id} onClick={() => toggleSubjectInClass(cls.id, sub.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border border-dashed border-[#d1d5db] text-[#9ca3af] hover:border-[#003366] hover:text-[#003366] transition-colors">
                        <Plus className="w-3 h-3" />{sub.name}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit selected class students */}
          {selectedClass && (
            <div className="mt-4 border-t pt-4">
              <h3 className="font-bold text-[#003366] mb-3">Students in {selectedClass.name}</h3>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                <Input placeholder="Search students..." value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="pl-9 h-10 text-sm" />
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {students.filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase())).map(student => {
                  const inClass = classStudents[selectedClass.id]?.includes(student.id);
                  return (
                    <div key={student.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f8fafc] border border-[#e5e7eb]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#003366] flex items-center justify-center text-white text-xs font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1f2937]">{student.name}</p>
                          <p className="text-xs text-[#6b7280]">{student.admissionNumber}</p>
                        </div>
                      </div>
                      <button onClick={() => toggleStudentInClass(selectedClass.id, student.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          inClass
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-[#003366]/10 text-[#003366] hover:bg-[#003366]/20'
                        }`}>
                        {inClass ? <><UserMinus className="w-3 h-3" />Remove</> : <><UserPlus className="w-3 h-3" />Add</>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── SUBJECT DETAIL DIALOG ── */}
      <Dialog open={isSubjectDetailOpen} onOpenChange={setIsSubjectDetailOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedSubject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${selectedSubject.color}20` }}>
                    <BookOpen className="w-8 h-8" style={{ color: selectedSubject.color }} />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-[#1f2937]">{selectedSubject.name}</DialogTitle>
                    <DialogDescription>{selectedSubject.code} · {selectedSubject.teacherName}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  {(() => {
                    const stats = getSubjectStats(selectedSubject.id);
                    return (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label:'Class Average', val:`${stats.average}%`, color:'text-[#1f2937]' },
                          { label:'Highest Score', val:`${stats.highest}%`, color:'text-green-600' },
                          { label:'Lowest Score', val:`${stats.lowest}%`, color:'text-orange-600' },
                          { label:'Total Students', val:String(stats.total), color:'text-[#1f2937]' },
                        ].map(item => (
                          <Card key={item.label} className="border-0 shadow-sm">
                            <CardContent className="p-4">
                              <p className="text-xs text-[#9ca3af]">{item.label}</p>
                              <p className={`text-2xl font-bold ${item.color}`}>{item.val}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    );
                  })()}
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Grade Distribution</CardTitle></CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <BarChart data={Object.entries(getGradeDistribution(selectedSubject.id)).map(([grade, count]) => ({
                          name: grade, value: count,
                          color: grade==='A'?'#10b981':grade==='B'?'#C9A84C':grade==='C'?'#f59e0b':grade==='D'?'#f97316':'#ef4444',
                        }))} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="students" className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#6b7280]">{getSubjectGrades(selectedSubject.id).length} students enrolled</p>
                  </div>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-0">
                      <div className="divide-y divide-[#e5e7eb]">
                        {getSubjectGrades(selectedSubject.id).map(grade => {
                          const student = students.find(s => s.id === grade.studentId);
                          if (!student) return null;
                          return (
                            <div key={grade.id} className="flex items-center justify-between p-4 hover:bg-[#f8fafc]">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: selectedSubject.color }}>
                                  {student.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium text-[#1f2937]">{student.name}</p>
                                  <p className="text-sm text-[#6b7280]">{student.admissionNumber}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge className={
                                  grade.grade==='A'?'bg-green-100 text-green-700'
                                  :grade.grade==='B'?'bg-blue-100 text-blue-700'
                                  :grade.grade==='C'?'bg-yellow-100 text-yellow-700'
                                  :grade.grade==='D'?'bg-orange-100 text-orange-700'
                                  :'bg-red-100 text-red-700'
                                }>{grade.grade}</Badge>
                                <span className="font-bold text-[#1f2937]">{grade.totalScore}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trends" className="mt-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 flex items-center justify-center h-40 text-[#9ca3af]">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Performance trends will appear here</p>
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

export default Subjects;
