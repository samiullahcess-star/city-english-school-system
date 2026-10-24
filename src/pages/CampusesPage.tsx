import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Users,
  Calendar,
  ArrowRight,
  Download,
  Compass,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { Campus } from '../types';
import { useToast } from '../components/common/Toast';

interface CampusesPageProps {
  campuses: Campus[];
  selectedCampusId?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const CampusesPage: React.FC<CampusesPageProps> = ({
  campuses,
  selectedCampusId,
  onNavigate
}) => {
  const { showToast } = useToast();
  const [activeId, setActiveId] = useState<string>(
    selectedCampusId || (campuses[0]?.id || '')
  );

  const activeCampus = campuses.find((c) => c.id === activeId) || campuses[0];

  const handleDownloadProspectus = () => {
    showToast(
      'Prospectus Downloaded',
      `Official 2026-2027 Information Brochure & Fee Structure for ${activeCampus.name} has been saved.`,
      'success'
    );
  };

  const tourPhotos = [
    { title: 'STEM & Physics Laboratory', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80', desc: 'Modern apparatus & apparatus stations' },
    { title: 'Digital Computing Lab', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80', desc: 'High-speed fiber & AI curriculum terminals' },
    { title: 'Central Knowledge Library', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80', desc: 'Over 8,000 academic titles & study carrels' },
    { title: 'Sports & Athletics Ground', url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=600&q=80', desc: 'Football turf, cricket nets & basketball' }
  ];

  return (
    <div className="bg-[#F7F3F9] min-h-screen">
      {/* Banner */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
            <span>Metropolitan Footprint</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Our 4 Premier Campuses
          </h1>
          <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base">
            Modern educational facilities engineered for academic focus, scientific discovery, and physical well-being.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Campus Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 bg-white rounded-2xl shadow-sm border border-purple-100">
          {campuses.map((c) => {
            const isCurrent = c.id === activeCampus.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`px-4 sm:px-6 py-3 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#8B0A8C] text-white shadow-md'
                    : 'text-slate-700 hover:bg-purple-50 hover:text-[#8B0A8C]'
                }`}
              >
                <Building2 className={`w-4 h-4 ${isCurrent ? 'text-[#FFC107]' : 'text-slate-400'}`} />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Campus Detail Showcase */}
        {activeCampus && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-purple-100">
            {/* Campus Hero Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-slate-900">
                <img
                  src={activeCampus.imageUrl}
                  alt={activeCampus.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-bold shadow-md">
                    Established {activeCampus.establishedYear}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">
                    {activeCampus.totalStudents} Active Students
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
                    {activeCampus.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200">
                    {activeCampus.tagline}
                  </p>
                </div>
              </div>

              {/* Secretariat Information */}
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-xl text-[#2D0A3E]">
                    Campus Secretariat Details
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100/60">
                      <MapPin className="w-5 h-5 text-[#8B0A8C] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-[#2D0A3E]">Address</div>
                        <div className="text-slate-600">{activeCampus.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100/60">
                      <Phone className="w-5 h-5 text-[#8B0A8C] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-[#2D0A3E]">Phone Hotline</div>
                        <a href={`tel:${activeCampus.phone}`} className="text-slate-600 hover:text-[#8B0A8C]">
                          {activeCampus.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100/60">
                      <Mail className="w-5 h-5 text-[#8B0A8C] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-[#2D0A3E]">Campus Email</div>
                        <a href={`mailto:${activeCampus.email}`} className="text-slate-600 hover:text-[#8B0A8C]">
                          {activeCampus.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Principal Box */}
                  <div className="p-4 rounded-xl bg-[#F7F3F9] border border-purple-200/70 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#FFC107]">
                      <img
                        src={activeCampus.principalPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
                        alt={activeCampus.principalName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#8B0A8C] uppercase">
                        Principal / Head of Campus
                      </div>
                      <div className="font-heading font-bold text-sm text-[#2D0A3E]">
                        {activeCampus.principalName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {activeCampus.principalQualification}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onNavigate('admissions', { preferredCampus: activeCampus.name })}
                    className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#8B0A8C]" />
                    <span>Apply for Admission at {activeCampus.name}</span>
                  </button>

                  <button
                    onClick={handleDownloadProspectus}
                    className="w-full py-2.5 px-6 rounded-xl font-heading font-semibold text-xs text-[#8B0A8C] bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Campus Prospectus & Fee Schedule (PDF)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Virtual Campus Photo Tour Strip */}
            <div className="p-6 sm:p-8 border-t border-purple-100 bg-[#FAF7FC] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#2D0A3E] flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#8B0A8C]" />
                    <span>Virtual Campus Tour & Facilities Showcase</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Glimpse inside our classrooms, science complexes, and athletic spaces at {activeCampus.name}.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-100 text-[#8B0A8C] self-start sm:self-auto">
                  Interactive Campus View
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tourPhotos.map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    className="group bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-xs hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="h-36 overflow-hidden relative">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                        <span className="text-[10px] text-amber-300 font-bold flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Click to Inspect
                        </span>
                      </div>
                    </div>
                    <div className="p-3 space-y-0.5 flex-1 flex flex-col justify-between">
                      <div className="font-heading font-bold text-xs text-[#2D0A3E]">
                        {photo.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {photo.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities & Google Map Row */}
            <div className="p-6 sm:p-8 border-t border-purple-100 space-y-8">
              <div>
                <h4 className="font-heading font-bold text-lg text-[#2D0A3E] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFC107]" />
                  <span>Campus Facilities & Infrastructure</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {activeCampus.facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                    >
                      <CheckCircle className="w-4 h-4 text-[#8B0A8C] shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Map Embed */}
              <div>
                <h4 className="font-heading font-bold text-lg text-[#2D0A3E] mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8B0A8C]" />
                  <span>Google Map Location & Direction</span>
                </h4>
                <div className="w-full h-80 rounded-2xl overflow-hidden border border-purple-200 shadow-inner bg-slate-100">
                  <iframe
                    src={activeCampus.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Google Map for ${activeCampus.name}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Campuses Summary Cards Grid */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-2xl text-[#2D0A3E]">
              Compare All 4 Campuses
            </h3>
            <div className="w-12 h-1 bg-[#FFC107] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campuses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-lg text-[#2D0A3E]">
                      {c.name}
                    </h4>
                    <span className="text-xs font-bold text-[#8B0A8C] bg-purple-50 px-2.5 py-1 rounded-full">
                      Estd. {c.establishedYear}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {c.tagline}
                  </p>
                  <div className="text-xs text-slate-700 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#8B0A8C] shrink-0 mt-0.5" />
                    <span>{c.address}</span>
                  </div>
                  <div className="text-xs text-slate-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8B0A8C] shrink-0" />
                    <span>{c.phone}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-purple-50 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveId(c.id);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#8B0A8C] hover:underline"
                  >
                    View Details Above ↑
                  </button>
                  <button
                    onClick={() => onNavigate('admissions', { preferredCampus: c.name })}
                    className="text-xs font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Apply to this Campus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
