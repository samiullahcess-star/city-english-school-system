import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Shield,
  ArrowRight,
  Heart,
  Send,
  Lock
} from 'lucide-react';
import { CESSLogo } from './CESSLogo';
import { SiteSettings, Campus } from '../../types';

interface FooterProps {
  settings: SiteSettings;
  campuses: Campus[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, campuses, onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#2D0A3E] text-slate-300 relative overflow-hidden border-t-4 border-[#FFC107]">
      {/* Decorative top pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FFC107_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: School Identity & Founder (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-hidden"
            >
              <CESSLogo variant="light" size="lg" />
            </button>
            <p className="text-sm text-purple-200/90 leading-relaxed">
              Established in 1990 by Founder & Chairman <strong>Sir Muhammad Asif</strong>, City English School System has stood as a bastion of holistic education, blending academic rigor with moral character across 4 dynamic campuses.
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#FFC107] mb-2">
                Connect With Us
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-purple-900/60 hover:bg-[#8B0A8C] text-purple-200 hover:text-white flex items-center justify-center transition-all border border-purple-700/50 hover:scale-110"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-purple-900/60 hover:bg-[#8B0A8C] text-purple-200 hover:text-white flex items-center justify-center transition-all border border-purple-700/50 hover:scale-110"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg bg-purple-900/60 hover:bg-[#8B0A8C] text-purple-200 hover:text-white flex items-center justify-center transition-all border border-purple-700/50 hover:scale-110"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-purple-900/60 hover:bg-[#8B0A8C] text-purple-200 hover:text-white flex items-center justify-center transition-all border border-purple-700/50 hover:scale-110"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Accreditations */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-900/70 border border-purple-700/50 text-purple-200">
                <Shield className="w-3.5 h-3.5 text-[#FFC107]" />
                BISE Registered
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-900/70 border border-purple-700/50 text-purple-200">
                <Shield className="w-3.5 h-3.5 text-[#FFC107]" />
                CAIE Cambridge
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-900/70 border border-purple-700/50 text-purple-200">
                <Shield className="w-3.5 h-3.5 text-[#FFC107]" />
                Montessori Certified
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-bold text-white text-base relative inline-block">
              Quick Links
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-[#FFC107] rounded-full" />
            </h4>
            <ul className="space-y-2 text-sm text-purple-200/90 pt-1">
              {[
                { id: 'about', label: 'About CESS' },
                { id: 'campuses', label: 'Our 4 Campuses' },
                { id: 'academics', label: 'Academic Levels' },
                { id: 'admissions', label: 'Admission Policy' },
                { id: 'faculty', label: 'Faculty Directory' },
                { id: 'results', label: 'Board Toppers' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'news', label: 'News & Events' },
                { id: 'contact', label: 'Contact Secretariats' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#FFC107] transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-[#FFC107] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our 4 Campuses Addresses (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-white text-base relative inline-block">
              Our 4 Campuses
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-[#FFC107] rounded-full" />
            </h4>
            <div className="space-y-3.5 text-xs text-purple-200/90 pt-1">
              {campuses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigate('campuses', { campusId: c.id })}
                  className="p-2.5 rounded-lg bg-purple-900/40 border border-purple-800/40 hover:border-[#FFC107]/50 hover:bg-purple-900/70 transition-all cursor-pointer group"
                >
                  <div className="font-heading font-bold text-[#FFC107] group-hover:text-amber-300 flex items-center justify-between">
                    <span>{c.name}</span>
                    <span className="text-[10px] text-purple-300">{c.establishedYear}</span>
                  </div>
                  <div className="flex items-start gap-1.5 mt-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-purple-300 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{c.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-purple-300">
                    <Phone className="w-3 h-3 text-[#FFC107]" />
                    <span>{c.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter & Contact Secretariat (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-white text-base relative inline-block">
              Newsletter & Inquiries
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-[#FFC107] rounded-full" />
            </h4>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              Subscribe to receive admission alerts, event updates, and the quarterly CESS Gazette.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-purple-950/80 border border-purple-700/60 text-xs text-white placeholder-purple-300/50 focus:outline-hidden focus:border-[#FFC107]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-[#FFC107] hover:bg-amber-400 text-[#2D0A3E] rounded-md transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {newsletterSubscribed && (
                <div className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-sm border border-emerald-800">
                  Thank you! You are now subscribed to the CESS Gazette.
                </div>
              )}
            </form>

            <div className="pt-2 border-t border-purple-800/50 space-y-1.5 text-xs text-purple-200/90">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FFC107]" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
                <a href={`tel:${settings.alternatePhone}`} className="hover:text-white transition-colors">
                  {settings.alternatePhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>Mon - Sat: 7:30 AM - 2:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin login */}
        <div className="mt-12 pt-6 border-t border-purple-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/80">
          <p className="text-center sm:text-left">
            {settings.footerText}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-[#FFC107] transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-purple-600">•</span>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-[#FFC107] transition-colors"
            >
              Terms of Admission
            </button>
            <span className="text-purple-600">•</span>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-[#FFC107] transition-colors flex items-center gap-1 font-semibold text-amber-400"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
