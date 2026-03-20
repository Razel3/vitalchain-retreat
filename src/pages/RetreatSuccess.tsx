import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "loading" | "success" | "error";

const RetreatSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const [reservationNumber, setReservationNumber] = useState("");

  useEffect(() => {
    const orderId = searchParams.get("token");
    const reservationId = searchParams.get("reservationId");

    if (!orderId || !reservationId) {
      setStatus("error");
      return;
    }

    fetch(
      "https://vitalchain-backend-production.up.railway.app/api/retreats/capture-deposit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, reservationId }),
      }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("capture failed");
        const data = await res.json();
        setReservationNumber(data.reservationNumber ?? "");
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[hsl(33,30%,95%)] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        {status === "loading" && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-[hsl(145,25%,36%)] mx-auto" />
            <p className="font-body text-muted-foreground">
              Confirming your payment…
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-[hsl(145,25%,36%)] mx-auto" />
            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight">
              Your spot is confirmed!
            </h1>
            <p className="font-body text-muted-foreground">
              Check your email for full details.
            </p>
            {reservationNumber && (
              <p className="font-body text-sm text-muted-foreground">
                Reservation number:{" "}
                <span className="font-medium text-foreground">
                  {reservationNumber}
                </span>
              </p>
            )}
            <Button
              asChild
              className="h-13 bg-[hsl(145,25%,36%)] hover:bg-[hsl(145,25%,30%)] text-[#F5F2EE] font-body text-sm tracking-wider uppercase rounded-sm transition-all duration-300 active:scale-[0.97] px-8"
            >
              <Link to="/">Back to Retreat</Link>
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <AlertTriangle className="h-16 w-16 text-amber-600 mx-auto" />
            <h1 className="font-display text-2xl font-light text-foreground leading-tight">
              Confirmation Pending
            </h1>
            <p className="font-body text-muted-foreground leading-relaxed">
              Payment received but confirmation pending. Email{" "}
              <a
                href="mailto:support@vitalchainacademy.com"
                className="text-[hsl(145,25%,36%)] underline"
              >
                support@vitalchainacademy.com
              </a>{" "}
              with your reservation number.
            </p>
            <Button
              asChild
              variant="outline"
              className="h-13 font-body text-sm tracking-wider uppercase rounded-sm border-[hsl(33,20%,80%)] transition-all duration-300 active:scale-[0.97] px-8"
            >
              <Link to="/">Back to Retreat</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RetreatSuccess;
