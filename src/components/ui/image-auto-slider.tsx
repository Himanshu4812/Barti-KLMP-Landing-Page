"use client";

interface ImageItem {
  src: string;
  label: string;
}

const defaultImages: ImageItem[] = [
  { src: "/images/discovery/ambedkar_literature.png", label: "Ambedkar Literature" },
  { src: "/images/discovery/constitutional_studies.png", label: "Constitutional Studies" },
  { src: "/images/discovery/social_justice.png", label: "Social Justice" },
  { src: "/images/discovery/research_papers.png", label: "Research Papers" },
  { src: "/images/discovery/government_publications.png", label: "Government Publications" },
  { src: "/images/discovery/archives.png", label: "Archives & Documents" },
];

interface ImageAutoSliderProps {
  images?: ImageItem[];
  className?: string;
}

export function ImageAutoSlider({ images = defaultImages, className }: ImageAutoSliderProps) {
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .infinite-scroll {
          animation: scroll-right 40s linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .slider-image-item {
          transition: transform 0.4s ease, filter 0.4s ease;
        }

        .slider-image-item:hover {
          transform: scale(1.06);
          filter: brightness(1.08) contrast(1.04);
        }
      `}</style>

      <div className={className}>
        <div className="w-full">
          <div className="infinite-scroll flex gap-5 md:gap-6 w-max py-2">
            {duplicatedImages.map((item, index) => (
              <div
                key={index}
                className="slider-image-item relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-lg border border-[#E4E7EC] bg-white"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white text-xs md:text-sm lg:text-base font-semibold leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
