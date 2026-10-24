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

export const initialSiteSettings: SiteSettings = {
  schoolName: 'City English School System',
  shortName: 'CESS',
  tagline: 'Excellence in Education. Character for Life.',
  logoUrl: '',
  establishedYear: 1990,
  phone: '+92 21 3456 7890',
  alternatePhone: '+92 300 1234 567',
  email: 'info@cess.edu.pk',
  admissionsEmail: 'admissions@cess.edu.pk',
  whatsappNumber: '+923001234567',
  address: 'CESS Central Complex, Main Shahrah-e-Faisal, Karachi, Pakistan',
  workingHours: 'Mon - Sat: 7:30 AM - 2:30 PM (Admin Office open until 4:00 PM)',
  founderName: 'Sir Muhammad Asif',
  founderTitle: 'Founder & Chairman, City English School System',
  founderMessage:
    'For more than 35 years, our singular purpose has been to nurture balanced, thoughtful, and high-achieving leaders who honor their roots while boldly stepping onto the world stage. Education at CESS is not merely academic instruction; it is character formation, moral integrity, intellectual curiosity, and empathetic community service. We welcome every child into an environment where potential is recognized, cultivated, and celebrated.',
  founderPhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  yearsOfExcellence: '35+',
  totalCampuses: '4',
  totalTeachers: '200+',
  totalStudents: '2000+',
  matricPassRate: '100%',
  facebookUrl: 'https://facebook.com/cesspk',
  instagramUrl: 'https://instagram.com/cess.official',
  youtubeUrl: 'https://youtube.com/@cityenglishschoolsystem',
  linkedinUrl: 'https://linkedin.com/school/cess-pk',
  seoTitle: 'City English School System (CESS) | Excellence in Education Since 1990',
  seoDescription:
    'City English School System (CESS) offers top-tier holistic education from Pre-School to Matric & Cambridge O-Levels across 4 modern campuses with 200+ qualified teachers.',
  footerText: '© 1990 - 2026 City English School System (CESS). All Rights Reserved. Reg. with Board of Secondary Education & Cambridge Assessment.'
};

export const initialHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    headline: '35+ Years of Academic Brilliance & Moral Character',
    subtext: 'Empowering future leaders across 4 state-of-the-art campuses with Cambridge O-Levels, Matriculation, and Montessori excellence.',
    primaryButtonText: 'Apply For Admission',
    primaryButtonLink: '/admissions',
    secondaryButtonText: 'Explore Our Campuses',
    secondaryButtonLink: '/campuses',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=85',
    badgeText: 'Admissions Open 2026-27',
    active: true,
    order: 1
  },
  {
    id: 'slide-2',
    headline: 'Advanced Science, Robotics & Modern Digital Labs',
    subtext: 'Inspiring young minds through experiential STEM research, coding workshops, and comprehensive sports training facilities.',
    primaryButtonText: 'Take a Virtual Tour',
    primaryButtonLink: '/campuses',
    secondaryButtonText: 'View Academic Programs',
    secondaryButtonLink: '/academics',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=85',
    badgeText: 'Modern Infrastructure',
    active: true,
    order: 2
  },
  {
    id: 'slide-3',
    headline: 'Rooted in Core Values, Reaching Global Horizons',
    subtext: 'Guiding 2000+ students with 200+ distinguished mentors led by Founder & Chairman Sir Muhammad Asif.',
    primaryButtonText: 'Meet Our Faculty',
    primaryButtonLink: '/faculty',
    secondaryButtonText: 'Read Our Story',
    secondaryButtonLink: '/about',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=85',
    badgeText: 'Character For Life',
    active: true,
    order: 3
  }
];

export const initialCampuses: Campus[] = [
  {
    id: 'main-campus',
    name: 'Main Campus (Central)',
    tagline: 'Flagship Senior School & Central Administrative Secretariat',
    address: 'Plot 14-B, Main Shahrah-e-Faisal, Block 2, Karachi',
    phone: '+92 21 3456 7891',
    email: 'maincampus@cess.edu.pk',
    principalName: 'Prof. Farooq Ahmed Siddiqui',
    principalQualification: 'M.Sc. Physics (Gold Medalist), M.Ed. (UK)',
    principalPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115809.52909402506!2d67.01358942542472!3d24.8607343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e70a31f45a9%3A0x25e5a43e002133f8!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000',
    facilities: ['Advanced Physics & Chemistry Labs', 'Central Computer Complex', 'Auditorium (600 seats)', 'Futsal & Basketball Court', 'Robotics Innovation Hub', 'Career Counseling Cell'],
    totalStudents: '750+',
    establishedYear: 1990,
    featured: true
  },
  {
    id: 'gulshan-campus',
    name: 'Gulshan Campus',
    tagline: 'Comprehensive Primary, Middle & Matriculation Campus',
    address: 'Block 6, Gulshan-e-Iqbal, Near Disco Bakery, Karachi',
    phone: '+92 21 3498 1234',
    email: 'gulshan@cess.edu.pk',
    principalName: 'Mrs. Shazia Perveen',
    principalQualification: 'M.A. English Literature, B.Ed.',
    principalPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.324838382717!2d67.0984!3d24.9213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f4a0b25e709%3A0x9a8e0f63b4f6285!2sGulshan-e-Iqbal%2C%20Karachi!5e0!3m2!1sen!2s!4v1700000000000',
    facilities: ['Digital Smart Classrooms', 'Montessori Activity Wing', 'Junior Science Lab', 'Library & Audio-Visual Hall', 'Cricket Practice Nets', 'Art & Calligraphy Studio'],
    totalStudents: '520+',
    establishedYear: 1998,
    featured: true
  },
  {
    id: 'model-town-campus',
    name: 'Model Town Campus',
    tagline: 'Modern Co-Education Wing with Cambridge & Matric Streams',
    address: 'Sector C, Model Town Link Road, Lahore',
    phone: '+92 42 3588 5678',
    email: 'modeltown@cess.edu.pk',
    principalName: 'Dr. Tariq Masood Hashmi',
    principalQualification: 'Ph.D. Education Leadership, M.Sc. Mathematics',
    principalPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.48624148769!2d74.3168!3d31.4828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919041a7d6e42df%3A0xb351a65fc97ec76!2sModel%20Town%2C%20Lahore!5e0!3m2!1sen!2s!4v1700000000000',
    facilities: ['Cambridge Science Suites', 'Multi-Purpose Sports Complex', 'STEM Robotics Lab', 'Daycare & Early Child Care', 'Cafeteria with Hygienic Kitchen', 'Transport Fleet'],
    totalStudents: '450+',
    establishedYear: 2012,
    featured: true
  },
  {
    id: 'cantt-campus',
    name: 'Cantt Campus',
    tagline: 'Secure, Scenic Environment Dedicated to Early & Secondary Education',
    address: 'Askari Boulevard, Cantonment Zone, Karachi',
    phone: '+92 21 3560 9988',
    email: 'cantt@cess.edu.pk',
    principalName: 'Brig. (R) Javed Iqbal',
    principalQualification: 'M.Phil. Strategic Studies, B.Sc. Hons.',
    principalPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1200&q=80',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.274384918239!2d67.0544!3d24.8468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33dd1158a5e37%3A0x673dbb10887df!2sKarachi%20Cantonment!5e0!3m2!1sen!2s!4v1700000000000',
    facilities: ['High Security 24/7 Gated Perimeter', 'Full Athletic Ground & Track', 'Modern Biology & Chemistry Labs', 'Badminton Court', 'Islamic Heritage Study Hall', 'Fleet Tracking Buses'],
    totalStudents: '380+',
    establishedYear: 2003,
    featured: true
  }
];

export const initialFaculty: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Prof. Farooq Ahmed Siddiqui',
    qualification: 'M.Sc. Physics (Gold Medalist), M.Ed. (UK)',
    designation: 'Senior Principal & Academic Director',
    campusId: 'main-campus',
    campusName: 'Main Campus (Central)',
    department: 'Physics & Sciences',
    experienceYears: 24,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    email: 'farooq.siddiqui@cess.edu.pk',
    bio: 'Dedicated to cultivating scientific rigor and competitive exam mastery for over two decades at CESS.',
    featured: true,
    order: 1
  },
  {
    id: 'fac-2',
    name: 'Mrs. Shazia Perveen',
    qualification: 'M.A. English Literature, B.Ed.',
    designation: 'Principal & Early Childhood Head',
    campusId: 'gulshan-campus',
    campusName: 'Gulshan Campus',
    department: 'Languages & Humanities',
    experienceYears: 19,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    email: 'shazia.perveen@cess.edu.pk',
    bio: 'Pioneered Montessori phonics and creative language immersion programs across our campuses.',
    featured: true,
    order: 2
  },
  {
    id: 'fac-3',
    name: 'Dr. Tariq Masood Hashmi',
    qualification: 'Ph.D. Education Leadership, M.Sc. Mathematics',
    designation: 'Principal & Cambridge Coordinator',
    campusId: 'model-town-campus',
    campusName: 'Model Town Campus',
    department: 'Mathematics',
    experienceYears: 21,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    email: 'tariq.hashmi@cess.edu.pk',
    bio: 'Passionate mathematician specializing in mental arithmetic and Olympiad preparation.',
    featured: true,
    order: 3
  },
  {
    id: 'fac-4',
    name: 'Brig. (R) Javed Iqbal',
    qualification: 'M.Phil. Strategic Studies, B.Sc. Hons.',
    designation: 'Principal & Head of Student Affairs',
    campusId: 'cantt-campus',
    campusName: 'Cantt Campus',
    department: 'Social Sciences & Character Formation',
    experienceYears: 18,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    email: 'javed.iqbal@cess.edu.pk',
    bio: 'Instilling leadership discipline, athletic determination, and ethical civic values in every cohort.',
    featured: true,
    order: 4
  },
  {
    id: 'fac-5',
    name: 'Engr. Noman Ali Khan',
    qualification: 'B.E. Computer Systems, MS Software Eng.',
    designation: 'Head of STEM & Robotics Lab',
    campusId: 'main-campus',
    campusName: 'Main Campus (Central)',
    department: 'Computer Science & Robotics',
    experienceYears: 11,
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
    email: 'noman.khan@cess.edu.pk',
    bio: 'Mentored CESS students to three consecutive national robotics and coding competition titles.',
    featured: true,
    order: 5
  },
  {
    id: 'fac-6',
    name: 'Dr. Ayesha Maryam',
    qualification: 'M.B.B.S., M.Phil. Biochemistry',
    designation: 'Senior Biology Specialist (Matric/O-Level)',
    campusId: 'main-campus',
    campusName: 'Main Campus (Central)',
    department: 'Life Sciences',
    experienceYears: 14,
    photoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=500&q=80',
    email: 'ayesha.maryam@cess.edu.pk',
    bio: 'Prepares pre-medical aspirants with practical laboratory expertise and deep medical sciences foundation.',
    featured: false,
    order: 6
  },
  {
    id: 'fac-7',
    name: 'Mr. Zulfiqar Haider',
    qualification: 'M.Sc. Analytical Chemistry',
    designation: 'Senior Chemistry Faculty',
    campusId: 'gulshan-campus',
    campusName: 'Gulshan Campus',
    department: 'Physical Sciences',
    experienceYears: 16,
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80',
    email: 'zulfiqar.haider@cess.edu.pk',
    bio: 'Transforming complex chemical equations into engaging laboratory discoveries.',
    featured: false,
    order: 7
  },
  {
    id: 'fac-8',
    name: 'Qari Hafiz Muhammad Bilal',
    qualification: 'Shahadat-ul-Almiya, M.A. Islamic Studies',
    designation: 'Head of Islamic Studies & Tajweed',
    campusId: 'main-campus',
    campusName: 'Main Campus (Central)',
    department: 'Islamic & Moral Values',
    experienceYears: 15,
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    email: 'bilal.islamic@cess.edu.pk',
    bio: 'Guiding students in correct Tajweed pronunciation, Seerat-un-Nabi ethics, and practical community charity.',
    featured: false,
    order: 8
  },
  {
    id: 'fac-9',
    name: 'Ms. Fatima Sana',
    qualification: 'M.A. English (Applied Linguistics)',
    designation: 'Cambridge O-Level English Coordinator',
    campusId: 'model-town-campus',
    campusName: 'Model Town Campus',
    department: 'Languages & Humanities',
    experienceYears: 9,
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
    email: 'fatima.sana@cess.edu.pk',
    bio: 'Specialist in debate coaching, Model United Nations (MUN), and creative writing publications.',
    featured: false,
    order: 9
  },
  {
    id: 'fac-10',
    name: 'Mr. Kamran Asghar',
    qualification: 'M.Sc. Pure Mathematics',
    designation: 'Senior Mathematics Mentor',
    campusId: 'cantt-campus',
    campusName: 'Cantt Campus',
    department: 'Mathematics',
    experienceYears: 13,
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80',
    email: 'kamran.asghar@cess.edu.pk',
    bio: 'Focused on making algebra and trigonometry intuitive and fun for secondary grade students.',
    featured: false,
    order: 10
  },
  {
    id: 'fac-11',
    name: 'Ms. Rabia Zahid',
    qualification: 'Diploma in International Montessori (AMI), B.A.',
    designation: 'Lead Montessori Directress',
    campusId: 'gulshan-campus',
    campusName: 'Gulshan Campus',
    department: 'Early Childhood Education',
    experienceYears: 8,
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=500&q=80',
    email: 'rabia.zahid@cess.edu.pk',
    bio: 'Fosters child-centered sensory exploration, social harmony, and early literacy joy.',
    featured: false,
    order: 11
  },
  {
    id: 'fac-12',
    name: 'Coach Waqas Tanveer',
    qualification: 'B.S. Sports Sciences & Physical Health',
    designation: 'Director of Physical Education & Sports',
    campusId: 'main-campus',
    campusName: 'Main Campus (Central)',
    department: 'Athletics & Physical Health',
    experienceYears: 12,
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=500&q=80',
    email: 'waqas.sports@cess.edu.pk',
    bio: 'State-certified coach leading football, athletics, and martial arts champions across inter-school tourneys.',
    featured: false,
    order: 12
  }
];

export const initialNewsEvents: NewsEvent[] = [
  {
    id: 'event-1',
    title: '35th Annual Prize Distribution & Graduation Ceremony 2026',
    category: 'Celebration',
    date: '2026-11-15',
    time: '10:00 AM - 2:00 PM',
    venue: 'CESS Central Grand Auditorium, Main Campus',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Commemorating our top position holders, Cambridge achievers, and long-serving faculty in the august presence of our Honourable & Chief Guests.',
    content:
      'City English School System will celebrate its 35th Annual Prize Distribution Ceremony on November 15, 2026. The ceremony will confer gold medals, merit certificates, and cash scholarships upon outstanding board achievers. \n\nFounder & Chairman Sir Muhammad Asif will deliver the keynote address highlighting the journey since 1990. Parents, distinguished alumni, and educationists from across the province will grace this landmark gathering.',
    featured: true,
    chiefGuest: 'Prof. Dr. Ahsan Rauf (Vice Chancellor & Renowned Educationist)',
    honourableGuest: 'Justice (R) Tariq Mahmood (Former Jurist & Supreme Court Advocate)',
    tags: ['Annual Day', 'Gold Medals', 'Sir Muhammad Asif', 'Board Toppers']
  },
  {
    id: 'event-2',
    title: 'All-Campus Inter-School Science & AI Robotics Olympiad',
    category: 'Academic',
    date: '2026-10-28',
    time: '9:00 AM - 3:30 PM',
    venue: 'STEM Innovation Wing, Model Town Campus',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Over 60 student-designed working models showcasing clean energy solutions, autonomous obstacle robots, and generative AI models.',
    content:
      'Students from Pre-School to Secondary levels will demonstrate live scientific models. Categories include Sustainable Cities, Solar Desalination, Arduino Automated Farm Sensors, and Healthcare Bots. A panel of engineering university deans will judge the prototypes and award project grants.',
    featured: true,
    chiefGuest: 'Dr. Shahzad Rasool (Dean of Computer Engineering)',
    honourableGuest: 'Engr. Noman Ali Khan (CESS STEM Lead)',
    tags: ['STEM', 'Robotics', 'Science Fair', 'Innovation']
  },
  {
    id: 'event-3',
    title: 'Annual Inter-Campus Sports Gala & Track Championship',
    category: 'Sports',
    date: '2026-11-04',
    time: '8:00 AM - 4:00 PM',
    venue: 'Cantt Campus Athletic Stadium',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Four campuses competing for the Sir Muhammad Asif Rolling Athletics Trophy across sprint, relay, long jump, and football.',
    content:
      'The vibrant sporting spirit of CESS comes alive with our flagship Sports Gala. Events include 100m sprint, 4x100m relay, gymnastics demonstration, tug of war, and the grand inter-campus football finale. March-past salute to the national anthem and torch relay ceremony.',
    featured: true,
    chiefGuest: 'Olympiad Athlete & National Sports Commissioner',
    honourableGuest: 'Sir Muhammad Asif (Chairman)',
    tags: ['Sports Gala', 'Athletics', 'Football', 'Healthy Living']
  },
  {
    id: 'event-4',
    title: 'Cambridge O-Level & Matriculation High Achievers Felicitation',
    category: 'Academic',
    date: '2026-09-18',
    time: '11:00 AM - 1:00 PM',
    venue: 'Conference Hall, Main Campus',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Honoring our students who secured 100% pass rates and top merit positions in the BISE Karachi and Cambridge 2026 examinations.',
    content:
      'A formal tea reception and award ceremony honoring students who achieved straight A*s and Board positions. Shield of Distinction was awarded to student Rayyan Asif for securing 1st Position in Science Group with 98.4% marks.',
    featured: false,
    chiefGuest: 'Controller of Examinations, Board of Secondary Education',
    honourableGuest: 'Prof. Farooq Ahmed Siddiqui',
    tags: ['Board Results', 'High Achievers', 'Cambridge', 'Scholarships']
  },
  {
    id: 'event-5',
    title: 'Seerat-un-Nabi Conference & All-Pakistan Husn-e-Qirat Contest',
    category: 'Celebration',
    date: '2026-10-12',
    time: '9:30 AM - 1:00 PM',
    venue: 'Gulshan Campus Central Courtyard',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Recitations of Quranic verses, soulful Naat-e-Rasool (SAW), and inspirational speeches on moral character and compassion.',
    content:
      'Instilling timeless moral foundations and ethical leadership in our students. Renowned religious scholars and Qaris from nationwide institutions evaluated student recitation accuracy, melody, and articulation.',
    featured: false,
    chiefGuest: 'Dr. Maulana Abdul Sattar',
    honourableGuest: 'Qari Hafiz Muhammad Bilal',
    tags: ['Moral Character', 'Qirat', 'Seerat Conference', 'Values']
  },
  {
    id: 'event-6',
    title: 'Parent-Teacher Consultative Conference & Growth Portfolio Review',
    category: 'Workshop',
    date: '2026-11-21',
    time: '8:30 AM - 1:30 PM',
    venue: 'All 4 Campuses Simultaneously',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'One-on-one academic, behavioral, and developmental milestone reviews with subject specialists and class directresses.',
    content:
      'A vital collaborative bridge between home and school. Parents examine student portfolios, diagnostic quiz analytics, and holistic extracurricular growth plans.',
    featured: false,
    tags: ['PTC', 'Parent Engagement', 'Child Development']
  },
  {
    id: 'event-7',
    title: 'Art, Heritage & Calligraphy Cultural Pavilion',
    category: 'Celebration',
    date: '2026-12-05',
    time: '10:00 AM - 4:00 PM',
    venue: 'Model Town Campus Lawn',
    imageUrl: 'https://images.unsplash.com/photo-1460518451282-9742118474c3?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Traditional Islamic calligraphy, regional crafts, oil canvas displays, and live ceramic clay modeling by CESS students.',
    content:
      'Celebrating Pakistan’s rich artistic lineage alongside modern abstract art techniques. Student artworks were auctioned, with proceeds donated to community education charity funds.',
    featured: false,
    tags: ['Art Exhibition', 'Calligraphy', 'Heritage', 'Creative Arts']
  },
  {
    id: 'event-8',
    title: 'Faculty Professional Development: Modern Pedagogies & AI in Education',
    category: 'Workshop',
    date: '2026-10-05',
    time: '9:00 AM - 2:00 PM',
    venue: 'Main Campus Executive Hall',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Continuous upskilling of our 200+ educators in differentiated instruction, emotional intelligence, and hybrid learning tools.',
    content:
      'Led by international master trainers, our faculty engaged in hands-on workshops covering inquiry-based questioning, positive discipline, and digital rubric assessments.',
    featured: false,
    tags: ['Teacher Training', 'Faculty Development', 'Pedagogy']
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Annual Convocation & Gold Medal Presentation',
    category: 'Annual Day',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80',
    caption: 'Graduates celebrating with faculty and Founder Sir Muhammad Asif at the 35th Convocation.',
    date: '2026'
  },
  {
    id: 'gal-2',
    title: 'Honourable & Chief Guest Stage Proceedings',
    category: 'Annual Day',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    caption: 'Dignitaries and keynote speakers addressing parents and student laureates.',
    date: '2026'
  },
  {
    id: 'gal-3',
    title: 'Advanced Robotics and Automated Circuit Assembly',
    category: 'Classroom',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1000&q=80',
    caption: 'Senior Secondary STEM learners prototyping micro-controllers in our Innovation Hub.',
    date: '2026'
  },
  {
    id: 'gal-4',
    title: 'Montessori Sensory Play & Phonics Corner',
    category: 'Classroom',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Early Years toddlers engaging in cognitive shape matching and tactile activities.',
    date: '2026'
  },
  {
    id: 'gal-5',
    title: 'Inter-Campus Football Championship Final Match',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
    caption: 'Main Campus striker maneuvering past defenders in the tense annual cup final.',
    date: '2026'
  },
  {
    id: 'gal-6',
    title: 'Sprint & Track Relay Athletes',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80',
    caption: 'Young track runners crossing the finish ribbon during the Annual Athletics Meet.',
    date: '2026'
  },
  {
    id: 'gal-7',
    title: 'Modern Architecture - Main Campus Central Wing',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
    caption: 'Exterior frontage of the Main Shahrah-e-Faisal campus in the morning glow.',
    date: '2026'
  },
  {
    id: 'gal-8',
    title: 'Green Lawns & Outdoor Courtyard - Cantt Campus',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Lush open-air environment providing students clean air and recreation spaces.',
    date: '2026'
  },
  {
    id: 'gal-9',
    title: 'Chemistry Laboratory Titration Experiment',
    category: 'Classroom',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Matric science students conducting acid-base volumetric tests under supervision.',
    date: '2026'
  },
  {
    id: 'gal-10',
    title: 'Central Digital Library & Research Hall',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
    caption: 'Over 15,000 reference volumes, scholarly journals, and e-book terminals.',
    date: '2026'
  },
  {
    id: 'gal-11',
    title: 'National Independence Day Patriotic Parade',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    caption: 'Students dressed in green and white singing national anthems and presenting tableaus.',
    date: '2026'
  },
  {
    id: 'gal-12',
    title: 'Junior Coding & Web Programming Lab',
    category: 'Classroom',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    caption: 'Grade 6 students creating interactive Scratch games and Python scripts.',
    date: '2026'
  },
  {
    id: 'gal-13',
    title: 'Badminton & Table Tennis Tournament',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
    caption: 'Girls indoor sports championship at Model Town gymnasium.',
    date: '2026'
  },
  {
    id: 'gal-14',
    title: 'Award of Excellence to Board Top Rankers',
    category: 'Annual Day',
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1000&q=80',
    caption: 'Medalists receiving certificates of academic brilliance on stage.',
    date: '2026'
  },
  {
    id: 'gal-15',
    title: 'Qirat & Hamd Competition Finalists',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80',
    caption: 'Melodious recitations judged by certified Qaris and Islamic scholars.',
    date: '2026'
  },
  {
    id: 'gal-16',
    title: 'Model United Nations (CESS-MUN) Delegation',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    caption: 'High school delegates debating global climate policies and international diplomacy.',
    date: '2026'
  },
  {
    id: 'gal-17',
    title: 'Calligraphy & Oil Pastel Art Showcase',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1460518451282-9742118474c3?auto=format&fit=crop&w=1000&q=80',
    caption: 'Vibrant cultural motifs rendered by talented secondary art students.',
    date: '2026'
  },
  {
    id: 'gal-18',
    title: 'Gulshan Campus Smart Audio-Visual Room',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Interactive smart boards and multimedia equipment aiding daily instruction.',
    date: '2026'
  },
  {
    id: 'gal-19',
    title: 'Martial Arts & Taekwondo Belt Graduation',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=80',
    caption: 'Junior karate trainees demonstrating self-defense katas and discipline.',
    date: '2026'
  },
  {
    id: 'gal-20',
    title: 'All-Faculty Annual Academic Colloquium',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    caption: '200+ educators sharing pedagogical best practices and curriculum mapping.',
    date: '2026'
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    authorName: 'Engr. Tariq Qureshi',
    role: 'Parent',
    relationship: 'Father of Daniyal (Grade 10 Matric) & Haniya (Grade 5)',
    campus: 'Main Campus (Central)',
    quote:
      'Enrolling our children in City English School System was the best decision of our lives. Not only did my son score 96% in his Matric exams, but his respectful manners and self-confidence reflect the deep moral values instilled by Sir Muhammad Asif and his devoted teachers.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    featured: true
  },
  {
    id: 'test-2',
    authorName: 'Dr. Samina Zafar',
    role: 'Parent',
    relationship: 'Mother of Areeba (Cambridge O-Levels)',
    campus: 'Model Town Campus',
    quote:
      'The balance of modern STEM infrastructure, robotics clubs, and pristine laboratory facilities with Islamic morals is unmatched. The teachers give personalized attention to every student and keep parents updated at every milestone.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    featured: true
  },
  {
    id: 'test-3',
    authorName: 'Rayyan Asif Siddiqui',
    role: 'Alumni',
    relationship: 'Class of 2024 • Now Studying at IBA Karachi',
    campus: 'Main Campus (Central)',
    quote:
      'CESS gave me the courage to lead. From science fairs to sports championships and public debate contests, the faculty encouraged me to push my boundaries. CESS is not just a school, it is a second home.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    featured: true
  },
  {
    id: 'test-4',
    authorName: 'Mrs. Naheed Akhtar',
    role: 'Parent',
    relationship: 'Mother of Muhammad Zayd (Playgroup Montessori)',
    campus: 'Gulshan Campus',
    quote:
      'The early childhood directresses are so gentle, warm, and professional. My 4-year-old child wakes up excited for school every morning. His vocabulary, etiquette, and social friendliness have blossomed tremendously.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    featured: true
  },
  {
    id: 'test-5',
    authorName: 'Syed Hamza Nadeem',
    role: 'Student',
    relationship: 'Head Boy, Cambridge O-Levels Senior',
    campus: 'Cantt Campus',
    quote:
      'The athletic facilities and secure, green campus atmosphere make learning so refreshing. Our mentors don’t just teach for exam marks; they teach us how to solve real problems and serve society.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    featured: false
  },
  {
    id: 'test-6',
    authorName: 'Advocate Bilal Munir',
    role: 'Parent',
    relationship: 'Father of Fatima (Grade 8)',
    campus: 'Gulshan Campus',
    quote:
      'Over 35 years of legacy speaks for itself. Transparent administration, reasonable fee structure, and no compromise on academic standard. Truly commendable leadership by Sir Muhammad Asif.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    featured: false
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    studentName: 'Muhammad Rayyan Asif',
    examOrEvent: 'BISE Board Secondary Examination (Science Group)',
    scoreOrRank: '1st Position Board-Wide (1082/1100 - 98.4%)',
    year: '2025-26',
    campus: 'Main Campus (Central)',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    quote: 'Constant guidance from my teachers and my parents prayers made this gold medal possible.',
    featured: true
  },
  {
    id: 'ach-2',
    studentName: 'Zainab Fatima Farooq',
    examOrEvent: 'Cambridge International O-Levels (IGCSE)',
    scoreOrRank: '8 A*s & Straight Distinctions',
    year: '2025',
    campus: 'Model Town Campus',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    quote: 'The rigorous mock exam cycles and STEM lab sessions at CESS gave me the confidence to excel.',
    featured: true
  },
  {
    id: 'ach-3',
    studentName: 'Syed Huzaifa Ali',
    examOrEvent: 'National Inter-School Robotics & AI Olympiad',
    scoreOrRank: 'National Gold Champions (Project: Smart Solar Rover)',
    year: '2026',
    campus: 'Main Campus (Central)',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    quote: 'Engr. Noman and the CESS Robotics Hub backed our prototype from concept to victory.',
    featured: true
  },
  {
    id: 'ach-4',
    studentName: 'Maryam Bilal Siddiqui',
    examOrEvent: 'BISE Matriculation Examination (General Science)',
    scoreOrRank: '3rd Position in Karachi Board (96.8%)',
    year: '2025',
    campus: 'Gulshan Campus',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: 'Daily revision sheets and conceptual teaching cleared every hurdle in mathematics and physics.',
    featured: true
  },
  {
    id: 'ach-5',
    studentName: 'Hamza Farhan',
    examOrEvent: 'All-Pakistan Inter-Collegiate Athletics Sprint (100m & 200m)',
    scoreOrRank: 'Gold Medalist & Record Holder (10.9s)',
    year: '2026',
    campus: 'Cantt Campus',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    quote: 'Coach Waqas pushed my endurance every dawn on the Cantt track.',
    featured: false
  },
  {
    id: 'ach-6',
    studentName: 'Ayesha Noor',
    examOrEvent: 'All-Karachi Inter-School Qirat & Naat Championship',
    scoreOrRank: '1st Trophy (Governor Award)',
    year: '2025',
    campus: 'Gulshan Campus',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    quote: 'Heartfelt gratitude to our Qirat faculty for teaching authentic Tajweed with love.',
    featured: false
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I apply for admission at City English School System?',
    answer:
      'You can apply directly through our online Admission Inquiry portal or visit any of our 4 campus admission secretariats in person. After reviewing your inquiry, our team will schedule an interactive campus assessment and parental meeting.',
    category: 'Admissions',
    order: 1
  },
  {
    id: 'faq-2',
    question: 'What academic streams are offered at the secondary level?',
    answer:
      'CESS offers both the Board of Secondary Education Matriculation stream (Computer Science & Pre-Medical Biology) and the prestigious Cambridge Assessment International Education (CAIE) O-Level stream.',
    category: 'Academics',
    order: 2
  },
  {
    id: 'faq-3',
    question: 'Does CESS provide school transport facilities?',
    answer:
      'Yes, all four campuses operate modern, GPS-tracked, air-conditioned bus and van fleets with female attendants covering designated routes throughout Karachi and Lahore.',
    category: 'Transport',
    order: 3
  },
  {
    id: 'faq-4',
    question: 'Are merit or need-based scholarships available?',
    answer:
      'Yes! CESS awards up to 100% tuition scholarships for students securing 90%+ marks in board exams, along with sibling concessions and need-based financial assistance for deserving families.',
    category: 'Fee & Scholarships',
    order: 4
  },
  {
    id: 'faq-5',
    question: 'What is the student-to-teacher ratio?',
    answer:
      'We maintain an average ratio of 20:1 in secondary classes and 15:1 in Montessori and Primary classrooms to ensure individual attention and comprehensive diagnostic evaluation.',
    category: 'Campus Life',
    order: 5
  },
  {
    id: 'faq-6',
    question: 'What are the required documents at the time of admission?',
    answer:
      'Parents should bring 4 passport-size photographs of the student, copy of NADRA B-Form/Birth Certificate, copy of Parent/Guardian CNIC, previous school leaving certificate/report card, and vaccination record.',
    category: 'Admissions',
    order: 6
  },
  {
    id: 'faq-7',
    question: 'How does CESS incorporate Islamic & Moral Values?',
    answer:
      'Character development is our core pillar. Daily Nazra Quran and Tajweed, morning supplications (Dua), weekly Seerat lectures, and community service projects are integral to our routine.',
    category: 'Campus Life',
    order: 7
  }
];

export const initialPrograms: AcademicProgram[] = [
  {
    id: 'prog-preschool',
    title: 'Pre-School Montessori Wing',
    level: 'Pre-School',
    gradeRange: 'Playgroup, Nursery & Kindergarten',
    ageGroup: '2.5 to 5.5 Years',
    description:
      'A warm, sensory-rich environment blending authentic Montessori apparatus with phonics, social empathy, motor skills development, and early numeracy exploration.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    keyFeatures: ['Montessori Certified Directresses', 'Sensory & Practical Life Apparatus', 'Jolly Phonics Reading System', 'Indoor Soft Play Arena', 'Potty Training & Hygienic Care'],
    subjects: ['Sensory Exploration', 'Phonics & Speech', 'Pre-Maths & Shapes', 'Urdu Haroof-e-Tahajji', 'Islamic Moral Stories', 'Music, Movement & Art'],
    timing: '8:00 AM - 12:30 PM'
  },
  {
    id: 'prog-primary',
    title: 'Primary School (Grades 1 to 5)',
    level: 'Primary',
    gradeRange: 'Class 1 through Class 5',
    ageGroup: '6 to 10 Years',
    description:
      'Laying solid foundations in English language fluency, mathematical reasoning, scientific curiosity, digital literacy, and civic brotherhood.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    keyFeatures: ['Interactive Smartboards', 'Junior Science Lab', 'Spelling Bee & Mental Math Drills', 'Swimming & Physical Education', 'Daily Tajweed & Dua'],
    subjects: ['Oxford English', 'Urdu Adab & Qawaid', 'Mathematics', 'General Science', 'Computer & Coding', 'Social Studies & Islamiyat', 'Art & Craft'],
    timing: '7:45 AM - 1:45 PM'
  },
  {
    id: 'prog-middle',
    title: 'Middle School (Grades 6 to 8)',
    level: 'Middle',
    gradeRange: 'Class 6 through Class 8',
    ageGroup: '11 to 13 Years',
    description:
      'Bridging primary fundamentals to secondary rigor with STEM projects, analytical writing, leadership clubs, debate tournaments, and sports leagues.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    keyFeatures: ['Separate Physics/Chem/Bio Lab Access', 'Robotics & Python Intro', 'Model United Nations & Declamation', 'Inter-Campus Sports League', 'Career Aptitude Diagnostics'],
    subjects: ['Advanced English & Composition', 'Integrated Mathematics', 'Physics, Chemistry & Biology', 'Computer Science (Python & Scratch)', 'Pakistan Studies & Geography', 'Arabic / Quranic Translation'],
    timing: '7:30 AM - 2:00 PM'
  },
  {
    id: 'prog-secondary',
    title: 'Secondary School (Matric & Cambridge O-Levels)',
    level: 'Secondary',
    gradeRange: 'Grades 9 & 10 (Matric & O-Levels)',
    ageGroup: '14 to 17 Years',
    description:
      'Renowned for producing Board Toppers and Cambridge Straight A* achievers. Intensive conceptual clarity, past-paper workshops, and dedicated university entrance prep.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    keyFeatures: ['100% Board Pass Rate Tradition', 'Cambridge Assessment Registered Wing', 'Extensive Mock Examinations', 'University Admission Counseling', 'Science & Innovation Grants'],
    subjects: ['Physics', 'Chemistry', 'Biology / Computer Science', 'Mathematics / Add Maths', 'English Language & Literature', 'Pakistan Studies & Islamiyat', 'Urdu'],
    timing: '7:30 AM - 2:15 PM (Plus Afternoon Booster Clinics)'
  }
];

export const initialInquiries: AdmissionInquiry[] = [
  {
    id: 'inq-101',
    studentName: 'Zayd Ahmed Khan',
    parentName: 'Engr. Ahmed Khan',
    email: 'ahmed.khan@gmail.com',
    phone: '+92 321 9876543',
    classApplyingFor: 'Class 9 (Matric Science)',
    preferredCampus: 'Main Campus (Central)',
    previousSchool: 'Army Public School',
    message: 'Seeking admission for my son. He secured 92% in Class 8. Interested in Computer Science stream.',
    status: 'New',
    createdAt: '2026-10-22T14:30:00Z',
    adminNotes: 'High academic profile. Scheduled assessment for Saturday morning.'
  },
  {
    id: 'inq-102',
    studentName: 'Inaya Fatima',
    parentName: 'Dr. Kashif Siddiqui',
    email: 'kashif.siddiqui@yahoo.com',
    phone: '+92 300 5551234',
    classApplyingFor: 'Kindergarten (Montessori)',
    preferredCampus: 'Gulshan Campus',
    previousSchool: 'Home Tutored / Playgroup',
    message: 'We live near Disco Bakery and wish to join Gulshan campus Montessori wing.',
    status: 'Contacted',
    createdAt: '2026-10-21T09:15:00Z',
    adminNotes: 'Parent called. Invited for campus visit with child.'
  },
  {
    id: 'inq-103',
    studentName: 'Daniyal Tariq',
    parentName: 'Tariq Mehmood',
    email: 'tariq.mehmood@outlook.com',
    phone: '+92 333 4447890',
    classApplyingFor: 'Cambridge O-Level (Grade 9)',
    preferredCampus: 'Model Town Campus',
    previousSchool: 'Beaconhouse School System',
    message: 'Family recently relocated from Islamabad to Lahore Model Town.',
    status: 'Admitted',
    createdAt: '2026-10-18T11:00:00Z',
    adminNotes: 'Admission test cleared with 88%. Fee voucher issued and settled.'
  },
  {
    id: 'inq-104',
    studentName: 'Ayesha Bilal',
    parentName: 'Bilal Farooq',
    email: 'bilal.farooq@gmail.com',
    phone: '+92 345 1112233',
    classApplyingFor: 'Class 6 (Middle)',
    preferredCampus: 'Cantt Campus',
    previousSchool: 'Saint Patrick High School',
    message: 'Need bus transport from Malir Cantt. Inquiring about science lab exposure.',
    status: 'New',
    createdAt: '2026-10-22T18:20:00Z'
  },
  {
    id: 'inq-105',
    studentName: 'Muhammad Hamza',
    parentName: 'Muhammad Arshad',
    email: 'arshad.co@gmail.com',
    phone: '+92 312 8889900',
    classApplyingFor: 'Class 1 (Primary)',
    preferredCampus: 'Gulshan Campus',
    previousSchool: 'CESS Early Childhood',
    message: 'Transitioning from Kindergarten to Grade 1. Sibling already in Grade 4.',
    status: 'Admitted',
    createdAt: '2026-10-15T10:45:00Z',
    adminNotes: 'Sibling discount 20% applied.'
  },
  {
    id: 'inq-106',
    studentName: 'Rania Usman',
    parentName: 'Usman Ghani',
    email: 'usman.ghani@hotmail.com',
    phone: '+92 301 7776655',
    classApplyingFor: 'Class 10 (Matric)',
    preferredCampus: 'Main Campus (Central)',
    previousSchool: 'Federal Government Model School',
    message: 'Urgent transfer request due to father job posting.',
    status: 'Contacted',
    createdAt: '2026-10-19T13:10:00Z',
    adminNotes: 'Verification of BISE board migration certificate pending.'
  },
  {
    id: 'inq-107',
    studentName: 'Ibrahim Shah',
    parentName: 'Syed Naveed Shah',
    email: 'naveed.shah@live.com',
    phone: '+92 322 3334411',
    classApplyingFor: 'Playgroup',
    preferredCampus: 'Cantt Campus',
    message: 'Child age 3 years 2 months. Looking for nurturing playgroup directress.',
    status: 'New',
    createdAt: '2026-10-22T08:00:00Z'
  },
  {
    id: 'inq-108',
    studentName: 'Eshaal Rehan',
    parentName: 'Rehan Qadri',
    email: 'rehan.qadri@gmail.com',
    phone: '+92 334 9900112',
    classApplyingFor: 'Class 7',
    preferredCampus: 'Model Town Campus',
    message: 'Inquiring about sports coaching and karate after school hours.',
    status: 'Contacted',
    createdAt: '2026-10-20T16:00:00Z'
  },
  {
    id: 'inq-109',
    studentName: 'Abdullah Javaid',
    parentName: 'Javaid Iqbal',
    email: 'javaid.iqbal@gmail.com',
    phone: '+92 300 2233445',
    classApplyingFor: 'Class 9 (Matric Bio)',
    preferredCampus: 'Main Campus (Central)',
    message: 'Want to ensure child gets pre-medical foundation for MDCAT future.',
    status: 'New',
    createdAt: '2026-10-22T19:50:00Z'
  },
  {
    id: 'inq-110',
    studentName: 'Mustafa Nasir',
    parentName: 'Nasir Munawar',
    email: 'nasir.m@yahoo.com',
    phone: '+92 315 4455667',
    classApplyingFor: 'Class 4 (Primary)',
    preferredCampus: 'Gulshan Campus',
    message: 'Relocating from UAE back to Pakistan.',
    status: 'Rejected',
    createdAt: '2026-10-14T11:20:00Z',
    adminNotes: 'Family decided to stay in UAE for another academic session.'
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Dr. Salman Hashmi',
    email: 'dr.salman@clinic.pk',
    phone: '+92 300 1239876',
    subject: 'Campus Visit Request for Admissions',
    campus: 'Main Campus (Central)',
    message: 'I would like to schedule an appointment with the senior principal this Friday at 11 AM to see the physics and robotics laboratories.',
    read: false,
    createdAt: '2026-10-22T15:20:00Z'
  },
  {
    id: 'msg-2',
    name: 'Mrs. Fauzia Karim',
    email: 'fauzia.karim@gmail.com',
    phone: '+92 321 4455667',
    subject: 'School Bus Route Inquiry for Askari 4',
    campus: 'Cantt Campus',
    message: 'Could you please confirm if the Cantt campus van stops at Askari 4 Gate 2 during morning pickup?',
    read: true,
    createdAt: '2026-10-21T10:05:00Z'
  },
  {
    id: 'msg-3',
    name: 'Muhammad Umar (Alumnus)',
    email: 'umar.tech@gmail.com',
    phone: '+92 333 9988776',
    subject: 'Alumni Mentorship & Guest Lecture Offer',
    campus: 'Main Campus (Central)',
    message: 'I graduated from CESS in 2015 and now work as a Cloud Architect. I would love to conduct a free workshop on AI & Cloud Computing for senior students.',
    read: false,
    createdAt: '2026-10-22T17:40:00Z'
  },
  {
    id: 'msg-4',
    name: 'Mrs. Shazia Latif',
    email: 'shazia.latif@hotmail.com',
    phone: '+92 345 8877665',
    subject: 'Scholarship Details for Orphan Student',
    campus: 'Gulshan Campus',
    message: 'Writing on behalf of a bright student in our neighborhood who lost his father. How can we apply for the Sir Muhammad Asif Welfare Scholarship?',
    read: true,
    createdAt: '2026-10-20T12:00:00Z'
  },
  {
    id: 'msg-5',
    name: 'Engr. Asadullah',
    email: 'asadullah@engg.org',
    phone: '+92 302 3344556',
    subject: 'Inter-School Robotics Competition Invitation',
    campus: 'Model Town Campus',
    message: 'Our university robotics society is hosting a national youth robotics challenge and we enthusiastically invite CESS teams.',
    read: true,
    createdAt: '2026-10-19T09:30:00Z'
  },
  {
    id: 'msg-6',
    name: 'Farah Naz',
    email: 'farah.naz@gmail.com',
    phone: '+92 313 1122334',
    subject: 'Faculty Job Application - Mathematics Lecturer',
    campus: 'Cantt Campus',
    message: 'I have completed M.Sc. Mathematics with 7 years teaching experience in reputed Cambridge schools. Resumed sent via email.',
    read: false,
    createdAt: '2026-10-22T11:15:00Z'
  },
  {
    id: 'msg-7',
    name: 'Kamran Baig',
    email: 'kamran.baig@yahoo.com',
    phone: '+92 336 7788990',
    subject: 'Uniform & Book Shop Timings',
    campus: 'Gulshan Campus',
    message: 'Are the campus bookstall and uniform supplier open on Saturday afternoons for winter jacket purchases?',
    read: true,
    createdAt: '2026-10-18T14:10:00Z'
  },
  {
    id: 'msg-8',
    name: 'Advocate Tahir Mehmood',
    email: 'tahir.law@gmail.com',
    phone: '+92 300 4455112',
    subject: 'Appreciation to Faculty & Chairman',
    campus: 'Main Campus (Central)',
    message: 'Heartfelt compliments to Sir Muhammad Asif and the faculty for organizing such a grand Seerat conference. Extremely proud to be a CESS parent.',
    read: true,
    createdAt: '2026-10-17T16:45:00Z'
  }
];

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'admin-1',
    name: 'Sir Muhammad Asif (Chairman)',
    email: 'asif@cess.edu.pk',
    role: 'Super Admin',
    lastLogin: '2026-10-22T21:40:00Z',
    active: true
  },
  {
    id: 'admin-2',
    name: 'Central Admin Officer',
    email: 'admin@cess.edu.pk',
    role: 'Super Admin',
    lastLogin: '2026-10-22T20:10:00Z',
    active: true
  },
  {
    id: 'admin-3',
    name: 'Admissions Coordinator',
    email: 'admissions@cess.edu.pk',
    role: 'Editor',
    lastLogin: '2026-10-22T18:00:00Z',
    active: true
  }
];
