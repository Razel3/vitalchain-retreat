import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { practices } from "@/data/practices";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const PracticeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const practice = practices.find((p) => p.slug === slug);

  if (!practice) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Practice not found</h1>
          <Link to="/">
            <Button variant="hero">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-semibold tracking-wide">VitalChain</Link>
          <Link to="/">
            <Button variant="hero" size="sm" className="text-xs px-6 py-2 h-auto">
              Apply Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* BACK LINK */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-4">
        <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* CONTENT */}
      <motion.div
        className="max-w-4xl mx-auto px-6 pb-28"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Title */}
        <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl font-light mb-16 leading-tight">
          {practice.title}
        </motion.h1>

        {/* What is it */}
        <motion.div variants={fadeUp} className="mb-16">
          <h2 className="font-display text-3xl font-light mb-6">{practice.whatIs.title}</h2>
          <p className="font-body text-muted-foreground leading-relaxed text-lg">{practice.whatIs.text}</p>
        </motion.div>

        {/* How does it work */}
        <motion.div variants={fadeUp} className="mb-16">
          <h2 className="font-display text-3xl font-light mb-6">{practice.howWorks.title}</h2>
          <p className="font-body text-muted-foreground leading-relaxed text-lg">{practice.howWorks.text}</p>
        </motion.div>

        {/* Benefits */}
        <motion.div variants={fadeUp} className="mb-16">
          <h2 className="font-display text-3xl font-light mb-8">Benefits</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {practice.benefits.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <p className="font-body text-muted-foreground leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Session */}
        <motion.div variants={fadeUp} className="mb-16">
          <h2 className="font-display text-3xl font-light mb-6">{practice.session.title}</h2>
          <p className="font-body text-muted-foreground leading-relaxed text-lg">{practice.session.text}</p>
        </motion.div>

        {/* Closing */}
        <motion.div variants={fadeUp} className="bg-card border border-border p-10 text-center">
          <p className="font-body text-lg text-muted-foreground leading-relaxed italic">{practice.closing}</p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="text-center mt-16">
          <Link to="/">
            <Button variant="hero">Explore the Retreat</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PracticeDetail;
