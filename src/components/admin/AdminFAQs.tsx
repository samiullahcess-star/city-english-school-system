import React, { useState } from 'react';
import { HelpCircle, Plus, Edit, Trash2, X } from 'lucide-react';
import { FAQ } from '../../types';
import { dataService } from '../../services/dataService';

interface AdminFAQsProps {
  faqs: FAQ[];
}

export const AdminFAQs: React.FC<AdminFAQsProps> = ({ faqs }) => {
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleNew = () => {
    setEditingFAQ({
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      category: 'Admissions',
      order: faqs.length + 1
    });
    setIsNew(true);
  };

  const handleEdit = (f: FAQ) => {
    setEditingFAQ({ ...f });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFAQ) return;
    dataService.saveFAQ(editingFAQ);
    setEditingFAQ(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this FAQ question?')) {
      dataService.deleteFAQ(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
            Frequently Asked Questions ({faqs.length})
          </h2>
          <p className="text-xs text-slate-500">
            Maintain answers to admissions, tuition scholarships, curriculum, and transport queries.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#8B0A8C]" />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl p-5 shadow-xs border border-purple-100 flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-purple-100 text-[#8B0A8C]">
                  {faq.category}
                </span>
                <span className="text-[10px] text-slate-400">Order: #{faq.order}</span>
              </div>
              <h4 className="font-heading font-bold text-sm text-[#2D0A3E]">
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleEdit(faq)}
                className="p-1.5 rounded-lg bg-purple-50 text-[#8B0A8C] hover:bg-purple-100"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingFAQ && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <h3 className="font-heading font-bold text-base text-[#2D0A3E]">
                {isNew ? 'Create FAQ' : 'Edit FAQ'}
              </h3>
              <button onClick={() => setEditingFAQ(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Question Text *</label>
                <input
                  type="text"
                  required
                  value={editingFAQ.question}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={editingFAQ.category}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-white"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Academics">Academics</option>
                    <option value="Fee & Scholarships">Fee & Scholarships</option>
                    <option value="Campus Life">Campus Life</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingFAQ.order}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={editingFAQ.answer}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setEditingFAQ(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
