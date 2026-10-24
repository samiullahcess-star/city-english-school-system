import React, { useState } from 'react';
import {
  Settings,
  Save,
  RotateCcw,
  CheckCircle,
  Shield,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Users,
  Upload,
  Image as ImageIcon,
  Trash2,
  Info,
  Eye
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { dataService } from '../../services/dataService';
import { useToast } from '../common/Toast';
import { CESSLogo } from '../common/CESSLogo';

interface AdminSettingsProps {
  settings: SiteSettings;
  onRefresh: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onRefresh }) => {
  const { showToast } = useToast();
  const [form, setForm] = useState<SiteSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Invalid File', 'Please select an image file (PNG, JPG, SVG, WebP)', 'error');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast('File Too Large', 'Please upload a logo image smaller than 2MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setForm((prev) => ({ ...prev, logoUrl: result }));
      showToast('Logo Preview Ready', 'Logo loaded! Click "Save All Site Settings" to broadcast across the site.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    setForm((prev) => ({ ...prev, logoUrl: '' }));
    showToast('Reset to Official Crest', 'Cleared custom logo. Click "Save All Site Settings" to apply.', 'info');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.saveSettings(form);
    setSavedSuccess(true);
    showToast('Settings Saved', 'Site configuration and SEO settings updated live', 'success');
    setTimeout(() => setSavedSuccess(false), 3000);
    onRefresh();
  };

  const handleResetDefaults = () => {
    if (
      confirm(
        'Are you sure you want to restore the default dataset? All custom edits to hero slides, campuses, news, and inquiries will be reset to the original seeds.'
      )
    ) {
      dataService.resetToDefaults();
      setForm(dataService.getSettings());
      setSavedSuccess(true);
      showToast('Database Reset', 'Restored all seed data to pristine defaults', 'info');
      setTimeout(() => setSavedSuccess(false), 3000);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
            Global Institution & SEO Settings
          </h2>
          <p className="text-xs text-slate-500">
            Changes made here update the public website and headers instantly in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Seeds</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Site settings successfully updated and broadcast to all live pages!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
            School Identity & Branding
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official School Name *</label>
              <input
                type="text"
                required
                value={form.schoolName}
                onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Short Name / Monogram *</label>
              <input
                type="text"
                required
                value={form.shortName}
                onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Established Year</label>
              <input
                type="number"
                value={form.establishedYear}
                onChange={(e) => setForm({ ...form, establishedYear: parseInt(e.target.value) || 1990 })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">School Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
            />
          </div>
        </div>

        {/* School Logo & Crest Management */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#8B0A8C] flex items-center justify-center">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                  School Logo & Crest Customization
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Upload your school's logo image or provide an image link. When left empty, the site automatically displays the official CESS heraldic crest SVG.
              </p>
            </div>

            {form.logoUrl && (
              <button
                type="button"
                onClick={handleResetLogo}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Revert to Official Crest</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Options */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Option 1: Upload Logo File (PNG, JPG, SVG, WebP)
                </label>
                <label className="border-2 border-dashed border-purple-200 hover:border-[#8B0A8C] bg-purple-50/40 hover:bg-purple-50/70 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#8B0A8C] group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700">Click to browse or drop logo file</span>
                  <span className="text-[11px] text-slate-400">Max size 2MB • Transparent PNG or SVG recommended</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Option 2: Direct Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/images/school-logo.png"
                  value={form.logoUrl || ''}
                  onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Paste any hosted image URL (e.g. from your cloud storage, CDN, or website).
                </span>
              </div>
            </div>

            {/* Live Previews */}
            <div className="bg-[#FAF7FC] p-4 sm:p-5 rounded-2xl border border-purple-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D0A3E]">
                <Eye className="w-4 h-4 text-[#8B0A8C]" />
                <span>Live Logo Preview Across App Themes</span>
              </div>

              {/* Light Theme Preview (Navbar / Header) */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Header / Light Navbar Appearance
                </div>
                <div className="flex items-center justify-between">
                  <CESSLogo logoUrl={form.logoUrl} size="md" />
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-[#8B0A8C] font-semibold">
                    {form.logoUrl ? 'Custom Logo Active' : 'Default Crest'}
                  </span>
                </div>
              </div>

              {/* Dark Theme Preview (Footer / Portal) */}
              <div className="bg-[#2D0A3E] p-3.5 rounded-xl border border-purple-900 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300/70 mb-2">
                  Footer & Portal / Dark Background Appearance
                </div>
                <CESSLogo logoUrl={form.logoUrl} variant="light" size="md" />
              </div>

              {/* Compact Shield Only */}
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium text-[11px]">Favicon & Shield-Only View:</span>
                <CESSLogo logoUrl={form.logoUrl} variant="shield-only" size="sm" />
              </div>
            </div>
          </div>

          {/* Quick Help Guide */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Info className="w-4 h-4 shrink-0" />
              <span>Two Ways to Change the School Logo</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 text-[11px]">
              <li>
                <strong>Method 1 (Instant / No Code):</strong> Upload an image or paste a URL above, then click <em>"Save All Site Settings"</em>. It immediately updates the navbar, footer, admin sidebar, and login page.
              </li>
              <li>
                <strong>Method 2 (In Code / Developer):</strong> Customize the vector SVG crest or default assets in file <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[10px]">src/components/common/CESSLogo.tsx</code> or replace files in <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[10px]">public/</code>.
              </li>
            </ul>
          </div>
        </div>

        {/* Homepage Numbers / Stats Counters */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
            Homepage Highlight Statistics (The 5 Fact Counters)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Years of Excellence</label>
              <input
                type="text"
                value={form.yearsOfExcellence}
                onChange={(e) => setForm({ ...form, yearsOfExcellence: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Campuses</label>
              <input
                type="text"
                value={form.totalCampuses}
                onChange={(e) => setForm({ ...form, totalCampuses: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Teachers</label>
              <input
                type="text"
                value={form.totalTeachers}
                onChange={(e) => setForm({ ...form, totalTeachers: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Students</label>
              <input
                type="text"
                value={form.totalStudents}
                onChange={(e) => setForm({ ...form, totalStudents: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Matric Pass Ratio</label>
              <input
                type="text"
                value={form.matricPassRate}
                onChange={(e) => setForm({ ...form, matricPassRate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] font-bold"
              />
            </div>
          </div>
        </div>

        {/* Founder's Profile & Message */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
            Founder & Chairman Profile (Sir Muhammad Asif)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Founder Full Name *</label>
              <input
                type="text"
                value={form.founderName}
                onChange={(e) => setForm({ ...form, founderName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Founder Title</label>
              <input
                type="text"
                value={form.founderTitle}
                onChange={(e) => setForm({ ...form, founderTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">Founder Photo URL</label>
            <input
              type="text"
              value={form.founderPhoto}
              onChange={(e) => setForm({ ...form, founderPhoto: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">Founder's Official Welcome Message *</label>
            <textarea
              rows={4}
              value={form.founderMessage}
              onChange={(e) => setForm({ ...form, founderMessage: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
            />
          </div>
        </div>

        {/* Central Communications & WhatsApp */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
            Central Contact & Helplines
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Alternate Helpline</label>
              <input
                type="text"
                value={form.alternatePhone}
                onChange={(e) => setForm({ ...form, alternatePhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Floating Number</label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                placeholder="e.g. +923001234567"
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">General Inquiries Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Admissions Secretariat Email</label>
              <input
                type="email"
                value={form.admissionsEmail}
                onChange={(e) => setForm({ ...form, admissionsEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">Headquarters Physical Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">Secretariat Working Hours</label>
            <input
              type="text"
              value={form.workingHours}
              onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
            />
          </div>
        </div>

        {/* Social Media Links & SEO */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
            Social Channels & SEO Meta
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Facebook URL</label>
              <input
                type="text"
                value={form.facebookUrl}
                onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Instagram URL</label>
              <input
                type="text"
                value={form.instagramUrl}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">YouTube Channel URL</label>
              <input
                type="text"
                value={form.youtubeUrl}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">SEO Title Tag</label>
            <input
              type="text"
              value={form.seoTitle}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">SEO Meta Description</label>
            <textarea
              rows={2}
              value={form.seoDescription}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">Footer Copyright Text</label>
            <input
              type="text"
              value={form.footerText}
              onChange={(e) => setForm({ ...form, footerText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 sticky bottom-4 z-20">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl font-heading font-bold text-sm text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
          >
            <Save className="w-4 h-4 text-[#8B0A8C]" />
            <span>Save All Site Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
