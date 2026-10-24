import React, { useState } from 'react';
import {
  Database,
  CheckCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Key,
  Server
} from 'lucide-react';
import {
  isFirebaseConfigured,
  getStoredFirebaseConfig,
  saveStoredFirebaseConfig,
  clearStoredFirebaseConfig,
  FirebaseConfig
} from '../../services/firebase';

export const AdminFirebaseGuide: React.FC = () => {
  const isConnected = isFirebaseConfigured();
  const existingConfig = getStoredFirebaseConfig();

  const [apiKey, setApiKey] = useState(existingConfig?.apiKey || '');
  const [authDomain, setAuthDomain] = useState(existingConfig?.authDomain || '');
  const [projectId, setProjectId] = useState(existingConfig?.projectId || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !projectId) return;

    const config: FirebaseConfig = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim() || `${projectId.trim()}.firebaseapp.com`,
      projectId: projectId.trim()
    };
    saveStoredFirebaseConfig(config);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      window.location.reload();
    }, 1500);
  };

  const handleDisconnect = () => {
    if (confirm('Disconnect Firebase configuration and revert to local persistent storage mode?')) {
      clearStoredFirebaseConfig();
      setApiKey('');
      setAuthDomain('');
      setProjectId('');
      window.location.reload();
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sampleRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // CESS School System Security Rules
    match /settings/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /campuses/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /faculty/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /news/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /inquiries/{inqId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /messages/{msgId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}`;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Status Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
              isConnected
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-purple-50 text-[#8B0A8C] border border-purple-200'
            }`}
          >
            <Database className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-2xl text-[#2D0A3E]">
                Firebase Cloud Integration
              </h2>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                  isConnected
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-purple-100 text-[#8B0A8C]'
                }`}
              >
                {isConnected ? '● Connected to Firebase' : '● Local High-Speed Storage Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              The application runs fully out-of-the-box with complete reactivity and persistence. You can connect your live Firebase project below anytime.
            </p>
          </div>
        </div>

        {isConnected && (
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
          >
            Disconnect Project
          </button>
        )}
      </div>

      {/* Step by Step Setup Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FFC107]" />
          <h3 className="font-heading font-bold text-xl text-[#2D0A3E]">
            How to Connect Firebase & Create the First Admin Account
          </h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
            <div className="font-heading font-bold text-sm text-[#8B0A8C] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8B0A8C] text-[#FFC107] flex items-center justify-center text-xs">
                1
              </span>
              <span>Create a Firebase Project in the Google Firebase Console</span>
            </div>
            <p className="pl-8 text-xs text-slate-600">
              Navigate to the{' '}
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#8B0A8C] font-bold underline inline-flex items-center gap-1"
              >
                Firebase Console <ExternalLink className="w-3 h-3" />
              </a>
              , click <strong>"Add project"</strong>, and enter a name (e.g. <code>cess-school-system</code>).
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
            <div className="font-heading font-bold text-sm text-[#8B0A8C] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8B0A8C] text-[#FFC107] flex items-center justify-center text-xs">
                2
              </span>
              <span>Enable Email/Password Authentication & Create First Admin</span>
            </div>
            <p className="pl-8 text-xs text-slate-600">
              In your Firebase Console, click on <strong>Build → Authentication → Get Started</strong>. Under the <strong>Sign-in method</strong> tab, enable <strong>Email/Password</strong>. Next, switch to the <strong>Users</strong> tab, click <strong>Add user</strong>, and enter your admin email (e.g. <code>asif@cess.edu.pk</code> or <code>admin@cess.edu.pk</code>) and your password.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
            <div className="font-heading font-bold text-sm text-[#8B0A8C] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8B0A8C] text-[#FFC107] flex items-center justify-center text-xs">
                3
              </span>
              <span>Enable Cloud Firestore Database</span>
            </div>
            <p className="pl-8 text-xs text-slate-600">
              In the sidebar, navigate to <strong>Build → Firestore Database</strong>, click <strong>Create database</strong>, choose your preferred cloud region, and select <strong>Start in production mode</strong>.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
            <div className="font-heading font-bold text-sm text-[#8B0A8C] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8B0A8C] text-[#FFC107] flex items-center justify-center text-xs">
                4
              </span>
              <span>Deploy Firestore Security Rules</span>
            </div>
            <p className="pl-8 text-xs text-slate-600">
              Paste the following rules into the <strong>Firestore Database → Rules</strong> tab:
            </p>
            <div className="ml-8 relative">
              <pre className="p-3 rounded-xl bg-slate-900 text-purple-200 text-xs font-mono overflow-x-auto">
                {sampleRules}
              </pre>
              <button
                onClick={() => copyToClipboard(sampleRules, 1)}
                className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedIndex === 1 ? 'Copied!' : 'Copy Rules'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enter Firebase Credentials Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-purple-100 space-y-4">
        <h3 className="font-heading font-bold text-lg text-[#2D0A3E]">
          Save Firebase Config Credentials
        </h3>
        <p className="text-xs text-slate-500">
          Obtain these keys from your <strong>Firebase Project Settings → General → Your apps (Web)</strong>.
        </p>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Firebase configuration saved! Reloading runtime...</span>
          </div>
        )}

        <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Project ID *</label>
              <input
                type="text"
                required
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="e.g. cess-school-system"
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">API Key *</label>
              <input
                type="text"
                required
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Auth Domain (Optional)</label>
            <input
              type="text"
              value={authDomain}
              onChange={(e) => setAuthDomain(e.target.value)}
              placeholder="e.g. cess-school-system.firebaseapp.com"
              className="w-full px-3 py-2 rounded-xl border border-purple-100 bg-[#F7F3F9]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-heading font-bold text-xs text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md transition-all cursor-pointer"
            >
              Save & Test Firebase Connection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
