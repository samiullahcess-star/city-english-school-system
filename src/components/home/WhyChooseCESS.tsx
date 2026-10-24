import React from 'react';
import {
  GraduationCap,
  FlaskConical,
  ShieldCheck,
  Trophy,
  BookOpenCheck,
  Target
} from 'lucide-react';

export const WhyChooseCESS: React.FC = () => {
  const features = [
    {
      icon: GraduationCap,
      title: 'Qualified Faculty',
      tag: '200+ Educators',
      description:
        'Experienced subject specialists, Cambridge master trainers, and AMI Montessori directresses committed to personal mentoring and academic rigor.'
    },
    {
      icon: FlaskConical,
      title: 'Modern Labs & STEM',
      tag: 'Hands-on Research',
      description:
        'State-of-the-art physics, chemistry, biology, and robotics computing centers where theoretical concepts are transformed into working experiments.'
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Secure Campuses',
      tag: '24/7 Monitored',
      description:
        'Gated access controls, comprehensive CCTV surveillance, GPS-monitored student transport fleet, and certified female medical attendants.'
    },
    {
      icon: Trophy,
      title: 'Sports & Athletics',
      tag: 'Holistic Fitness',
      description:
        'Sprawling turf grounds, athletics tracks, futsal, basketball, badminton courts, and martial arts coaching for physical vitality and team spirit.'
    },
    {
      icon: BookOpenCheck,
      title: 'Islamic & Moral Values',
      tag: 'Character For Life',
      description:
        'Daily Tajweed and Nazra Quran, Seerat lectures, empathy drives, and civic etiquette woven naturally into daily morning assemblies and curricula.'
    },
    {
      icon: Target,
      title: 'Result-Oriented Teaching',
      tag: '100% Board Pass',
      description:
        'Diagnostic regular quizzes, conceptual revision clinics, extensive mock papers, and personalized remedial support for top board standings.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F7F3F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-[#8B0A8C] text-xs font-bold uppercase tracking-wider">
            <span>The CESS Advantage</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D0A3E] tracking-tight">
            Why Choose City English School System?
          </h2>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 pt-2 leading-relaxed">
            For three and a half decades, our holistic paradigm has stood on six unbreakable pillars, developing scholars who achieve academic crowns and embody timeless moral nobility.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-7 shadow-xs hover:shadow-xl border border-purple-100/70 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-xl bg-purple-50 group-hover:bg-[#8B0A8C] text-[#8B0A8C] group-hover:text-[#FFC107] flex items-center justify-center transition-colors duration-300 shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold text-purple-900 bg-purple-100/70 px-2.5 py-1 rounded-full border border-purple-200">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-xl text-[#2D0A3E] group-hover:text-[#8B0A8C] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Gold Accent Bar on Hover */}
                <div className="mt-6 pt-4 border-t border-purple-50 flex items-center text-xs font-bold text-[#8B0A8C] group-hover:text-[#2D0A3E]">
                  <span>Discover Standards →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
