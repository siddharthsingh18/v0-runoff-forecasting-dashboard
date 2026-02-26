'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Bell, Lock, User } from 'lucide-react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />

      <main className="ml-64 px-8 py-12">
        <div className="max-w-7xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
            <p className="text-white/60">
              Manage your account and application preferences
            </p>
          </motion.div>

          <div className="max-w-2xl space-y-6">
            {/* Account Settings */}
            <SectionCard
              title="Account Settings"
              description="Manage your account information"
              delay={0.1}
            >
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="user@example.com"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    defaultValue="John Doe"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="pt-4 border-t border-white/10">
                  <GlowButton onClick={handleSave} className="w-full">
                    Save Changes
                  </GlowButton>
                </div>
              </div>
            </SectionCard>

            {/* Notification Preferences */}
            <SectionCard
              title="Notifications"
              description="Control how and when you receive notifications"
              delay={0.2}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-white/60 text-sm">Receive updates about training and predictions</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-t border-white/10">
                  <div>
                    <p className="text-white font-medium">Model Alerts</p>
                    <p className="text-white/60 text-sm">Get notified when model training completes</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-t border-white/10">
                  <div>
                    <p className="text-white font-medium">Weekly Summary</p>
                    <p className="text-white/60 text-sm">Receive weekly performance summaries</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </SectionCard>

            {/* Security Settings */}
            <SectionCard
              title="Security"
              description="Manage your security preferences"
              delay={0.3}
            >
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white font-medium mb-2">Change Password</p>
                  <p className="text-white/60 text-sm mb-4">Update your password regularly to keep your account secure</p>
                  <GlowButton variant="outline" className="w-full">
                    Change Password
                  </GlowButton>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white font-medium mb-2">Two-Factor Authentication</p>
                  <p className="text-white/60 text-sm mb-4">Add an extra layer of security to your account</p>
                  <GlowButton variant="outline" className="w-full">
                    Enable 2FA
                  </GlowButton>
                </div>
              </div>
            </SectionCard>

            {/* Preferences */}
            <SectionCard
              title="Preferences"
              description="Customize your experience"
              delay={0.4}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-white font-medium">Dark Mode</p>
                    <p className="text-white/60 text-sm">Always enabled in this application</p>
                  </div>
                  <Switch disabled defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-t border-white/10">
                  <div>
                    <p className="text-white font-medium">Animations</p>
                    <p className="text-white/60 text-sm">Enable smooth UI animations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </SectionCard>

            {/* Danger Zone */}
            <SectionCard
              title="Danger Zone"
              description="Irreversible actions"
              delay={0.5}
            >
              <div className="space-y-4">
                <button className="w-full p-4 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors text-red-400 font-medium text-sm">
                  Delete Account
                </button>
                <p className="text-white/40 text-xs">
                  This action cannot be undone. Please proceed with caution.
                </p>
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  )
}
