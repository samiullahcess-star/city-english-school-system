import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, Trophy, Sparkles, X, MapPin, Clock } from 'lucide-react';
import { NewsEvent } from '../../types';
import { dataService } from '../../services/dataService';
import { useToast } from '../common/Toast';

interface AdminNewsProps {
  news: NewsEvent[];
}

export const AdminNews: React.FC<AdminNewsProps> = ({ news }) => {
  const { showToast } = useToast();
  const [editingEvent, setEditingEvent] = useState<NewsEvent | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleNew = () => {
    setEditingEvent({
      id: `event-${Date.now()}`,
      title: '',
      category: 'Celebration',
      date: new Date().toISOString().slice(0, 10),
      time: '10:00 AM - 1:00 PM',
      venue: 'Main Campus Grand Auditorium',
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80',
      excerpt: '',
      content: '',
      featured: false,
      chiefGuest: '',
      honourableGuest: '',
      tags: ['CESS', 'Events']
    });
    setIsNew(true);
  };

  const handleEdit = (item: NewsEvent) => {
    setEditingEvent({ ...item });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    dataService.saveNewsEvent(editingEvent);
    showToast(isNew ? 'Event Published' : 'Event Updated', `${editingEvent.title} published to live bulletin`, 'success');
    setEditingEvent(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this news circular/event?')) {
      dataService.deleteNewsEvent(id);
      showToast('Event Deleted', 'Circular removed from school records', 'error');
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingEvent) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditingEvent({ ...editingEvent, imageUrl: reader.result });
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
            News, Events & Circulars ({news.length})
          </h2>
          <p className="text-xs text-slate-500">
            Publish academic announcements, sports galas, and dignitary convocation posters.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#8B0A8C]" />
          <span>Publish New Event / Circular</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-xs border border-purple-100 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-[#8B0A8C] px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-bold text-[#2D0A3E] bg-[#FFC107] px-2 py-0.5 rounded-md">
                  {new Date(item.date).toLocaleDateString()}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-heading font-bold text-sm text-white line-clamp-1">{item.title}</h3>
                </div>
              </div>

              <div className="p-4 space-y-2 text-xs">
                <p className="text-slate-600 line-clamp-2">{item.excerpt}</p>
                {(item.chiefGuest || item.honourableGuest) && (
                  <div className="p-2 rounded-lg bg-purple-50 text-[11px] text-purple-900 space-y-0.5">
                    {item.chiefGuest && <div><strong>Chief Guest:</strong> {item.chiefGuest}</div>}
                    {item.honourableGuest && <div><strong>Hon. Guest:</strong> {item.honourableGuest}</div>}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-purple-50 bg-[#F7F3F9] flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500">
                {item.featured ? '★ Featured Flagship' : 'Standard Event'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg bg-purple-50 hover:bg-[#8B0A8C] text-[#8B0A8C] hover:text-white transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / New Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                {isNew ? 'Create Event / Circular' : `Edit: ${editingEvent.title}`}
              </h3>
              <button onClick={() => setEditingEvent(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] font-semibold text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-white text-xs font-semibold"
                  >
                    <option value="Celebration">Celebration</option>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Event">Event</option>
                    <option value="Announcement">Announcement</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time (Optional)</label>
                  <input
                    type="text"
                    value={editingEvent.time || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    placeholder="10:00 AM - 1:00 PM"
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Venue</label>
                <input
                  type="text"
                  value={editingEvent.venue || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  placeholder="e.g. CESS Central Auditorium, Main Campus"
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                />
              </div>

              {/* Dignitaries Fields */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                <div>
                  <label className="block font-bold text-[#8B0A8C] mb-1">Chief Guest (Optional)</label>
                  <input
                    type="text"
                    value={editingEvent.chiefGuest || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, chiefGuest: e.target.value })}
                    placeholder="e.g. Prof. Dr. Ahsan Rauf (Vice Chancellor)"
                    className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#8B0A8C] mb-1">Honourable Guest (Optional)</label>
                  <input
                    type="text"
                    value={editingEvent.honourableGuest || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, honourableGuest: e.target.value })}
                    placeholder="e.g. Justice (R) Tariq Mahmood"
                    className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={editingEvent.excerpt}
                  onChange={(e) => setEditingEvent({ ...editingEvent, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Circular / Article Content</label>
                <textarea
                  rows={4}
                  value={editingEvent.content}
                  onChange={(e) => setEditingEvent({ ...editingEvent, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Poster Image (URL or Upload)</label>
                <input
                  type="text"
                  value={editingEvent.imageUrl}
                  onChange={(e) => setEditingEvent({ ...editingEvent, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs mb-2"
                />
                <input type="file" accept="image/*" onChange={handleImageFileChange} className="block w-full text-[11px] text-slate-500" />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="eventFeatured"
                  checked={editingEvent.featured}
                  onChange={(e) => setEditingEvent({ ...editingEvent, featured: e.target.checked })}
                  className="rounded-sm text-[#8B0A8C]"
                />
                <label htmlFor="eventFeatured" className="font-bold text-slate-700 cursor-pointer">
                  Feature as Flagship Banner on Homepage
                </label>
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
