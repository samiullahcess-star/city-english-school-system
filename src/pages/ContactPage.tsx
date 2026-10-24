import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Building2,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MessageSquare
} from 'lucide-react';
import { SiteSettings, Campus } from '../types';
import { dataService } from '../services/dataService';

interface ContactPageProps {
  settings: SiteSettings;
  campuses: Campus[];
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, campuses }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    campus: campuses[0]?.name || 'Main Campus (Central)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    dataService.createMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || 'General Inquiry',
      campus: formData.campus,
      message: formData.message
    });

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      campus: campuses[0]?.name || 'Main Campus (Central)',
      message: ''
    });
  };

  return (
    <div className="bg-[#F7F3F9] min-h-screen">
      {/* Banner */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
            <span>Always Accessible</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Contact CESS Secretariats
          </h1>
          <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base">
            Have questions regarding admissions, academics, or school transport? We welcome your visit and inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Contact Form and Main Central Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-purple-100">
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-[#8B0A8C] uppercase tracking-wider">
                Direct Communication
              </span>
              <h3 className="font-heading font-bold text-2xl text-[#2D0A3E]">
                Send Us an Official Message
              </h3>
              <p className="text-xs text-slate-500">
                Messages are routed immediately to the designated campus principal and administration secretariat.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-bold text-lg text-emerald-900">
                  Message Dispatched Successfully!
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you for reaching out. A campus administration representative will reply via email or phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-[#8B0A8C] bg-white border border-purple-200 hover:bg-purple-50 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Salman Hashmi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. salman@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Campus *
                    </label>
                    <select
                      value={formData.campus}
                      onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-white"
                    >
                      {campuses.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Appointment Request with Senior Principal"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please write your detailed message or feedback..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-xs sm:text-sm focus:border-[#8B0A8C] focus:outline-hidden bg-purple-50/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#8B0A8C]" />
                  <span>Send Message to Secretariat</span>
                </button>
              </form>
            )}
          </div>

          {/* Central Contact Info & Timings (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-6">
              <h3 className="font-heading font-bold text-xl text-[#2D0A3E]">
                Central Secretariat
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#8B0A8C] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#8B0A8C]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2D0A3E]">Central Headquarters:</div>
                    <div className="text-slate-600">{settings.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#8B0A8C] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#8B0A8C]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2D0A3E]">Helplines:</div>
                    <div>{settings.phone} / {settings.alternatePhone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#8B0A8C] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#8B0A8C]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2D0A3E]">Official Inquiries:</div>
                    <div>{settings.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#8B0A8C] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#8B0A8C]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2D0A3E]">Office Hours:</div>
                    <div className="text-slate-600">{settings.workingHours}</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-purple-100">
                <div className="text-xs font-bold text-[#2D0A3E] mb-3">
                  Follow CESS Digital Channels:
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-purple-50 text-[#8B0A8C] hover:bg-[#8B0A8C] hover:text-white flex items-center justify-center transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-purple-50 text-[#8B0A8C] hover:bg-[#8B0A8C] hover:text-white flex items-center justify-center transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={settings.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-purple-50 text-[#8B0A8C] hover:bg-[#8B0A8C] hover:text-white flex items-center justify-center transition-all"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-purple-50 text-[#8B0A8C] hover:bg-[#8B0A8C] hover:text-white flex items-center justify-center transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All 4 Campuses Contact Grid */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-2xl text-[#2D0A3E]">
              All 4 Campus Secretariats & Telephone Extensions
            </h3>
            <div className="w-16 h-1 bg-[#FFC107] rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campuses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs hover:border-[#8B0A8C] transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-base text-[#2D0A3E]">
                    {c.name}
                  </h4>
                  <Building2 className="w-4 h-4 text-[#FFC107]" />
                </div>
                <div className="text-xs text-slate-600 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8B0A8C] shrink-0 mt-0.5" />
                  <span>{c.address}</span>
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8B0A8C] shrink-0" />
                  <a href={`tel:${c.phone}`} className="hover:text-[#8B0A8C]">
                    {c.phone}
                  </a>
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#8B0A8C] shrink-0" />
                  <a href={`mailto:${c.email}`} className="hover:text-[#8B0A8C] truncate">
                    {c.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Map Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#8B0A8C]" />
            <h3 className="font-heading font-bold text-xl text-[#2D0A3E]">
              Interactive Campus Directions
            </h3>
          </div>
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-purple-100 bg-slate-100">
            <iframe
              src={campuses[0]?.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115809.52909402506!2d67.01358942542472!3d24.8607343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e70a31f45a9%3A0x25e5a43e002133f8!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000'}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CESS Map"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
