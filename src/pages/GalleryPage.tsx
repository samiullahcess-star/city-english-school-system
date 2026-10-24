import React, { useState } from 'react';
import {
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryPageProps {
  items: GalleryItem[];
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Events', 'Sports', 'Campus', 'Classroom', 'Annual Day'];

  const filteredItems = items.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-[#F7F3F9] min-h-screen">
      {/* Banner */}
      <div className="bg-linear-to-r from-[#2D0A3E] via-[#5C0A62] to-[#8B0A8C] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-xs font-heading font-extrabold shadow-md">
            <span>Visual Chronicles</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Photo & Media Gallery
          </h1>
          <div className="w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base">
            Witness the vibrant daily pulse, sports tournaments, convocation memories, and scientific breakthroughs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8B0A8C] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-purple-50 hover:text-[#8B0A8C] border border-purple-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <span className="self-end px-2.5 py-0.5 rounded-full bg-[#FFC107] text-[#2D0A3E] text-[10px] font-extrabold shadow-sm">
                  {item.category}
                </span>

                <div>
                  <h4 className="font-heading font-bold text-sm text-white line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-purple-200 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Next / Prev */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-[#8B0A8C] text-white transition-all hover:scale-110"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-[#8B0A8C] text-white transition-all hover:scale-110"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-purple-800 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-6 bg-slate-900 border-t border-purple-900/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#FFC107] uppercase tracking-wider block mb-1">
                  {currentItem.category} • Image {(lightboxIndex || 0) + 1} of {filteredItems.length}
                </span>
                <h3 className="font-heading font-bold text-lg text-white">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {currentItem.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
