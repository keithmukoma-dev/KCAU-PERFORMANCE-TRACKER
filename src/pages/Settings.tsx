import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Palette,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Save,
  Camera,
  Check,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    grades: true,
    attendance: true,
    announcements: true,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-3xl font-bold text-[#1f2937]">Settings</h1>
        <p className="text-[#6b7280] mt-1">Manage your account preferences and settings</p>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white border border-[#e5e7eb] p-1">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#fff8e6] data-[state=active]:text-[#C9A84C]">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#fff8e6] data-[state=active]:text-[#C9A84C]">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#fff8e6] data-[state=active]:text-[#C9A84C]">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-[#fff8e6] data-[state=active]:text-[#C9A84C]">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Profile Information</CardTitle>
                <CardDescription className="text-[#6b7280]">
                  Update your personal information and profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-[#C9A84C] to-[#003366] text-white text-2xl">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#C9A84C] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#003366] transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1f2937]">Profile Picture</h3>
                    <p className="text-sm text-[#6b7280]">JPG, PNG or GIF. Max size 2MB.</p>
                    <div className="flex gap-3 mt-3">
                      <Button size="sm" className="bg-[#C9A84C] text-white hover:bg-[#003366]">
                        Upload New
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#e5e7eb]">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue={user?.name} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input defaultValue={user?.email} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="+254 700 000 000" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input defaultValue={user?.role} disabled className="h-11 bg-[#f3f4f6]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] resize-none"
                    placeholder="Tell us a little about yourself..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-[#C9A84C] to-[#003366] text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Notification Preferences</CardTitle>
                <CardDescription className="text-[#6b7280]">
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-[#1f2937]">Notification Channels</h4>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1f2937]">Email Notifications</p>
                        <p className="text-sm text-[#6b7280]">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1f2937]">Push Notifications</p>
                        <p className="text-sm text-[#6b7280]">Receive push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-[#1f2937]">Notification Types</h4>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-[#1f2937]">Grade Updates</p>
                      <p className="text-sm text-[#6b7280]">When new grades are published</p>
                    </div>
                    <Switch
                      checked={notifications.grades}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, grades: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-[#1f2937]">Attendance Alerts</p>
                      <p className="text-sm text-[#6b7280]">When students are absent</p>
                    </div>
                    <Switch
                      checked={notifications.attendance}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, attendance: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-[#1f2937]">Announcements</p>
                      <p className="text-sm text-[#6b7280]">School news and updates</p>
                    </div>
                    <Switch
                      checked={notifications.announcements}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, announcements: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Change Password</CardTitle>
                <CardDescription className="text-[#6b7280]">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                      className="pl-10 pr-10 h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-[#C9A84C] to-[#003366] text-white">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Two-Factor Authentication</CardTitle>
                <CardDescription className="text-[#6b7280]">
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1f2937]">2FA is enabled</p>
                      <p className="text-sm text-[#6b7280]">Your account is protected</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-[#e5e7eb]">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1f2937]">Theme Settings</CardTitle>
                <CardDescription className="text-[#6b7280]">
                  Customize the appearance of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-[#1f2937]">Color Scheme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {['light', 'dark', 'system'].map((theme) => (
                      <button
                        key={theme}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          theme === 'light'
                            ? 'border-[#C9A84C] bg-[#fff8e6]'
                            : 'border-[#e5e7eb] hover:border-[#e9c46a]'
                        }`}
                      >
                        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#003366]" />
                        <p className="text-sm font-medium capitalize text-[#1f2937]">{theme}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-[#1f2937]">Accent Color</h4>
                  <div className="flex gap-3">
                    {['#C9A84C', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-full transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-[#1f2937]">Dashboard Layout</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 rounded-xl border-2 border-[#C9A84C] bg-[#fff8e6]">
                      <div className="w-full h-20 bg-white rounded-lg shadow-sm mb-2 p-2">
                        <div className="w-full h-2 bg-[#e5e7eb] rounded mb-2" />
                        <div className="w-2/3 h-2 bg-[#e5e7eb] rounded" />
                      </div>
                      <p className="text-sm font-medium text-[#1f2937]">Compact</p>
                    </button>
                    <button className="p-4 rounded-xl border-2 border-[#e5e7eb] hover:border-[#e9c46a] transition-colors">
                      <div className="w-full h-20 bg-white rounded-lg shadow-sm mb-2 p-2 space-y-2">
                        <div className="w-full h-2 bg-[#e5e7eb] rounded" />
                        <div className="w-full h-2 bg-[#e5e7eb] rounded" />
                        <div className="w-2/3 h-2 bg-[#e5e7eb] rounded" />
                      </div>
                      <p className="text-sm font-medium text-[#1f2937]">Comfortable</p>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
