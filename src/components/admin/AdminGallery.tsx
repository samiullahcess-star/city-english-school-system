import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Edit, Trash2, X } from 'lucide-react';
import { GalleryItem } from '../../types';
import { dataService } from '../../services/dataService';
import { useToast } from '../common/Toast';

interface AdminGalleryProps {
  gallery: GalleryItem[];
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({ gallery }) => {
  const { showToast } = useToast();
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleNew = () => {
    setEditingItem({
      id: `gal-${Date.now()}`,
      title: '',
      category: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80',
      caption: '',
      date: '2026'
    });
    setIsNew(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    dataService.saveGalleryItem(editingItem);
    showToast(isNew ? 'Photo Added' : 'Photo Updated', `${editingItem.title} saved to gallery`, 'success');
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this photo from gallery?')) {
      dataService.deleteGalleryItem(id);
      showToast('Photo Removed', 'Image deleted from gallery', 'error');
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditingItem({ ...editingItem, imageUrl: reader.result });
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
            Photo Gallery Manager ({gallery.length} Photos)
          </h2>
          <p className="text-xs text-slate-500">
            Organize campus albums into Events, Sports, Campus, Classroom, and Annual Day.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#8B0A8C]" />
          <span>Upload New Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-xs border border-purple-100 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-40 bg-slate-900 overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 text-[10px] font-bold bg-[#FFC107] text-[#2D0A3E] px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-3">
                <h4 className="font-heading font-bold text-xs text-[#2D0A3E] truncate">{item.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{item.caption}</p>
              </div>
            </div>

            <div className="p-2 border-t border-purple-50 flex items-center justify-end gap-1 bg-[#F7F3F9]">
              <button
                onClick={() => handleEdit(item)}
                className="p-1.5 rounded-lg text-[#8B0A8C] hover:bg-purple-100"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <h3 className="font-heading font-bold text-base text-[#2D0A3E]">
                {isNew ? 'Add Photo to Gallery' : 'Edit Photo Details'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Album Category *</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-white"
                >
                  <option value="Events">Events</option>
                  <option value="Sports">Sports</option>
                  <option value="Campus">Campus</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Annual Day">Annual Day</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={editingItem.caption}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image (URL or Upload)</label>
                <input
                  type="text"
                  value={editingItem.imageUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] mb-1"
                />
                <input type="file" accept="image/*" onChange={handleImageFileChange} className="block w-full text-[11px] text-slate-500" />
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
