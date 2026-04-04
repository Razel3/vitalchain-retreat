import { Link } from "react-router-dom";

const cancellationData = [
  { period: "90+ days before retreat", refund: "100%", alternative: "Full transfer to next retreat, no fee" },
  { period: "60–89 days before retreat", refund: "50%", alternative: "Full transfer to next retreat, transfer fee waived" },
  { period: "30–59 days before retreat", refund: "0%", alternative: "100% credit valid for 18 months" },
  { period: "15–29 days before retreat", refund: "0%", alternative: "50% credit valid for 12 months" },
  { period: "Less than 15 days", refund: "0%", alternative: "No credit (force majeure exceptions apply)" },
  { period: "Force majeure / medical emergency", refund: "—", alternative: "100% credit valid for 24 months (docs required within 7 days)" },
];

const Terms = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      {/* BANNER */}
      <div
        className="w-full py-16 px-6 text-center"
        style={{
          backgroundColor: "#1A2B4A",
          borderTop: "3px solid #C9A96E",
          borderBottom: "3px solid #C9A96E",
        }}
      >
        <p
          className="font-body text-xs tracking-[0.35em] uppercase mb-4"
          style={{ color: "#C9A96E" }}
        >
          VITALCHAIN ACADEMY
        </p>
        <h1
          className="text-4xl md:text-5xl font-light mb-4"
          style={{ fontFamily: "Georgia, 'Playfair Display', serif", color: "#FFFFFF" }}
        >
          Terms &amp; Conditions
        </h1>
        <p
          className="font-display text-sm italic"
          style={{ color: "#C9A96E" }}
        >
          Booking Policy · Cancellation · Data Protection
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        <p className="font-body text-sm text-center" style={{ color: "#1A2B4A" }}>
          Retreat Programme · Effective April 2026 · Version 1.0
        </p>

        {/* 1. GENERAL INFORMATION */}
        <Section num="1" title="GENERAL INFORMATION">
          <P>These Terms and Conditions govern the contractual relationship between VitalChain Academy (hereinafter "the Organiser") and any participant (hereinafter "the Client") who registers for a VitalChain Retreat programme. By completing registration and paying the deposit, the Client expressly accepts these Terms in their entirety.</P>
          <div className="font-body text-sm leading-relaxed space-y-1 mt-4" style={{ color: "#3a3a3a" }}>
            <p><strong>Organiser:</strong> VitalChain Academy</p>
            <p><strong>Programme Director:</strong> Andrés Caicedo</p>
            <p><strong>Contact:</strong> support@vitalchainacademy.com</p>
            <p><strong>Website:</strong> vitalchainacademy.com</p>
            <p><strong>Governing Law:</strong> Switzerland</p>
            <p><strong>Currency:</strong> EUR (Euro)</p>
          </div>
        </Section>

        {/* 2. REGISTRATION */}
        <Section num="2" title="REGISTRATION & BOOKING CONFIRMATION">
          <P>Registration is confirmed upon receipt of the 30% deposit payment. The Organiser reserves the right to decline any registration at its sole discretion, in which case the deposit shall be fully refunded.</P>
          <P className="mt-3 font-medium">Registration requirements:</P>
          <Ul items={[
            "Minimum age: 21 years",
            "Basic proficiency in English (programme language)",
            "Valid passport and travel documents for Croatia",
            "Comprehensive travel insurance (mandatory)",
            "Completion of health and wellness questionnaire",
          ]} />
        </Section>

        {/* 3. PRICING */}
        <Section num="3" title="PRICING">
          <h3 className="font-display text-lg font-medium mb-3" style={{ color: "#1A2B4A" }}>
            Split City Retreat — Radisson Blu Resort & Spa, Split · 17–23 October 2026
          </h3>
          <Ul items={[
            "Awakening: €2,200 · Deposit (30%): €660",
            "Signature: €2,800 · Deposit (30%): €840",
            "Premium: €3,500 · Deposit (30%): €1,050",
            "Balance due: on or before 17 July 2026",
          ]} />

          <h3 className="font-display text-lg font-medium mb-3 mt-6" style={{ color: "#1A2B4A" }}>
            Private Villa Retreat — Dalmatian Coast · August 2027
          </h3>
          <Ul items={[
            "Awakening: €3,000 · Deposit (30%): €900",
            "Signature: €3,500 · Deposit (30%): €1,050",
            "Premium: €4,700 · Deposit (30%): €1,410",
            "Balance due: on or before 21 July 2027",
          ]} />

          <P className="mt-4"><strong>Included:</strong> 7-night accommodation, all meals and non-alcoholic beverages, all workshops and group sessions, expert facilitators, welcome kit, airport transfers from Split (SPU).</P>
          <P className="mt-2"><strong>Not included:</strong> International flights, travel insurance, alcoholic beverages, personal expenses, optional individual sessions.</P>
        </Section>

        {/* 4. PAYMENT TERMS */}
        <Section num="4" title="PAYMENT TERMS">
          <P>All prices are in Euro (EUR). Payment is accepted via PayPal or bank transfer.</P>
          <Ul items={[
            "Deposit (30%): Due at registration — non-refundable under any circumstances",
            "Balance (70%): Due 90 days before retreat start date",
            "Late payment: 5% surcharge after due date",
            "Failed payment: Reservation may be cancelled after 7 days written notice",
          ]} />
        </Section>

        {/* 5. CANCELLATION */}
        <Section num="5" title="CANCELLATION & REFUND POLICY">
          <P>The 30% deposit is strictly non-refundable. It covers irrecoverable costs including venue reservation, facilitator contracts, and programme preparation. All percentages below refer to the remaining balance (70%) only.</P>

          <div className="mt-6 overflow-x-auto" style={{ borderLeft: "4px solid #C9A96E" }}>
            <table className="w-full text-sm font-body">
              <thead>
                <tr style={{ backgroundColor: "#1A2B4A", color: "#FFFFFF" }}>
                  <th className="text-left px-4 py-3 font-medium">Cancellation Period</th>
                  <th className="text-left px-4 py-3 font-medium">Balance Refund</th>
                  <th className="text-left px-4 py-3 font-medium">Alternative</th>
                </tr>
              </thead>
              <tbody>
                {cancellationData.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F0EDE8" }}>
                    <td className="px-4 py-3 font-medium" style={{ color: "#1A2B4A" }}>{row.period}</td>
                    <td className="px-4 py-3" style={{ color: "#3a3a3a" }}>{row.refund}</td>
                    <td className="px-4 py-3" style={{ color: "#3a3a3a" }}>{row.alternative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <P className="font-medium">HOW TO CANCEL</P>
              <P>All cancellations must be submitted in writing to support@vitalchainacademy.com. The cancellation date is the date written notice is received. Refunds are processed within 14 business days.</P>
            </div>
            <div>
              <P className="font-medium">TRANSFER OF PLACE</P>
              <P>A participant may transfer their place to another eligible person with at least 30 days notice and an administrative fee of €150.</P>
            </div>
            <div>
              <P className="font-medium">RETREAT CREDIT</P>
              <P>Credits are non-transferable, have no cash value, and must be used within the stated validity period.</P>
            </div>
            <div>
              <P className="font-medium">CANCELLATION BY ORGANISER</P>
              <P>In the event of cancellation by VitalChain Academy, all payments including the deposit will be refunded in full within 30 days, or transferred to a future retreat at the Client's option.</P>
            </div>
            <div>
              <P className="font-medium">TRAVEL INSURANCE PARTNERSHIP</P>
              <P>VitalChain Academy collaborates with Akashaya Travel to offer optional cancellation insurance. Clients who have purchased insurance through Akashaya Travel must manage claims directly with the insurance provider. VitalChain Academy's cancellation policy applies independently of any insurance claim outcome.</P>
            </div>
          </div>
        </Section>

        {/* 6. TRAVEL INSURANCE */}
        <Section num="6" title="TRAVEL INSURANCE (MANDATORY)">
          <P>Comprehensive travel insurance is mandatory. Minimum required coverage:</P>
          <Ul items={[
            "Trip cancellation: €5,000",
            "Emergency medical treatment: €100,000",
            "Medical evacuation: €50,000",
            "Personal liability: €500,000",
            "Baggage: €1,500",
          ]} />
          <P className="mt-3">Proof of insurance must be provided at least 30 days before the retreat. The Organiser reserves the right to deny participation without valid insurance.</P>
        </Section>

        {/* 7. HEALTH */}
        <Section num="7" title="HEALTH & CODE OF CONDUCT">
          <P>Clients must disclose any physical or mental health conditions relevant to participation. The Organiser reserves the right to withdraw any participant whose condition poses a risk to themselves or others, without refund beyond applicable cancellation terms.</P>
          <P className="mt-3 font-medium">Code of Conduct:</P>
          <Ul items={[
            "Treat all participants and facilitators with respect",
            "Respect confidentiality of personal sharing in group sessions",
            "Arrive punctually and attend all scheduled sessions",
            "Abstain from alcohol and non-prescribed substances during the programme",
            "No recording of sessions without explicit written consent",
          ]} />
        </Section>

        {/* 8. DATA PROTECTION */}
        <Section num="8" title="DATA PROTECTION & PRIVACY">
          <P>VitalChain Academy processes personal data in accordance with Swiss data protection law (FADP) and the EU General Data Protection Regulation (GDPR).</P>
          <P className="mt-3"><strong>Data collected:</strong> identity, contact, health (for safety), payment records, programme preferences.</P>
          <P className="mt-2"><strong>Purpose:</strong> booking administration, programme delivery, safety, legal compliance, and — with explicit consent — future marketing communications.</P>
          <P className="mt-2"><strong>Retention:</strong> 5 years maximum after the retreat. Health data deleted within 12 months.</P>
          <P className="mt-2"><strong>Your rights:</strong> access, rectification, erasure, restriction, portability, and withdrawal of consent. Contact: support@vitalchainacademy.com</P>
          <P className="mt-3">Data is never sold to third parties. Limited sharing occurs only with essential service providers under strict confidentiality agreements.</P>
        </Section>

        {/* 9. LIABILITY */}
        <Section num="9" title="LIMITATION OF LIABILITY">
          <P>VitalChain Academy's maximum liability to any Client shall not exceed the total amount paid for the relevant retreat. The Organiser is not liable for: personal injury during optional activities, loss of personal property, travel disruptions, or force majeure circumstances.</P>
        </Section>

        {/* 10. GOVERNING LAW */}
        <Section num="10" title="GOVERNING LAW & DISPUTES">
          <P>These Terms are governed by Swiss law. Disputes shall be submitted to the courts of Bern, Switzerland. Both parties agree to attempt good-faith resolution before initiating formal proceedings.</P>
        </Section>

        {/* 11. AMENDMENTS */}
        <Section num="11" title="AMENDMENTS">
          <P>The Organiser may amend these Terms with 30 days email notice for material changes. Continued participation constitutes acceptance.</P>
        </Section>

        {/* FOOTER */}
        <div className="border-t pt-8 text-center space-y-2" style={{ borderColor: "#C9A96E" }}>
          <p className="font-body text-sm" style={{ color: "#1A2B4A" }}>© 2026 VitalChain Academy. All rights reserved.</p>
          <p className="font-body text-sm" style={{ color: "#666" }}>
            support@vitalchainacademy.com · vitalchainacademy.com
          </p>
          <Link to="/" className="inline-block mt-4 font-body text-sm underline" style={{ color: "#C9A96E" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

/* Helper components */

const Section = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="font-display text-2xl font-medium mb-4" style={{ color: "#1A2B4A" }}>
      {num}. {title}
    </h2>
    {children}
  </section>
);

const P = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`font-body text-sm leading-relaxed ${className}`} style={{ color: "#3a3a3a" }}>
    {children}
  </p>
);

const Ul = ({ items }: { items: string[] }) => (
  <ul className="list-disc list-inside space-y-1 font-body text-sm leading-relaxed ml-2" style={{ color: "#3a3a3a" }}>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export default Terms;
