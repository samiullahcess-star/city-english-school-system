import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { HeroSlide } from '../../types';

interface HeroSliderProps {
  slides: HeroSlide[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides, onNavigate }) => {
  const activeSlides = slides.filter((s) => s.active);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  if (!activeSlides.length) return null;

  const currentSlide = activeSlides[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
  };

  const handleButtonClick = (link: string) => {
    const cleanLink = link.replace(/^\//, '');
    onNavigate(cleanLink || 'home');
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] bg-slate-900 overflow-hidden select-none">
      {/* Background Slides */}
      {activeSlides.map((slide, idx) => {
        const isCurrent = idx === currentIdx;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Zoom animation */}
            <img
              src={slide.imageUrl}
              alt={slide.headline}
              className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
                isCurrent ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Gradient Overlays: Deep purple to dark indigo */}
            <div className="absolute inset-0 bg-linear-to-r from-[#2D0A3E]/95 via-[#2D0A3E]/80 to-transparent lg:to-black/30" />
            <div className="absolute inset-0 bg-linear-to-t from-[#2D0A3E] via-transparent to-black/30" />
          </div>
        );
      })}

      {/* Slide Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white space-y-6">
          {currentSlide.badgeText && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC107]/20 border border-[#FFC107]/40 text-[#FFC107] text-xs sm:text-sm font-semibold backdrop-blur-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Sparkles className="w-4 h-4 text-[#FFC107]" />
              <span>{currentSlide.badgeText}</span>
            </div>
          )}

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-6xl tracking-tight leading-[1.2] sm:leading-[1.15] text-white">
            {currentSlide.headline}
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-purple-100/90 leading-relaxed font-normal max-w-xl">
            {currentSlide.subtext}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => handleButtonClick(currentSlide.primaryButtonLink)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm md:text-base text-[#2D0A3E] bg-linear-to-r from-[#FFC107] via-[#FFD54F] to-[#FFC107] shadow-xl hover:shadow-[#FFC107]/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer group"
            >
              <span>{currentSlide.primaryButtonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleButtonClick(currentSlide.secondaryButtonLink)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-heading font-semibold text-xs sm:text-sm md:text-base text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md active:scale-95 transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#FFC107]" />
              <span>{currentSlide.secondaryButtonText}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-[#8B0A8C] text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 focus:outline-hidden items-center justify-center cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-[#8B0A8C] text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 focus:outline-hidden items-center justify-center cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIdx ? 'w-8 bg-[#FFC107]' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
