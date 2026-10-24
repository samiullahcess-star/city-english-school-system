import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { CESSLogo } from '../components/common/CESSLogo';

interface NotFoundProps {
  onNavigate: (page: string) => void;
}

export const NotFoundPage: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F7F3F9] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-purple-100 space-y-6">
        <CESSLogo size="lg" className="justify-center" />

        <div className="space-y-2">
          <div className="text-6xl font-heading font-black text-[#8B0A8C]">
            404
          </div>
          <h1 className="font-heading font-bold text-2xl text-[#2D0A3E]">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            The circular or campus page you are looking for may have moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="flex-1 py-3 px-4 rounded-xl font-heading font-bold text-xs sm:text-sm text-[#2D0A3E] bg-[#FFC107] hover:bg-amber-400 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#8B0A8C]" />
            <span>Return Home</span>
          </button>
          <button
            onClick={() => onNavigate('campuses')}
            className="flex-1 py-3 px-4 rounded-xl font-heading font-semibold text-xs sm:text-sm text-[#8B0A8C] bg-purple-50 hover:bg-purple-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Campuses</span>
          </button>
        </div>
      </div>
    </div>
  );
};
