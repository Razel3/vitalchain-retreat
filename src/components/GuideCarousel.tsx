import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import guide1 from "@/assets/guides/guide-1.jpg";
import guide2 from "@/assets/guides/guide-2.jpg";
import guide3 from "@/assets/guides/guide-3.jpg";
import guide4 from "@/assets/guides/guide-4.jpg";
import guide5 from "@/assets/guides/guide-5.jpg";
import guide6 from "@/assets/guides/guide-6.jpg";
import guide7 from "@/assets/guides/guide-7.jpg";
import guide8 from "@/assets/guides/guide-8.jpg";

interface Guide {
  name: string;
  role: string;
  description: string;
  image: string;
}

const guides: Guide[] = [
  { name: "Marco Valdés", role: "Transformational Coach", description: "Specializes in helping leaders unlock clarity, purpose and emotional resilience through deep inner work.", image: guide1 },
  { name: "Elena Rossi", role: "Meditation Guide", description: "Trained in mindfulness and contemplative traditions, Elena creates sacred spaces for stillness and self-discovery.", image: guide2 },
  { name: "Thomas Lindgren", role: "Energy Healer", description: "With over 20 years of practice in Reiki and energy work, Thomas facilitates deep energetic release and alignment.", image: guide3 },
  { name: "Sofia Navarro", role: "Holistic Therapist", description: "Combines somatic therapy and family constellations to guide participants through emotional healing and integration.", image: guide4 },
  { name: "Luca Moretti", role: "Yoga & Breathwork", description: "A dedicated practitioner who blends movement, pranayama and philosophy to awaken the body-mind connection.", image: guide5 },
  { name: "Ana Petrova", role: "Breathwork Facilitator", description: "Guides powerful breathwork journeys that help release stored trauma and open pathways to clarity and peace.", image: guide6 },
  { name: "Daniel Kessler", role: "Sound Healer", description: "Uses sacred instruments and vocal harmonics to create immersive soundscapes that support deep relaxation and healing.", image: guide7 },
  { name: "Isabel Ferreira", role: "Art Therapist", description: "Facilitates creative expression as a pathway to self-understanding, emotional release and personal insight.", image: guide8 },
];

const CARD_WIDTH = 280;
const CARD_HEIGHT = 400;
const GAP = 24;

const GuideCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < guides.length - 1;

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
        {/* Left Arrow */}
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className="absolute left-0 md:left-4 lg:left-8 z-30 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-accent"
          aria-label="Previous guide"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Arrow line left */}
        {canGoPrev && (
          <div className="hidden md:block absolute left-16 lg:left-24 z-20">
            <svg width="80" height="2" viewBox="0 0 80 2">
              <line x1="0" y1="1" x2="80" y2="1" stroke="currentColor" strokeWidth="1.5" className="text-foreground/40" />
            </svg>
          </div>
        )}

        {/* Cards area */}
        <div
          className="relative overflow-hidden mx-16 md:mx-28 lg:mx-36"
          style={{
            height: CARD_HEIGHT + 40,
            perspective: "1200px",
          }}
        >
          <div
            className="relative h-full"
            style={{
              width: "100%",
            }}
          >
            {guides.map((guide, index) => {
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
                  {/* Card flip container */}
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
                        src={guide.image}
                        alt={guide.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-5">
                        <p className="font-display text-lg text-cream font-medium">{guide.name}</p>
                        <p className="font-body text-xs text-cream/70 tracking-wide uppercase">{guide.role}</p>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 rounded-lg overflow-hidden bg-card border border-border shadow-lg flex flex-col items-center justify-center p-8 text-center"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-5 border-2 border-primary/30">
                        <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" draggable={false} />
                      </div>
                      <h4 className="font-display text-2xl font-medium mb-1">{guide.name}</h4>
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4">{guide.role}</p>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
                      <p className="font-body text-xs text-muted-foreground/60 mt-6">Click to flip back</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Arrow line right */}
        {canGoNext && (
          <div className="hidden md:block absolute right-16 lg:right-24 z-20">
            <svg width="80" height="2" viewBox="0 0 80 2">
              <line x1="0" y1="1" x2="80" y2="1" stroke="currentColor" strokeWidth="1.5" className="text-foreground/40" />
            </svg>
          </div>
        )}

        {/* Right Arrow */}
        <button
          onClick={goNext}
          disabled={!canGoNext}
          className="absolute right-0 md:right-4 lg:right-8 z-30 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-accent"
          aria-label="Next guide"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <p className="text-center font-body text-xs text-muted-foreground mt-6">
        Click a card to learn more · {currentIndex + 1} / {guides.length}
      </p>
    </div>
  );
};

export default GuideCarousel;
