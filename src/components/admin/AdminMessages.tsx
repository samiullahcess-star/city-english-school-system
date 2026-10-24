import React, { useState } from 'react';
import {
  Mail,
  Search,
  CheckCircle,
  Trash2,
  Eye,
  X,
  MailCheck,
  MailQuestion,
  Phone,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { ContactMessage } from '../../types';
import { dataService } from '../../services/dataService';
import { useToast } from '../common/Toast';

interface AdminMessagesProps {
  messages: ContactMessage[];
}

export const AdminMessages: React.FC<AdminMessagesProps> = ({ messages }) => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Unread' | 'Read'>('All');
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterType === 'All' ? true : filterType === 'Unread' ? !m.read : m.read;

    return matchesSearch && matchesFilter;
  });

  const handleToggleRead = (id: string, currentRead: boolean) => {
    dataService.toggleMessageRead(id, !currentRead);
    showToast(
      !currentRead ? 'Marked as Read' : 'Marked as Unread',
      `Message status updated`,
      'info'
    );
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage({ ...activeMessage, read: !currentRead });
    }
  };

  const handleDelete = (id: string) => {
    dataService.deleteMessage(id);
    setDeleteId(null);
    showToast('Message Deleted', 'Contact message removed from inbox', 'error');
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
            Contact Messages Inbox ({filtered.length})
          </h2>
          <p className="text-xs text-slate-500">
            Direct public feedback, visit appointments, and secretariat inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sender, message..."
              className="pl-9 pr-3 py-2 rounded-xl border border-purple-100 text-xs focus:border-[#8B0A8C] focus:outline-hidden bg-[#F7F3F9]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex rounded-xl bg-purple-50 p-1 border border-purple-100 text-xs font-bold">
            <button
              onClick={() => setFilterType('All')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === 'All' ? 'bg-[#8B0A8C] text-white' : 'text-slate-600'
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilterType('Unread')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === 'Unread' ? 'bg-[#8B0A8C] text-white' : 'text-slate-600'
              }`}
            >
              Unread ({messages.filter((m) => !m.read).length})
            </button>
            <button
              onClick={() => setFilterType('Read')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === 'Read' ? 'bg-[#8B0A8C] text-white' : 'text-slate-600'
              }`}
            >
              Read
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-3xl shadow-xs border border-purple-100 divide-y divide-purple-50 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Mail className="w-10 h-10 mx-auto text-slate-300" />
            <div className="font-heading font-bold text-sm text-slate-600">No messages in this view</div>
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                msg.read ? 'hover:bg-purple-50/30' : 'bg-amber-50/30 hover:bg-amber-50/60'
              }`}
            >
              <div
                onClick={() => {
                  setActiveMessage(msg);
                  if (!msg.read) {
                    dataService.toggleMessageRead(msg.id, true);
                  }
                }}
                className="flex items-start gap-3 flex-1 cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.read ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {msg.read ? <MailCheck className="w-4 h-4" /> : <MailQuestion className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-[#2D0A3E]">
                      {msg.name}
                    </span>
                    {!msg.read && (
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-[#2D0A3E]">
                        NEW
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">
                      • {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#8B0A8C]">
                    {msg.subject}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    {msg.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => handleToggleRead(msg.id, msg.read)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-purple-100 transition-colors"
                >
                  {msg.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  onClick={() => setDeleteId(msg.id)}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Detail Modal */}
      {activeMessage && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveMessage(null)}
        >
          <div
            className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-purple-100">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Received: {new Date(activeMessage.createdAt).toLocaleString()}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
                  {activeMessage.subject}
                </h3>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-purple-50/50">
              <div>
                <span className="text-slate-400 block">From:</span>
                <span className="font-bold text-slate-800">{activeMessage.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email:</span>
                <a href={`mailto:${activeMessage.email}`} className="font-bold text-[#8B0A8C] hover:underline">
                  {activeMessage.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block">Phone:</span>
                <span className="font-bold text-slate-800">{activeMessage.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Target Campus:</span>
                <span className="font-bold text-purple-900">{activeMessage.campus || 'General'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F3F9] text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
              {activeMessage.message}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-purple-100">
              <a
                href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                className="px-4 py-2 rounded-xl bg-[#8B0A8C] text-white font-bold text-xs hover:bg-[#670668] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>

              <button
                onClick={() => setActiveMessage(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Delete Message
            </h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently delete this contact inquiry?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
