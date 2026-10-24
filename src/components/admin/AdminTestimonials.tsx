import React, { useState } from 'react';
import { MessageSquareQuote, Plus, Edit, Trash2, Star, X } from 'lucide-react';
import { Testimonial } from '../../types';
import { dataService } from '../../services/dataService';

interface AdminTestimonialsProps {
  testimonials: Testimonial[];
}

export const AdminTestimonials: React.FC<AdminTestimonialsProps> = ({ testimonials }) => {
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleNew = () => {
    setEditingItem({
      id: `test-${Date.now()}`,
      authorName: '',
      role: 'Parent',
      relationship: 'Father of Grade 7 Student',
      campus: 'Main Campus (Central)',
      quote: '',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      featured: true
    });
    setIsNew(true);
  };

  const handleEdit = (item: Testimonial) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    dataService.saveTestimonial(editingItem);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      dataService.deleteTestimonial(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
            Parent & Alumni Testimonials ({testimonials.length})
          </h2>
          <p className="text-xs text-slate-500">
            Showcase reviews, ratings, and quotes from community stakeholders.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#8B0A8C]" />
          <span>Add New Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 shadow-xs border border-purple-100 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={item.avatarUrl}
                  alt={item.authorName}
                  className="w-12 h-12 rounded-full object-cover border border-[#FFC107]"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#2D0A3E]">{item.authorName}</h4>
                  <div className="text-xs text-[#8B0A8C] font-semibold">{item.role} • {item.campus}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#FFC107]">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FFC107]" />
                ))}
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 italic">
                "{item.quote}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">{item.relationship}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1 rounded-md text-[#8B0A8C] hover:bg-purple-50"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 rounded-md text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <h3 className="font-heading font-bold text-base text-[#2D0A3E]">
                {isNew ? 'Add Review' : 'Edit Review'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.authorName}
                  onChange={(e) => setEditingItem({ ...editingItem, authorName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role *</label>
                  <select
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-white"
                  >
                    <option value="Parent">Parent</option>
                    <option value="Student">Student</option>
                    <option value="Alumni">Alumni</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingItem.rating}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Relationship / Details</label>
                <input
                  type="text"
                  value={editingItem.relationship}
                  onChange={(e) => setEditingItem({ ...editingItem, relationship: e.target.value })}
                  placeholder="e.g. Father of Daniyal (Grade 10)"
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campus</label>
                <input
                  type="text"
                  value={editingItem.campus}
                  onChange={(e) => setEditingItem({ ...editingItem, campus: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.quote}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={editingItem.avatarUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, avatarUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
