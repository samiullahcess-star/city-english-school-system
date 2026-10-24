import React, { useState, useEffect } from 'react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminInquiries } from '../components/admin/AdminInquiries';
import { AdminMessages } from '../components/admin/AdminMessages';
import { AdminHeroSlides } from '../components/admin/AdminHeroSlides';
import { AdminCampuses } from '../components/admin/AdminCampuses';
import { AdminFaculty } from '../components/admin/AdminFaculty';
import { AdminNews } from '../components/admin/AdminNews';
import { AdminGallery } from '../components/admin/AdminGallery';
import { AdminTestimonials } from '../components/admin/AdminTestimonials';
import { AdminAchievements } from '../components/admin/AdminAchievements';
import { AdminAcademics } from '../components/admin/AdminAcademics';
import { AdminFAQs } from '../components/admin/AdminFAQs';
import { AdminSettings } from '../components/admin/AdminSettings';
import { AdminUsers } from '../components/admin/AdminUsers';
import { AdminFirebaseGuide } from '../components/admin/AdminFirebaseGuide';

import { dataService } from '../services/dataService';
import {
  AdminUser,
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
} from '../types';

interface AdminPageProps {
  onViewPublicSite: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onViewPublicSite }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(
    dataService.getCurrentAdmin()
  );
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Real-time state slices
  const [settings, setSettings] = useState<SiteSettings>(dataService.getSettings());
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(dataService.getHeroSlides());
  const [campuses, setCampuses] = useState<Campus[]>(dataService.getCampuses());
  const [faculty, setFaculty] = useState<FacultyMember[]>(dataService.getFaculty());
  const [news, setNews] = useState<NewsEvent[]>(dataService.getNewsEvents());
  const [gallery, setGallery] = useState<GalleryItem[]>(dataService.getGallery());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(dataService.getTestimonials());
  const [achievements, setAchievements] = useState<Achievement[]>(dataService.getAchievements());
  const [faqs, setFaqs] = useState<FAQ[]>(dataService.getFAQs());
  const [programs, setPrograms] = useState<AcademicProgram[]>(dataService.getPrograms());
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>(dataService.getInquiries());
  const [messages, setMessages] = useState<ContactMessage[]>(dataService.getMessages());
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(dataService.getAdminUsers());

  const refreshAll = () => {
    setSettings(dataService.getSettings());
    setHeroSlides(dataService.getHeroSlides());
    setCampuses(dataService.getCampuses());
    setFaculty(dataService.getFaculty());
    setNews(dataService.getNewsEvents());
    setGallery(dataService.getGallery());
    setTestimonials(dataService.getTestimonials());
    setAchievements(dataService.getAchievements());
    setFaqs(dataService.getFAQs());
    setPrograms(dataService.getPrograms());
    setInquiries(dataService.getInquiries());
    setMessages(dataService.getMessages());
    setAdminUsers(dataService.getAdminUsers());
  };

  useEffect(() => {
    const handleUpdate = () => {
      refreshAll();
    };
    window.addEventListener('cess-data-updated', handleUpdate);
    return () => window.removeEventListener('cess-data-updated', handleUpdate);
  }, []);

  const handleLogout = () => {
    dataService.setCurrentAdmin(null);
    setCurrentUser(null);
  };

  // If not authenticated, render Login Screen
  if (!currentUser) {
    return (
      <AdminLogin
        onLoginSuccess={(user) => setCurrentUser(user)}
        onBackToSite={onViewPublicSite}
      />
    );
  }

  return (
    <AdminLayout
      currentUser={currentUser}
      currentTab={activeTab}
      onSelectTab={(tab) => setActiveTab(tab)}
      onLogout={handleLogout}
      onViewPublicSite={onViewPublicSite}
      inquiries={inquiries}
      messages={messages}
    >
      {activeTab === 'dashboard' && (
        <AdminDashboard
          settings={settings}
          inquiries={inquiries}
          messages={messages}
          faculty={faculty}
          campuses={campuses}
          news={news}
          gallery={gallery}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />
      )}

      {activeTab === 'inquiries' && (
        <AdminInquiries inquiries={inquiries} campuses={campuses} />
      )}

      {activeTab === 'messages' && <AdminMessages messages={messages} />}

      {activeTab === 'hero' && <AdminHeroSlides slides={heroSlides} />}

      {activeTab === 'campuses' && <AdminCampuses campuses={campuses} />}

      {activeTab === 'faculty' && (
        <AdminFaculty faculty={faculty} campuses={campuses} />
      )}

      {activeTab === 'news' && <AdminNews news={news} />}

      {activeTab === 'gallery' && <AdminGallery gallery={gallery} />}

      {activeTab === 'testimonials' && (
        <AdminTestimonials testimonials={testimonials} />
      )}

      {activeTab === 'toppers' && (
        <AdminAchievements achievements={achievements} />
      )}

      {activeTab === 'academics' && <AdminAcademics programs={programs} />}

      {activeTab === 'faqs' && <AdminFAQs faqs={faqs} />}

      {activeTab === 'settings' && (
        <AdminSettings settings={settings} onRefresh={refreshAll} />
      )}

      {activeTab === 'users' && (
        <AdminUsers users={adminUsers} currentUser={currentUser} />
      )}

      {activeTab === 'firebase-guide' && <AdminFirebaseGuide />}
    </AdminLayout>
  );
};
