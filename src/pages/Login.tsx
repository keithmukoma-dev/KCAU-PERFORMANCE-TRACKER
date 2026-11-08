import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, User, Lock, Eye, EyeOff, Loader2, Mail, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const ADMIN_EMAIL = 'admin@kcau.ac.ke';
const ADMIN_PASSWORD = 'admin123';

type Mode = 'signin' | 'register';

const Login: React.FC = () => {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter email and password'); return; }

    // Check if admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const success = await login(email, password, 'admin');
      if (!success) setError('Invalid credentials.');
      return;
    }

    // Otherwise treat as student
    const success = await login(email, password, 'student');
    if (!success) setError('Invalid credentials. Please check your email and password.');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!fullName || !email || !admissionNo || !password || !confirmPassword) {
      setError('Please fill in all fields'); return;
    }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    // Simulate registration success (in real app this would call an API)
    setRegisterSuccess(true);
  };

  const resetForm = () => {
    setEmail(''); setPassword(''); setConfirmPassword('');
    setFullName(''); setAdmissionNo(''); setError('');
    setRegisterSuccess(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#004080] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A84C]/10 rounded-full blur-3xl"
          animate={{ scale: [1,1.2,1], opacity: [0.3,0.5,0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease:'easeInOut' }} />
        <motion.div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A84C]/8 rounded-full blur-3xl"
          animate={{ scale: [1.2,1,1.2], opacity: [0.2,0.4,0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease:'easeInOut' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Logo */}
        <motion.div className="flex flex-col items-center mb-8"
          initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.2, duration:0.6 }}>
          <div className="w-20 h-20 bg-gradient-to-br from-[#C9A84C] to-[#a8863a] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C9A84C]/40 mb-4">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white text-center tracking-wide">KCAU Analytics</h1>
          <p className="text-[#C9A84C] mt-1 text-center font-medium text-sm tracking-widest uppercase">KCA University</p>
          <p className="text-white/60 mt-1 text-center text-sm">Student Performance Tracking System</p>
        </motion.div>

        <Card className="border-0 shadow-2xl shadow-black/40 bg-white/95 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {/* ── SIGN IN ── */}
            {mode === 'signin' && !registerSuccess && (
              <motion.div key="signin"
                initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:20 }} transition={{ duration:0.3 }}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-center text-[#003366]">Welcome Back</CardTitle>
                  <CardDescription className="text-center text-[#6b7280]">Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-[#374151]">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                        <Input id="email" type="email" placeholder="Enter your email" value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="pl-10 h-12 border-[#e5e7eb] focus:border-[#003366]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-[#374151]">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                        <Input id="password" type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password" value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="pl-10 pr-10 h-12 border-[#e5e7eb] focus:border-[#003366]" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280]">
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
                        className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                        {error}
                      </motion.div>
                    )}

                    <Button type="submit" disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-[#003366] to-[#004080] hover:from-[#004080] hover:to-[#003366] text-white font-semibold rounded-xl shadow-lg">
                      {isLoading ? <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" />Signing in...</span> : 'Sign In'}
                    </Button>
                  </form>

                  <div className="mt-5 text-center">
                    <p className="text-sm text-[#6b7280]">New student?{' '}
                      <button onClick={() => { setMode('register'); resetForm(); }}
                        className="text-[#C9A84C] font-semibold hover:underline">
                        Register here
                      </button>
                    </p>
                  </div>
                </CardContent>
              </motion.div>
            )}

            {/* ── REGISTER ── */}
            {mode === 'register' && !registerSuccess && (
              <motion.div key="register"
                initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:-20 }} transition={{ duration:0.3 }}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-center text-[#003366]">Create Account</CardTitle>
                  <CardDescription className="text-center text-[#6b7280]">Register as a new student</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#374151]">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                        <Input placeholder="e.g. John Kamau" value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          className="pl-10 h-12 border-[#e5e7eb] focus:border-[#003366]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#374151]">Admission Number</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                        <Input placeholder="e.g. KC/2024/001" value={admissionNo}
                          onChange={e => setAdmissionNo(e.target.value)}
                          className="pl-10 h-12 border-[#e5e7eb] focus:border-[#003366]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#374151]">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                        <Input type="email" placeholder="your@email.com" value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="pl-10 h-12 border-[#e5e7eb] focus:border-[#003366]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-[#374151]">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                          <Input type={showPassword ? 'text' : 'password'} placeholder="Min. 6 chars" value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="pl-9 h-12 border-[#e5e7eb] focus:border-[#003366]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-[#374151]">Confirm</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                          <Input type={showPassword ? 'text' : 'password'} placeholder="Repeat" value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="pl-9 h-12 border-[#e5e7eb] focus:border-[#003366]" />
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-[#9ca3af] hover:text-[#6b7280] flex items-center gap-1">
                      {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {showPassword ? 'Hide' : 'Show'} passwords
                    </button>

                    {error && (
                      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
                        className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                        {error}
                      </motion.div>
                    )}

                    <Button type="submit"
                      className="w-full h-12 bg-gradient-to-r from-[#C9A84C] to-[#a8863a] hover:from-[#a8863a] hover:to-[#C9A84C] text-white font-semibold rounded-xl shadow-lg">
                      <UserPlus className="w-4 h-4 mr-2" /> Create Account
                    </Button>
                  </form>

                  <div className="mt-5 text-center">
                    <p className="text-sm text-[#6b7280]">Already have an account?{' '}
                      <button onClick={() => { setMode('signin'); resetForm(); }}
                        className="text-[#003366] font-semibold hover:underline">
                        Sign in
                      </button>
                    </p>
                  </div>
                </CardContent>
              </motion.div>
            )}

            {/* ── REGISTER SUCCESS ── */}
            {registerSuccess && (
              <motion.div key="success"
                initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                transition={{ duration:0.4 }}>
                <CardContent className="py-10 text-center space-y-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.2, type:'spring' }}>
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-[#003366]">Registration Submitted!</h3>
                  <p className="text-[#6b7280] text-sm leading-relaxed">
                    Your account request has been sent to the admin for approval. You'll be able to log in once it's approved.
                  </p>
                  <Button onClick={() => { setMode('signin'); resetForm(); }}
                    className="w-full h-12 bg-gradient-to-r from-[#003366] to-[#004080] text-white font-semibold rounded-xl">
                    Back to Sign In
                  </Button>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <motion.p className="text-center text-white/40 text-sm mt-6"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
          © 2024 KCAU Analytics. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
