import React from 'react';
import {
  Trophy,
  Star,
  Award,
  Sparkles,
  CheckCircle,
  GraduationCap,
  Medal,
  TrendingUp
} from 'lucide-react';
import { Achievement } from '../types';

interface ResultsPageProps {
  achievements: Achievement[];
  onNavigate: (page: string) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ achievements, onNavigate }) => {
  const boardHighlights = [
    { label: 'Overall Board Pass Rate', value: '100%', note: 'Maintained for 25+ consecutive years' },
    { label: 'A1 & A Grade Holders', value: '87.4%', note: 'Across Matric Science & Computer' },
    { label: 'Cambridge Straight A* Achievers', value: '45+ Scholars', note: 'CAIE IGCSE O-Levels 2025-26' },
    { label: 'Olympiad & STEM Medals', value: '18 Gold Trophies', note: 'National and provincial level' }
  ];

  return (
    <div className="bg-[#F7F3F9] min-h-screen">
      {/* Banner */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
            <span>Tradition of Dominance</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Results & Academic Achievements
          </h1>
          <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base">
            Consistently leading educational boards, Cambridge examinations, and inter-collegiate tournaments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Board Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardHighlights.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-xs border border-purple-100 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider block mb-2">
                  {stat.label}
                </span>
                <div className="font-heading font-black text-3xl sm:text-4xl text-[#2D0A3E]">
                  {stat.value}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-purple-50">
                {stat.note}
              </p>
            </div>
          ))}
        </div>

        {/* Board Toppers Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider">
              Provincial & Cambridge Laureates
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#2D0A3E]">
              Top Position Holders & Gold Medalists
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-purple-100 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-[#FFC107] p-0.5 shadow-md">
                      <img
                        src={ach.photoUrl}
                        alt={ach.studentName}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#2D0A3E] bg-[#FFC107] px-2 py-0.5 rounded-sm">
                        Session {ach.year}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-[#2D0A3E] group-hover:text-[#8B0A8C] transition-colors">
                        {ach.studentName}
                      </h3>
                      <div className="text-xs font-semibold text-[#8B0A8C]">
                        {ach.campus}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-purple-50 border border-purple-100 space-y-1">
                    <div className="text-xs font-extrabold text-[#2D0A3E]">
                      {ach.scoreOrRank}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {ach.examOrEvent}
                    </div>
                  </div>

                  {ach.quote && (
                    <p className="mt-3 text-xs italic text-slate-600 border-l-2 border-[#FFC107] pl-3 py-1">
                      "{ach.quote}"
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Board Result</span>
                  </span>
                  <Trophy className="w-4 h-4 text-[#FFC107]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scholarships & Merit Policy Banner */}
        <div className="bg-linear-to-r from-[#2D0A3E] to-[#8B0A8C] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Do You Strive for Academic Brilliance?
            </h3>
            <p className="text-sm text-purple-100">
              City English School System rewards exceptional diligence. Students scoring 90%+ in board exams receive up to 100% full tuition scholarships.
            </p>
          </div>

          <button
            onClick={() => onNavigate('admissions')}
            className="px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md transition-all shrink-0 cursor-pointer"
          >
            Apply for Merit Scholarship
          </button>
        </div>
      </div>
    </div>
  );
};
