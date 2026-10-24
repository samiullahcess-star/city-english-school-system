import React from 'react';
import { Trophy, Star, ArrowRight, Award } from 'lucide-react';
import { Achievement } from '../../types';

interface ToppersSectionProps {
  achievements: Achievement[];
  onNavigate: (page: string) => void;
}

export const ToppersSection: React.FC<ToppersSectionProps> = ({ achievements, onNavigate }) => {
  const featured = achievements.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#F7F3F9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>Hall of Laureates</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D0A3E] tracking-tight">
              Our High Achievers & Board Toppers
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] rounded-full" />
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Honoring CESS scholars whose relentless academic dedication has earned provincial board positions and global Cambridge distinctions.
            </p>
          </div>

          <button
            onClick={() => onNavigate('results')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#8B0A8C] hover:text-[#2D0A3E] transition-colors group cursor-pointer"
          >
            <span>View All Board Statistics & Awards</span>
            <ArrowRight className="w-4 h-4 text-[#FFC107] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((ach) => (
            <div
              key={ach.id}
              className="bg-white rounded-2xl p-5 shadow-xs hover:shadow-xl border border-purple-100 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                {/* Photo with Gold Laurel Halo */}
                <div className="relative mx-auto w-32 h-32 mb-4">
                  <div className="absolute inset-0 rounded-full bg-linear-to-tr from-[#FFC107] via-amber-300 to-[#8B0A8C] animate-pulse opacity-75" />
                  <img
                    src={ach.photoUrl}
                    alt={ach.studentName}
                    className="relative w-full h-full object-cover rounded-full p-1 bg-white"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FFC107] text-[#2D0A3E] text-[10px] font-heading font-extrabold px-3 py-0.5 rounded-full shadow-md whitespace-nowrap flex items-center gap-1 border border-white">
                    <Star className="w-3 h-3 fill-[#2D0A3E]" />
                    <span>{ach.year}</span>
                  </div>
                </div>

                <div className="text-center space-y-1.5 mt-2">
                  <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                    {ach.studentName}
                  </h3>
                  <div className="text-xs font-semibold text-[#8B0A8C]">
                    {ach.campus}
                  </div>

                  <div className="py-2">
                    <span className="inline-block px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-extrabold text-amber-900 shadow-xs">
                      {ach.scoreOrRank}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium">
                    {ach.examOrEvent}
                  </p>
                </div>
              </div>

              {ach.quote && (
                <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] italic text-slate-600 text-center">
                  "{ach.quote}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
