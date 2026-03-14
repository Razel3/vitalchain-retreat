import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoStackProps {
  images: { src: string; alt: string }[];
}

const PhotoStack = ({ images }: PhotoStackProps) => {
  const [order, setOrder] = useState(images.map((_, i) => i));

  const handleClick = () => {
    setOrder((prev) => {
      const next = [...prev];
      const front = next.shift()!;
      next.push(front);
      return next;
    });
  };

  return (
    <div
      className="relative w-full h-[500px] cursor-pointer"
      onClick={handleClick}
    >
      {order.map((imgIndex, stackPos) => {
        const zIndex = images.length - stackPos;
        const offset = stackPos * 8;
        const rotate = stackPos === 0 ? 0 : stackPos % 2 === 0 ? 2 : -1.5;
        const scale = 1 - stackPos * 0.03;

        return (
          <AnimatePresence key={imgIndex} mode="popLayout">
            <motion.div
              layout
              className="absolute inset-0 rounded-sm overflow-hidden shadow-lg"
              style={{ zIndex }}
              initial={false}
              animate={{
                y: offset,
                x: offset * 0.5,
                rotate,
                scale,
                opacity: stackPos > 3 ? 0 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <img
                src={images[imgIndex].src}
                alt={images[imgIndex].alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        );
      })}
      <div className="absolute bottom-4 right-4 z-50 bg-background/70 backdrop-blur-sm text-foreground text-xs px-3 py-1.5 rounded-full font-body pointer-events-none">
        Click to explore · {order.indexOf(0) + 1}/{images.length}
      </div>
    </div>
  );
};

export default PhotoStack;
