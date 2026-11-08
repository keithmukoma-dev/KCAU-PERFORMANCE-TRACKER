import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Calendar, BookOpen, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import BarChart from '@/components/charts/BarChart';
import {
  dashboardStats,
  performanceMetrics,
  students,
  getStudentAverage,
  calculateStudentGPA,
} from '@/data/mockData';

const Dashboard: React.FC = () => {
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

  const recentStudents = students.slice(0, 5);

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
          <h1 className="text-3xl font-bold text-[#1f2937]">Dashboard</h1>
          <p className="text-[#6b7280] mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#e5e7eb] text-[#6b7280] hover:bg-[#f3f4f6]">
            <Calendar className="w-4 h-4 mr-2" />
            Term 1, 2024
          </Button>
          <Button className="bg-gradient-to-r from-[#C9A84C] to-[#003366] text-white hover:from-[#003366] hover:to-[#004080]">
            <TrendingUp className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            title: 'Total Students',
            value: dashboardStats.totalStudents.toLocaleString(),
            change: `+${dashboardStats.studentGrowth}%`,
            trend: 'up',
            icon: Users,
            color: 'from-[#C9A84C] to-[#003366]',
          },
          {
            title: 'Average GPA',
            value: dashboardStats.averageGPA.toFixed(1),
            change: `+${dashboardStats.gpaChange}`,
            trend: 'up',
            icon: TrendingUp,
            color: 'from-[#10b981] to-[#059669]',
          },
          {
            title: 'Attendance Rate',
            value: `${dashboardStats.attendanceRate}%`,
            change: `+${dashboardStats.attendanceChange}%`,
            trend: 'up',
            icon: Calendar,
            color: 'from-[#f59e0b] to-[#d97706]',
          },
          {
            title: 'Exams Completed',
            value: `${dashboardStats.examsCompleted}%`,
            change: `+${dashboardStats.examsChange}%`,
            trend: 'up',
            icon: BookOpen,
            color: 'from-[#8b5cf6] to-[#7c3aed]',
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card className="border-0 shadow-lg shadow-[#C9A84C]/5 hover:shadow-xl hover:shadow-[#C9A84C]/10 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#6b7280]">{stat.title}</p>
                      <h3 className="text-3xl font-bold text-[#1f2937] mt-2">{stat.value}</h3>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-[#9ca3af]">vs last term</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-lg shadow-[#C9A84C]/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Performance Trends</CardTitle>
                <p className="text-sm text-[#6b7280]">Average scores and attendance over time</p>
              </div>
              <Button variant="ghost" size="icon" className="text-[#9ca3af]">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart data={performanceMetrics.trendData} showAttendance />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="border-0 shadow-lg shadow-[#C9A84C]/5 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-[#1f2937]">Grade Distribution</CardTitle>
              <p className="text-sm text-[#6b7280]">Breakdown by performance tier</p>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <PieChart data={gradeDistributionData} />
              </div>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {gradeDistributionData.map((grade) => (
                  <div key={grade.name} className="text-center">
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-1"
                      style={{ backgroundColor: grade.color }}
                    />
                    <p className="text-xs text-[#6b7280]">{grade.name.split(' ')[1]}</p>
                    <p className="text-sm font-semibold text-[#1f2937]">{grade.value}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Averages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="border-0 shadow-lg shadow-[#C9A84C]/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Subject Performance</CardTitle>
                <p className="text-sm text-[#6b7280]">Average scores by subject</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <BarChart data={subjectAveragesData} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Students */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="border-0 shadow-lg shadow-[#C9A84C]/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Top Performers</CardTitle>
                <p className="text-sm text-[#6b7280]">Students with highest scores</p>
              </div>
              <Button variant="ghost" className="text-[#C9A84C] hover:text-[#003366]">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student, index) => {
                  const average = getStudentAverage(student.id);
                  const gpa = calculateStudentGPA(student.id);
                  return (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#f8fafc] transition-colors group cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-[#C9A84C] to-[#003366] text-white">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#1f2937] truncate">{student.name}</h4>
                        <p className="text-sm text-[#6b7280]">{student.class}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#1f2937]">{average}%</p>
                        <p className="text-xs text-[#6b7280]">GPA: {gpa}</p>
                      </div>
                      <div className="w-24">
                        <Progress value={average} className="h-2" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
