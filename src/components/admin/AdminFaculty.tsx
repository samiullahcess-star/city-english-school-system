import React, { useState } from 'react';
import { GraduationCap, Plus, Edit, Trash2, Mail, Building2, X } from 'lucide-react';
import { FacultyMember, Campus } from '../../types';
import { dataService } from '../../services/dataService';
import { useToast } from '../common/Toast';

interface AdminFacultyProps {
  faculty: FacultyMember[];
  campuses: Campus[];
}

export const AdminFaculty: React.FC<AdminFacultyProps> = ({ faculty, campuses }) => {
  const { showToast } = useToast();
  const [editingMember, setEditingMember] = useState<FacultyMember | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleNew = () => {
    setEditingMember({
      id: `fac-${Date.now()}`,
      name: '',
      qualification: '',
      designation: '',
      campusId: campuses[0]?.id || 'main-campus',
      campusName: campuses[0]?.name || 'Main Campus (Central)',
      department: 'Science & Mathematics',
      experienceYears: 5,
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
      email: '',
      bio: '',
      featured: false,
      order: faculty.length + 1
    });
    setIsNew(true);
  };

  const handleEdit = (m: FacultyMember) => {
    setEditingMember({ ...m });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    const matchedCampus = campuses.find((c) => c.id === editingMember.campusId);
    const memberToSave = {
      ...editingMember,
      campusName: matchedCampus ? matchedCampus.name : editingMember.campusName
    };
    dataService.saveFaculty(memberToSave);
    showToast(isNew ? 'Faculty Added' : 'Faculty Updated', `${memberToSave.name} record saved successfully`, 'success');
    setEditingMember(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this faculty member?')) {
      dataService.deleteFaculty(id);
      showToast('Faculty Deleted', 'Faculty profile removed', 'error');
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingMember) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditingMember({ ...editingMember, photoUrl: reader.result });
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
            Faculty Roster ({faculty.length} Members)
          </h2>
          <p className="text-xs text-slate-500">
            Manage teacher profiles, qualifications, subject departments, and campus assignments.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#8B0A8C]" />
          <span>Add New Teacher</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {faculty.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl p-5 shadow-xs border border-purple-100 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto p-1 bg-linear-to-tr from-[#8B0A8C] to-[#FFC107]">
                <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover rounded-xl" />
              </div>

              <div className="text-center space-y-0.5">
                <h3 className="font-heading font-bold text-sm text-[#2D0A3E]">{member.name}</h3>
                <div className="text-xs text-[#8B0A8C] font-semibold">{member.designation}</div>
                <div className="text-[11px] text-slate-500 truncate">{member.qualification}</div>
              </div>

              <div className="pt-2 border-t border-purple-50 text-[11px] text-slate-600 space-y-1">
                <div><strong>Campus:</strong> {member.campusName}</div>
                <div><strong>Dept:</strong> {member.department}</div>
                <div><strong>Experience:</strong> {member.experienceYears} Years</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="p-1.5 rounded-lg bg-purple-50 hover:bg-[#8B0A8C] text-[#8B0A8C] hover:text-white transition-colors"
                title="Edit Teacher"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors"
                title="Delete Teacher"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / New Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                {isNew ? 'Add New Faculty Member' : `Edit: ${editingMember.name}`}
              </h3>
              <button onClick={() => setEditingMember(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] font-semibold text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.designation}
                    onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                    placeholder="e.g. Senior Principal / HOD Physics"
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualifications *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.qualification}
                    onChange={(e) => setEditingMember({ ...editingMember, qualification: e.target.value })}
                    placeholder="e.g. M.Sc. Mathematics, B.Ed."
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.department}
                    onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                    placeholder="e.g. Physical Sciences"
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campus Assignment *</label>
                  <select
                    value={editingMember.campusId}
                    onChange={(e) => setEditingMember({ ...editingMember, campusId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-white text-xs font-semibold"
                  >
                    {campuses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={editingMember.experienceYears}
                    onChange={(e) => setEditingMember({ ...editingMember, experienceYears: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editingMember.email || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    placeholder="teacher@cess.edu.pk"
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingMember.order}
                    onChange={(e) => setEditingMember({ ...editingMember, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo (URL or Upload)</label>
                <input
                  type="text"
                  value={editingMember.photoUrl}
                  onChange={(e) => setEditingMember({ ...editingMember, photoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs mb-2"
                />
                <input type="file" accept="image/*" onChange={handleImageFileChange} className="block w-full text-[11px] text-slate-500" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={editingMember.bio || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm"
                >
                  Save Faculty Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
