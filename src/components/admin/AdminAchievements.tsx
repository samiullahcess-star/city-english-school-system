import React, { useState } from 'react';
import { Trophy, Plus, Edit, Trash2, Star, X } from 'lucide-react';
import { Achievement } from '../../types';
import { dataService } from '../../services/dataService';

interface AdminAchievementsProps {
  achievements: Achievement[];
}

export const AdminAchievements: React.FC<AdminAchievementsProps> = ({ achievements }) => {
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleNew = () => {
    setEditingItem({
      id: `ach-${Date.now()}`,
      studentName: '',
      examOrEvent: 'BISE Secondary Board Exam (Science)',
      scoreOrRank: '1st Position Board-Wide (98.4%)',
      year: '2026',
      campus: 'Main Campus (Central)',
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      quote: '',
      featured: true
    });
    setIsNew(true);
  };

  const handleEdit = (item: Achievement) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    dataService.saveAchievement(editingItem);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this topper record?')) {
      dataService.deleteAchievement(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
            Board Toppers & Achievements ({achievements.length})
          </h2>
          <p className="text-xs text-slate-500">
            Publish board position holders, Cambridge straight A*s, and national Olympiad trophies.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#8B0A8C]" />
          <span>Add New Topper / Award</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 shadow-xs border border-purple-100 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={item.photoUrl}
                  alt={item.studentName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#FFC107]"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#2D0A3E]">{item.studentName}</h4>
                  <div className="text-xs text-[#8B0A8C] font-semibold">{item.campus}</div>
                  <div className="text-[10px] text-slate-400">Year: {item.year}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                {item.scoreOrRank}
              </div>

              <div className="text-xs text-slate-600">
                {item.examOrEvent}
              </div>

              {item.quote && (
                <p className="text-[11px] italic text-slate-500 line-clamp-2">
                  "{item.quote}"
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="p-1.5 rounded-lg text-[#8B0A8C] hover:bg-purple-50"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
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
                {isNew ? 'Add Topper Record' : 'Edit Achievement'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.studentName}
                  onChange={(e) => setEditingItem({ ...editingItem, studentName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Position / Score Rank *</label>
                <input
                  type="text"
                  required
                  value={editingItem.scoreOrRank}
                  onChange={(e) => setEditingItem({ ...editingItem, scoreOrRank: e.target.value })}
                  placeholder="e.g. 1st Position Board-Wide (1082/1100 - 98.4%)"
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Examination / Event *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.examOrEvent}
                    onChange={(e) => setEditingItem({ ...editingItem, examOrEvent: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Year / Session</label>
                  <input
                    type="text"
                    value={editingItem.year}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                  />
                </div>
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
                <label className="block font-bold text-slate-700 mb-1">Student Photo URL</label>
                <input
                  type="text"
                  value={editingItem.photoUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, photoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Quote (Optional)</label>
                <textarea
                  rows={2}
                  value={editingItem.quote || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
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
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
