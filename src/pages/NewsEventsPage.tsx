import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Trophy,
  Tag,
  ArrowRight,
  X,
  Share2,
  Building2
} from 'lucide-react';
import { NewsEvent } from '../types';

interface NewsEventsPageProps {
  events: NewsEvent[];
  selectedEventId?: string;
}

export const NewsEventsPage: React.FC<NewsEventsPageProps> = ({
  events,
  selectedEventId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalEvent, setActiveModalEvent] = useState<NewsEvent | null>(
    events.find((e) => e.id === selectedEventId) || null
  );

  const categories = ['All', 'Celebration', 'Academic', 'Sports', 'Workshop', 'Event'];

  const filteredEvents = events.filter((e) => {
    return selectedCategory === 'All' || e.category === selectedCategory;
  });

  return (
    <div className="bg-[#F7F3F9] min-h-screen">
      {/* Page Header */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
            <span>Official Gazette & Circulars</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            News, Events & Ceremonies
          </h1>
          <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base">
            Celebrating academic galas, dignitary convocations, sports tournaments, and student life.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8B0A8C] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-purple-50 hover:text-[#8B0A8C] border border-purple-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalEvent(item)}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-purple-100 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-[#8B0A8C] px-2.5 py-1 rounded-full shadow-xs">
                    {item.category}
                  </span>

                  <span className="absolute top-3 right-3 text-[10px] font-semibold text-[#2D0A3E] bg-[#FFC107] px-2 py-0.5 rounded-md">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>

                  {item.featured && (
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[10px] font-extrabold text-[#FFC107] bg-black/60 px-2 py-0.5 rounded-sm">
                      <Sparkles className="w-3 h-3 text-[#FFC107]" />
                      <span>Flagship Event</span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-[#2D0A3E] group-hover:text-[#8B0A8C] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>

                  {/* Dignitaries Mini Banner if available */}
                  {(item.chiefGuest || item.honourableGuest) && (
                    <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] space-y-1">
                      {item.chiefGuest && (
                        <div className="truncate text-purple-900 font-semibold">
                          <span className="text-[#8B0A8C] font-bold">Chief Guest:</span> {item.chiefGuest}
                        </div>
                      )}
                      {item.honourableGuest && (
                        <div className="truncate text-purple-900 font-semibold">
                          <span className="text-[#FFC107] font-bold">Hon. Guest:</span> {item.honourableGuest}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 border-t border-purple-50 bg-[#F7F3F9] flex items-center justify-between text-xs font-bold text-[#8B0A8C]">
                <span>Read Full Event Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC107] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {activeModalEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-64 sm:h-72 bg-slate-900">
              <img
                src={activeModalEvent.imageUrl}
                alt={activeModalEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-3 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-bold shadow-xs">
                  {activeModalEvent.category}
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mt-2 leading-tight">
                  {activeModalEvent.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Meta bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pb-4 border-b border-purple-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#8B0A8C]" />
                  <span>
                    {new Date(activeModalEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                {activeModalEvent.time && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#8B0A8C]" />
                    <span>{activeModalEvent.time}</span>
                  </div>
                )}
                {activeModalEvent.venue && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#8B0A8C]" />
                    <span>{activeModalEvent.venue}</span>
                  </div>
                )}
              </div>

              {/* Distinguished Guests Feature Box */}
              {(activeModalEvent.chiefGuest || activeModalEvent.honourableGuest) && (
                <div className="p-5 rounded-2xl bg-linear-to-br from-[#2D0A3E] to-[#4A0D5B] text-white space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FFC107] uppercase tracking-wider">
                    <Trophy className="w-4 h-4 text-[#FFC107]" />
                    <span>Distinguished Guests in Attendance</span>
                  </div>
                  {activeModalEvent.chiefGuest && (
                    <div className="flex items-start gap-2.5 text-xs text-white">
                      <span className="px-2 py-0.5 rounded-sm bg-[#FFC107] text-[#2D0A3E] font-bold text-[10px]">
                        CHIEF GUEST
                      </span>
                      <span className="font-medium text-slate-100">{activeModalEvent.chiefGuest}</span>
                    </div>
                  )}
                  {activeModalEvent.honourableGuest && (
                    <div className="flex items-start gap-2.5 text-xs text-white">
                      <span className="px-2 py-0.5 rounded-sm bg-purple-400 text-[#2D0A3E] font-bold text-[10px]">
                        HONOURABLE GUEST
                      </span>
                      <span className="font-medium text-slate-200">{activeModalEvent.honourableGuest}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Event Content Description */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {activeModalEvent.content || activeModalEvent.excerpt}
              </div>

              {/* Tags */}
              {activeModalEvent.tags && activeModalEvent.tags.length > 0 && (
                <div className="pt-4 border-t border-purple-100 flex flex-wrap gap-2">
                  {activeModalEvent.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-purple-50 text-[#8B0A8C] text-[11px] font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
