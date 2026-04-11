import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type RetreatType = "split" | "villa";

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRetreat?: RetreatType;
  onSwitchToWaitlist?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  retreat: RetreatType;
  program: string | null;
  participants: number;
  agreedToTerms: boolean;
}

const splitPrograms = [
  { id: "awakening", name: "Awakening", price: 2300, deposit: 1150, popular: false },
  { id: "signature", name: "Signature", price: 2800, deposit: 1400, popular: true },
  { id: "premium", name: "Premium Experience", price: 3500, deposit: 1750, popular: false },
];

const villaPrograms = [
  { id: "awakening", name: "Awakening", price: 3000, deposit: 1500, popular: false },
  { id: "signature", name: "Signature", price: 3500, deposit: 1750, popular: true },
  { id: "premium", name: "Premium Experience", price: 4700, deposit: 2350, popular: false },
];

const ReservationModal = ({ open, onOpenChange, defaultRetreat = "split", onSwitchToWaitlist }: ReservationModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    retreat: defaultRetreat,
    program: null,
    participants: 1,
    agreedToTerms: false,
  });

  // Reset retreat when modal opens with different default
  const [lastDefault, setLastDefault] = useState(defaultRetreat);
  if (open && defaultRetreat !== lastDefault) {
    setLastDefault(defaultRetreat);
    setForm(f => ({ ...f, retreat: defaultRetreat, program: null }));
    setStep(1);
  }

  const programs = form.retreat === "split" ? splitPrograms : villaPrograms;
  const selectedProgram = useMemo(
    () => programs.find((p) => p.id === form.program),
    [form.program, form.retreat]
  );

  const totalDeposit = selectedProgram ? selectedProgram.deposit * form.participants : 0;
  const totalPrice = selectedProgram ? selectedProgram.price * form.participants : 0;
  const balanceDue = totalPrice - totalDeposit;

  const canProceedStep1 = form.fullName.trim() !== "" && form.email.trim() !== "";
  const canProceedStep2 = form.program !== null && form.participants >= 1;
  const canProceedStep3 = form.agreedToTerms;

  const retreatLabel = form.retreat === "split" ? "Split · 31 Oct – 6 Nov 2026" : "Villa · Aug 2027";
  const balanceDueDate = form.retreat === "split" ? "August 31, 2026" : "July 21, 2026";

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        retreat: defaultRetreat,
        program: null,
        participants: 1,
        agreedToTerms: false,
      });
    }, 300);
  };

  const formatCurrency = (amount: number) => `€${amount.toLocaleString("en-US")}`;

  const handlePayDeposit = async () => {
    if (!form.program) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(
        "https://vitalchain-backend-production.up.railway.app/api/retreats/create-reservation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tier: form.program,
            participants: form.participants,
            clientName: form.fullName,
            clientEmail: form.email,
            clientPhone: form.phone,
            clientCountry: form.country,
            retreat: form.retreat,
          }),
        }
      );
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error("No approval URL");
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please contact support@vitalchainacademy.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSwitchToWaitlist = () => {
    handleClose();
    setTimeout(() => onSwitchToWaitlist?.(), 350);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] bg-[#F5F2EE] border-none p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Reserve Your Spot</DialogTitle>

        {/* Header */}
        <div className="px-8 pt-8 pb-5">
          <h2 className="font-display text-2xl md:text-3xl font-light text-foreground leading-tight mb-1">
            Reserve Your Spot
          </h2>
          <p className="font-body text-sm text-muted-foreground">Step {step} of 3</p>
          <div className="mt-4">
            <Progress value={(step / 3) * 100} className="h-1.5 bg-[hsl(33,20%,85%)]" />
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Retreat Selector */}
              <div>
                <Label className="font-body text-sm font-medium text-foreground mb-3 block">
                  Select your retreat
                </Label>
                <div className="grid gap-3">
                  {/* Split Card */}
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, retreat: "split", program: null })}
                    className={cn(
                      "relative w-full text-left p-4 border-2 transition-all duration-300 rounded-sm active:scale-[0.98]",
                      form.retreat === "split"
                        ? "border-[hsl(145,25%,36%)] bg-[hsl(145,25%,36%)]/5 shadow-md"
                        : "border-[hsl(33,20%,82%)] bg-white/40 hover:border-[hsl(33,20%,70%)] hover:shadow-sm"
                    )}
                  >
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[hsl(145,25%,36%)] font-medium">
                      Available Now
                    </span>
                    <h4 className="font-display text-lg font-medium text-foreground mt-1">Split City Retreat</h4>
                    <p className="font-body text-muted-foreground text-xs mt-0.5">
                      31 Oct – 6 Nov 2026 · Radisson Blu · Up to 15 people
                    </p>
                    {form.retreat === "split" && (
                      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 rounded-full bg-[hsl(145,25%,36%)] flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="#F5F2EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </button>

                  {/* Villa Card */}
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, retreat: "villa", program: null })}
                    className={cn(
                      "relative w-full text-left p-4 border-2 transition-all duration-300 rounded-sm active:scale-[0.98]",
                      form.retreat === "villa"
                        ? "border-[hsl(145,25%,36%)] bg-[hsl(145,25%,36%)]/5 shadow-md"
                        : "border-[hsl(33,20%,82%)] bg-white/40 hover:border-[hsl(33,20%,70%)] hover:shadow-sm"
                    )}
                  >
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      Coming 2027
                    </span>
                    <h4 className="font-display text-lg font-medium text-foreground mt-1">Private Villa Retreat</h4>
                    <p className="font-body text-muted-foreground text-xs mt-0.5">
                      August 2027 · Dalmatian Coast · Up to 12 people
                    </p>
                    {form.retreat === "villa" && (
                      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 rounded-full bg-[hsl(145,25%,36%)] flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="#F5F2EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>

                {/* Villa waitlist message */}
                {form.retreat === "villa" && onSwitchToWaitlist && (
                  <div className="mt-3 p-3 bg-white/50 border border-[hsl(33,20%,82%)] rounded-sm">
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      Villa 2027 reservations are not yet open.{" "}
                      <button
                        type="button"
                        onClick={handleSwitchToWaitlist}
                        className="text-[hsl(145,25%,36%)] font-medium underline underline-offset-2 hover:text-[hsl(145,25%,30%)] transition-colors"
                      >
                        Join the waitlist instead →
                      </button>
                    </p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="fullName" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                  Full Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="bg-white/60 border-[hsl(33,20%,80%)] focus:border-primary font-body rounded-sm h-12"
                />
              </div>
              <div>
                <Label htmlFor="email" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                  Email <span className="text-primary">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-white/60 border-[hsl(33,20%,80%)] focus:border-primary font-body rounded-sm h-12"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                  Phone / WhatsApp <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="+41 79 000 0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-white/60 border-[hsl(33,20%,80%)] focus:border-primary font-body rounded-sm h-12"
                />
              </div>
              <div>
                <Label htmlFor="country" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                  Country <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input
                  id="country"
                  placeholder="Your country"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="bg-white/60 border-[hsl(33,20%,80%)] focus:border-primary font-body rounded-sm h-12"
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1 || form.retreat === "villa"}
                className="w-full h-13 bg-[hsl(145,25%,36%)] hover:bg-[hsl(145,25%,30%)] text-[#F5F2EE] font-body text-sm tracking-wider uppercase rounded-sm mt-2 transition-all duration-300 active:scale-[0.97]"
              >
                Continue
              </Button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <p className="font-body text-sm text-muted-foreground">
                Select your program — <span className="text-foreground font-medium">{retreatLabel}</span>
              </p>
              <div className="grid gap-4">
                {programs.map((prog) => (
                  <button
                    key={prog.id}
                    type="button"
                    onClick={() => setForm({ ...form, program: prog.id })}
                    className={cn(
                      "relative w-full text-left p-5 border-2 transition-all duration-300 rounded-sm active:scale-[0.98]",
                      form.program === prog.id
                        ? "border-[hsl(145,25%,36%)] bg-[hsl(145,25%,36%)]/5 shadow-md"
                        : "border-[hsl(33,20%,82%)] bg-white/40 hover:border-[hsl(33,20%,70%)] hover:shadow-sm"
                    )}
                  >
                    {prog.popular && (
                      <span className="absolute top-3 right-4 font-body text-[10px] tracking-[0.2em] uppercase text-[hsl(145,25%,36%)] font-medium">
                        ⭐ Most Popular
                      </span>
                    )}
                    <h4 className="font-display text-xl font-medium text-foreground mb-1">{prog.name}</h4>
                    <p className="font-body text-muted-foreground text-sm">
                      {formatCurrency(prog.price)}/person · Deposit today:{" "}
                      <span className="text-foreground font-medium">{formatCurrency(prog.deposit)}</span>
                    </p>
                    {form.program === prog.id && (
                      <div className="absolute top-1/2 right-5 -translate-y-1/2 w-5 h-5 rounded-full bg-[hsl(145,25%,36%)] flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="#F5F2EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div>
                <Label htmlFor="participants" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                  Number of Participants
                </Label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, participants: Math.max(1, form.participants - 1) })}
                    className="w-10 h-10 border border-[hsl(33,20%,80%)] bg-white/60 rounded-sm font-body text-lg flex items-center justify-center hover:bg-white/90 transition-colors active:scale-95"
                  >
                    −
                  </button>
                  <span className="font-body text-lg font-medium w-8 text-center tabular-nums">{form.participants}</span>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, participants: Math.min(10, form.participants + 1) })}
                    className="w-10 h-10 border border-[hsl(33,20%,80%)] bg-white/60 rounded-sm font-body text-lg flex items-center justify-center hover:bg-white/90 transition-colors active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>

              {selectedProgram && (
                <div className="p-4 bg-white/50 border border-[hsl(33,20%,82%)] rounded-sm">
                  <p className="font-body text-sm text-muted-foreground">Total deposit</p>
                  <p className="font-display text-2xl font-medium text-[hsl(145,25%,36%)]">
                    {formatCurrency(totalDeposit)}
                  </p>
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-13 font-body text-sm tracking-wider uppercase rounded-sm border-[hsl(33,20%,80%)] transition-all duration-300 active:scale-[0.97]"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 h-13 bg-[hsl(145,25%,36%)] hover:bg-[hsl(145,25%,30%)] text-[#F5F2EE] font-body text-sm tracking-wider uppercase rounded-sm transition-all duration-300 active:scale-[0.97]"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-3 p-5 bg-white/50 border border-[hsl(33,20%,82%)] rounded-sm">
                <h4 className="font-display text-lg font-medium text-foreground mb-3">Booking Summary</h4>
                <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-body text-sm">
                  <span className="text-muted-foreground">Retreat</span>
                  <span className="text-foreground font-medium">{retreatLabel}</span>
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground font-medium">{form.fullName}</span>
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground font-medium">{form.email}</span>
                  <span className="text-muted-foreground">Program</span>
                  <span className="text-foreground font-medium">{selectedProgram?.name}</span>
                  <span className="text-muted-foreground">Participants</span>
                  <span className="text-foreground font-medium">{form.participants}</span>
                </div>
                <div className="border-t border-[hsl(33,20%,85%)] my-3" />
                <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-body text-sm">
                  <span className="text-muted-foreground">Total price</span>
                  <span className="text-foreground font-medium">{formatCurrency(totalPrice)}</span>
                  <span className="text-muted-foreground">Deposit today</span>
                  <span className="text-[hsl(145,25%,36%)] font-semibold text-base">{formatCurrency(totalDeposit)}</span>
                  <span className="text-muted-foreground">Balance due {balanceDueDate}</span>
                  <span className="text-foreground font-medium">{formatCurrency(balanceDue)}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={form.agreedToTerms}
                  onCheckedChange={(checked) => setForm({ ...form, agreedToTerms: checked === true })}
                  className="mt-0.5 border-[hsl(33,20%,75%)] data-[state=checked]:bg-[hsl(145,25%,36%)] data-[state=checked]:border-[hsl(145,25%,36%)]"
                />
                <Label htmlFor="terms" className="font-body text-muted-foreground leading-relaxed cursor-pointer" style={{ fontSize: "12px" }}>
                  I have read and agree to the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
                    Terms & Conditions
                  </a>
                </Label>
              </div>

              <div className="flex gap-3 mt-2">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="h-13 px-6 font-body text-sm tracking-wider uppercase rounded-sm border-[hsl(33,20%,80%)] transition-all duration-300 active:scale-[0.97]"
                >
                  Back
                </Button>
                <Button
                  disabled={!canProceedStep3 || isSubmitting}
                  onClick={handlePayDeposit}
                  className="flex-1 h-14 bg-[hsl(145,25%,36%)] hover:bg-[hsl(145,25%,30%)] text-[#F5F2EE] font-body text-sm tracking-wider uppercase rounded-sm transition-all duration-300 active:scale-[0.97] disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    `Pay Deposit — ${formatCurrency(totalDeposit)}`
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
