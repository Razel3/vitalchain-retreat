import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import specialty1 from "@/assets/guides/specialty-1.jpg";
import specialty2 from "@/assets/guides/specialty-2.jpg";
import specialty3 from "@/assets/guides/specialty-3.jpg";
import specialty4 from "@/assets/guides/specialty-4.jpg";
import specialty5 from "@/assets/guides/specialty-5.jpg";
import specialty6 from "@/assets/guides/specialty-6.jpg";
import specialty7 from "@/assets/guides/specialty-7.jpg";
import specialty8 from "@/assets/guides/specialty-8.jpg";

interface Specialty {
  name: string;
  image: string;
}

const specialties: Specialty[] = [
  { name: "Reiki", image: specialty1 },
  { name: "Craniosacral & Fascia Therapy", image: specialty2 },
  { name: "Family Constellations", image: specialty3 },
  { name: "Spiritual Coaching", image: specialty4 },
  { name: "Hypnotherapy", image: specialty5 },
  { name: "Art Therapy", image: specialty6 },
  { name: "Meditation & Yoga", image: specialty7 },
  { name: "Bowl Sounds", image: specialty8 },
];

const CARD_WIDTH = 280;
const CARD_HEIGHT = 400;
const GAP = 24;

const GuideCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < specialties.length - 1;

  const goNext = useCallback(() => {
    if (canGoNext) {
      setFlippedIndex(null);
      setCurrentIndex((i) => i + 1);
    }
  }, [canGoNext]);

  const goPrev = useCallback(() => {
    if (canGoPrev) {
      setFlippedIndex(null);
      setCurrentIndex((i) => i - 1);
    }
  }, [canGoPrev]);

  const handleCardClick = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="w-full py-8">
      <div className="relative flex items-center justify-center">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className="absolute left-0 md:left-4 lg:left-8 z-30 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-accent"
          aria-label="Previous specialty"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {canGoPrev && (
          <div className="hidden md:block absolute left-16 lg:left-24 z-20">
            <svg width="80" height="2" viewBox="0 0 80 2">
              <line x1="0" y1="1" x2="80" y2="1" stroke="currentColor" strokeWidth="1.5" className="text-foreground/40" />
            </svg>
          </div>
        )}

        <div
          className="relative mx-16 md:mx-28 lg:mx-36"
          style={{ height: CARD_HEIGHT + 40 }}
        >
          <div className="relative h-full w-full" style={{ perspective: "1200px" }}>
            {specialties.map((specialty, index) => {
              const diff = index - currentIndex;
              const isVisible = Math.abs(diff) <= 2;
              if (!isVisible) return null;

              const isFlipped = flippedIndex === index;
              const translateX = diff * (CARD_WIDTH * 0.35 + GAP * 0.5);
              const rotateY = diff * -12;
              const scale = diff === 0 ? 1 : Math.max(0.75, 1 - Math.abs(diff) * 0.12);
              const zIndex = 10 - Math.abs(diff);
              const opacity = diff === 0 ? 1 : Math.max(0.4, 1 - Math.abs(diff) * 0.3);
              const translateZ = -Math.abs(diff) * 60;

              return (
                <motion.div
                  key={index}
                  className="absolute cursor-pointer select-none"
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    left: "50%",
                    top: 20,
                    marginLeft: -(CARD_WIDTH / 2),
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    x: translateX,
                    rotateY,
                    scale,
                    opacity,
                    z: translateZ,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <motion.div
                    className="w-full h-full relative"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 rounded-lg overflow-hidden shadow-lg"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <img
                        src={specialty.image}
                        alt={specialty.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                        loading="lazy"
                        width={640}
                        height={896}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-5">
                        <p className="font-display text-lg text-cream font-medium">{specialty.name}</p>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center p-8 text-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundColor: "hsl(var(--sage))",
                      }}
                    >
                      <p className="font-display text-xl text-cream font-medium leading-relaxed mb-6">
                        Our team of experienced healers and practitioners will be announced soon.
                      </p>
                      <p className="font-body text-sm text-cream/70 tracking-[0.15em] uppercase">
                        Croatia · November 2026
                      </p>
                      <p className="font-body text-xs text-cream/50 mt-8">Click to flip back</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {canGoNext && (
          <div className="hidden md:block absolute right-16 lg:right-24 z-20">
            <svg width="80" height="2" viewBox="0 0 80 2">
              <line x1="0" y1="1" x2="80" y2="1" stroke="currentColor" strokeWidth="1.5" className="text-foreground/40" />
            </svg>
          </div>
        )}

        <button
          onClick={goNext}
          disabled={!canGoNext}
          className="absolute right-0 md:right-4 lg:right-8 z-30 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-accent"
          aria-label="Next specialty"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <p className="text-center font-body text-xs text-muted-foreground mt-6">
        Click a card to learn more · {currentIndex + 1} / {specialties.length}
      </p>
    </div>
  );
};

export default GuideCarousel;
