import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Check, X, Image as ImageIcon, Sliders } from 'lucide-react';
import { HeroSlide } from '../../types';
import { dataService } from '../../services/dataService';

interface AdminHeroSlidesProps {
  slides: HeroSlide[];
}

export const AdminHeroSlides: React.FC<AdminHeroSlidesProps> = ({ slides }) => {
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide({ ...slide });
    setIsNew(false);
  };

  const handleNew = () => {
    setEditingSlide({
      id: `slide-${Date.now()}`,
      headline: '',
      subtext: '',
      primaryButtonText: 'Apply For Admission',
      primaryButtonLink: '/admissions',
      secondaryButtonText: 'Explore Campuses',
      secondaryButtonLink: '/campuses',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=85',
      badgeText: 'Admissions Open',
      active: true,
      order: slides.length + 1
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    dataService.saveHeroSlide(editingSlide);
    setEditingSlide(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this hero slide?')) {
      dataService.deleteHeroSlide(id);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingSlide) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditingSlide({ ...editingSlide, imageUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
            Homepage Hero Slider Manager
          </h2>
          <p className="text-xs text-slate-500">
            Customize main banners, headlines, call-to-action buttons, and backgrounds.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#8B0A8C]" />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-2xl overflow-hidden shadow-xs border border-purple-100 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                <img
                  src={slide.imageUrl}
                  alt={slide.headline}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    slide.active ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                  }`}
                >
                  {slide.active ? 'Active' : 'Draft'}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#FFC107] text-[#2D0A3E] px-2 py-0.5 rounded-md">
                  Order: #{slide.order}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-heading font-bold text-sm text-white line-clamp-1">
                    {slide.headline}
                  </h3>
                </div>
              </div>

              <div className="p-4 space-y-2 text-xs">
                <p className="text-slate-600 line-clamp-2">
                  {slide.subtext}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="bg-purple-50 text-[#8B0A8C] px-2 py-0.5 rounded-sm font-semibold">
                    Primary: {slide.primaryButtonText}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm font-semibold">
                    Secondary: {slide.secondaryButtonText}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-purple-50 flex items-center justify-end gap-2 bg-[#F7F3F9]">
              <button
                onClick={() => handleEdit(slide)}
                className="p-1.5 rounded-lg bg-purple-50 hover:bg-[#8B0A8C] text-[#8B0A8C] hover:text-white transition-colors"
                title="Edit Slide"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(slide.id)}
                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors"
                title="Delete Slide"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / New Modal */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                {isNew ? 'Create New Hero Slide' : 'Edit Hero Slide'}
              </h3>
              <button onClick={() => setEditingSlide(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline Text *</label>
                <input
                  type="text"
                  required
                  value={editingSlide.headline}
                  onChange={(e) => setEditingSlide({ ...editingSlide, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs font-semibold focus:border-[#8B0A8C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtext / Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingSlide.subtext}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtext: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge Text (Optional)</label>
                  <input
                    type="text"
                    value={editingSlide.badgeText || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, badgeText: e.target.value })}
                    placeholder="e.g. Admissions Open 2026-27"
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Slide Order (#)</label>
                  <input
                    type="number"
                    value={editingSlide.order}
                    onChange={(e) => setEditingSlide({ ...editingSlide, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Button Text</label>
                  <input
                    type="text"
                    value={editingSlide.primaryButtonText}
                    onChange={(e) => setEditingSlide({ ...editingSlide, primaryButtonText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Button Link</label>
                  <input
                    type="text"
                    value={editingSlide.primaryButtonLink}
                    onChange={(e) => setEditingSlide({ ...editingSlide, primaryButtonLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Secondary Button Text</label>
                  <input
                    type="text"
                    value={editingSlide.secondaryButtonText}
                    onChange={(e) => setEditingSlide({ ...editingSlide, secondaryButtonText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Secondary Button Link</label>
                  <input
                    type="text"
                    value={editingSlide.secondaryButtonLink}
                    onChange={(e) => setEditingSlide({ ...editingSlide, secondaryButtonLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Image URL & File Upload */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Slide Image (URL or Upload)</label>
                <input
                  type="text"
                  value={editingSlide.imageUrl}
                  onChange={(e) => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-[#8B0A8C] hover:file:bg-purple-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="slideActive"
                  checked={editingSlide.active}
                  onChange={(e) => setEditingSlide({ ...editingSlide, active: e.target.checked })}
                  className="rounded-sm text-[#8B0A8C] focus:ring-[#8B0A8C]"
                />
                <label htmlFor="slideActive" className="font-bold text-slate-700 cursor-pointer">
                  Display this slide on live homepage
                </label>
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
