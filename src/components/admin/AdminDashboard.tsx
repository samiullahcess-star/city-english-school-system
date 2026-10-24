import React from 'react';
import {
  Users,
  GraduationCap,
  Building2,
  Calendar,
  Image as ImageIcon,
  Inbox,
  Mail,
  TrendingUp,
  Download,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import {
  SiteSettings,
  AdmissionInquiry,
  ContactMessage,
  FacultyMember,
  Campus,
  NewsEvent,
  GalleryItem
} from '../../types';
import { dataService } from '../../services/dataService';

interface AdminDashboardProps {
  settings: SiteSettings;
  inquiries: AdmissionInquiry[];
  messages: ContactMessage[];
  faculty: FacultyMember[];
  campuses: Campus[];
  news: NewsEvent[];
  gallery: GalleryItem[];
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  settings,
  inquiries,
  messages,
  faculty,
  campuses,
  news,
  gallery,
  onNavigateTab
}) => {
  const newInquiries = inquiries.filter((i) => i.status === 'New');
  const unreadMessages = messages.filter((m) => !m.read);

  // Metric cards data
  const statCards = [
    {
      title: 'Enrolled Students',
      value: settings.totalStudents || '2000+',
      subtext: 'Across 4 Campuses',
      icon: Users,
      color: 'bg-purple-50 text-[#8B0A8C]'
    },
    {
      title: 'Active Faculty',
      value: `${faculty.length || 12}+ Teachers`,
      subtext: 'Specialists & Mentors',
      icon: GraduationCap,
      color: 'bg-amber-50 text-amber-700'
    },
    {
      title: 'Active Campuses',
      value: `${campuses.length || 4} Branches`,
      subtext: 'Central, Gulshan, Model Town, Cantt',
      icon: Building2,
      color: 'bg-indigo-50 text-indigo-700'
    },
    {
      title: 'New Inquiries',
      value: `${newInquiries.length} Pending`,
      subtext: 'Awaiting Counselor Follow-up',
      icon: Inbox,
      color: 'bg-emerald-50 text-emerald-700',
      badge: 'Action Required',
      tab: 'inquiries'
    },
    {
      title: 'Unread Messages',
      value: `${unreadMessages.length} New`,
      subtext: 'Contact Form Inquiries',
      icon: Mail,
      color: 'bg-sky-50 text-sky-700',
      tab: 'messages'
    },
    {
      title: 'News & Circulars',
      value: `${news.length} Published`,
      subtext: 'Flagship & Academic Events',
      icon: Calendar,
      color: 'bg-rose-50 text-rose-700',
      tab: 'news'
    },
    {
      title: 'Gallery Media',
      value: `${gallery.length} Photos`,
      subtext: 'Across 5 Categories',
      icon: ImageIcon,
      color: 'bg-violet-50 text-violet-700',
      tab: 'gallery'
    }
  ];

  // Simulated Monthly Admission Inquiries data for chart
  const monthlyData = [
    { month: 'May', count: 18 },
    { month: 'Jun', count: 28 },
    { month: 'Jul', count: 42 },
    { month: 'Aug', count: 65 },
    { month: 'Sep', count: 52 },
    { month: 'Oct', count: 74 }
  ];
  const maxCount = Math.max(...monthlyData.map((d) => d.count));

  const handleExportCSV = () => {
    dataService.exportInquiriesCSV();
  };

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Actions Bar */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFC107_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to CESS Executive Secretariat</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Overview & Real-Time Analytics
          </h1>
          <p className="text-xs sm:text-sm text-purple-200">
            Monitoring school operations, online admission inquiries, faculty rosters, and website content updates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#8B0A8C]" />
            <span>Export Inquiries CSV</span>
          </button>

          <button
            onClick={() => onNavigateTab('news')}
            className="px-4 py-2.5 rounded-xl font-heading font-semibold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#FFC107]" />
            <span>Post Circular / Event</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => card.tab && onNavigateTab(card.tab)}
              className={`bg-white rounded-2xl p-5 shadow-xs border border-purple-100 flex flex-col justify-between transition-all ${
                card.tab ? 'hover:shadow-md hover:-translate-y-1 cursor-pointer group' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500">
                    {card.title}
                  </span>
                  <div className="font-heading font-black text-2xl text-[#2D0A3E] group-hover:text-[#8B0A8C] transition-colors">
                    {card.value}
                  </div>
                </div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate">{card.subtext}</span>
                {card.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {card.badge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Monthly Admission Inquiries Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#8B0A8C]" />
                <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                  Monthly Admission Inquiries Trajectory
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Surge in online applications leading to the 2026-27 academic session
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +42% Growth YoY
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2 border-b border-purple-100">
            {monthlyData.map((item, idx) => {
              const heightPercent = Math.round((item.count / maxCount) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[42px] rounded-t-xl bg-linear-to-t from-[#8B0A8C] to-[#FFC107] group-hover:brightness-110 transition-all shadow-sm"
                  />
                  <div className="text-xs font-bold text-slate-600 pt-2">
                    {item.month}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>Data updated in real time from online admission submissions.</span>
            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-bold text-[#8B0A8C] hover:underline flex items-center gap-1"
            >
              <span>Manage Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Inquiries List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
              Recent Admission Inquiries
            </h3>
            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-bold text-[#8B0A8C] hover:underline"
            >
              View All ({inquiries.length})
            </button>
          </div>

          <div className="divide-y divide-purple-50 space-y-2">
            {inquiries.slice(0, 5).map((inq) => {
              const statusStyles: Record<string, string> = {
                New: 'bg-emerald-100 text-emerald-800',
                Contacted: 'bg-blue-100 text-blue-800',
                Admitted: 'bg-purple-100 text-purple-800',
                Rejected: 'bg-rose-100 text-rose-800'
              };
              return (
                <div key={inq.id} className="pt-2 pb-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs sm:text-sm text-[#2D0A3E]">
                      {inq.studentName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        statusStyles[inq.status] || 'bg-slate-100'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center justify-between">
                    <span>{inq.classApplyingFor} • {inq.preferredCampus}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Parent: {inq.parentName} ({inq.phone})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Contact Messages Stream */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
              Recent Website Messages & Queries
            </h3>
            <p className="text-xs text-slate-500">
              Direct inquiries submitted through the contact page
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('messages')}
            className="text-xs font-bold text-[#8B0A8C] hover:underline"
          >
            Open Inbox ({messages.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {messages.slice(0, 3).map((msg) => (
            <div
              key={msg.id}
              onClick={() => onNavigateTab('messages')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                msg.read
                  ? 'bg-[#F7F3F9]/60 border-purple-100'
                  : 'bg-amber-50/40 border-amber-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#2D0A3E] truncate">
                  {msg.name}
                </span>
                {!msg.read && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-[#2D0A3E]">
                    Unread
                  </span>
                )}
              </div>
              <div className="text-xs font-semibold text-[#8B0A8C] truncate mb-1">
                {msg.subject}
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">
                {msg.message}
              </p>
              <div className="mt-3 pt-2 border-t border-purple-100/60 text-[10px] text-slate-400 flex items-center justify-between">
                <span>{msg.campus || 'General'}</span>
                <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
