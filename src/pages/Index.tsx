import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-retreat.jpg";
import aboutImg from "@/assets/about-retreat.jpg";
import reflectionImg from "@/assets/self-reflection.jpg";
import communityImg from "@/assets/community.jpg";
import poolSunset from "@/assets/retreat/pool-sunset.jpg";
import terraceDining from "@/assets/retreat/terrace-dining.jpg";
import terraceSea from "@/assets/retreat/terrace-sea.jpg";
import bedroom from "@/assets/retreat/bedroom.jpg";
import poolDay from "@/assets/retreat/pool-day.jpg";
import garden from "@/assets/retreat/garden.jpg";
import locationImg from "@/assets/retreat-location.jpg";
import academyImg from "@/assets/academy-community.jpg";
import PhotoStack from "@/components/PhotoStack";
import GuideCarousel from "@/components/GuideCarousel";
import InterestForm from "@/components/InterestForm";
import { Button } from "@/components/ui/button";
import { practices } from "@/data/practices";
import ReservationModal from "@/components/ReservationModal";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const calmFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const } },
};

const calmStagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const villaPlans = [
  { name: "Awakening", duration: "7 Days", price: "€3,000", features: ["Round-trip flight · Europe/Switzerland", "Transport Split–Villa (ferry, round trip)", "23 kg luggage included", "Shared accommodation", "Chef-prepared meals", "Daily yoga & meditation", "Group healing & integration circles", "1 Reiki energy session", "Craniosacral & Fascia Therapy", "1 VitalChain NFT experience pass", "Travel cancellation insurance (optional · price upon request)"] },
  { name: "Signature", duration: "7 Days", price: "€3,500", features: ["Round-trip flight · Europe/Switzerland", "Transport Split–Villa (ferry, round trip)", "23 kg luggage included", "Double accommodation · Max 6 rooms", "All meals + detox juices", "Daily yoga, meditation & breathwork", "3 group + 2 private sessions", "Reiki & sound healing", "Craniosacral & Fascia Therapy", "Family constellation workshop", "Addiction & Habits Workshop", "1 VitalChain NFT + digital course", "VitalChain exclusive community access", "Travel cancellation insurance (optional · price upon request)"], popular: true },
  { name: "Premium Experience", duration: "7 Days", price: "€4,700", features: ["Round-trip flight · Europe/Switzerland", "Transport Split–Villa (ferry, round trip)", "23 kg luggage included", "Luxury private room", "All meals + detox program", "Full retreat modalities included", "5 private 1:1 healing sessions", "Hypnotherapy session", "Personal spiritual coaching", "Craniosacral & Fascia Therapy", "Family constellation workshop", "Addiction & Habits Workshop", "Private airport transfer", "VIP integration session after retreat", "3 VitalChain NFTs · Lifetime Academy access", "Travel cancellation insurance (optional · price upon request)"] },
];

const splitPlans = [
  { name: "Awakening", duration: "7 Days", price: "€2,200", features: ["Round-trip flight · Europe/Switzerland", "Airport transfer · Split", "Hotel accommodation · Radisson Blu 5★", "Spalato Spa access · 2,600m²", "Private beach access", "Chef-prepared meals", "Daily yoga & meditation", "Group healing & integration circles", "1 Reiki energy session", "Craniosacral & Fascia Therapy", "1 VitalChain NFT experience pass"] },
  { name: "Signature", duration: "7 Days", price: "€2,800", features: ["Round-trip flight · Europe/Switzerland", "Airport transfer · Split", "Hotel accommodation · Radisson Blu 5★", "Spalato Spa access · 2,600m²", "Private beach access", "All meals + detox juices", "Daily yoga, meditation & breathwork", "3 group + 2 private sessions", "Reiki & sound healing", "Craniosacral & Fascia Therapy", "Family constellation workshop", "Addiction & Habits Workshop", "1 VitalChain NFT + digital course", "VitalChain exclusive community access"], popular: true },
  { name: "Premium Experience", duration: "7 Days", price: "€3,500", features: ["Round-trip flight · Europe/Switzerland", "Private airport transfer · Split", "Luxury room · Radisson Blu 5★", "Spalato Spa · full access + 3 private treatments", "Private beach cabana reserved", "All meals + detox program", "Full retreat modalities included", "5 private 1:1 healing sessions", "Hypnotherapy session", "Personal spiritual coaching", "Craniosacral & Fascia Therapy", "Family constellation workshop", "Addiction & Habits Workshop", "VIP integration session after retreat", "3 VitalChain NFTs · Lifetime Academy access"] },
];

const testimonials = [
  { name: "María L.", text: "VitalChain gave me the space I needed to finally let go of years of pain. I left feeling lighter, clearer, and more connected to myself than ever." },
  { name: "James R.", text: "I came skeptical and left transformed. The coaching sessions alone were worth the entire retreat. This experience changed my life." },
  { name: "Sophia K.", text: "The combination of healing practices and community support created something truly magical. I found my purpose here." },
  { name: "David M.", text: "After years of struggling with anxiety, the meditation and energy work at VitalChain helped me find a peace I didn't know was possible." },
];

const benefits = [
  { icon: "✦", title: "Mental Clarity", desc: "Gain a renewed perspective and deeper understanding of your life direction." },
  { icon: "❋", title: "Emotional Healing", desc: "Release stored emotions and reconnect with inner peace." },
  { icon: "◎", title: "Energy Balance", desc: "Restore harmony between body, mind and spirit." },
  { icon: "⬡", title: "Sense of Purpose", desc: "Reconnect with your deeper calling and authentic path." },
  { icon: "∞", title: "Meaningful Connections", desc: "Build powerful relationships with like-minded individuals." },
];

const Index = () => {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [pricingTab, setPricingTab] = useState<"villa" | "split">("villa");

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <ReservationModal open={reservationOpen} onOpenChange={setReservationOpen} />
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-display text-xl font-semibold tracking-wide">VitalChain</span>
          <Button variant="hero" size="sm" className="text-xs px-6 py-2 h-auto" onClick={() => setReservationOpen(true)}>
            Start Your Transformation
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
          <motion.p variants={fadeUp} className="font-body text-cream/80 max-w-xl text-lg leading-relaxed mb-6">
            Reconnect with your purpose, clear energetic blockages and activate your next level of life and leadership.
          </motion.p>
          <motion.p variants={fadeUp} className="font-body text-xs tracking-[0.25em] uppercase text-sand/90 mb-10">
            Two transformational experiences. One vision.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
            <Button variant="hero" onClick={() => setReservationOpen(true)}>Apply for the Next Retreat</Button>
            <Button variant="heroOutline" className="border-cream text-cream hover:bg-cream hover:text-foreground" onClick={() => document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })}>Explore the Experience</Button>
          </motion.div>

          {/* Two Retreat Cards */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {/* Split City Retreat */}
            <div className="bg-background/10 backdrop-blur-md border border-cream/20 p-6 md:p-8">
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-sand/80 mb-3">Coming October 2026</p>
              <h3 className="font-display text-2xl font-light text-cream mb-1">Split City Retreat</h3>
              <p className="font-body text-cream/70 text-sm mb-3">Radisson Blu Resort & Spa</p>
              <p className="font-body text-cream/60 text-xs leading-relaxed mb-5">
                17–23 Oct 2026 · Split, Croatia · Up to 15 participants
              </p>
              <button
                onClick={() => document.getElementById('october-2026')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full border border-cream/40 text-cream font-body text-xs tracking-[0.2em] uppercase py-3 px-6 hover:bg-cream/10 transition-all duration-300"
              >
                Explore & Register
              </button>
            </div>

            {/* Private Villa Retreat */}
            <div className="bg-primary/20 backdrop-blur-md border border-cream/20 p-6 md:p-8">
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-sand/80 mb-3">Coming August 2027</p>
              <h3 className="font-display text-2xl font-light text-cream mb-1">Private Villa Retreat</h3>
              <p className="font-body text-cream/70 text-sm mb-3">Dalmatian Coast, Croatia</p>
              <p className="font-body text-cream/60 text-xs leading-relaxed mb-5">
                August 2027 · Exclusive Villa · Up to 12 participants
              </p>
              <button
                onClick={() => document.getElementById('august-2027')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-primary text-primary-foreground font-body text-xs tracking-[0.2em] uppercase py-3 px-6 hover:bg-primary/85 transition-all duration-300"
              >
                Explore & Reserve
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* IS THIS WHERE YOU ARE */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img src={reflectionImg} alt="Person in deep self-reflection by a calm lake" className="w-full h-[500px] object-cover rounded-sm" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light leading-tight mb-6">
              Is This Where You<br />Are Right Now?
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">
              Many high-performing individuals reach a point where something feels missing.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-6">
              On the outside, life may look successful,<br />but inside there is a sense of disconnection.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">You may feel:</motion.p>
            {[
              "Disconnected from your deeper purpose",
              "Mentally overloaded by constant pressure",
              "Spiritually blocked or energetically drained",
              "Successful in life, yet searching for deeper meaning",
              "Surrounded by people, yet craving authentic connection",
            ].map((item) => (
              <motion.div key={item} variants={fadeUp} className="flex items-start gap-4 mb-3">
                <span className="text-primary mt-1 text-lg">●</span>
                <p className="font-body text-muted-foreground leading-relaxed">{item}</p>
              </motion.div>
            ))}
            <motion.p variants={fadeUp} className="font-body text-foreground leading-relaxed mt-6 italic">
              And deep down you feel that something greater is calling you.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-foreground leading-relaxed mt-4 font-medium">
              You are not lost.<br />You are being called to evolve.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">About the VitalChain Retreat</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light leading-tight mb-6">
              A Sacred Space for Deep<br />Transformation
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">
              VitalChain Retreat is an immersive experience designed to help you step away from the noise of modern life and reconnect with what truly matters.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">
              In a carefully held and inspiring environment, you will be guided through powerful processes of self-discovery, emotional release and energetic alignment.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">
              Our approach combines ancient spiritual wisdom with modern transformational practices, creating a unique space where deep healing and personal breakthroughs can happen.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-foreground leading-relaxed italic mb-2">
              This is not just a retreat.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-foreground leading-relaxed font-medium">
              It is an opportunity to realign with your purpose, your energy and your highest potential.
            </motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img src={aboutImg} alt="Meditation in a peaceful garden" className="w-full h-[500px] object-cover rounded-sm" />
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="experiences" className="py-28 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Experiences & Transformational Practices</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light mb-4">A journey designed to activate your mind, body and soul</motion.h2>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-2">
              During the retreat, you will experience a carefully curated combination of practices designed to support deep personal transformation.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-foreground font-medium">These experiences may include:</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={calmStagger} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {practices.map((exp) => (
              <Link key={exp.slug} to={`/practice/${exp.slug}`}>
                <motion.div
                  variants={calmFadeUp}
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
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Is This Retreat For You?</motion.p>
            <motion.p variants={fadeUp} className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              The VitalChain Retreat is designed for individuals who feel called to experience deeper transformation in their lives.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-foreground leading-relaxed mb-6 font-medium">
              This retreat may be for you if you are:
            </motion.p>
            {[
              "Seeking deeper self-awareness and personal growth",
              "Feeling disconnected from your purpose or direction",
              "Going through a major life transition or inner awakening",
              "Ready to release emotional blockages and limiting patterns",
              "Looking to reconnect with your passion, clarity and inner power",
            ].map((item) => (
              <motion.div key={item} variants={fadeUp} className="flex items-start gap-4 mb-4">
                <span className="text-primary mt-1 text-lg">●</span>
                <p className="font-body text-muted-foreground leading-relaxed">{item}</p>
              </motion.div>
            ))}
            <motion.p variants={fadeUp} className="font-body text-foreground leading-relaxed mt-6 italic">
              If you feel that something inside you is asking for change, clarity or renewal, this experience may be exactly what you need.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* TRANSFORMATION BENEFITS */}
      <section className="py-28 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">What Awaits You</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light">The Transformation You Will Experience</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                className="text-center group"
              >
                <motion.span
                  className="text-3xl text-primary block mb-4"
                  initial={{ scale: 0, rotate: -30, opacity: 0 }}
                  whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                  whileHover={{ scale: 1.25, rotate: 8, transition: { duration: 0.3 } }}
                >
                  {b.icon}
                </motion.span>
                <h3 className="font-display text-lg font-medium mb-2">{b.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RETREAT EXPERIENCE */}
      <section className="py-28 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">The Retreat Experience</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light mb-4">A carefully designed journey of transformation, connection and renewal</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">
                During the VitalChain Retreat, every element of the experience is intentionally designed to support deep personal transformation.
              </motion.p>
              <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">
                Participants share several days together in a peaceful and inspiring environment where they can disconnect from the demands of everyday life and fully focus on their inner journey.
              </motion.p>
              <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-10">
                Through guided practices, meaningful conversations and shared moments of reflection, a powerful space for healing and growth naturally emerges.
              </motion.p>
              <motion.div variants={fadeUp}>
                <h3 className="font-display text-xl font-medium mb-6">What a typical day may feel like</h3>
                <div className="space-y-6">
                  {[
                    { time: "Morning", desc: "Meditation and grounding practices" },
                    { time: "Midday", desc: "Workshops and personal growth sessions" },
                    { time: "Afternoon", desc: "Nature immersion and reflection" },
                    { time: "Evening", desc: "Integration circles and meaningful conversations" },
                  ].map((slot) => (
                    <div key={slot.time} className="flex items-start gap-4">
                      <div className="w-20 shrink-0">
                        <span className="font-display text-sm font-semibold text-primary">{slot.time}</span>
                      </div>
                      <div className="border-l border-border pl-4">
                        <p className="font-body text-muted-foreground text-sm leading-relaxed">{slot.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <PhotoStack
                images={[
                  { src: poolSunset, alt: "Pool at sunset with Adriatic sea view" },
                  { src: terraceDining, alt: "Outdoor dining terrace with sea view" },
                  { src: terraceSea, alt: "Terrace overlooking the Adriatic coast" },
                  { src: bedroom, alt: "Comfortable retreat bedroom" },
                  { src: poolDay, alt: "Pool area during the day" },
                  { src: garden, alt: "Lush Mediterranean garden" },
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">The Location</motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light leading-tight mb-4">
                A Transformational<br />Setting
              </motion.h2>
              <motion.p variants={fadeUp} className="font-body text-lg text-muted-foreground leading-relaxed mb-6 italic">
                Hosted in the breathtaking nature of Croatia
              </motion.p>
              <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">
                The VitalChain Retreat takes place in a carefully selected location designed to support deep reflection, relaxation and transformation.
              </motion.p>
              <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-4">
                Surrounded by the natural beauty of Croatia's coastline, participants experience a peaceful environment that invites stillness, clarity and renewal.
              </motion.p>
              <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed mb-8">
                Far from the noise of everyday life, this setting allows you to fully immerse yourself in your inner journey while enjoying the beauty of nature.
              </motion.p>
              <motion.div variants={fadeUp}>
                <p className="font-body text-foreground font-medium mb-4">Participants will enjoy:</p>
                {[
                  "Peaceful natural surroundings",
                  "Beautiful Mediterranean landscapes",
                  "Comfortable retreat accommodations",
                  "Spaces designed for meditation, reflection and connection",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 mb-3">
                    <span className="text-primary mt-1 text-sm">●</span>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <img src={locationImg} alt="Peaceful Croatian coastline with stone terrace overlooking the Adriatic sea" className="w-full h-[550px] object-cover rounded-sm" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MEET YOUR GUIDES */}
      <section className="py-28 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Your Retreat Team</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light mb-4">Meet Your Guides</motion.h2>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A carefully selected team of experienced practitioners, healers and coaches dedicated to supporting your transformation.
            </motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <GuideCarousel />
          </motion.div>
        </div>
      </section>

      {/* VISION BEHIND VITALCHAIN */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Our Purpose</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light mb-10">The Vision Behind VitalChain</motion.h2>
            <motion.div variants={fadeUp} className="font-body text-muted-foreground leading-relaxed space-y-6 text-left">
              <p>VitalChain Retreat was created with a clear vision:</p>
              <p className="text-foreground font-display text-xl md:text-2xl font-light italic text-center px-4">
                To build a space where people can reconnect with their true essence, release emotional blockages and rediscover their life purpose.
              </p>
              <p>Our retreats bring together experienced practitioners from different healing and spiritual disciplines. By combining ancient wisdom with modern transformational practices, we create a unique environment where deep personal change becomes possible.</p>
              <p>Each guide contributes their expertise to support participants through a powerful journey of self-discovery, healing and conscious growth.</p>
              <p className="text-foreground font-medium">VitalChain is more than a retreat.</p>
              <p>It is part of a growing ecosystem dedicated to personal transformation, spiritual development and conscious leadership.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VITALCHAIN ACADEMY */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Beyond the Retreat</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light mb-8">Continue Your Journey with VitalChain Academy</motion.h2>
            <motion.div variants={fadeUp} className="font-body text-muted-foreground leading-relaxed space-y-5">
              <p>The VitalChain Retreat is only the beginning of your transformation journey.</p>
              <p>Participants also gain access to the VitalChain ecosystem, where they can continue their personal and spiritual development through the <span className="text-foreground font-medium">VitalChain Academy</span>.</p>
              <p>The academy provides ongoing learning, community support and advanced teachings designed to deepen the transformation initiated during the retreat.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 p-6 border border-border bg-card/50">
              <p className="font-body text-sm text-foreground font-medium mb-3">Participants of the retreat receive exclusive access benefits within the VitalChain ecosystem, including:</p>
              <ul className="space-y-2">
                {["Learning resources & advanced courses", "Community events & gatherings", "Future programs & retreats"].map((item) => (
                  <li key={item} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">✦</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <img src={academyImg} alt="VitalChain community gathering on a Mediterranean terrace at sunset" className="w-full h-[550px] object-cover rounded-sm shadow-lg" />
          </motion.div>
        </div>
      </section>

      {/* PLANS */}
      <section id="pricing-section" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light mb-4">Choose Your Retreat Experience</motion.h2>
            <motion.p variants={fadeUp} className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">All retreat packages include full participation in the VitalChain transformational program.</motion.p>
          </motion.div>

          {/* Tab Toggle */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex border border-border">
              <button
                onClick={() => setPricingTab("split")}
                className={`font-body text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 ${
                  pricingTab === "split"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                Split · October 2026
              </button>
              <button
                onClick={() => setPricingTab("villa")}
                className={`font-body text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 ${
                  pricingTab === "villa"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                Villa · August 2027
              </button>
            </div>
          </div>

          <motion.div
            key={pricingTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {(pricingTab === "villa" ? villaPlans : splitPlans).map((plan) => (
              <div
                key={plan.name}
                className={`p-10 border transition-all duration-300 ${plan.popular ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-background"}`}
              >
                {plan.popular && <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4 block">Most Popular</span>}
                <h3 className="font-display text-2xl font-medium mb-1">{plan.name}</h3>
                <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">{plan.duration}</p>
                <p className="font-display text-3xl font-light text-primary mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                {pricingTab === "villa" ? (
                  <Button variant={plan.popular ? "hero" : "heroOutline"} className="w-full" onClick={() => setReservationOpen(true)}>
                    Reserve Your Spot
                  </Button>
                ) : (
                  <button
                    onClick={() => document.getElementById('interest-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full font-body text-xs tracking-[0.2em] uppercase py-4 px-6 transition-all duration-300 ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/85"
                        : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    Register Interest
                  </button>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mt-16 max-w-xl mx-auto">
            <p className="font-display text-xl font-medium mb-2">
              {pricingTab === "villa" ? "Limited to 12 participants" : "Up to 15 participants"}
            </p>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              {pricingTab === "villa"
                ? "This retreat is intentionally limited to a small group to preserve the depth and intimacy of the experience."
                : "A carefully curated group experience at the Radisson Blu Resort & Spa, Split."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* INTEREST FORM */}
      <InterestForm />

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
            Your journey toward deeper clarity, healing and purpose begins with a single step.
          </motion.p>
          <motion.p variants={fadeUp} className="font-body text-cream/70 text-base mb-4 max-w-lg mx-auto">
            The VitalChain Retreat is a carefully curated experience designed for individuals ready to reconnect with their authentic path and unlock their inner potential.
          </motion.p>
          <motion.p variants={fadeUp} className="font-body text-cream/70 text-base mb-10 max-w-lg mx-auto">
            If you feel called to this experience, we invite you to take the next step.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
            <Button variant="hero" onClick={() => setReservationOpen(true)}>Apply for the VitalChain Retreat</Button>
            <span className="font-body text-cream/50 text-sm">Small group experience • Limited spots available</span>
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
