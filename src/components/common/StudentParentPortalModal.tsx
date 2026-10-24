import React, { useState } from 'react';
import {
  GraduationCap,
  X,
  FileCheck2,
  Calendar,
  CheckCircle2,
  Download,
  AlertCircle,
  Receipt,
  BookOpen,
  User,
  ShieldCheck
} from 'lucide-react';
import { CESSLogo } from './CESSLogo';

interface StudentParentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentParentPortalModal: React.FC<StudentParentPortalModalProps> = ({
  isOpen,
  onClose
}) => {
  const [rollNumber, setRollNumber] = useState('CESS-2026-8842');
  const [dob, setDob] = useState('2011-04-12');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'results' | 'attendance' | 'fee' | 'diary'>('results');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (rollNumber) {
      setIsLoggedIn(true);
    }
  };

  const mockStudent = {
    name: 'Muhammad Daniyal Tariq',
    rollNumber: rollNumber || 'CESS-2026-8842',
    grade: 'Grade 9 (Cambridge O-Levels)',
    campus: 'Main Campus (Central)',
    fatherName: 'Tariq Mehmood Qureshi',
    attendance: '96.4%',
    overallGrade: 'A* (Distinct Honor)',
    feeStatus: 'Paid (October 2026 Cleared)'
  };

  const mockGrades = [
    { subject: 'Physics (5054)', marks: '94/100', grade: 'A*', status: 'Distinction' },
    { subject: 'Chemistry (5070)', marks: '91/100', grade: 'A*', status: 'Distinction' },
    { subject: 'Mathematics Syllabus D (4024)', marks: '98/100', grade: 'A*', status: 'Top in Campus' },
    { subject: 'Computer Science (2210)', marks: '95/100', grade: 'A*', status: 'Distinction' },
    { subject: 'English Language (1123)', marks: '88/100', grade: 'A', status: 'Excellent' },
    { subject: 'Islamiyat (2058)', marks: '92/100', grade: 'A*', status: 'Distinction' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-purple-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white p-4 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <CESSLogo size="sm" variant="light" showTagline={false} />
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                CESS Student & Parent Portal
              </h3>
              <p className="text-[10px] sm:text-[11px] text-purple-200">
                Official Digital Dossier & Academic Progress Desk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isLoggedIn ? (
          /* Login View */
          <div className="p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-6 overflow-y-auto">
            <div className="text-center max-w-md mx-auto space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#8B0A8C] flex items-center justify-center mx-auto shadow-inner">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-xl text-[#2D0A3E]">
                Student & Guardian Access
              </h4>
              <p className="text-xs text-slate-500">
                Enter your student registration roll number or NADRA B-Form to view term report cards, fee receipts, and homework diaries.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Roll / Enrollment No.
                </label>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. CESS-2026-8842"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm font-mono focus:border-[#8B0A8C] focus:outline-hidden bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-[#F7F3F9]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-heading font-bold text-sm text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#8B0A8C]" />
                <span>Sign In to Student Portal</span>
              </button>

              <p className="text-[11px] text-center text-slate-400 pt-1">
                Demo access pre-filled. Click "Sign In" to preview student dashboard.
              </p>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Student Profile Card */}
            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#8B0A8C] text-[#FFC107] font-heading font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
                  {mockStudent.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#2D0A3E]">
                    {mockStudent.name}
                  </h4>
                  <div className="text-xs text-[#8B0A8C] font-semibold">
                    {mockStudent.grade} • {mockStudent.campus}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Roll No: {mockStudent.rollNumber}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Attendance: {mockStudent.attendance}
                </span>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Portal Tabs */}
            <div className="flex border-b border-purple-100 gap-2">
              {[
                { id: 'results', label: 'Mid-Term Results', icon: FileCheck2 },
                { id: 'attendance', label: 'Attendance', icon: Calendar },
                { id: 'fee', label: 'Fee Voucher', icon: Receipt },
                { id: 'diary', label: 'Daily Diary', icon: BookOpen }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-2.5 px-3 text-xs font-heading font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isActive
                        ? 'border-[#8B0A8C] text-[#8B0A8C]'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            {activeTab === 'results' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2D0A3E]">
                    Mid-Term Examination Scorecard (October 2026)
                  </span>
                  <button
                    onClick={() => alert('Downloading official stamped CESS Report Card PDF...')}
                    className="text-xs font-bold text-[#8B0A8C] hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>

                <div className="divide-y divide-purple-50 rounded-2xl border border-purple-100 overflow-hidden text-xs">
                  {mockGrades.map((g, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between hover:bg-purple-50/30">
                      <div>
                        <div className="font-bold text-slate-800">{g.subject}</div>
                        <div className="text-[11px] text-slate-400">{g.status}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-slate-900">{g.marks}</div>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm bg-[#FFC107] text-[#2D0A3E]">
                          {g.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="p-5 rounded-2xl bg-[#F7F3F9] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2D0A3E]">Term Attendance Log:</span>
                  <span className="font-extrabold text-emerald-700">96.4% Regularity</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Total Working Days: 72 | Present Days: 69 | Excused Medical Leave: 3
                </p>
                <div className="p-3 rounded-xl bg-white border border-purple-100 flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Student meets 85% mandatory examination clearance threshold.</span>
                </div>
              </div>
            )}

            {activeTab === 'fee' && (
              <div className="p-5 rounded-2xl bg-[#F7F3F9] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2D0A3E]">October 2026 Monthly Tuition Voucher:</span>
                  <span className="font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    PAID & SETTLED
                  </span>
                </div>
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Monthly Tuition Fee:</span>
                    <span>Rs. 14,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STEM Science Lab Access:</span>
                    <span>Rs. 1,200</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Merit Scholarship Discount (25%):</span>
                    <span>- Rs. 3,625</span>
                  </div>
                  <div className="pt-2 border-t border-purple-200 flex justify-between font-bold text-[#2D0A3E]">
                    <span>Net Amount Cleared:</span>
                    <span>Rs. 12,075</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'diary' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-purple-100 space-y-1">
                  <div className="flex justify-between font-bold text-[#8B0A8C]">
                    <span>Physics: Past Paper Analysis</span>
                    <span className="text-[10px] text-slate-400">Due Tomorrow</span>
                  </div>
                  <p className="text-slate-600">
                    Complete May/June 2025 Paper 2 Questions 3 to 7 on kinematics and momentum.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-purple-100 space-y-1">
                  <div className="flex justify-between font-bold text-[#8B0A8C]">
                    <span>Mathematics: Trigonometric Identities</span>
                    <span className="text-[10px] text-slate-400">Due Friday</span>
                  </div>
                  <p className="text-slate-600">
                    Review exercise 14.2 formulas and submit practice worksheet.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
