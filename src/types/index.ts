export interface SiteSettings {
  schoolName: string;
  shortName: string;
  tagline: string;
  logoUrl?: string;
  establishedYear: number;
  phone: string;
  alternatePhone: string;
  email: string;
  admissionsEmail: string;
  whatsappNumber: string;
  address: string;
  workingHours: string;
  founderName: string;
  founderTitle: string;
  founderMessage: string;
  founderPhoto: string;
  // Stats
  yearsOfExcellence: string;
  totalCampuses: string;
  totalTeachers: string;
  totalStudents: string;
  matricPassRate: string;
  // Social
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  // SEO
  seoTitle: string;
  seoDescription: string;
  footerText: string;
}

export interface HeroSlide {
  id: string;
  headline: string;
  subtext: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  imageUrl: string;
  badgeText?: string;
  active: boolean;
  order: number;
}

export interface Campus {
  id: string;
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  principalQualification: string;
  principalPhoto?: string;
  imageUrl: string;
  mapEmbedUrl: string;
  facilities: string[];
  totalStudents: string;
  establishedYear: number;
  featured: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  qualification: string;
  designation: string;
  campusId: string;
  campusName: string;
  department: string;
  experienceYears: number;
  photoUrl: string;
  email?: string;
  bio?: string;
  featured: boolean;
  order: number;
}

export interface NewsEvent {
  id: string;
  title: string;
  category: 'Event' | 'Academic' | 'Sports' | 'Celebration' | 'Workshop' | 'Announcement';
  date: string;
  time?: string;
  venue?: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  featured: boolean;
  chiefGuest?: string;
  honourableGuest?: string;
  tags?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Sports' | 'Campus' | 'Classroom' | 'Annual Day';
  imageUrl: string;
  caption: string;
  date?: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: 'Parent' | 'Student' | 'Alumni';
  relationship: string; // e.g. "Father of Grade 8 Student", "Alumnus Class of 2021"
  campus: string;
  quote: string;
  rating: number; // 1-5
  avatarUrl: string;
  featured: boolean;
}

export interface Achievement {
  id: string;
  studentName: string;
  examOrEvent: string; // e.g. "BISE Matric Board", "Cambridge O-Level", "National STEM Challenge"
  scoreOrRank: string; // e.g. "1st Position (1082/1100 - 98.4%)", "8 A*s"
  year: string;
  campus: string;
  photoUrl: string;
  quote?: string;
  featured: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Academics' | 'Fee & Scholarships' | 'Campus Life' | 'Transport';
  order: number;
}

export interface AcademicProgram {
  id: string;
  title: string;
  level: 'Pre-School' | 'Primary' | 'Middle' | 'Secondary';
  gradeRange: string; // e.g. "Playgroup to Kindergarten", "Grades 1 to 5"
  ageGroup: string; // e.g. "3 - 5 Years"
  description: string;
  imageUrl: string;
  keyFeatures: string[];
  subjects: string[];
  timing: string;
}

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  classApplyingFor: string;
  preferredCampus: string;
  previousSchool?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Admitted' | 'Rejected';
  createdAt: string;
  adminNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  campus?: string;
  message: string;
  read: boolean;
  createdAt: string;
  replied?: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Editor';
  lastLogin?: string;
  active: boolean;
}
