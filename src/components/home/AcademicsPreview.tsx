import React from 'react';
import { BookOpen, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { AcademicProgram } from '../../types';

interface AcademicsPreviewProps {
  programs: AcademicProgram[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const AcademicsPreview: React.FC<AcademicsPreviewProps> = ({ programs, onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F3F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-[#8B0A8C] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#FFC107]" />
            <span>Progressive Curriculum</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D0A3E] tracking-tight">
            Academic Pathways at CESS
          </h2>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
            From the joyful discovery of early Montessori years to the intellectual rigor of Matric and Cambridge O-Levels, we guide every stage of your child’s educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl overflow-hidden border border-purple-100/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={prog.imageUrl}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-[#8B0A8C] px-2.5 py-1 rounded-full shadow-xs">
                    {prog.ageGroup}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-semibold text-[#FFC107] block">
                      {prog.gradeRange}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white leading-snug">
                      {prog.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-[#2D0A3E] uppercase tracking-wide">
                      Key Highlights:
                    </div>
                    {prog.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-[#FFC107] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onNavigate('academics')}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#8B0A8C] bg-purple-50 hover:bg-[#8B0A8C] hover:text-white transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Curriculum & Subjects</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('admissions')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-sm text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#8B0A8C]" />
            <span>Apply for the 2026-27 Academic Session</span>
          </button>
        </div>
      </div>
    </section>
  );
};
