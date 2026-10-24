import React from 'react';
import { Sparkles, ArrowRight, Phone, CheckCircle, Shield } from 'lucide-react';
import { SiteSettings } from '../../types';

interface AdmissionCTABannerProps {
  settings: SiteSettings;
  onNavigate: (page: string) => void;
}

export const AdmissionCTABanner: React.FC<AdmissionCTABannerProps> = ({ settings, onNavigate }) => {
  return (
    <section className="py-16 sm:py-20 bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white relative overflow-hidden">
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFC107_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#FFC107]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
                <Sparkles className="w-4 h-4" />
                <span>Admissions Open for Session 2026-27</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Secure Your Child's Future with <span className="text-[#FFC107]">35+ Years of Proven Excellence</span>.
              </h2>

              <p className="text-purple-100 text-sm sm:text-base leading-relaxed max-w-2xl">
                Limited seats available across our 4 metropolitan campuses for Pre-School Montessori, Primary (1-5), Middle (6-8), and Secondary Matric & Cambridge O-Levels. Up to 100% merit scholarships available.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-purple-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#FFC107]" />
                  <span>Interactive Entrance Assessment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#FFC107]" />
                  <span>Sibling Concessions Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#FFC107]" />
                  <span>GPS Tracked Air-Conditioned Transport</span>
                </div>
              </div>
            </div>

            {/* Right Buttons (4 cols) */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate('admissions')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-heading font-extrabold text-base text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-xl hover:scale-102 active:scale-98 transition-all cursor-pointer group"
              >
                <span>Submit Online Admission Form</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${settings.phone}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FFC107]" />
                <span>Call Admissions: {settings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
