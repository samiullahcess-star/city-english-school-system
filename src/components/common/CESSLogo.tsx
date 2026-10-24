import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';

export interface CESSLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'shield-only' | 'horizontal' | 'light';
  showTagline?: boolean;
  logoUrl?: string;
  customText?: string;
}

export const CESSLogo: React.FC<CESSLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  showTagline = true,
  logoUrl,
  customText,
}) => {
  const [dynamicLogo, setDynamicLogo] = useState<string | undefined>(() => {
    if (logoUrl) return logoUrl;
    try {
      return dataService.getSettings()?.logoUrl;
    } catch {
      return undefined;
    }
  });
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (logoUrl !== undefined) {
      setDynamicLogo(logoUrl);
      setImgError(false);
      return;
    }
    const updateLogo = () => {
      try {
        const s = dataService.getSettings();
        setDynamicLogo(s?.logoUrl);
        setImgError(false);
      } catch {
        // fallback
      }
    };
    updateLogo();
    window.addEventListener('cess-data-updated', updateLogo);
    return () => window.removeEventListener('cess-data-updated', updateLogo);
  }, [logoUrl]);

  const getDimension = () => {
    switch (size) {
      case 'sm': return { width: 38, height: 38, textClass: 'text-xs' };
      case 'lg': return { width: 64, height: 64, textClass: 'text-xl' };
      case 'xl': return { width: 84, height: 84, textClass: 'text-2xl' };
      case 'md':
      default: return { width: 48, height: 48, textClass: 'text-base' };
    }
  };

  const dim = getDimension();

  // The official SVG Crest with exact colors: #8B0A8C (Deep Purple) and #FFC107 (Golden Yellow)
  const ShieldSVG = (
    <svg
      width={dim.width}
      height={dim.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-md"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A515A6" />
          <stop offset="60%" stopColor="#8B0A8C" />
          <stop offset="100%" stopColor="#630664" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FFA000" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2D0A3E" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Outer Shield with Gold Border */}
      <polygon
        points="50,4 93,18 84,72 50,96 16,72 7,18"
        fill="url(#shieldGrad)"
        stroke="url(#goldGrad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />

      {/* Inner Inset Border */}
      <polygon
        points="50,9 88,22 80,69 50,90 20,69 12,22"
        fill="none"
        stroke="#FFC107"
        strokeWidth="1"
        strokeOpacity="0.6"
      />

      {/* Heraldic Star of Wisdom */}
      <polygon
        points="50,15 52,21 58,21 53,25 55,31 50,27 45,31 47,25 42,21 48,21"
        fill="url(#goldGrad)"
      />

      {/* Open Book of Knowledge */}
      <path
        d="M26,38 Q50,33 50,44 Q50,33 74,38 L74,62 Q50,56 50,66 Q50,56 26,62 Z"
        fill="#FFFFFF"
        stroke="#FFC107"
        strokeWidth="1.2"
      />
      <line x1="50" y1="44" x2="50" y2="66" stroke="#8B0A8C" strokeWidth="1.5" />
      <line x1="33" y1="46" x2="45" y2="44" stroke="#8B0A8C" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="33" y1="52" x2="45" y2="50" stroke="#8B0A8C" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="55" y1="44" x2="67" y2="46" stroke="#8B0A8C" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="55" y1="50" x2="67" y2="52" stroke="#8B0A8C" strokeWidth="1" strokeOpacity="0.6" />

      {/* Golden Scroll Banner */}
      <path
        d="M22,72 L78,72 L73,81 L50,83 L27,81 Z"
        fill="url(#goldGrad)"
        stroke="#2D0A3E"
        strokeWidth="0.8"
      />
      <text
        x="50"
        y="78.5"
        fontFamily="'Poppins', sans-serif"
        fontWeight="800"
        fontSize="7.5"
        fill="#2D0A3E"
        textAnchor="middle"
        letterSpacing="1"
      >
        CESS
      </text>

      {/* Year Tag */}
      <text
        x="50"
        y="89"
        fontFamily="'Inter', sans-serif"
        fontWeight="600"
        fontSize="5"
        fill="#FFC107"
        textAnchor="middle"
      >
        ESTD 1990
      </text>
    </svg>
  );

  // If a custom logo URL is configured and loaded successfully, display it
  const RenderedBadge = dynamicLogo && !imgError ? (
    <div
      style={{ width: dim.width, height: dim.height }}
      className="shrink-0 flex items-center justify-center rounded-xl overflow-hidden bg-white/10 p-0.5 transition-transform duration-300 hover:scale-105 shadow-xs"
    >
      <img
        src={dynamicLogo}
        alt="School Logo"
        onError={() => setImgError(true)}
        className="w-full h-full object-contain drop-shadow-sm"
      />
    </div>
  ) : (
    ShieldSVG
  );

  if (variant === 'shield-only') {
    return <div className={`inline-flex items-center ${className}`}>{RenderedBadge}</div>;
  }

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {RenderedBadge}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 flex-wrap">
          {customText ? (
            <span
              className={`font-heading font-extrabold tracking-tight ${dim.textClass} ${
                isLight ? 'text-white' : 'text-[#2D0A3E]'
              }`}
            >
              {customText}
            </span>
          ) : (
            <>
              <span
                className={`font-heading font-extrabold tracking-tight ${dim.textClass} ${
                  isLight ? 'text-white' : 'text-[#2D0A3E]'
                }`}
              >
                City English School
              </span>
              <span className="font-heading font-extrabold text-[#FFC107] tracking-tight">System</span>
            </>
          )}
        </div>
        {showTagline && (
          <span
            className={`text-[10px] md:text-[11px] font-medium tracking-wide uppercase ${
              isLight ? 'text-purple-200' : 'text-slate-500'
            }`}
          >
            Excellence in Education • Estd 1990
          </span>
        )}
      </div>
    </div>
  );
};
