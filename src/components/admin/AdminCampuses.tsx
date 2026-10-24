import React, { useState } from 'react';
import { Building2, Edit, Plus, Trash2, MapPin, Phone, Mail, X } from 'lucide-react';
import { Campus } from '../../types';
import { dataService } from '../../services/dataService';

interface AdminCampusesProps {
  campuses: Campus[];
}

export const AdminCampuses: React.FC<AdminCampusesProps> = ({ campuses }) => {
  const [editingCampus, setEditingCampus] = useState<Campus | null>(null);
  const [facilityInput, setFacilityInput] = useState('');

  const handleEdit = (c: Campus) => {
    setEditingCampus({ ...c });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampus) return;
    dataService.saveCampus(editingCampus);
    setEditingCampus(null);
  };

  const addFacility = () => {
    if (facilityInput.trim() && editingCampus) {
      setEditingCampus({
        ...editingCampus,
        facilities: [...editingCampus.facilities, facilityInput.trim()]
      });
      setFacilityInput('');
    }
  };

  const removeFacility = (idx: number) => {
    if (editingCampus) {
      const copy = [...editingCampus.facilities];
      copy.splice(idx, 1);
      setEditingCampus({ ...editingCampus, facilities: copy });
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingCampus) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditingCampus({ ...editingCampus, imageUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
            Campuses Management ({campuses.length} Campuses)
          </h2>
          <p className="text-xs text-slate-500">
            Edit campus addresses, phone lines, facilities lists, and Google Maps integration.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campuses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl overflow-hidden shadow-xs border border-purple-100 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 text-xs font-bold text-[#2D0A3E] bg-[#FFC107] px-2.5 py-1 rounded-full">
                  Estd. {c.establishedYear}
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-heading font-bold text-lg text-white">
                    {c.name}
                  </h3>
                  <p className="text-xs text-amber-200">{c.totalStudents} Active Students</p>
                </div>
              </div>

              <div className="p-6 space-y-3 text-xs text-slate-700">
                <p className="italic text-slate-500">"{c.tagline}"</p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#8B0A8C] shrink-0 mt-0.5" />
                  <span>{c.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8B0A8C] shrink-0" />
                  <span>{c.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8B0A8C] shrink-0" />
                  <span>{c.email}</span>
                </div>

                <div className="pt-2 border-t border-purple-50">
                  <span className="font-bold text-[#2D0A3E]">Principal:</span>{' '}
                  <span>{c.principalName} ({c.principalQualification})</span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {c.facilities.map((f, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-sm bg-purple-50 text-[#8B0A8C] font-semibold">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-purple-50 bg-[#F7F3F9] flex justify-end">
              <button
                onClick={() => handleEdit(c)}
                className="px-4 py-2 rounded-xl bg-[#8B0A8C] text-white font-bold text-xs hover:bg-[#670668] transition-colors flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>Edit Campus Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingCampus && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                Edit Campus: {editingCampus.name}
              </h3>
              <button onClick={() => setEditingCampus(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campus Name *</label>
                  <input
                    type="text"
                    required
                    value={editingCampus.name}
                    onChange={(e) => setEditingCampus({ ...editingCampus, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs font-semibold focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingCampus.tagline}
                    onChange={(e) => setEditingCampus({ ...editingCampus, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Physical Address *</label>
                <input
                  type="text"
                  required
                  value={editingCampus.address}
                  onChange={(e) => setEditingCampus({ ...editingCampus, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={editingCampus.phone}
                    onChange={(e) => setEditingCampus({ ...editingCampus, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campus Email *</label>
                  <input
                    type="email"
                    required
                    value={editingCampus.email}
                    onChange={(e) => setEditingCampus({ ...editingCampus, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Principal Name *</label>
                  <input
                    type="text"
                    required
                    value={editingCampus.principalName}
                    onChange={(e) => setEditingCampus({ ...editingCampus, principalName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Principal Qualification</label>
                  <input
                    type="text"
                    value={editingCampus.principalQualification}
                    onChange={(e) => setEditingCampus({ ...editingCampus, principalQualification: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Enrolled Scholars</label>
                  <input
                    type="text"
                    value={editingCampus.totalStudents}
                    onChange={(e) => setEditingCampus({ ...editingCampus, totalStudents: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Established Year</label>
                  <input
                    type="number"
                    value={editingCampus.establishedYear}
                    onChange={(e) => setEditingCampus({ ...editingCampus, establishedYear: parseInt(e.target.value) || 1990 })}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Campus Image */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Campus Image (URL or Upload)</label>
                <input
                  type="text"
                  value={editingCampus.imageUrl}
                  onChange={(e) => setEditingCampus({ ...editingCampus, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9] text-xs focus:border-[#8B0A8C] focus:outline-hidden mb-2"
                />
                <input type="file" accept="image/*" onChange={handleImageFileChange} className="block w-full text-[11px] text-slate-500" />
              </div>

              {/* Facilities tags */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Campus Facilities List</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={facilityInput}
                    onChange={(e) => setFacilityInput(e.target.value)}
                    placeholder="e.g. Physics & Chemistry Labs"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-purple-100 text-xs"
                  />
                  <button
                    type="button"
                    onClick={addFacility}
                    className="px-3 py-1.5 bg-[#8B0A8C] text-white rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {editingCampus.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-purple-50 text-[#8B0A8C] font-semibold text-[11px] flex items-center gap-1 border border-purple-100"
                    >
                      <span>{fac}</span>
                      <button
                        type="button"
                        onClick={() => removeFacility(idx)}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setEditingCampus(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm"
                >
                  Save Campus Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
