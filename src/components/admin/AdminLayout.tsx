import React, { useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Mail,
  Building2,
  GraduationCap,
  Calendar,
  Image as ImageIcon,
  Sliders,
  MessageSquareQuote,
  Trophy,
  BookOpen,
  HelpCircle,
  Settings,
  Users,
  Database,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CESSLogo } from '../common/CESSLogo';
import { AdminUser, AdmissionInquiry, ContactMessage } from '../../types';

interface AdminLayoutProps {
  currentUser: AdminUser;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
  onViewPublicSite: () => void;
  inquiries: AdmissionInquiry[];
  messages: ContactMessage[];
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentUser,
  currentTab,
  onSelectTab,
  onLogout,
  onViewPublicSite,
  inquiries,
  messages,
  children
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;
  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'inquiries',
      label: 'Admission Inquiries',
      icon: Inbox,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined,
      badgeColor: 'bg-emerald-500'
    },
    {
      id: 'messages',
      label: 'Contact Messages',
      icon: Mail,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      badgeColor: 'bg-amber-400 text-[#2D0A3E]'
    },
    { id: 'hero', label: 'Hero Slides', icon: Sliders },
    { id: 'campuses', label: 'Campuses (4)', icon: Building2 },
    { id: 'faculty', label: 'Faculty Directory', icon: GraduationCap },
    { id: 'news', label: 'News & Events', icon: Calendar },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'toppers', label: 'Toppers & Results', icon: Trophy },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'academics', label: 'Academic Programs', icon: BookOpen },
    { id: 'faqs', label: 'FAQs Management', icon: HelpCircle },
    { id: 'settings', label: 'Site Settings & Stats', icon: Settings },
    { id: 'users', label: 'Admin Accounts', icon: Users },
    { id: 'firebase-guide', label: 'Firebase Cloud Guide', icon: Database, isSpecial: true }
  ];

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F3F9] flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#2D0A3E] text-white px-3 py-2.5 flex items-center justify-between border-b border-purple-900 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-purple-900/60 text-white min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <CESSLogo size="sm" variant="light" showTagline={false} />
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden xs:inline-block px-2.5 py-1 rounded-full bg-purple-900/80 text-[10px] font-bold text-[#FFC107] border border-purple-700/60 truncate max-w-[120px]">
            {navItems.find((n) => n.id === currentTab)?.label || 'Admin'}
          </span>
          <button
            onClick={onViewPublicSite}
            className="text-xs bg-[#FFC107] text-[#2D0A3E] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Site</span>
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#2D0A3E] text-slate-300 flex flex-col justify-between border-r border-purple-900/50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:shrink-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sidebar Brand Header */}
          <div className="p-6 border-b border-purple-900/60">
            <CESSLogo variant="light" size="md" showTagline={false} />
            <div className="mt-3 flex items-center justify-between text-xs text-purple-200">
              <span className="font-semibold text-[#FFC107]">Admin Portal v2.6</span>
              <span className="px-2 py-0.5 rounded-sm bg-purple-900/80 text-[10px] text-amber-300 border border-purple-700">
                {currentUser.role}
              </span>
            </div>
          </div>

          {/* Nav Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-400/80">
              Navigation & Control
            </div>
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B0A8C] text-white font-bold shadow-md'
                      : item.isSpecial
                      ? 'bg-purple-950/60 text-[#FFC107] hover:bg-purple-900/50 border border-[#FFC107]/20'
                      : 'text-purple-200 hover:bg-purple-900/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FFC107]' : 'text-purple-300'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        item.badgeColor || 'bg-amber-400 text-slate-900'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* User profile & Logout */}
          <div className="p-4 border-t border-purple-900/60 bg-purple-950/40">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#8B0A8C] to-[#FFC107] text-[#2D0A3E] font-extrabold text-xs flex items-center justify-center shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-purple-300 truncate">
                    {currentUser.email}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-rose-300 hover:text-rose-100 hover:bg-rose-950/60 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onViewPublicSite}
              className="w-full py-2 px-3 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-xs font-semibold text-amber-300 flex items-center justify-center gap-1.5 transition-colors border border-purple-800"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col min-h-[calc(100vh-56px)] lg:h-screen lg:overflow-y-auto overflow-x-hidden min-w-0">
        {/* Desktop Top Workspace Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-purple-100 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-heading font-extrabold text-xl text-[#2D0A3E] capitalize">
              {navItems.find((n) => n.id === currentTab)?.label || 'Administration'}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              • City English School System
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Sync Active</span>
            </div>

            <button
              onClick={onViewPublicSite}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Website</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="p-3 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};
