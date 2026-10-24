import React from 'react';
import { Building2, MapPin, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { Campus } from '../../types';

interface CampusesPreviewProps {
  campuses: Campus[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const CampusesPreview: React.FC<CampusesPreviewProps> = ({ campuses, onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#8B0A8C] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>Network of Excellence</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D0A3E] tracking-tight">
              Our 4 Premier Campuses
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] rounded-full" />
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Strategically located across prime metropolitan hubs, each campus offers state-of-the-art facilities, specialized faculty, and welcoming learning environments.
            </p>
          </div>

          <button
            onClick={() => onNavigate('campuses')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#8B0A8C] hover:text-[#2D0A3E] transition-colors group self-start md:self-auto cursor-pointer"
          >
            <span>Explore All Campuses & Maps</span>
            <ArrowRight className="w-4 h-4 text-[#FFC107] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Campuses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {campuses.map((campus) => (
            <div
              key={campus.id}
              onClick={() => onNavigate('campuses', { campusId: campus.id })}
              className="group bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={campus.imageUrl}
                    alt={campus.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-[11px] font-bold text-[#2D0A3E] bg-[#FFC107] px-2.5 py-1 rounded-full shadow-sm">
                    Estd. {campus.establishedYear}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-medium text-amber-300 uppercase tracking-wider block">
                      {campus.totalStudents} Students
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white leading-snug drop-shadow-sm">
                      {campus.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <MapPin className="w-4 h-4 text-[#8B0A8C] shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{campus.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Phone className="w-4 h-4 text-[#8B0A8C] shrink-0" />
                    <span>{campus.phone}</span>
                  </div>

                  {/* Principal */}
                  <div className="pt-2 border-t border-purple-50">
                    <div className="text-[11px] text-slate-400 font-medium">Head of Campus:</div>
                    <div className="text-xs font-bold text-[#2D0A3E] truncate">
                      {campus.principalName}
                    </div>
                  </div>

                  {/* Facilities Snippet */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {campus.facilities.slice(0, 2).map((fac, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-purple-900 bg-purple-50 px-2 py-0.5 rounded-sm"
                      >
                        {fac}
                      </span>
                    ))}
                    {campus.facilities.length > 2 && (
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                        +{campus.facilities.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-[#F7F3F9] border-t border-purple-50 flex items-center justify-between text-xs font-bold text-[#8B0A8C] group-hover:bg-purple-100/50 transition-colors">
                <span>View Campus Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC107] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
