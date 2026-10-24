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
  ContactMessage,
  AdminUser
} from '../types';
import {
  initialSiteSettings,
  initialHeroSlides,
  initialCampuses,
  initialFaculty,
  initialNewsEvents,
  initialGallery,
  initialTestimonials,
  initialAchievements,
  initialFAQs,
  initialPrograms,
  initialInquiries,
  initialMessages,
  initialAdminUsers
} from '../data/initialData';

const STORAGE_KEYS = {
  SETTINGS: 'cess_settings_v1',
  HERO_SLIDES: 'cess_hero_slides_v1',
  CAMPUSES: 'cess_campuses_v1',
  FACULTY: 'cess_faculty_v1',
  NEWS_EVENTS: 'cess_news_events_v1',
  GALLERY: 'cess_gallery_v1',
  TESTIMONIALS: 'cess_testimonials_v1',
  ACHIEVEMENTS: 'cess_achievements_v1',
  FAQS: 'cess_faqs_v1',
  PROGRAMS: 'cess_programs_v1',
  INQUIRIES: 'cess_inquiries_v1',
  MESSAGES: 'cess_messages_v1',
  ADMIN_USERS: 'cess_admin_users_v1',
  CURRENT_ADMIN: 'cess_current_admin_v1'
};

const notifyUpdate = (entity: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cess-data-updated', { detail: { entity } }));
  }
};

class DataService {
  // --- SITE SETTINGS ---
  getSettings(): SiteSettings {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      this.saveSettings(initialSiteSettings);
      return initialSiteSettings;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialSiteSettings;
    }
  }

  saveSettings(settings: SiteSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    notifyUpdate('settings');
  }

  // --- HERO SLIDES ---
  getHeroSlides(): HeroSlide[] {
    const raw = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(initialHeroSlides));
      return initialHeroSlides;
    }
    try {
      const parsed = JSON.parse(raw);
      return parsed.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order);
    } catch {
      return initialHeroSlides;
    }
  }

  saveHeroSlide(slide: HeroSlide): void {
    const slides = this.getHeroSlides();
    const idx = slides.findIndex((s) => s.id === slide.id);
    if (idx >= 0) {
      slides[idx] = slide;
    } else {
      slides.push(slide);
    }
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(slides));
    notifyUpdate('hero_slides');
  }

  deleteHeroSlide(id: string): void {
    const slides = this.getHeroSlides().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(slides));
    notifyUpdate('hero_slides');
  }

  // --- CAMPUSES ---
  getCampuses(): Campus[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CAMPUSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CAMPUSES, JSON.stringify(initialCampuses));
      return initialCampuses;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialCampuses;
    }
  }

  getCampusById(id: string): Campus | undefined {
    return this.getCampuses().find((c) => c.id === id);
  }

  saveCampus(campus: Campus): void {
    const campuses = this.getCampuses();
    const idx = campuses.findIndex((c) => c.id === campus.id);
    if (idx >= 0) {
      campuses[idx] = campus;
    } else {
      campuses.push(campus);
    }
    localStorage.setItem(STORAGE_KEYS.CAMPUSES, JSON.stringify(campuses));
    notifyUpdate('campuses');
  }

  deleteCampus(id: string): void {
    const campuses = this.getCampuses().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CAMPUSES, JSON.stringify(campuses));
    notifyUpdate('campuses');
  }

  // --- FACULTY ---
  getFaculty(): FacultyMember[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FACULTY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(initialFaculty));
      return initialFaculty;
    }
    try {
      const parsed = JSON.parse(raw);
      return parsed.sort((a: FacultyMember, b: FacultyMember) => a.order - b.order);
    } catch {
      return initialFaculty;
    }
  }

  saveFaculty(member: FacultyMember): void {
    const faculty = this.getFaculty();
    const idx = faculty.findIndex((f) => f.id === member.id);
    if (idx >= 0) {
      faculty[idx] = member;
    } else {
      faculty.push(member);
    }
    localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
    notifyUpdate('faculty');
  }

  deleteFaculty(id: string): void {
    const faculty = this.getFaculty().filter((f) => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
    notifyUpdate('faculty');
  }

  // --- NEWS & EVENTS ---
  getNewsEvents(): NewsEvent[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS_EVENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NEWS_EVENTS, JSON.stringify(initialNewsEvents));
      return initialNewsEvents;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialNewsEvents;
    }
  }

  getNewsById(id: string): NewsEvent | undefined {
    return this.getNewsEvents().find((n) => n.id === id);
  }

  saveNewsEvent(item: NewsEvent): void {
    const items = this.getNewsEvents();
    const idx = items.findIndex((n) => n.id === item.id);
    if (idx >= 0) {
      items[idx] = item;
    } else {
      items.unshift(item);
    }
    localStorage.setItem(STORAGE_KEYS.NEWS_EVENTS, JSON.stringify(items));
    notifyUpdate('news');
  }

  deleteNewsEvent(id: string): void {
    const items = this.getNewsEvents().filter((n) => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NEWS_EVENTS, JSON.stringify(items));
    notifyUpdate('news');
  }

  // --- GALLERY ---
  getGallery(): GalleryItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(initialGallery));
      return initialGallery;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialGallery;
    }
  }

  saveGalleryItem(item: GalleryItem): void {
    const items = this.getGallery();
    const idx = items.findIndex((g) => g.id === item.id);
    if (idx >= 0) {
      items[idx] = item;
    } else {
      items.unshift(item);
    }
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(items));
    notifyUpdate('gallery');
  }

  deleteGalleryItem(id: string): void {
    const items = this.getGallery().filter((g) => g.id !== id);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(items));
    notifyUpdate('gallery');
  }

  // --- TESTIMONIALS ---
  getTestimonials(): Testimonial[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
      return initialTestimonials;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialTestimonials;
    }
  }

  saveTestimonial(test: Testimonial): void {
    const list = this.getTestimonials();
    const idx = list.findIndex((t) => t.id === test.id);
    if (idx >= 0) {
      list[idx] = test;
    } else {
      list.push(test);
    }
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(list));
    notifyUpdate('testimonials');
  }

  deleteTestimonial(id: string): void {
    const list = this.getTestimonials().filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(list));
    notifyUpdate('testimonials');
  }

  // --- ACHIEVEMENTS / TOPPERS ---
  getAchievements(): Achievement[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(initialAchievements));
      return initialAchievements;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialAchievements;
    }
  }

  saveAchievement(ach: Achievement): void {
    const list = this.getAchievements();
    const idx = list.findIndex((a) => a.id === ach.id);
    if (idx >= 0) {
      list[idx] = ach;
    } else {
      list.push(ach);
    }
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(list));
    notifyUpdate('achievements');
  }

  deleteAchievement(id: string): void {
    const list = this.getAchievements().filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(list));
    notifyUpdate('achievements');
  }

  // --- FAQS ---
  getFAQs(): FAQ[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FAQS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(initialFAQs));
      return initialFAQs;
    }
    try {
      const parsed = JSON.parse(raw);
      return parsed.sort((a: FAQ, b: FAQ) => a.order - b.order);
    } catch {
      return initialFAQs;
    }
  }

  saveFAQ(faq: FAQ): void {
    const list = this.getFAQs();
    const idx = list.findIndex((f) => f.id === faq.id);
    if (idx >= 0) {
      list[idx] = faq;
    } else {
      list.push(faq);
    }
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(list));
    notifyUpdate('faqs');
  }

  deleteFAQ(id: string): void {
    const list = this.getFAQs().filter((f) => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(list));
    notifyUpdate('faqs');
  }

  // --- ACADEMIC PROGRAMS ---
  getPrograms(): AcademicProgram[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(initialPrograms));
      return initialPrograms;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialPrograms;
    }
  }

  saveProgram(prog: AcademicProgram): void {
    const list = this.getPrograms();
    const idx = list.findIndex((p) => p.id === prog.id);
    if (idx >= 0) {
      list[idx] = prog;
    } else {
      list.push(prog);
    }
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(list));
    notifyUpdate('programs');
  }

  // --- ADMISSION INQUIRIES ---
  getInquiries(): AdmissionInquiry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(initialInquiries));
      return initialInquiries;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialInquiries;
    }
  }

  createInquiry(inquiry: Omit<AdmissionInquiry, 'id' | 'createdAt' | 'status'>): AdmissionInquiry {
    const list = this.getInquiries();
    const newInquiry: AdmissionInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    list.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
    notifyUpdate('inquiries');
    return newInquiry;
  }

  updateInquiryStatus(id: string, status: AdmissionInquiry['status'], adminNotes?: string): void {
    const list = this.getInquiries();
    const target = list.find((i) => i.id === id);
    if (target) {
      target.status = status;
      if (adminNotes !== undefined) {
        target.adminNotes = adminNotes;
      }
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
      notifyUpdate('inquiries');
    }
  }

  deleteInquiry(id: string): void {
    const list = this.getInquiries().filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
    notifyUpdate('inquiries');
  }

  exportInquiriesCSV(): void {
    const list = this.getInquiries();
    const headers = ['ID', 'Student Name', 'Parent Name', 'Class', 'Campus', 'Phone', 'Email', 'Status', 'Date', 'Previous School', 'Notes'];
    const rows = list.map((i) => [
      `"${i.id}"`,
      `"${i.studentName.replace(/"/g, '""')}"`,
      `"${i.parentName.replace(/"/g, '""')}"`,
      `"${i.classApplyingFor.replace(/"/g, '""')}"`,
      `"${i.preferredCampus.replace(/"/g, '""')}"`,
      `"${i.phone.replace(/"/g, '""')}"`,
      `"${i.email.replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${new Date(i.createdAt).toLocaleDateString()}"`,
      `"${(i.previousSchool || '').replace(/"/g, '""')}"`,
      `"${(i.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CESS_Admission_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- CONTACT MESSAGES ---
  getMessages(): ContactMessage[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(initialMessages));
      return initialMessages;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialMessages;
    }
  }

  createMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
    const list = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    list.unshift(newMsg);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(list));
    notifyUpdate('messages');
    return newMsg;
  }

  toggleMessageRead(id: string, read?: boolean): void {
    const list = this.getMessages();
    const target = list.find((m) => m.id === id);
    if (target) {
      target.read = read !== undefined ? read : !target.read;
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(list));
      notifyUpdate('messages');
    }
  }

  deleteMessage(id: string): void {
    const list = this.getMessages().filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(list));
    notifyUpdate('messages');
  }

  // --- ADMIN USERS ---
  getAdminUsers(): AdminUser[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(initialAdminUsers));
      return initialAdminUsers;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialAdminUsers;
    }
  }

  addAdminUser(user: Omit<AdminUser, 'id'>): AdminUser {
    const list = this.getAdminUsers();
    const newUser: AdminUser = {
      ...user,
      id: `admin-${Date.now()}`
    };
    list.push(newUser);
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(list));
    notifyUpdate('admin_users');
    return newUser;
  }

  deleteAdminUser(id: string): void {
    const list = this.getAdminUsers().filter((u) => u.id !== id);
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(list));
    notifyUpdate('admin_users');
  }

  // --- AUTH SESSION ---
  getCurrentAdmin(): AdminUser | null {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  setCurrentAdmin(admin: AdminUser | null): void {
    if (admin) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(admin));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
    }
    notifyUpdate('auth');
  }

  // --- RESET ALL DATA ---
  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSiteSettings));
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(initialHeroSlides));
    localStorage.setItem(STORAGE_KEYS.CAMPUSES, JSON.stringify(initialCampuses));
    localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(initialFaculty));
    localStorage.setItem(STORAGE_KEYS.NEWS_EVENTS, JSON.stringify(initialNewsEvents));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(initialGallery));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(initialAchievements));
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(initialFAQs));
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(initialPrograms));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(initialInquiries));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(initialMessages));
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(initialAdminUsers));
    notifyUpdate('all');
  }
}

export const dataService = new DataService();
