import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { StatsStrip } from '../components/home/StatsStrip';
import { FounderWelcome } from '../components/home/FounderWelcome';
import { WhyChooseCESS } from '../components/home/WhyChooseCESS';
import { CampusesPreview } from '../components/home/CampusesPreview';
import { AcademicsPreview } from '../components/home/AcademicsPreview';
import { NewsEventsPreview } from '../components/home/NewsEventsPreview';
import { ToppersSection } from '../components/home/ToppersSection';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { TestimonialsSlider } from '../components/home/TestimonialsSlider';
import { AdmissionCTABanner } from '../components/home/AdmissionCTABanner';
import {
  SiteSettings,
  HeroSlide,
  Campus,
  AcademicProgram,
  NewsEvent,
  Achievement,
  GalleryItem,
  Testimonial
} from '../types';

interface HomeProps {
  settings: SiteSettings;
  heroSlides: HeroSlide[];
  campuses: Campus[];
  programs: AcademicProgram[];
  newsEvents: NewsEvent[];
  achievements: Achievement[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Home: React.FC<HomeProps> = ({
  settings,
  heroSlides,
  campuses,
  programs,
  newsEvents,
  achievements,
  galleryItems,
  testimonials,
  onNavigate
}) => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Slider */}
      <HeroSlider slides={heroSlides} onNavigate={onNavigate} />

      {/* 2. Stats Strip */}
      <StatsStrip settings={settings} />

      {/* 3. Founder & Chairman Sir Muhammad Asif Welcome */}
      <FounderWelcome settings={settings} onNavigate={onNavigate} />

      {/* 4. Why Choose CESS - 6 Pillars */}
      <WhyChooseCESS />

      {/* 5. Our 4 Campuses Preview */}
      <CampusesPreview campuses={campuses} onNavigate={onNavigate} />

      {/* 6. Academic Pathways Preview */}
      <AcademicsPreview programs={programs} onNavigate={onNavigate} />

      {/* 7. Latest News & Events Preview (with Chief Guest & Honourable Guest) */}
      <NewsEventsPreview events={newsEvents} onNavigate={onNavigate} />

      {/* 8. Toppers & Achievements */}
      <ToppersSection achievements={achievements} onNavigate={onNavigate} />

      {/* 9. Photo Gallery Preview with Lightbox */}
      <GalleryPreview items={galleryItems} onNavigate={onNavigate} />

      {/* 10. Parent / Student Testimonials */}
      <TestimonialsSlider testimonials={testimonials} />

      {/* 11. Final Admissions CTA Banner */}
      <AdmissionCTABanner settings={settings} onNavigate={onNavigate} />
    </div>
  );
};
