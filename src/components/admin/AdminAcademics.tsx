import React, { useState } from 'react';
import { BookOpen, Edit, Plus, Trash2, X } from 'lucide-react';
import { AcademicProgram } from '../../types';
import { dataService } from '../../services/dataService';

interface AdminAcademicsProps {
  programs: AcademicProgram[];
}

export const AdminAcademics: React.FC<AdminAcademicsProps> = ({ programs }) => {
  const [editingProg, setEditingProg] = useState<AcademicProgram | null>(null);

  const handleEdit = (p: AcademicProgram) => {
    setEditingProg({ ...p });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProg) return;
    dataService.saveProgram(editingProg);
    setEditingProg(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
            Academic Levels & Curriculum ({programs.length} Levels)
          </h2>
          <p className="text-xs text-slate-500">
            Manage Pre-School, Primary, Middle, and Secondary/Matric curricula, subjects, and hours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-2xl p-6 shadow-xs border border-purple-100 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8B0A8C] bg-purple-50 px-2.5 py-1 rounded-full">
                  {prog.level} • {prog.ageGroup}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{prog.timing}</span>
              </div>

              <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                {prog.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                {prog.description}
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Subjects:</span>
                <div className="flex flex-wrap gap-1">
                  {prog.subjects.map((s, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-sm bg-purple-50 text-[#8B0A8C]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-50 flex justify-end">
              <button
                onClick={() => handleEdit(prog)}
                className="px-3.5 py-1.5 rounded-xl bg-[#8B0A8C] text-white text-xs font-bold hover:bg-[#670668] transition-colors flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Curriculum</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                Edit: {editingProg.title}
              </h3>
              <button onClick={() => setEditingProg(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  value={editingProg.title}
                  onChange={(e) => setEditingProg({ ...editingProg, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grade Range</label>
                  <input
                    type="text"
                    value={editingProg.gradeRange}
                    onChange={(e) => setEditingProg({ ...editingProg, gradeRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age Group</label>
                  <input
                    type="text"
                    value={editingProg.ageGroup}
                    onChange={(e) => setEditingProg({ ...editingProg, ageGroup: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Class Timings</label>
                <input
                  type="text"
                  value={editingProg.timing}
                  onChange={(e) => setEditingProg({ ...editingProg, timing: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProg.description}
                  onChange={(e) => setEditingProg({ ...editingProg, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={editingProg.imageUrl}
                  onChange={(e) => setEditingProg({ ...editingProg, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setEditingProg(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400"
                >
                  Save Academic Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
