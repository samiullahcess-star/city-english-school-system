import React, { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({ testimonials }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!testimonials.length) return null;

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIdx];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-[#8B0A8C] text-xs font-bold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#FFC107]" />
            <span>Community Voices</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D0A3E] tracking-tight">
            What Parents & Alumni Say
          </h2>
          <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-slate-600">
            Generations of families have trusted City English School System to mold the intellectual and moral character of their children.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#F7F3F9] rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100/80">
            {/* Giant Background Quote Icon */}
            <Quote className="absolute top-6 right-8 w-20 h-20 text-[#8B0A8C]/10 fill-[#8B0A8C]/10 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-linear-to-tr from-[#8B0A8C] to-[#FFC107] shadow-md">
                  <img
                    src={current.avatarUrl}
                    alt={current.authorName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white text-emerald-600 rounded-full p-1 shadow-md">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Text & Attribution */}
              <div className="space-y-4 flex-1">
                {/* Stars */}
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                  ))}
                </div>

                <p className="text-base sm:text-lg text-slate-700 italic leading-relaxed">
                  "{current.quote}"
                </p>

                <div className="pt-2">
                  <h4 className="font-heading font-bold text-lg text-[#2D0A3E]">
                    {current.authorName}
                  </h4>
                  <div className="text-xs font-semibold text-[#8B0A8C]">
                    {current.relationship}
                  </div>
                  <div className="text-xs text-slate-500">
                    {current.campus}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 pt-6 border-t border-purple-200/60 flex items-center justify-between">
              <div className="text-xs font-medium text-slate-500">
                Review {currentIdx + 1} of {testimonials.length}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white hover:bg-[#8B0A8C] hover:text-white text-slate-700 shadow-sm border border-purple-100 transition-colors focus:outline-hidden"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white hover:bg-[#8B0A8C] hover:text-white text-slate-700 shadow-sm border border-purple-100 transition-colors focus:outline-hidden"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
