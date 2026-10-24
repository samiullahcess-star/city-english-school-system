import React from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  GraduationCap,
  Heart,
  Quote,
  Shield,
  Sparkles,
  Trophy,
  Users
} from 'lucide-react';
import { SiteSettings, Campus } from '../types';

interface AboutProps {
  settings: SiteSettings;
  campuses: Campus[];
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ settings, campuses, onNavigate }) => {
  const milestones = [
    {
      year: '1990',
      title: 'Foundation by Sir Muhammad Asif',
      description: 'Established the first flagship CESS campus with 40 students and a vision to deliver world-standard English-medium education infused with unshakeable moral ethics.'
    },
    {
      year: '1998',
      title: 'Expansion to Gulshan-e-Iqbal',
      description: 'Inauguration of the Gulshan Campus to meet surging community demand, introducing dedicated Montessori apparatus and junior science discovery labs.'
    },
    {
      year: '2005',
      title: 'Cantonment Gated Campus & Sports Arena',
      description: 'Opening of the expansive Cantt Campus featuring a full athletic track, futsal arena, and secondary science laboratories.'
    },
    {
      year: '2012',
      title: 'Model Town Lahore Campus Launch',
      description: 'Broadening our footprint to Punjab with the premier Model Town campus, integrating Cambridge International curriculum streams.'
    },
    {
      year: '2018',
      title: 'STEM & Robotics Innovation Hubs',
      description: 'Modernized all campuses with high-speed fiber computing wings, Arduino robotics suites, and interactive digital smartboards.'
    },
    {
      year: '2026',
      title: '35+ Years of Academic Dominance',
      description: 'Celebrating over three decades of 100% board pass rates, national Olympiad gold medals, and an alumni network leading industries globally.'
    }
  ];

  const coreValues = [
    {
      title: 'Academic Excellence',
      desc: 'Pursuing relentless intellectual curiosity, analytical inquiry, and mastery of conceptual sciences.',
      icon: GraduationCap
    },
    {
      title: 'Moral Integrity (Akhlaq)',
      desc: 'Grounding every action in honesty, truthfulness, religious ethics, and civic responsibility.',
      icon: Shield
    },
    {
      title: 'Respect & Empathy',
      desc: 'Fostering compassion, inclusivity, mutual honor among students, teachers, and diverse backgrounds.',
      icon: Heart
    },
    {
      title: 'STEM Innovation',
      desc: 'Encouraging young minds to experiment, code, build robotics, and solve real-world community problems.',
      icon: Sparkles
    },
    {
      title: 'Physical & Mental Vitality',
      desc: 'Instilling sportsmanship, physical endurance, team collaboration, and emotional resilience.',
      icon: Trophy
    },
    {
      title: 'Community Leadership',
      desc: 'Preparing patriotic citizens who dedicate their knowledge to serving humanity and their homeland.',
      icon: Compass
    }
  ];

  return (
    <div className="bg-[#F7F3F9] min-h-screen">
      {/* Page Header Banner */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFC107_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
            <span>Established 1990 • 35+ Years of Legacy</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            About City English School System
          </h1>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-purple-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            "{settings.tagline}"
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Founder & Chairman Feature Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-4/5">
                <img
                  src={settings.founderPhoto}
                  alt={settings.founderName}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#2D0A3E]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-heading font-bold text-xl text-[#FFC107]">
                    {settings.founderName}
                  </h3>
                  <p className="text-xs text-purple-200">
                    {settings.founderTitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider">
                  Leadership Message
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#2D0A3E]">
                  A Message from Sir Muhammad Asif
                </h2>
                <div className="w-16 h-1 bg-[#FFC107] rounded-full" />
              </div>

              <div className="relative pl-6 border-l-4 border-[#FFC107] italic text-slate-700 text-sm sm:text-base leading-relaxed">
                <Quote className="absolute -top-3 -left-3 w-5 h-5 text-[#8B0A8C] fill-[#8B0A8C]/20" />
                <p>"{settings.founderMessage}"</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Under Sir Muhammad Asif’s visionary stewardship, City English School System has blossomed from a humble single building into a 4-campus educational powerhouse. His insistence on personal student mentorship, equitable teacher compensation, transparent administration, and zero compromise on moral decorum remains our guiding compass.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#2D0A3E]">
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#8B0A8C]" />
                  <span>35+ Years Continuous Service</span>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#8B0A8C]" />
                  <span>20,000+ Alumni Across the Globe</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-purple-100/80 space-y-4 hover:shadow-lg transition-all relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 group-hover:bg-[#8B0A8C] text-[#8B0A8C] group-hover:text-[#FFC107] flex items-center justify-center transition-colors shadow-xs">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-[#2D0A3E]">
              Our Vision
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To be Pakistan’s foremost educational institution that harmonizes global academic mastery with enduring spiritual, cultural, and ethical virtues—empowering our students to become compassionate innovators, courageous thinkers, and principled nation-builders.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-purple-100/80 space-y-4 hover:shadow-lg transition-all relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 group-hover:bg-[#FFC107] text-amber-600 group-hover:text-[#2D0A3E] flex items-center justify-center transition-colors shadow-xs">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-[#2D0A3E]">
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To deliver an accessible, rigorous, and child-centered learning environment led by distinguished educators, enriched by modern STEM labs and athletic arenas, and rooted in Islamic character formation so that every child discovers their highest potential.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider">
              Guiding Principles
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#2D0A3E]">
              The Core Values of CESS
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-md border border-purple-100 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#8B0A8C] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#8B0A8C]" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#2D0A3E]">
                      {v.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 35+ Years Historical Timeline */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100/80 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider">
              Our Journey Since 1990
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#2D0A3E]">
              Timeline of Milestones
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-slate-500">
              Three and a half decades of relentless progress, infrastructure expansion, and student triumphs.
            </p>
          </div>

          <div className="relative border-l-2 border-purple-200 ml-4 sm:ml-8 space-y-10">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-10 group">
                {/* Year Marker Circle */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#8B0A8C] text-[#FFC107] font-bold text-[11px] flex items-center justify-center shadow-md border-2 border-white group-hover:scale-125 transition-transform">
                  <Clock className="w-4 h-4" />
                </div>

                <div className="bg-[#F7F3F9] p-5 sm:p-6 rounded-2xl border border-purple-100 group-hover:bg-purple-50/70 transition-colors">
                  <span className="inline-block px-3 py-1 rounded-md bg-[#FFC107] text-[#2D0A3E] font-heading font-extrabold text-xs mb-2">
                    {m.year}
                  </span>
                  <h4 className="font-heading font-bold text-lg text-[#2D0A3E] mb-1">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team Preview */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider">
              Executive Guidance
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#2D0A3E]">
              Academic Leadership & Campus Principals
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campuses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-5 shadow-xs border border-purple-100 text-center space-y-3"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto p-1 bg-linear-to-tr from-[#8B0A8C] to-[#FFC107]">
                  <img
                    src={c.principalPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
                    alt={c.principalName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#2D0A3E]">
                    {c.principalName}
                  </h4>
                  <p className="text-xs text-[#8B0A8C] font-semibold">
                    Principal, {c.name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {c.principalQualification}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
