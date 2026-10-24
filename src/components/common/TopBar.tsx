import React from 'react';
import { Phone, Mail, Clock, Lock, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../../types';

interface TopBarProps {
  settings: SiteSettings;
  onNavigate: (page: string) => void;
  onOpenPortal?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ settings, onNavigate, onOpenPortal }) => {
  return (
    <>
      {/* Mobile Top Strip (Emergency Hotline & Portal Shortcuts) */}
      <div className="bg-[#2D0A3E] text-slate-200 text-[11px] py-1.5 px-3 border-b border-purple-900/40 flex md:hidden items-center justify-between">
        <a
          href={`tel:${settings.phone}`}
          className="flex items-center gap-1.5 text-[#FFC107] font-medium truncate max-w-[190px]"
        >
          <Phone className="w-3 h-3 text-[#FFC107] shrink-0" />
          <span className="truncate">{settings.phone}</span>
        </a>

        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenPortal && (
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1 text-[10px] text-purple-200 hover:text-white bg-purple-900/60 px-2 py-0.5 rounded border border-purple-700/50 cursor-pointer font-medium"
            >
              <ShieldCheck className="w-2.5 h-2.5 text-[#FFC107]" />
              <span>Portal</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-1 text-[10px] text-[#FFC107] hover:text-white bg-purple-900/90 px-2 py-0.5 rounded border border-[#FFC107]/30 cursor-pointer font-medium"
            title="Go to Admin Portal"
          >
            <Lock className="w-2.5 h-2.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Desktop Top Bar */}
      <div className="bg-[#2D0A3E] text-slate-200 text-xs py-2 px-4 border-b border-purple-900/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 hover:text-[#FFC107] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>{settings.phone}</span>
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-1.5 hover:text-[#FFC107] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>{settings.email}</span>
            </a>
            <div className="flex items-center gap-1.5 text-purple-200/80">
              <Clock className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>{settings.workingHours}</span>
            </div>
          </div>

          {/* Right: Accreditations, Student Portal & Admin Portal Button */}
          <div className="flex items-center gap-3">
            {onOpenPortal && (
              <button
                onClick={onOpenPortal}
                className="flex items-center gap-1.5 text-xs text-purple-200 hover:text-white transition-colors bg-purple-900/40 hover:bg-purple-800/60 px-2.5 py-1 rounded-md border border-purple-700/50 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>Student / Parent Portal</span>
              </button>
            )}

            <div className="h-3 w-px bg-purple-700/60" />

            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1.5 text-xs text-[#FFC107] hover:text-white transition-colors bg-purple-900/60 hover:bg-purple-800/80 px-2.5 py-1 rounded-md border border-[#FFC107]/30 cursor-pointer"
              title="Go to School Management Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span className="font-medium">Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
