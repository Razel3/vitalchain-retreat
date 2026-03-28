import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WaitlistModal = ({ open, onOpenChange }: WaitlistModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
  });

  const canSubmit = form.fullName.trim() !== "" && form.email.trim() !== "";

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setForm({ fullName: "", email: "", phone: "", country: "" });
      setIsSuccess(false);
    }, 300);
  };

  const handleSubmit = async () => {
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
            retreatChoice: "Villa · August 2027",
            tier: "waitlist",
          }),
        }
      );
      if (!res.ok) throw new Error("Request failed");
      setIsSuccess(true);
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] bg-[#F5F2EE] border-none p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Join the Waitlist</DialogTitle>
        <div className="px-8 pt-8 pb-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-[hsl(145,25%,36%)] mx-auto mb-4" />
              <h2 className="font-display text-2xl font-light text-foreground mb-3">
                You're on the list
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                We'll contact you as soon as Villa 2027 spots are confirmed.
              </p>
              <Button
                onClick={handleClose}
                className="mt-8 bg-[hsl(145,25%,36%)] hover:bg-[hsl(145,25%,30%)] text-[#F5F2EE] font-body text-xs tracking-[0.2em] uppercase px-8 py-3 h-auto"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl md:text-3xl font-light text-foreground leading-tight mb-1">
                Join the Waitlist
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                Be the first to know when Villa 2027 spots open. No payment required.
              </p>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="wl-name" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                    Full Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="wl-name"
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="bg-white/60 border-[hsl(33,20%,80%)] focus:border-primary font-body rounded-sm h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="wl-email" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                    Email <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="wl-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-white/60 border-[hsl(33,20%,80%)] focus:border-primary font-body rounded-sm h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="wl-phone" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                    Phone / WhatsApp <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="wl-phone"
                    placeholder="+41 79 000 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-white/60 border-[hsl(33,20%,80%)] focus:border-primary font-body rounded-sm h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="wl-country" className="font-body text-sm font-medium text-foreground mb-1.5 block">
                    Country <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="wl-country"
                    placeholder="Your country"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="bg-white/60 border-[hsl(33,20%,80%)] focus:border-primary font-body rounded-sm h-12"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="w-full h-13 bg-[hsl(145,25%,36%)] hover:bg-[hsl(145,25%,30%)] text-[#F5F2EE] font-body text-xs tracking-[0.2em] uppercase rounded-sm mt-2 transition-all duration-300 active:scale-[0.97] disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Notify Me"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
