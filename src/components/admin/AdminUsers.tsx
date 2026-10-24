import React, { useState } from 'react';
import { Users, Plus, Trash2, ShieldCheck, UserCheck, X } from 'lucide-react';
import { AdminUser } from '../../types';
import { dataService } from '../../services/dataService';

interface AdminUsersProps {
  users: AdminUser[];
  currentUser: AdminUser;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ users, currentUser }) => {
  const [editingModal, setEditingModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Super Admin' | 'Editor'>('Editor');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    dataService.addAdminUser({
      name,
      email,
      role,
      active: true,
      lastLogin: 'Never'
    });

    setEditingModal(false);
    setName('');
    setEmail('');
    setRole('Editor');
  };

  const handleDelete = (id: string, emailToDelete: string) => {
    if (emailToDelete === currentUser.email) {
      alert('You cannot delete your own currently logged-in account.');
      return;
    }
    if (confirm(`Remove administrator ${emailToDelete}?`)) {
      dataService.deleteAdminUser(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
            Admin Accounts & Role-Based Access ({users.length})
          </h2>
          <p className="text-xs text-slate-500">
            Provision authorized administrator accounts with Super Admin or Editor privileges.
          </p>
        </div>

        <button
          onClick={() => setEditingModal(true)}
          className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#8B0A8C]" />
          <span>Add Admin User</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xs border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#2D0A3E] text-slate-200 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="p-4">Name & Account</th>
                <th className="p-4">Email</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Last Login</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 text-slate-700">
              {users.map((u) => {
                const isCurrent = u.email === currentUser.email;
                return (
                  <tr key={u.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="p-4">
                      <div className="font-heading font-bold text-sm text-[#2D0A3E] flex items-center gap-2">
                        <span>{u.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#8B0A8C]">
                            Current Session
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 font-mono text-slate-800">
                      {u.email}
                    </td>

                    <td className="p-4">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          u.role === 'Super Admin'
                            ? 'bg-[#FFC107] text-[#2D0A3E]'
                            : 'bg-purple-100 text-[#8B0A8C]'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="p-4 text-slate-500 text-[11px]">
                      {u.lastLogin && u.lastLogin !== 'Never'
                        ? new Date(u.lastLogin).toLocaleString()
                        : 'Never logged in'}
                    </td>

                    <td className="p-4 text-right">
                      {!isCurrent && (
                        <button
                          onClick={() => handleDelete(u.id, u.email)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors"
                          title="Delete Account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-purple-100">
              <h3 className="font-heading font-bold text-base text-[#2D0A3E]">
                Add Authorized Admin Account
              </h3>
              <button onClick={() => setEditingModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Admin Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Academic Supervisor"
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="supervisor@cess.edu.pk"
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role Privileges *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-white"
                >
                  <option value="Editor">Editor (Manage Content & Inquiries)</option>
                  <option value="Super Admin">Super Admin (Full System Control & Accounts)</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setEditingModal(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400"
                >
                  Add Admin User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
