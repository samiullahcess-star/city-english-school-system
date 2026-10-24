import React from 'react';
import { Quote, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { SiteSettings } from '../../types';

interface FounderWelcomeProps {
  settings: SiteSettings;
  onNavigate: (page: string) => void;
}

export const FounderWelcome: React.FC<FounderWelcomeProps> = ({ settings, onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Founder Photo & Credential Cards (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background framing */}
              <div className="absolute -inset-4 bg-linear-to-tr from-[#8B0A8C]/20 via-[#FFC107]/20 to-purple-100 rounded-3xl transform -rotate-2" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/5">
                <img
                  src={settings.founderPhoto}
                  alt={settings.founderName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Chairman Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#8B0A8C] to-[#2D0A3E] text-[#FFC107] flex items-center justify-center shrink-0 shadow-md">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#2D0A3E]">
                        {settings.founderName}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500">
                        {settings.founderTitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Experience Pill */}
              <div className="absolute -top-4 -right-4 bg-[#FFC107] text-[#2D0A3E] font-heading font-extrabold px-4 py-2 rounded-xl shadow-lg border-2 border-white text-xs sm:text-sm flex items-center gap-1.5">
                <span>35+ Years Of Vision</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Message & Key Principles (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#8B0A8C] text-xs font-bold uppercase tracking-wider">
                <span>Message from the Founder</span>
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#2D0A3E] tracking-tight leading-tight">
                "Excellence is not an accident; it is the deliberate habit of moral conviction and ceaseless endeavor."
              </h2>
              <div className="w-16 h-1 bg-[#FFC107] rounded-full" />
            </div>

            <div className="relative pl-6 border-l-4 border-[#8B0A8C]/40 italic text-slate-700 text-base sm:text-lg leading-relaxed">
              <Quote className="absolute -top-3 -left-3 w-6 h-6 text-[#FFC107] fill-[#FFC107]/30" />
              <p>"{settings.founderMessage}"</p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              When we established City English School System in 1990, our pledge was to build an institution where quality education is made accessible, moral values are held paramount, and every student is equipped to compete in modern science and global academics. Today, with four premier campuses and over 2,000 thriving students, that pledge shines brighter than ever.
            </p>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Balanced Cambridge & Matric Syllabi',
                'Uncompromising Moral & Islamic Ethics',
                'Affordable & Merit-Driven Tuition',
                'State-of-the-Art STEM Research Facilities'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#8B0A8C] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-sm text-white bg-[#8B0A8C] hover:bg-[#670668] shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Read Full School History</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FFC107]" />
              </button>

              <button
                onClick={() => onNavigate('admissions')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-semibold text-sm text-[#2D0A3E] bg-[#FFC107]/20 hover:bg-[#FFC107]/30 border border-[#FFC107] transition-all cursor-pointer"
              >
                <span>Schedule Parent Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
