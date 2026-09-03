import { useState } from "react";
import { galleryImages, galleryCategories } from "@/mocks/gallery";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Our Work
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-dark-950 mb-4">
            Salon Gallery
          </h1>
          <p className="text-dark-500 text-sm md:text-base max-w-xl mx-auto">
            Take a peek inside our luxurious salon and see our work in action.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? "bg-gold-500 text-dark-950 shadow-gold"
                  : "bg-cream-100 text-dark-600 hover:bg-cream-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((img, idx) => (
            <div
              key={img.id}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer animate-fade-in-up hover-glow"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                <span className="text-cream-100 text-xs font-medium uppercase tracking-wide">
                  {img.category}
                </span>
                <p className="text-white text-sm font-medium mt-1">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <i className="ri-image-line text-5xl text-dark-300 mb-4 block"></i>
            <p className="text-dark-400">No images in this category yet.</p>
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-dark-950/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer z-10"
            aria-label="Close lightbox"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-w-full max-h-[85vh] rounded-3xl object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}