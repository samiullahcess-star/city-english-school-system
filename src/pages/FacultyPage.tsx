import React, { useState } from 'react';
import { Search, GraduationCap, Building2, Mail, Award, BookOpen } from 'lucide-react';
import { FacultyMember, Campus } from '../types';

interface FacultyPageProps {
  faculty: FacultyMember[];
  campuses: Campus[];
}

export const FacultyPage: React.FC<FacultyPageProps> = ({ faculty, campuses }) => {
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaculty = faculty.filter((f) => {
    const matchesCampus = selectedCampus === 'all' || f.campusId === selectedCampus;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCampus && matchesSearch;
  });

  return (
    <div className="bg-[#F7F3F9] min-h-screen">
      {/* Page Header */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
            <span>Distinguished Educators</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Our Esteemed Faculty
          </h1>
          <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base">
            Over 200 certified academicians, Cambridge master trainers, and mentors dedicated to cultivating intellectual brilliance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Search & Campus Filter Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by teacher name, subject, or role..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-[#F7F3F9]"
            />
          </div>

          {/* Campus Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCampus('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCampus === 'all'
                  ? 'bg-[#8B0A8C] text-white shadow-sm'
                  : 'bg-purple-50 text-slate-700 hover:bg-purple-100'
              }`}
            >
              All Campuses ({faculty.length})
            </button>
            {campuses.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCampus(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCampus === c.id
                    ? 'bg-[#8B0A8C] text-white shadow-sm'
                    : 'bg-purple-50 text-slate-700 hover:bg-purple-100'
                }`}
              >
                {c.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        {filteredFaculty.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-purple-100 space-y-3">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-heading font-bold text-lg text-slate-700">No faculty members found</h4>
            <p className="text-xs text-slate-500">Try adjusting your search query or campus filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-5 shadow-xs hover:shadow-xl border border-purple-100 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Photo with frame */}
                  <div className="relative mx-auto w-32 h-32 rounded-2xl overflow-hidden p-1 bg-linear-to-tr from-[#8B0A8C] via-[#FFC107] to-purple-300 shadow-md">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <span className="absolute bottom-1 right-1 bg-[#2D0A3E] text-[#FFC107] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                      {member.experienceYears}y exp
                    </span>
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-1">
                    <h3 className="font-heading font-bold text-base text-[#2D0A3E] group-hover:text-[#8B0A8C] transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#8B0A8C]">
                      {member.designation}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {member.qualification}
                    </div>
                  </div>

                  {/* Department & Campus Badges */}
                  <div className="pt-2 border-t border-purple-50 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <BookOpen className="w-3.5 h-3.5 text-[#FFC107]" />
                      <span className="truncate">{member.department}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Building2 className="w-3.5 h-3.5 text-[#8B0A8C]" />
                      <span className="truncate">{member.campusName}</span>
                    </div>
                  </div>

                  {member.bio && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 italic pt-1 border-t border-purple-50">
                      "{member.bio}"
                    </p>
                  )}
                </div>

                {member.email && (
                  <div className="mt-4 pt-3 border-t border-purple-50">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[11px] font-semibold text-[#8B0A8C] hover:text-[#2D0A3E] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{member.email}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
