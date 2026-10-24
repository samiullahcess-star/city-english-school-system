import React, { useState } from 'react';
import {
  BookOpen,
  FlaskConical,
  Laptop,
  Library,
  Sparkles,
  Trophy,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { AcademicProgram } from '../types';

interface AcademicsPageProps {
  programs: AcademicProgram[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ programs, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>(programs[0]?.id || '');
  const activeProgram = programs.find((p) => p.id === activeTab) || programs[0];

  return (
    <div className="bg-[#F7F3F9] min-h-screen">
      {/* Banner */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
            <span>Rigorous & Value-Centric Learning</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Academic Programs & Curriculum
          </h1>
          <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base">
            Cultivating critical thinkers, ethical leaders, and scientific innovators across every stage of development.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Academic Levels Tabs */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {programs.map((prog) => {
              const isCurrent = prog.id === activeProgram?.id;
              return (
                <button
                  key={prog.id}
                  onClick={() => setActiveTab(prog.id)}
                  className={`px-5 py-3 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#8B0A8C] text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-purple-50 hover:text-[#8B0A8C] border border-purple-100'
                  }`}
                >
                  <BookOpen className={`w-4 h-4 ${isCurrent ? 'text-[#FFC107]' : 'text-slate-400'}`} />
                  <span>{prog.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Level Detail Card */}
          {activeProgram && (
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-purple-100">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-auto bg-slate-900">
                  <img
                    src={activeProgram.imageUrl}
                    alt={activeProgram.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#2D0A3E] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-bold shadow-md">
                      Age: {activeProgram.ageGroup}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs text-amber-300 font-semibold uppercase">
                      {activeProgram.gradeRange}
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-white">
                      {activeProgram.title}
                    </h3>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#8B0A8C]">
                      <Clock className="w-4 h-4 text-[#FFC107]" />
                      <span>Regular Class Timings: {activeProgram.timing}</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      {activeProgram.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#2D0A3E] uppercase tracking-wider mb-2.5">
                      Curricular Hallmarks & Teaching Methods:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeProgram.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-[#F7F3F9] p-2.5 rounded-lg border border-purple-100/60">
                          <CheckCircle className="w-4 h-4 text-[#8B0A8C] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#2D0A3E] uppercase tracking-wider mb-2.5">
                      Core Syllabus & Subjects:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProgram.subjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-md bg-purple-100 text-[#8B0A8C] text-xs font-semibold"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('admissions', { classApplyingFor: activeProgram.title })}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-sm text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#8B0A8C]" />
                      <span>Apply for {activeProgram.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Labs, STEM & Central Library Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider">
              World-Class Infrastructure
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#2D0A3E]">
              Specialized Laboratories & Learning Resource Centers
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-slate-600">
              Equipping students with tactile experience in physical sciences, computational thinking, and literature research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Science Labs */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-purple-100 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#8B0A8C] flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-[#8B0A8C]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#2D0A3E]">
                Science Laboratories
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Separate, fully equipped Physics, Chemistry, and Biology practical laboratories featuring modern glassware, digital microscopes, titration stations, and strict safety equipment.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">• Board & Cambridge practical certified</li>
                <li className="flex items-center gap-2">• Safety eyewash stations & fume hoods</li>
                <li className="flex items-center gap-2">• Hands-on experiments from Grade 6 upwards</li>
              </ul>
            </div>

            {/* Computer & STEM Labs */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-purple-100 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#8B0A8C] flex items-center justify-center">
                <Laptop className="w-6 h-6 text-[#8B0A8C]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#2D0A3E]">
                Computing & AI Robotics
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                High-speed fiber-connected computer stations running modern coding IDEs, Scratch, Python, HTML/CSS, plus Arduino microcontroller kits for robotics prototyping.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">• 1:1 computer-to-student ratio during sessions</li>
                <li className="flex items-center gap-2">• Interactive coding & web logic curricula</li>
                <li className="flex items-center gap-2">• Annual inter-campus robotics challenge</li>
              </ul>
            </div>

            {/* Central Library */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-purple-100 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#8B0A8C] flex items-center justify-center">
                <Library className="w-6 h-6 text-[#8B0A8C]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#2D0A3E]">
                Central Knowledge Library
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over 15,000 reference volumes, classic English and Urdu literature, encyclopedias, past examination archives, and quiet study alcoves fostering independent inquiry.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">• Digital e-book terminals & research indices</li>
                <li className="flex items-center gap-2">• Weekly structured reading periods</li>
                <li className="flex items-center gap-2">• Book borrowing and annual reading challenges</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Co-Curricular & Sports */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100/80 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider">
              Beyond the Classroom
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#2D0A3E]">
              Co-Curricular Clubs & Sports Leagues
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] rounded-full" />
            <p className="text-xs sm:text-sm text-slate-600">
              Character blossoms through teamwork, public speech, creative arts, and athletic discipline.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              'Debate & MUN Club',
              'Robotics & AI Society',
              'Athletics & Track',
              'Qirat & Naat Society',
              'Art & Calligraphy Guild',
              'Martial Arts & Karate',
              'Futsal & Football League',
              'Young Journalists Gazette',
              'Drama & Tableaux Guild',
              'Green Eco-Warriors Club',
              'Chess & Logic Masters',
              'Community Charity Wing'
            ].map((club, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-center text-xs font-bold text-[#2D0A3E] hover:bg-[#8B0A8C] hover:text-[#FFC107] transition-colors"
              >
                {club}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
