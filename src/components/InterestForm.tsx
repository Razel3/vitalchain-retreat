import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const InterestForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    retreatChoice: "",
    tier: "",
    referral: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultState, setResultState] = useState<null | { type: "success"; applicationNumber: string } | { type: "duplicate" } | { type: "error" }>(null);

  const canSubmit = form.fullName.trim() !== "" && form.email.trim() !== "" && form.phone.trim() !== "" && form.country.trim() !== "" && form.retreatChoice !== "" && form.tier !== "";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(
        "https://vitalchain-backend-production.up.railway.app/api/retreats/interest",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            country: form.country,
            retreatChoice: form.retreatChoice,
            tier: form.tier,
            referral: form.referral,
          }),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 409 || (data.message && data.message.toLowerCase().includes("already registered"))) {
          setResultState({ type: "duplicate" });
          return;
        }
        throw new Error("Request failed");
      }
      const data = await res.json();
      setResultState({ type: "success", applicationNumber: data.applicationNumber || "—" });
    } catch {
      setResultState({ type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (resultState) {
    return (
      <section id="interest-form" className="py-28 px-6 bg-card">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-4xl mb-6">✦</motion.div>
            {resultState.type === "success" && (
              <>
                <motion.h3 variants={fadeUp} className="font-display text-3xl md:text-4xl font-light mb-4">
                  ✓ Thank you!
                </motion.h3>
                <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed">
                  Your reference is <span className="font-semibold text-foreground">{resultState.applicationNumber}</span>. Check your inbox for a confirmation email.
                </motion.p>
              </>
            )}
            {resultState.type === "duplicate" && (
              <>
                <motion.h3 variants={fadeUp} className="font-display text-3xl md:text-4xl font-light mb-4">
                  Already Registered
                </motion.h3>
                <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed">
                  You're already on our list. We'll be in touch soon.
                </motion.p>
              </>
            )}
            {resultState.type === "error" && (
              <>
                <motion.h3 variants={fadeUp} className="font-display text-3xl md:text-4xl font-light mb-4">
                  Something went wrong
                </motion.h3>
                <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed">
                  Please try again or contact <span className="font-semibold">support@vitalchainacademy.com</span>
                </motion.p>
              </>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="interest-form" className="py-28 px-6 bg-card">
      <div className="max-w-xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.p variants={fadeUp} className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Get Notified</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-light mb-4">Register Your Interest</motion.h2>
          <motion.p variants={fadeUp} className="font-body text-muted-foreground leading-relaxed">
            Be the first to know when spots open. No payment required.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
          <motion.div variants={fadeUp}>
            <Label htmlFor="interest-name" className="font-body text-sm font-medium text-foreground mb-1.5 block">
              Full Name <span className="text-primary">*</span>
            </Label>
            <Input
              id="interest-name"
              placeholder="Your full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="bg-white/60 border-border focus:border-primary font-body rounded-sm h-12"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Label htmlFor="interest-email" className="font-body text-sm font-medium text-foreground mb-1.5 block">
              Email <span className="text-primary">*</span>
            </Label>
            <Input
              id="interest-email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-white/60 border-border focus:border-primary font-body rounded-sm h-12"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Label htmlFor="interest-phone" className="font-body text-sm font-medium text-foreground mb-1.5 block">
              Phone / WhatsApp <span className="text-primary">*</span>
            </Label>
            <Input
              id="interest-phone"
              type="tel"
              placeholder="+41 79 123 4567"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-white/60 border-border focus:border-primary font-body rounded-sm h-12"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Label htmlFor="interest-country" className="font-body text-sm font-medium text-foreground mb-1.5 block">
              Country <span className="text-primary">*</span>
            </Label>
            <Input
              id="interest-country"
              placeholder="e.g. Switzerland"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="bg-white/60 border-border focus:border-primary font-body rounded-sm h-12"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Label className="font-body text-sm font-medium text-foreground mb-3 block">
              Which retreat interests you? <span className="text-primary">*</span>
            </Label>
            <RadioGroup value={form.retreatChoice} onValueChange={(v) => setForm({ ...form, retreatChoice: v })} className="space-y-3">
              {[
                { value: "split_oct_2026", label: "Split · October 2026" },
                { value: "villa_aug_2027", label: "Private Villa · August 2027" },
                { value: "both", label: "Both" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-3">
                  <RadioGroupItem value={opt.value} id={`retreat-${opt.value}`} />
                  <Label htmlFor={`retreat-${opt.value}`} className="font-body text-sm text-muted-foreground cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Label className="font-body text-sm font-medium text-foreground mb-3 block">
              Preferred tier? <span className="text-primary">*</span>
            </Label>
            <RadioGroup value={form.tier} onValueChange={(v) => setForm({ ...form, tier: v })} className="space-y-3">
              {[
                { value: "awakening", label: "Awakening" },
                { value: "signature", label: "Signature" },
                { value: "premium", label: "Premium Experience" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-3">
                  <RadioGroupItem value={opt.value} id={`tier-${opt.value}`} />
                  <Label htmlFor={`tier-${opt.value}`} className="font-body text-sm text-muted-foreground cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Label htmlFor="interest-referral" className="font-body text-sm font-medium text-foreground mb-1.5 block">
              How did you hear about us? <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="interest-referral"
              placeholder="e.g. Instagram, a friend, Google..."
              value={form.referral}
              onChange={(e) => setForm({ ...form, referral: e.target.value })}
              className="bg-white/60 border-border focus:border-primary font-body rounded-sm h-12"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="w-full h-14 bg-primary hover:bg-primary/85 text-primary-foreground font-body text-sm tracking-[0.2em] uppercase rounded-sm transition-all duration-300 active:scale-[0.97] disabled:opacity-40"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send My Interest"
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InterestForm;
