import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Calendar,
  Download,
  Filter,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Activity,
  Award,
  Target,
  School,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import BarChart from '@/components/charts/BarChart';
import { performanceMetrics, students, grades, classes } from '@/data/mockData';

const Analytics: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState('1');
  const [_selectedClass, _setSelectedClass] = useState('all');

  const gradeDistributionData = [
    { name: 'Grade A', value: performanceMetrics.gradeDistribution.A, color: '#C9A84C' },
    { name: 'Grade B', value: performanceMetrics.gradeDistribution.B, color: '#003366' },
    { name: 'Grade C', value: performanceMetrics.gradeDistribution.C, color: '#004080' },
    { name: 'Grade D', value: performanceMetrics.gradeDistribution.D, color: '#1d4ed8' },
    { name: 'Grade E', value: performanceMetrics.gradeDistribution.E, color: '#1e40af' },
  ];

  const subjectAveragesData = performanceMetrics.subjectAverages.map((s) => ({
    name: s.subjectName.slice(0, 4),
    value: s.average,
    color: '#C9A84C',
  }));

  const classPerformanceData = classes.map((c) => ({
    name: c.name,
    value: Math.round(70 + Math.random() * 20),
    color: '#003366',
  }));

  const monthlyTrendData = performanceMetrics.trendData;

  const topPerformers = students
    .map((s) => ({
      ...s,
      average: Math.round(
        grades
          .filter((g) => g.studentId === s.id)
          .reduce((sum, g) => sum + g.totalScore, 0) /
          (grades.filter((g) => g.studentId === s.id).length || 1)
      ),
    }))
    .sort((a, b) => b.average - a.average)
    .slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1f2937]">Analytics</h1>
          <p className="text-[#6b7280] mt-1">Comprehensive performance insights and reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Term 1, 2024</SelectItem>
              <SelectItem value="2">Term 2, 2024</SelectItem>
              <SelectItem value="3">Term 3, 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-[#e5e7eb]">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-[#C9A84C] to-[#003366] text-white">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Students', value: '1,247', icon: Users, color: 'bg-blue-500' },
          { label: 'Average Score', value: '78%', icon: Target, color: 'bg-green-500' },
          { label: 'Pass Rate', value: '92%', icon: Award, color: 'bg-purple-500' },
          { label: 'Attendance', value: '94%', icon: Activity, color: 'bg-orange-500' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6b7280]">{stat.label}</p>
                      <p className="text-xl font-bold text-[#1f2937]">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border border-[#e5e7eb] p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#fff8e6] data-[state=active]:text-[#C9A84C]">
            <LineChartIcon className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="grades" className="data-[state=active]:bg-[#fff8e6] data-[state=active]:text-[#C9A84C]">
            <PieChartIcon className="w-4 h-4 mr-2" />
            Grades
          </TabsTrigger>
          <TabsTrigger value="subjects" className="data-[state=active]:bg-[#fff8e6] data-[state=active]:text-[#C9A84C]">
            <BarChartIcon className="w-4 h-4 mr-2" />
            Subjects
          </TabsTrigger>
          <TabsTrigger value="classes" className="data-[state=active]:bg-[#fff8e6] data-[state=active]:text-[#C9A84C]">
            <School className="w-4 h-4 mr-2" />
            Classes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Performance Trends</CardTitle>
                <p className="text-sm text-[#6b7280]">Monthly average scores and attendance rates</p>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <LineChart data={monthlyTrendData} showAttendance />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#1f2937]">Top Performers</CardTitle>
                  <p className="text-sm text-[#6b7280]">Students with highest average scores</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((student, index) => (
                      <div
                        key={student.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#f8fafc] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#003366] flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#1f2937]">{student.name}</p>
                          <p className="text-sm text-[#6b7280]">{student.class}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">{student.average}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#1f2937]">Recent Activity</CardTitle>
                  <p className="text-sm text-[#6b7280]">Latest grade entries and updates</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {grades.slice(0, 5).map((grade) => {
                      const student = students.find((s) => s.id === grade.studentId);
                      return (
                        <div
                          key={grade.id}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#f8fafc] transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#fff8e6] flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-[#1f2937]">
                              {student?.name} - {grade.subjectName}
                            </p>
                            <p className="text-sm text-[#6b7280]">{grade.dateRecorded}</p>
                          </div>
                          <Badge
                            className={`${
                              grade.grade === 'A'
                                ? 'bg-green-100 text-green-700'
                                : grade.grade === 'B'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {grade.grade}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="grades" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#1f2937]">Grade Distribution</CardTitle>
                  <p className="text-sm text-[#6b7280]">Breakdown of student grades across all subjects</p>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <PieChart data={gradeDistributionData} />
                  </div>
                  <div className="grid grid-cols-5 gap-2 mt-6">
                    {gradeDistributionData.map((grade) => (
                      <div key={grade.name} className="text-center">
                        <div
                          className="w-4 h-4 rounded-full mx-auto mb-2"
                          style={{ backgroundColor: grade.color }}
                        />
                        <p className="text-xs text-[#6b7280]">{grade.name.split(' ')[1]}</p>
                        <p className="text-lg font-bold text-[#1f2937]">{grade.value}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#1f2937]">Grade Statistics</CardTitle>
                  <p className="text-sm text-[#6b7280]">Detailed breakdown by grade</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gradeDistributionData.map((grade) => (
                      <div key={grade.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: grade.color }}
                            />
                            <span className="font-medium text-[#1f2937]">{grade.name}</span>
                          </div>
                          <span className="text-sm text-[#6b7280]">
                            {Math.round((grade.value / 100) * performanceMetrics.totalStudents)} students
                          </span>
                        </div>
                        <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${grade.value}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: grade.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Subject Performance</CardTitle>
                <p className="text-sm text-[#6b7280]">Average scores across all subjects</p>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <BarChart data={subjectAveragesData} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.subjectAverages.map((subject, index) => (
              <motion.div
                key={subject.subjectId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-[#1f2937]">{subject.subjectName}</h4>
                      <Badge
                        className={`${
                          subject.average >= 80
                            ? 'bg-green-100 text-green-700'
                            : subject.average >= 70
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {subject.average}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6b7280]">Performance</span>
                        <span className="font-medium text-[#1f2937]">{subject.average}%</span>
                      </div>
                      <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.average}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className={`h-full rounded-full ${
                            subject.average >= 80
                              ? 'bg-green-500'
                              : subject.average >= 70
                              ? 'bg-blue-500'
                              : 'bg-yellow-500'
                          }`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Class Comparison</CardTitle>
                <p className="text-sm text-[#6b7280]">Performance across different classes</p>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <BarChart data={classPerformanceData} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((cls, index) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border-0 shadow-md">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-[#1f2937] text-lg">{cls.name}</h4>
                        <p className="text-sm text-[#6b7280]">{cls.stream} Stream</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#C9A84C]">
                          {Math.round(70 + Math.random() * 20)}%
                        </p>
                        <p className="text-xs text-[#6b7280]">Average</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6b7280]">Enrollment</span>
                        <span className="font-medium text-[#1f2937]">
                          {cls.enrolled} / {cls.capacity}
                        </span>
                      </div>
                      <div className="mt-2 h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C9A84C] rounded-full"
                          style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
