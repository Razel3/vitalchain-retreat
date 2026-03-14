import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

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
const VISIBLE_CARDS = 5;

const GuideCarousel = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  const rawX = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 30, mass: 0.8 });

  const totalWidth = guides.length * (CARD_WIDTH + GAP);

  // Normalize position to keep it within bounds for infinite feel
  const getNormalizedOffset = useCallback(() => {
    let val = rawX.get();
    // Wrap around
    while (val > totalWidth / 2) val -= totalWidth;
    while (val < -totalWidth / 2) val += totalWidth;
    return val;
  }, [totalWidth]);

  const getCardTransform = useCallback(
    (index: number, offset: number) => {
      const centerX = 0;
      const cardPos = index * (CARD_WIDTH + GAP) + offset;
      // Wrap for infinite loop
      let wrappedPos = cardPos;
      while (wrappedPos > totalWidth / 2) wrappedPos -= totalWidth;
      while (wrappedPos < -totalWidth / 2) wrappedPos += totalWidth;

      const distance = wrappedPos - centerX;
      const normalizedDist = distance / (CARD_WIDTH + GAP);

      const rotateY = Math.max(-45, Math.min(45, normalizedDist * 15));
      const scale = Math.max(0.7, 1 - Math.abs(normalizedDist) * 0.1);
      const zIndex = Math.round((1 - Math.abs(normalizedDist)) * 10);
      const opacity = Math.max(0, 1 - Math.abs(normalizedDist) * 0.25);
      const translateZ = -Math.abs(normalizedDist) * 80;

      return { translateX: wrappedPos, rotateY, scale, zIndex, opacity, translateZ };
    },
    [totalWidth]
  );

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      setOffset(latest);
    });
    return unsubscribe;
  }, [x]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = false;
    dragStartX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 0) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 5) isDragging.current = true;
    rawX.set(rawX.get() + (e.clientX - dragStartX.current));
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = () => {
    // Snap to nearest card
    const currentX = rawX.get();
    const nearest = Math.round(currentX / (CARD_WIDTH + GAP)) * (CARD_WIDTH + GAP);
    animate(rawX, nearest, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleCardClick = (index: number) => {
    if (isDragging.current) return;
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  // Touch support
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = false;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 5) isDragging.current = true;
    rawX.set(rawX.get() + delta);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    handlePointerUp();
  };

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        ref={containerRef}
        className="relative mx-auto cursor-grab active:cursor-grabbing"
        style={{
          height: CARD_HEIGHT + 60,
          perspective: "1200px",
          perspectiveOrigin: "center",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute left-1/2 top-0"
          style={{ width: 0, height: CARD_HEIGHT, transformStyle: "preserve-3d" }}
        >
          {guides.map((guide, index) => {
            const t = getCardTransform(index, offset);
            const isFlipped = flippedIndex === index;

            return (
              <div
                key={index}
                className="absolute top-0 select-none"
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  left: -CARD_WIDTH / 2,
                  transform: `translateX(${t.translateX}px) translateZ(${t.translateZ}px) rotateY(${t.rotateY}deg) scale(${t.scale})`,
                  zIndex: t.zIndex,
                  opacity: t.opacity,
                  transition: "opacity 0.3s ease",
                  transformStyle: "preserve-3d",
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
                    className="absolute inset-0 rounded-sm overflow-hidden shadow-lg"
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
                    className="absolute inset-0 rounded-sm overflow-hidden bg-card border border-border shadow-lg flex flex-col items-center justify-center p-8 text-center"
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
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-center font-body text-xs text-muted-foreground mt-4">
        Drag to explore · Click a card to learn more
      </p>
    </div>
  );
};

export default GuideCarousel;
