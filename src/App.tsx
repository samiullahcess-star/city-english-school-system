import React, { useState, useEffect } from 'react';
import { TopBar } from './components/common/TopBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingActions } from './components/common/FloatingActions';
import { ToastProvider } from './components/common/Toast';
import { StudentParentPortalModal } from './components/common/StudentParentPortalModal';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { CampusesPage } from './pages/CampusesPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { FacultyPage } from './pages/FacultyPage';
import { NewsEventsPage } from './pages/NewsEventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ResultsPage } from './pages/ResultsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';

import { dataService } from './services/dataService';
import {
  SiteSettings,
  HeroSlide,
  Campus,
  FacultyMember,
  NewsEvent,
  GalleryItem,
  Testimonial,
  Achievement,
  FAQ,
  AcademicProgram,
  AdmissionInquiry,
  ContactMessage
} from './types';

export default function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [navParams, setNavParams] = useState<Record<string, string>>({});
  const [portalModalOpen, setPortalModalOpen] = useState(false);

  // Dynamic state synced with dataService
  const [settings, setSettings] = useState<SiteSettings>(dataService.getSettings());
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(dataService.getHeroSlides());
  const [campuses, setCampuses] = useState<Campus[]>(dataService.getCampuses());
  const [faculty, setFaculty] = useState<FacultyMember[]>(dataService.getFaculty());
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>(dataService.getNewsEvents());
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(dataService.getGallery());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(dataService.getTestimonials());
  const [achievements, setAchievements] = useState<Achievement[]>(dataService.getAchievements());
  const [faqs, setFaqs] = useState<FAQ[]>(dataService.getFAQs());
  const [programs, setPrograms] = useState<AcademicProgram[]>(dataService.getPrograms());

  const refreshPublicData = () => {
    setSettings(dataService.getSettings());
    setHeroSlides(dataService.getHeroSlides());
    setCampuses(dataService.getCampuses());
    setFaculty(dataService.getFaculty());
    setNewsEvents(dataService.getNewsEvents());
    setGalleryItems(dataService.getGallery());
    setTestimonials(dataService.getTestimonials());
    setAchievements(dataService.getAchievements());
    setFaqs(dataService.getFAQs());
    setPrograms(dataService.getPrograms());
  };

  useEffect(() => {
    // Listen to real-time changes made in the Admin Portal
    const handleUpdate = () => {
      refreshPublicData();
    };
    window.addEventListener('cess-data-updated', handleUpdate);

    // Initial check for hash or URL pathname
    const handleLocationChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const path = window.location.pathname.replace(/^\//, '');
      const target = hash || path;

      if (target === 'admin') {
        setCurrentPage('admin');
      } else if (target && [
        'about', 'campuses', 'academics', 'admissions', 'faculty',
        'news', 'gallery', 'results', 'contact', 'privacy', 'terms'
      ].includes(target)) {
        setCurrentPage(target);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('cess-data-updated', handleUpdate);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (page: string, params: Record<string, string> = {}) => {
    setCurrentPage(page);
    setNavParams(params);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ToastProvider>
      {currentPage === 'admin' ? (
        <AdminPage onViewPublicSite={() => navigateTo('home')} />
      ) : (
        <div className="min-h-screen flex flex-col bg-[#F7F3F9] text-slate-800 font-sans selection:bg-[#FFC107] selection:text-[#2D0A3E]">
          {/* 1. Top Bar */}
          <TopBar
            settings={settings}
            onNavigate={navigateTo}
            onOpenPortal={() => setPortalModalOpen(true)}
          />

          {/* 2. Sticky Navbar */}
          <Navbar
            currentPage={currentPage}
            onNavigate={navigateTo}
            campuses={campuses}
            onOpenPortal={() => setPortalModalOpen(true)}
          />

          {/* 3. Main Content Router */}
          <main className="flex-1">
            {currentPage === 'home' && (
              <Home
                settings={settings}
                heroSlides={heroSlides}
                campuses={campuses}
                programs={programs}
                newsEvents={newsEvents}
                achievements={achievements}
                galleryItems={galleryItems}
                testimonials={testimonials}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'about' && (
              <About settings={settings} campuses={campuses} onNavigate={navigateTo} />
            )}

            {currentPage === 'campuses' && (
              <CampusesPage
                campuses={campuses}
                selectedCampusId={navParams.campusId}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'academics' && (
              <AcademicsPage programs={programs} onNavigate={navigateTo} />
            )}

            {currentPage === 'admissions' && (
              <AdmissionsPage
                campuses={campuses}
                faqs={faqs}
                initialCampus={navParams.preferredCampus}
                initialClass={navParams.classApplyingFor}
              />
            )}

            {currentPage === 'faculty' && (
              <FacultyPage faculty={faculty} campuses={campuses} />
            )}

            {currentPage === 'news' && (
              <NewsEventsPage
                events={newsEvents}
                selectedEventId={navParams.eventId}
              />
            )}

            {currentPage === 'gallery' && (
              <GalleryPage items={galleryItems} />
            )}

            {currentPage === 'results' && (
              <ResultsPage achievements={achievements} onNavigate={navigateTo} />
            )}

            {currentPage === 'contact' && (
              <ContactPage settings={settings} campuses={campuses} />
            )}

            {currentPage === 'privacy' && (
              <PrivacyPolicy onNavigate={navigateTo} />
            )}

            {currentPage === 'terms' && (
              <TermsPage onNavigate={navigateTo} />
            )}

            {![
              'home',
              'about',
              'campuses',
              'academics',
              'admissions',
              'faculty',
              'news',
              'gallery',
              'results',
              'contact',
              'privacy',
              'terms',
              'admin'
            ].includes(currentPage) && (
              <NotFoundPage onNavigate={navigateTo} />
            )}
          </main>

          {/* 4. Rich Footer */}
          <Footer
            settings={settings}
            campuses={campuses}
            onNavigate={navigateTo}
          />

          {/* 5. Floating WhatsApp Button & Back to Top */}
          <FloatingActions settings={settings} />
        </div>
      )}

      {/* 6. Digital Student & Guardian Portal Modal */}
      <StudentParentPortalModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
      />
    </ToastProvider>
  );
}
