import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate, type NavLinkRenderProps } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BookMarked,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { notifications } from '@/data/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  // Admin sees all nav items; student sees only Dashboard, Analytics, Settings
  const adminNavItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/students', label: 'Students', icon: Users },
    { path: '/subjects', label: 'Subjects', icon: BookOpen },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const studentNavItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/my-subjects', label: 'My Subjects', icon: BookMarked },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <motion.div className="flex items-center gap-3" animate={{ opacity: (sidebarOpen || mobile) ? 1 : 0 }}>
          <div className="w-10 h-10 bg-gradient-to-br from-[#C9A84C] to-[#a8863a] rounded-xl flex items-center justify-center shadow-lg shadow-black/30 flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {(sidebarOpen || mobile) && (
            <div>
              <h1 className="font-bold text-white text-lg leading-tight tracking-wide">KCAU</h1>
              <p className="text-xs text-[#C9A84C]">Analytics</p>
            </div>
          )}
        </motion.div>
        {!sidebarOpen && !mobile && (
          <div className="w-10 h-10 bg-gradient-to-br from-[#C9A84C] to-[#a8863a] rounded-xl flex items-center justify-center shadow-lg shadow-black/30">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Role Badge */}
      {(sidebarOpen || mobile) && (
        <div className="px-4 pt-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isAdmin ? 'bg-[#C9A84C]/15 border border-[#C9A84C]/30' : 'bg-white/10 border border-white/20'}`}>
            <ShieldCheck className={`w-4 h-4 ${isAdmin ? 'text-[#C9A84C]' : 'text-white/60'}`} />
            <span className={`text-xs font-semibold uppercase tracking-wider ${isAdmin ? 'text-[#C9A84C]' : 'text-white/60'}`}>
              {isAdmin ? 'Administrator' : 'Student'}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
              className={({ isActive }: NavLinkRenderProps) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-[#C9A84C] text-[#003366] shadow-lg shadow-black/20 font-semibold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-[#003366]' : 'text-current'}`} />
              {(sidebarOpen || mobile) && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {active && (sidebarOpen || mobile) && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 ${(sidebarOpen || mobile) ? '' : 'justify-center'}`}>
          <Avatar className="w-9 h-9 border-2 border-[#C9A84C]/40 shadow-md flex-shrink-0">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-[#C9A84C] to-[#a8863a] text-white text-sm font-bold">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {(sidebarOpen || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-white truncate">{user?.name}</p>
              <p className="text-xs text-[#C9A84C] capitalize">{user?.role}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex">
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex flex-col bg-[#003366] fixed h-full z-30 overflow-hidden"
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-y-0 left-0 w-72 bg-[#003366] z-50 flex flex-col"
          >
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <SidebarContent mobile />
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-300 hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[80px]'}`}>
        {/* Header */}
        <header className="h-20 bg-white/90 backdrop-blur-xl border-b border-[#e5e7eb] sticky top-0 z-20 px-4 sm:px-8 shadow-sm">
          <div className="h-full flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-[#003366]/10 transition-colors"
              >
                <Menu className="w-5 h-5 text-[#003366]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#f3f4f6] transition-colors"
              >
                <Menu className="w-5 h-5 text-[#003366]" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-[#6b7280]">
                <span>Home</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#003366] font-semibold capitalize">
                  {location.pathname.slice(1) || 'Dashboard'}
                </span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#f3f4f6] rounded-xl">
                <Search className="w-4 h-4 text-[#9ca3af]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-[#9ca3af]"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#f3f4f6] transition-colors"
                >
                  <Bell className="w-5 h-5 text-[#003366]" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#C9A84C] text-white text-xs border-0">
                      {unreadCount}
                    </Badge>
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#e5e7eb] overflow-hidden"
                    >
                      <div className="p-4 border-b border-[#e5e7eb] bg-[#003366]">
                        <h3 className="font-semibold text-white">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-[#e5e7eb] hover:bg-[#f8fafc] transition-colors ${!notification.read ? 'bg-[#C9A84C]/5' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.type === 'success' ? 'bg-green-500'
                                  : notification.type === 'warning' ? 'bg-amber-500'
                                  : notification.type === 'error' ? 'bg-red-500'
                                  : 'bg-[#003366]'
                                }`}
                              />
                              <div>
                                <p className="font-medium text-sm text-[#1f2937]">{notification.title}</p>
                                <p className="text-xs text-[#6b7280] mt-1">{notification.message}</p>
                                <p className="text-xs text-[#9ca3af] mt-2">
                                  {new Date(notification.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Logout */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="hidden sm:flex w-10 h-10 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
