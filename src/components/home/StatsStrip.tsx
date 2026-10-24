import React from 'react';
import { Award, Building2, GraduationCap, Users, Trophy } from 'lucide-react';
import { SiteSettings } from '../../types';

interface StatsStripProps {
  settings: SiteSettings;
}

export const StatsStrip: React.FC<StatsStripProps> = ({ settings }) => {
  const stats = [
    {
      label: 'Years of Excellence',
      value: settings.yearsOfExcellence || '35+',
      subtext: 'Established 1990',
      icon: Award
    },
    {
      label: 'Dynamic Campuses',
      value: settings.totalCampuses || '4',
      subtext: 'Central, Gulshan, Model Town, Cantt',
      icon: Building2
    },
    {
      label: 'Qualified Educators',
      value: settings.totalTeachers || '200+',
      subtext: 'Master & PhD Mentors',
      icon: GraduationCap
    },
    {
      label: 'Enrolled Scholars',
      value: settings.totalStudents || '2000+',
      subtext: 'Pre-School to Matric & O-Levels',
      icon: Users
    },
    {
      label: 'Board Pass Ratio',
      value: settings.matricPassRate || '100%',
      subtext: 'Consecutive Top Positions',
      icon: Trophy
    }
  ];

  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl border border-purple-100/80 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            const isFifthOnMobile = idx === 4;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-3 rounded-xl bg-purple-50/40 sm:bg-transparent ${
                  isFifthOnMobile ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-50 text-[#8B0A8C] flex items-center justify-center mb-2 sm:mb-3 shadow-inner">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B0A8C]" />
                </div>
                <div className="font-heading font-extrabold text-xl sm:text-3xl lg:text-4xl text-[#2D0A3E] tracking-tight">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8B0A8C] to-[#2D0A3E]">
                    {stat.value}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
