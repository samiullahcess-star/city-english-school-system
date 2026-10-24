import React from 'react';
import { Calendar, MapPin, UserCheck, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { NewsEvent } from '../../types';

interface NewsEventsPreviewProps {
  events: NewsEvent[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const NewsEventsPreview: React.FC<NewsEventsPreviewProps> = ({ events, onNavigate }) => {
  const featuredEvent = events.find((e) => e.featured) || events[0];
  const regularEvents = events.filter((e) => e.id !== featuredEvent?.id).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#8B0A8C] text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>Campus Happenings</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D0A3E] tracking-tight">
              Latest News & Grand Events
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] rounded-full" />
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Stay connected with academic milestones, dignitary ceremonies, scientific olympiads, and extracurricular celebrations across all CESS branches.
            </p>
          </div>

          <button
            onClick={() => onNavigate('news')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#8B0A8C] hover:text-[#2D0A3E] transition-colors group cursor-pointer"
          >
            <span>View All News & Event Calendar</span>
            <ArrowRight className="w-4 h-4 text-[#FFC107] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Featured Event with Dignitaries Poster Banner (7 cols) */}
          {featuredEvent && (
            <div
              onClick={() => onNavigate('news', { eventId: featuredEvent.id })}
              className="lg:col-span-7 bg-linear-to-br from-[#2D0A3E] via-[#4A0D5B] to-[#8B0A8C] rounded-2xl overflow-hidden shadow-xl border border-purple-800 text-white flex flex-col justify-between cursor-pointer group relative"
            >
              {/* Background event banner image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={featuredEvent.imageUrl}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#2D0A3E] via-[#2D0A3E]/40 to-transparent" />
                
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Flagship Event</span>
                </span>

                <span className="absolute top-4 right-4 text-xs font-semibold bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/20">
                  {new Date(featuredEvent.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Event Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white group-hover:text-[#FFC107] transition-colors leading-tight">
                  {featuredEvent.title}
                </h3>

                <p className="text-sm text-purple-100/90 leading-relaxed">
                  {featuredEvent.excerpt}
                </p>

                {/* Dignitaries Poster Box (Honourable & Chief Guests) */}
                {(featuredEvent.chiefGuest || featuredEvent.honourableGuest) && (
                  <div className="p-4 rounded-xl bg-purple-950/60 border border-[#FFC107]/30 backdrop-blur-md space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFC107] uppercase tracking-wider">
                      <Trophy className="w-4 h-4 text-[#FFC107]" />
                      <span>Distinguished Guests of Honour</span>
                    </div>
                    {featuredEvent.chiefGuest && (
                      <div className="flex items-start gap-2 text-xs text-white">
                        <span className="px-2 py-0.5 rounded-sm bg-[#FFC107] text-[#2D0A3E] font-bold text-[10px] shrink-0 mt-0.5">
                          CHIEF GUEST
                        </span>
                        <span className="font-medium text-slate-100">{featuredEvent.chiefGuest}</span>
                      </div>
                    )}
                    {featuredEvent.honourableGuest && (
                      <div className="flex items-start gap-2 text-xs text-white">
                        <span className="px-2 py-0.5 rounded-sm bg-purple-400 text-[#2D0A3E] font-bold text-[10px] shrink-0 mt-0.5">
                          HONOURABLE GUEST
                        </span>
                        <span className="font-medium text-slate-200">{featuredEvent.honourableGuest}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-purple-200/80">
                  {featuredEvent.venue && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FFC107]" />
                      <span>{featuredEvent.venue}</span>
                    </div>
                  )}
                  <span className="text-[#FFC107] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Full Event Circular →
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Other Recent Events (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {regularEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => onNavigate('news', { eventId: event.id })}
                className="group p-4 bg-white rounded-xl border border-purple-100 hover:border-[#8B0A8C] shadow-xs hover:shadow-md transition-all duration-200 flex gap-4 cursor-pointer"
              >
                {/* Event Thumbnail */}
                <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-slate-100 relative">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-1 left-1 bg-[#8B0A8C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                    {event.category}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1 py-0.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Calendar className="w-3 h-3 text-[#FFC107]" />
                      <span>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#2D0A3E] group-hover:text-[#8B0A8C] line-clamp-2 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {event.excerpt}
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-[#8B0A8C] flex items-center gap-1 pt-1">
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#FFC107]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
