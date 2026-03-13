import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-retreat.jpg";
import aboutImg from "@/assets/about-retreat.jpg";
import reflectionImg from "@/assets/self-reflection.jpg";
import experienceImg from "@/assets/retreat-experience.jpg";
import communityImg from "@/assets/community.jpg";
import { Button } from "@/components/ui/button";
import { practices } from "@/data/practices";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};


const plans = [
  { name: "3-Day Transformation", price: "From $1,200", features: ["Accommodation included", "Daily workshops", "1 private coaching session", "Group healing circles", "All meals included"] },
  { name: "5-Day Deep Healing", price: "From $1,950", features: ["Accommodation included", "Daily workshops & practices", "2 private coaching sessions", "Hypnotherapy session", "Reiki healing session", "All meals included"], popular: true },
  { name: "7-Day Full Immersion", price: "From $2,800", features: ["Premium accommodation", "All workshops & practices", "3 private coaching sessions", "Full healing package", "Art therapy session", "Integration support", "All meals included"] },
];

const testimonials = [
  { name: "María L.", text: "VitalChain gave me the space I needed to finally let go of years of pain. I left feeling lighter, clearer, and more connected to myself than ever." },
  { name: "James R.", text: "I came skeptical and left transformed. The coaching sessions alone were worth the entire retreat. This experience changed my life." },
  { name: "Sophia K.", text: "The combination of healing practices and community support created something truly magical. I found my purpose here." },
  { name: "David M.", text: "After years of struggling with anxiety, the meditation and energy work at VitalChain helped me find a peace I didn't know was possible." },
];

const benefits = [
  { icon: "✦", title: "Mental Clarity", desc: "Clear the fog and gain a fresh perspective on your life path." },
  { icon: "❋", title: "Emotional Healing", desc: "Release stored emotions and find lasting inner peace." },
  { icon: "◎", title: "Energy Balance", desc: "Restore harmony between body, mind and spirit." },
  { icon: "⬡", title: "Sense of Purpose", desc: "Reconnect with your deeper calling and direction." },
  { icon: "∞", title: "Meaningful Connections", desc: "Bond with like-minded souls on a shared journey." },
];

const Index = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-display text-xl font-semibold tracking-wide">VitalChain</span>
          <Button variant="hero" size="sm" className="text-xs px-6 py-2 h-auto">
            Apply Now
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end">
        <div className="absolute inset-0">
          <img src={heroImg} alt="VitalChain Retreat aerial view of luxury wellness retreat" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        </div>
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-40 w-full"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-sand mb-4">
            Transformational Retreats for Conscious Leaders
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-cream leading-[0.9] mb-6">
            VitalChain<br />Retreat
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-cream/80 max-w-xl text-lg leading-relaxed mb-10">
            Reconnect with your purpose, clear energetic blockages and activate your next level of life and leadership.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Button variant="hero">Apply for the Next Retreat</Button>
            <Button variant="heroOutline" className="border-cream text-cream hover:bg-cream hover:text-foreground">Explore the Experience</Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">About the Retreat</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light leading-tight mb-6">
              A sacred space for<br />transformation
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">
              VitalChain Retreat is a safe and inspiring space where people can disconnect from the noise and stress of everyday life and reconnect with their true selves.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed">
              Our focus is on personal transformation, emotional healing and conscious living. Through a carefully curated blend of ancient wisdom and modern therapeutic practices, we guide you toward lasting change from the inside out.
            </motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img src={aboutImg} alt="Meditation in a peaceful garden" className="w-full h-[500px] object-cover rounded-sm" />
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="py-28 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Experiences & Practices</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light">Your healing journey</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {practices.map((exp) => (
              <Link key={exp.slug} to={`/practice/${exp.slug}`}>
                <motion.div
                  variants={fadeUp}
                  className="relative overflow-hidden h-[280px] group cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                >
                  <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl font-medium text-cream leading-tight">{exp.title}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img src={communityImg} alt="Group healing session outdoors" className="w-full h-[500px] object-cover rounded-sm" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Who is this for</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light leading-tight mb-8">
              This retreat is for you
            </motion.h2>
            {[
              "People seeking personal growth and deeper self-awareness",
              "People going through major life transitions",
              "People healing from emotional challenges or past trauma",
              "People looking to reconnect with their purpose and passion",
            ].map((item) => (
              <motion.div key={item} variants={fadeUp} className="flex items-start gap-4 mb-5">
                <span className="text-primary mt-1 text-lg">●</span>
                <p className="font-body text-muted-foreground leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RETREAT EXPERIENCE */}
      <section className="py-28 px-6 bg-card">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">The Retreat Experience</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light leading-tight mb-6">
              Immerse yourself in healing
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-8">
              Participants stay together in a peaceful environment designed for reflection, healing and deep connection. Every detail is crafted to support your transformation.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
              {["Accommodation", "Daily Workshops", "Group Sessions", "Guided Healing", "Community Experience"].map((item) => (
                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-body text-sm">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img src={experienceImg} alt="Retreat accommodation" className="w-full h-[500px] object-cover rounded-sm" />
          </motion.div>
        </div>
      </section>

      {/* PLANS */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Plans & Stay Options</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light">Choose your journey</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`p-10 border transition-all duration-300 ${plan.popular ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-background"}`}
              >
                {plan.popular && <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4 block">Most Popular</span>}
                <h3 className="font-display text-2xl font-medium mb-2">{plan.name}</h3>
                <p className="font-display text-3xl font-light text-primary mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "hero" : "heroOutline"} className="w-full">
                  Reserve Your Spot
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-28 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Benefits</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light">What you'll take home</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeUp} className="text-center">
                <span className="text-3xl text-primary block mb-4">{b.icon}</span>
                <h3 className="font-display text-lg font-medium mb-2">{b.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light">Stories of transformation</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="bg-card p-10 border border-border">
                <p className="font-body text-muted-foreground leading-relaxed italic mb-6">"{t.text}"</p>
                <p className="font-display text-lg font-medium">— {t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0">
          <img src={communityImg} alt="Community healing session" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-light text-cream leading-tight mb-6">
            Begin Your<br />Transformation
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-cream/80 text-lg mb-10 max-w-lg mx-auto">
            Your journey toward healing, clarity and purpose starts with a single step. We're ready when you are.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button variant="hero">Reserve Your Spot</Button>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold">VitalChain Retreat</span>
          <p className="font-body text-sm text-muted-foreground">© 2026 VitalChain Retreat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
