import React, { useState } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  CheckCircle,
  X,
  Phone,
  Mail,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { AdmissionInquiry, Campus } from '../../types';
import { dataService } from '../../services/dataService';
import { useToast } from '../common/Toast';

interface AdminInquiriesProps {
  inquiries: AdmissionInquiry[];
  campuses: Campus[];
}

export const AdminInquiries: React.FC<AdminInquiriesProps> = ({ inquiries, campuses }) => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [campusFilter, setCampusFilter] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<AdmissionInquiry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Status notes edit
  const [editingNotes, setEditingNotes] = useState('');

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.studentName.toLowerCase().includes(search.toLowerCase()) ||
      inq.parentName.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.classApplyingFor.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    const matchesCampus = campusFilter === 'All' || inq.preferredCampus.includes(campusFilter);

    return matchesSearch && matchesStatus && matchesCampus;
  });

  const handleStatusChange = (id: string, newStatus: AdmissionInquiry['status']) => {
    dataService.updateInquiryStatus(id, newStatus);
    showToast('Inquiry Status Updated', `Application status changed to ${newStatus}`, 'info');
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleSaveNotes = () => {
    if (selectedInquiry) {
      dataService.updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, editingNotes);
      setSelectedInquiry({ ...selectedInquiry, adminNotes: editingNotes });
      showToast('Internal Notes Saved', 'Admissions dossier updated successfully', 'success');
    }
  };

  const handleDelete = (id: string) => {
    dataService.deleteInquiry(id);
    setDeleteConfirmId(null);
    showToast('Record Removed', 'Admission inquiry permanently deleted', 'error');
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(null);
    }
  };

  const handleExportCSV = () => {
    dataService.exportInquiriesCSV();
    showToast('Export Completed', 'Inquiries exported as CSV file', 'success');
  };

  const statusColors: Record<string, string> = {
    New: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    Contacted: 'bg-blue-100 text-blue-800 border-blue-300',
    Admitted: 'bg-purple-100 text-purple-800 border-purple-300',
    Rejected: 'bg-rose-100 text-rose-800 border-rose-300'
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
              Admission Inquiries ({filtered.length})
            </h2>
            <p className="text-xs text-slate-500">
              Manage prospective scholar applications, parent interactions, and enrollment statuses.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#8B0A8C]" />
            <span>Export to CSV File</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student, parent, phone..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-purple-100 text-xs focus:border-[#8B0A8C] focus:outline-hidden bg-[#F7F3F9]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-purple-100 text-xs focus:border-[#8B0A8C] focus:outline-hidden bg-white text-slate-700"
          >
            <option value="All">All Statuses (New, Contacted, Admitted, Rejected)</option>
            <option value="New">Status: New Only</option>
            <option value="Contacted">Status: Contacted</option>
            <option value="Admitted">Status: Admitted</option>
            <option value="Rejected">Status: Rejected</option>
          </select>

          {/* Campus Filter */}
          <select
            value={campusFilter}
            onChange={(e) => setCampusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-purple-100 text-xs focus:border-[#8B0A8C] focus:outline-hidden bg-white text-slate-700"
          >
            <option value="All">All Campuses</option>
            {campuses.map((c) => (
              <option key={c.id} value={c.name.split(' ')[0]}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-purple-100 overflow-hidden">
        <div className="md:hidden text-[10px] text-slate-500 py-1.5 px-3 bg-purple-50/70 border-b border-purple-100 text-center font-medium">
          ← Swipe horizontally to view full application details →
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-[#2D0A3E] text-slate-200 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="p-4">Student & Parent</th>
                <th className="p-4">Class Applying</th>
                <th className="p-4">Target Campus</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No admission inquiries matched your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-purple-50/40 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-heading font-bold text-sm text-[#2D0A3E]">
                        {inq.studentName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Parent: {inq.parentName}
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-slate-800">
                      {inq.classApplyingFor}
                    </td>

                    <td className="p-4 text-purple-900 font-medium">
                      {inq.preferredCampus}
                    </td>

                    <td className="p-4">
                      <a href={`tel:${inq.phone}`} className="hover:text-[#8B0A8C] font-mono">
                        {inq.phone}
                      </a>
                    </td>

                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-full border cursor-pointer focus:outline-hidden ${
                          statusColors[inq.status] || 'bg-slate-100'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Admitted">Admitted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="p-4 text-slate-400 text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setEditingNotes(inq.adminNotes || '');
                          }}
                          className="p-1.5 rounded-lg bg-purple-50 hover:bg-[#8B0A8C] text-[#8B0A8C] hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(inq.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-purple-100">
              <div>
                <span className="text-[10px] font-mono text-purple-500 uppercase tracking-wider block">
                  Reference: {selectedInquiry.id}
                </span>
                <h3 className="font-heading font-bold text-xl text-[#2D0A3E]">
                  Inquiry Dossier: {selectedInquiry.studentName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-purple-50/60 space-y-1">
                <span className="text-slate-500 font-semibold block">Student Name:</span>
                <span className="font-bold text-sm text-[#2D0A3E]">{selectedInquiry.studentName}</span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 space-y-1">
                <span className="text-slate-500 font-semibold block">Parent / Guardian:</span>
                <span className="font-bold text-sm text-[#2D0A3E]">{selectedInquiry.parentName}</span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 space-y-1">
                <span className="text-slate-500 font-semibold block">Class Applying:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.classApplyingFor}</span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 space-y-1">
                <span className="text-slate-500 font-semibold block">Preferred Campus:</span>
                <span className="font-bold text-[#8B0A8C]">{selectedInquiry.preferredCampus}</span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 space-y-1">
                <span className="text-slate-500 font-semibold block">Contact Phone:</span>
                <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-slate-800 hover:text-[#8B0A8C]">
                  {selectedInquiry.phone}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 space-y-1">
                <span className="text-slate-500 font-semibold block">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-slate-800 hover:text-[#8B0A8C] truncate block">
                  {selectedInquiry.email || 'N/A'}
                </a>
              </div>
            </div>

            {selectedInquiry.previousSchool && (
              <div className="text-xs">
                <span className="text-slate-500 font-semibold">Previous School:</span>{' '}
                <span className="font-medium text-slate-800">{selectedInquiry.previousSchool}</span>
              </div>
            )}

            {selectedInquiry.message && (
              <div className="p-3 rounded-xl bg-[#F7F3F9] text-xs space-y-1">
                <span className="font-bold text-[#2D0A3E] block">Parent Message / Note:</span>
                <p className="text-slate-700 leading-relaxed italic">"{selectedInquiry.message}"</p>
              </div>
            )}

            {/* Admin Notes Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Secretariat Action Notes (Internal Only):
              </label>
              <textarea
                rows={2}
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="e.g. Test scheduled Saturday 10 AM, concessions discussed..."
                className="w-full p-2.5 rounded-xl border border-purple-100 text-xs focus:border-[#8B0A8C] focus:outline-hidden bg-[#F7F3F9]"
              />
              <button
                onClick={handleSaveNotes}
                className="px-3 py-1.5 rounded-lg bg-[#8B0A8C] text-white text-xs font-bold hover:bg-[#670668] transition-colors"
              >
                Save Internal Notes
              </button>
            </div>

            {/* Status Change Controls */}
            <div className="pt-2 flex items-center justify-between border-t border-purple-100">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">Change Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg border border-purple-200 font-bold text-xs"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Admitted">Admitted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Confirm Record Deletion
            </h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently remove this admission inquiry record? This action cannot be reversed.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
