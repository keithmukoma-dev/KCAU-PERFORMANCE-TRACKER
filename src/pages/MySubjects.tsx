import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, XCircle, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { subjects } from '@/data/mockData';

type RequestStatus = 'approved' | 'pending' | 'rejected';

interface SubjectRequest {
  subjectId: string;
  status: RequestStatus;
  requestedOn: string;
}

const MySubjects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<SubjectRequest[]>([
    { subjectId: 'sub1', status: 'approved', requestedOn: '2024-01-10' },
    { subjectId: 'sub2', status: 'approved', requestedOn: '2024-01-10' },
    { subjectId: 'sub3', status: 'pending', requestedOn: '2024-03-20' },
  ]);

  const enrolledIds = requests.filter(r => r.status === 'approved').map(r => r.subjectId);
  const pendingIds = requests.filter(r => r.status === 'pending').map(r => r.subjectId);
  const rejectedIds = requests.filter(r => r.status === 'rejected').map(r => r.subjectId);

  const getStatus = (subjectId: string): RequestStatus | null => {
    const req = requests.find(r => r.subjectId === subjectId);
    return req ? req.status : null;
  };

  const handleRequest = (subjectId: string) => {
    if (getStatus(subjectId)) return;
    setRequests(prev => [...prev, {
      subjectId,
      status: 'pending',
      requestedOn: new Date().toISOString().split('T')[0],
    }]);
  };

  const handleCancelRequest = (subjectId: string) => {
    setRequests(prev => prev.filter(r => r.subjectId !== subjectId));
  };

  const filteredSubjects = subjects.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mySubjects = subjects.filter(s => enrolledIds.includes(s.id));
  const pendingSubjects = subjects.filter(s => pendingIds.includes(s.id));

  const statusBadge = (status: RequestStatus | null) => {
    if (!status) return null;
    if (status === 'approved') return <Badge className="bg-green-100 text-green-700 border-green-200 gap-1"><CheckCircle className="w-3 h-3" />Enrolled</Badge>;
    if (status === 'pending') return <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1"><Clock className="w-3 h-3" />Pending</Badge>;
    if (status === 'rejected') return <Badge className="bg-red-100 text-red-700 border-red-200 gap-1"><XCircle className="w-3 h-3" />Rejected</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
        <h1 className="text-3xl font-bold text-[#1f2937]">My Subjects</h1>
        <p className="text-[#6b7280] mt-1">View enrolled subjects and request new ones</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
        className="grid grid-cols-3 gap-4">
        {[
          { label: 'Enrolled', count: enrolledIds.length, color: 'green', icon: CheckCircle },
          { label: 'Pending', count: pendingIds.length, color: 'amber', icon: Clock },
          { label: 'Rejected', count: rejectedIds.length, color: 'red', icon: XCircle },
        ].map(item => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="border-0 shadow-md">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${item.color}-100`}>
                  <Icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1f2937]">{item.count}</p>
                  <p className="text-xs text-[#6b7280]">{item.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* My Enrolled Subjects */}
      {mySubjects.length > 0 && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}>
          <h2 className="text-lg font-bold text-[#1f2937] mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" /> Enrolled Subjects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mySubjects.map((subject, i) => (
              <motion.div key={subject.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="h-1.5" style={{ backgroundColor: subject.color }} />
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${subject.color}20` }}>
                          <BookOpen className="w-5 h-5" style={{ color: subject.color }} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1f2937]">{subject.name}</p>
                          <p className="text-xs text-[#6b7280]">{subject.code} · {subject.teacherName}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Enrolled</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Pending Requests */}
      {pendingSubjects.length > 0 && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}>
          <h2 className="text-lg font-bold text-[#1f2937] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" /> Pending Approval
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pendingSubjects.map((subject, i) => {
              const req = requests.find(r => r.subjectId === subject.id);
              return (
                <motion.div key={subject.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="border-0 shadow-md overflow-hidden border-l-4 border-l-amber-400">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${subject.color}20` }}>
                            <BookOpen className="w-5 h-5" style={{ color: subject.color }} />
                          </div>
                          <div>
                            <p className="font-semibold text-[#1f2937]">{subject.name}</p>
                            <p className="text-xs text-[#6b7280]">Requested: {req?.requestedOn}</p>
                          </div>
                        </div>
                        <button onClick={() => handleCancelRequest(subject.id)}
                          className="text-xs text-red-400 hover:text-red-600 hover:underline">Cancel</button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Browse & Request All Subjects */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>
        <h2 className="text-lg font-bold text-[#1f2937] mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#003366]" /> All Available Subjects
        </h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
          <Input placeholder="Search subjects..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 h-11 border-[#e5e7eb] focus:border-[#003366]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSubjects.map((subject, i) => {
            const status = getStatus(subject.id);
            return (
              <motion.div key={subject.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.04 }}>
                <Card className={`border-0 shadow-md overflow-hidden transition-all duration-200 ${!status ? 'hover:shadow-lg' : ''}`}>
                  <div className="h-1.5" style={{ backgroundColor: subject.color }} />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${subject.color}20` }}>
                          <BookOpen className="w-5 h-5" style={{ color: subject.color }} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1f2937] truncate">{subject.name}</p>
                          <p className="text-xs text-[#6b7280]">{subject.code} · {subject.teacherName}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {status ? statusBadge(status) : (
                          <Button size="sm" onClick={() => handleRequest(subject.id)}
                            className="h-8 bg-[#003366] hover:bg-[#004080] text-white text-xs px-3">
                            <Plus className="w-3 h-3 mr-1" />Request
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default MySubjects;
