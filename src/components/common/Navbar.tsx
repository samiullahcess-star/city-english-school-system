import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles, Building2, ChevronDown } from 'lucide-react';
import { CESSLogo } from './CESSLogo';
import { Campus } from '../../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  campuses: Campus[];
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, campuses, onOpenPortal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'campuses', label: 'Campuses', hasDropdown: true },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'news', label: 'News & Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'results', label: 'Results' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    setCampusDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCampusSelect = (campusId: string) => {
    onNavigate('campuses', { campusId });
    setMobileMenuOpen(false);
    setCampusDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-purple-100'
          : 'bg-white py-3.5 shadow-xs border-b border-purple-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left focus:outline-hidden max-w-[210px] xs:max-w-none"
          >
            <div className="hidden sm:block">
              <CESSLogo size={isScrolled ? 'md' : 'lg'} />
            </div>
            <div className="sm:hidden">
              <CESSLogo size="sm" showTagline={false} />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setCampusDropdownOpen(true)}
                    onMouseLeave={() => setCampusDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('campuses')}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-[#8B0A8C] font-semibold bg-purple-50'
                          : 'text-slate-700 hover:text-[#8B0A8C] hover:bg-purple-50/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                    </button>

                    {/* Campus Dropdown */}
                    {campusDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 pt-1 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-purple-100 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="px-3 py-1.5 text-[11px] font-semibold text-purple-900/60 uppercase tracking-wider">
                            Our 4 Campuses
                          </div>
                          {campuses.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => handleCampusSelect(c.id)}
                              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-[#F7F3F9] hover:text-[#8B0A8C] flex items-center justify-between transition-colors group/item"
                            >
                              <div className="flex items-center gap-2">
                                <Building2 className="w-3.5 h-3.5 text-[#FFC107] group-hover/item:text-[#8B0A8C]" />
                                <span className="truncate">{c.name}</span>
                              </div>
                              <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                                {c.establishedYear}
                              </span>
                            </button>
                          ))}
                          <div className="mt-1 pt-1 border-t border-purple-50">
                            <button
                              onClick={() => handleNavClick('campuses')}
                              className="w-full text-center py-1.5 text-xs font-semibold text-[#8B0A8C] hover:underline"
                            >
                              View All Campuses & Maps →
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 xl:px-3 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-[#8B0A8C] font-semibold bg-purple-50/80'
                      : 'text-slate-700 hover:text-[#8B0A8C] hover:bg-purple-50/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#FFC107] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Apply Now Gold Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('admissions')}
              className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-[#2D0A3E] bg-linear-to-r from-[#FFC107] via-[#FFD54F] to-[#FFC107] shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all duration-200 border border-amber-300 group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B0A8C] group-hover:rotate-12 transition-transform" />
              <span>Apply Now</span>
              <ArrowRight className="hidden md:inline-block w-3.5 h-3.5 text-[#2D0A3E] group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#8B0A8C] hover:bg-purple-50 rounded-lg focus:outline-hidden min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-purple-100 shadow-2xl max-h-[85vh] overflow-y-auto px-4 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                      isActive
                        ? 'bg-purple-100/70 text-[#8B0A8C] font-semibold'
                        : 'text-slate-800 hover:bg-purple-50 hover:text-[#8B0A8C]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#FFC107]" />}
                  </button>

                  {/* If item is campuses, show direct campus links */}
                  {item.id === 'campuses' && (
                    <div className="ml-4 pl-3 border-l-2 border-purple-100 my-1 space-y-1">
                      {campuses.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleCampusSelect(c.id)}
                          className="w-full text-left py-1.5 px-3 rounded-lg text-xs font-medium text-slate-600 hover:text-[#8B0A8C] hover:bg-purple-50 flex items-center justify-between"
                        >
                          <span>{c.name}</span>
                          <span className="text-[10px] text-purple-900 bg-purple-50 px-1.5 py-0.5 rounded-sm">
                            {c.totalStudents}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-4 mt-2 border-t border-purple-100 flex flex-col gap-2">
              {onOpenPortal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-[#8B0A8C] bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200 cursor-pointer"
                >
                  Student / Parent Portal
                </button>
              )}
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-purple-900 bg-purple-100/60 hover:bg-purple-100 transition-colors cursor-pointer"
              >
                Go to Admin Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
