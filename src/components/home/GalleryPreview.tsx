import React, { useState } from 'react';
import { Image as ImageIcon, ArrowRight, Eye, X } from 'lucide-react';
import { GalleryItem } from '../../types';

interface GalleryPreviewProps {
  items: GalleryItem[];
  onNavigate: (page: string) => void;
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ items, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const previewItems = items.slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-[#F7F3F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#8B0A8C] text-xs font-bold uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>Campus Life in Focus</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D0A3E] tracking-tight">
              Life at City English School System
            </h2>
            <div className="w-16 h-1 bg-[#FFC107] rounded-full" />
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Glimpses into dynamic classrooms, annual sports championships, robotic workshops, and joyful student celebrations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#8B0A8C] hover:text-[#2D0A3E] transition-colors group cursor-pointer"
          >
            <span>Open Complete Photo Gallery (20+ Albums)</span>
            <ArrowRight className="w-4 h-4 text-[#FFC107] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {previewItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-200 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <span className="self-end px-2.5 py-1 rounded-full bg-[#FFC107] text-[#2D0A3E] text-[10px] font-extrabold shadow-sm">
                  {item.category}
                </span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-purple-200 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="p-6 bg-slate-900 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#FFC107] uppercase">
                  {selectedImage.category}
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
