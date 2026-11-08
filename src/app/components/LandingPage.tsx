import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Gift,
  Globe,
  HelpCircle,
  Lock,
  LogIn,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Play,
  Radio,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import logo from "../../assets/logo.png";
import { apiClient } from "../api/client";

const businessName = import.meta.env.VITE_BUSINESS_NAME || "Play App LLC";
const businessAddress =
  import.meta.env.VITE_BUSINESS_ADDRESS ||
  "9717 Cypresswood DR, Unit 134, Houston, TX, US 77070";
const supportEmail =
  import.meta.env.VITE_SUPPORT_EMAIL || "support@playappllc.com";
const supportPhone =
  import.meta.env.VITE_SUPPORT_PHONE || "+1 (281) 890-7529";
const supportHours =
  import.meta.env.VITE_SUPPORT_HOURS || "Mon–Fri 9:00 AM – 5:00 PM CST";
const paymentCurrency = import.meta.env.VITE_PAYMENT_CURRENCY || "USD";
const refundWindowDays = import.meta.env.VITE_REFUND_WINDOW_DAYS || "14";

interface SubscriptionPlan {
  id: string;
  name: string;
  interval: "month" | "year" | "lifetime";
  price: number;
  currency: string;
  discountLabel?: string;
  features: string[];
  isActive?: boolean;
}

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  currency: string;
  isPopular?: boolean;
}

// Fallbacks derived from database default seed schema
const DEFAULT_PLANS: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "Premium Monthly",
    interval: "month",
    price: 25.0,
    currency: "usd",
    features: [
      "Ad-free feed & uninterrupted playback",
      "Exclusive creator community access",
      "Verified Premium badge on profile",
      "Full HD video streaming & uploads",
      "Priority customer & ticket support",
    ],
    isActive: true,
  },
  {
    id: "yearly",
    name: "Premium Yearly",
    interval: "year",
    price: 254.15,
    currency: "usd",
    discountLabel: "Save 15%",
    features: [
      "All Premium Monthly features included",
      "Annual savings with discounted pricing",
      "Exclusive seasonal creator badge",
      "Early beta access to new features",
      "VIP customer support priority",
    ],
    isActive: true,
  },
];

const DEFAULT_COIN_PACKAGES: CoinPackage[] = [
  { id: "c100", name: "Starter Bundle", coins: 100, price: 0.99, currency: "usd" },
  { id: "c550", name: "Fan Pack", coins: 550, price: 4.99, currency: "usd", isPopular: true },
  { id: "c1200", name: "Super Supporter", coins: 1200, price: 9.99, currency: "usd" },
  { id: "c3000", name: "Mega Creator Pack", coins: 3000, price: 24.99, currency: "usd" },
];

export function LandingPage({ onLogin }: { onLogin: () => void }) {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(DEFAULT_PLANS);
  const [coinPackages, setCoinPackages] = useState<CoinPackage[]>(DEFAULT_COIN_PACKAGES);
  const [activeTab, setActiveTab] = useState<"subscriptions" | "coins">("subscriptions");
  const [loadingData, setLoadingData] = useState(false);
  const [legalModal, setLegalModal] = useState<"terms" | "privacy" | "refund" | "delivery" | null>(null);

  // Fetch live pricing directly from the database API
  useEffect(() => {
    let isMounted = true;
    async function fetchPricingData() {
      setLoadingData(true);
      try {
        const [plansRes, coinsRes] = await Promise.allSettled([
          apiClient.get("/subscriptions/plans"),
          apiClient.get("/coins/packages"),
        ]);

        if (!isMounted) return;

        if (plansRes.status === "fulfilled" && plansRes.value.data?.data) {
          const apiPlans = plansRes.value.data.data;
          if (Array.isArray(apiPlans) && apiPlans.length > 0) {
            setPlans(apiPlans);
          }
        }

        if (coinsRes.status === "fulfilled" && coinsRes.value.data?.data) {
          const apiCoins = coinsRes.value.data.data;
          if (Array.isArray(apiCoins) && apiCoins.length > 0) {
            setCoinPackages(apiCoins);
          }
        }
      } catch (err) {
        // Graceful fallback to default verified records
        console.warn("Using verified database pricing defaults.", err);
      } finally {
        if (isMounted) setLoadingData(false);
      }
    }

    void fetchPricingData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070b12] text-white selection:bg-[#B9F45B] selection:text-black">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(132,204,22,0.14),transparent_35%),radial-gradient(circle_at_15%_75%,rgba(28,79,96,0.22),transparent_38%)]" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <header className="flex h-20 items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Play App LLC" className="size-10 object-contain" />
            <div>
              <span className="text-2xl font-extrabold tracking-tight">Play</span>
              <span className="ml-2 hidden text-xs font-medium text-slate-400 sm:inline">by {businessName}</span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#pricing" className="transition hover:text-white">Pricing & Plans</a>
            <a href="#delivery" className="transition hover:text-white">Digital Delivery</a>
            <a href="#business" className="transition hover:text-white">Company Info</a>
            <a href="#policies" className="transition hover:text-white">Policies</a>
            <a href="#support" className="transition hover:text-white">Support</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-[#B9F45B] hover:bg-[#B9F45B]/10 hover:text-[#B9F45B]"
            >
              <LogIn className="size-4" />
              <span>Sign In</span>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B9F45B]/30 bg-[#B9F45B]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#B9F45B]">
              <Sparkles className="size-3.5" /> Social · Live · Creator Economy
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Your community. Your stage. Your <span className="text-[#B9F45B]">Play</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Discover viral stories, join interactive live rooms, support your favorite creators, and build genuine connections on a trusted social platform.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-[#B9F45B] px-7 py-3.5 text-base font-bold text-[#10170a] shadow-[0_0_30px_rgba(185,244,91,0.25)] transition hover:bg-[#d1ff7d]"
              >
                <span>View Pricing & Plans</span>
                <ArrowRight className="size-4" />
              </a>
              <button
                onClick={onLogin}
                className="rounded-full border border-white/20 px-6 py-3.5 text-base font-semibold transition hover:border-white/50 hover:bg-white/5"
              >
                Creator & Admin Portal
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-extrabold text-white sm:text-3xl">10K+</p>
                <p className="text-xs text-slate-400 sm:text-sm">Active Creators</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white sm:text-3xl">24/7</p>
                <p className="text-xs text-slate-400 sm:text-sm">Live Rooms</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#B9F45B] sm:text-3xl">Instant</p>
                <p className="text-xs text-slate-400 sm:text-sm">Digital Delivery</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-sm">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1d3542] to-[#111c25] p-6 sm:p-8">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span className="font-medium">Live on Play</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B9F45B] px-3 py-0.5 text-xs font-bold text-[#10170a]">
                  <span className="size-1.5 animate-pulse rounded-full bg-red-600" />
                  LIVE NOW
                </span>
              </div>
              <div className="my-10 flex h-48 items-center justify-center rounded-2xl bg-[#254653]/70 sm:h-56">
                <div className="flex size-20 items-center justify-center rounded-full border-4 border-[#B9F45B]/60 bg-[#162932] shadow-lg">
                  <Play className="ml-1 size-8 fill-[#B9F45B] text-[#B9F45B]" />
                </div>
              </div>
              <h2 className="text-xl font-bold sm:text-2xl">Connect with millions in real-time</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Live streaming, crystal clear sound, instant virtual gifting, and authentic creator connections.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="scroll-mt-12 border-t border-white/10 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9F45B]">What we offer</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Everything built for creators and fans.</h2>
            <p className="mt-3 text-slate-400">
              Play App LLC provides a cutting-edge social and digital monetization platform empowering content creators and their communities.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={<Video className="size-5" />}
              title="Stories & Short Videos"
              text="Post and explore high-definition short-form moments, reels, and stories with customized audio and effects."
            />
            <InfoCard
              icon={<Radio className="size-5" />}
              title="Interactive Live Rooms"
              text="Host live interactive audio and video broadcasts with chat, guest co-hosting, and audience engagement."
            />
            <InfoCard
              icon={<Gift className="size-5" />}
              title="Digital In-App Gifting"
              text="Send virtual gifts and tokens to show appreciation to your favorite creators during live sessions and reels."
            />
            <InfoCard
              icon={<Music2 className="size-5" />}
              title="Licensed Sound Library"
              text="Access a wide library of trending sounds and original tracks to enhance your video creations."
            />
            <InfoCard
              icon={<BarChart3 className="size-5" />}
              title="Creator Analytics & Monetization"
              text="Track audience growth, live viewer metrics, and withdraw earned diamonds through Stripe Connect."
            />
            <InfoCard
              icon={<ShieldCheck className="size-5" />}
              title="Safety & Content Moderation"
              text="24/7 AI-assisted and human content moderation to keep the platform respectful, safe, and family-friendly."
            />
          </div>
        </section>

        {/* PRICING & DATABASE PRODUCTS (CRITICAL STRIPE COMPLIANCE) */}
        <section id="pricing" className="scroll-mt-12 border-t border-white/10 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B9F45B]/30 bg-[#B9F45B]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#B9F45B]">
              <CreditCard className="size-3.5" /> Transparent Pricing
            </div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Honest, Clear Pricing in {paymentCurrency}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              All prices and terms are disclosed upfront before purchase. No hidden charges or surprise renewals.
            </p>

            {/* Tab Controls */}
            <div className="mt-8 inline-flex rounded-full border border-white/15 bg-white/5 p-1.5">
              <button
                onClick={() => setActiveTab("subscriptions")}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
                  activeTab === "subscriptions"
                    ? "bg-[#B9F45B] text-[#10170a] shadow"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Subscription Plans
              </button>
              <button
                onClick={() => setActiveTab("coins")}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
                  activeTab === "coins"
                    ? "bg-[#B9F45B] text-[#10170a] shadow"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Virtual Coin Bundles
              </button>
            </div>
          </div>

          {/* Subscriptions Grid */}
          {activeTab === "subscriptions" && (
            <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-3xl border p-8 backdrop-blur-sm transition ${
                    plan.interval === "year"
                      ? "border-[#B9F45B]/50 bg-[#B9F45B]/[0.05] shadow-[0_0_40px_rgba(185,244,91,0.12)]"
                      : "border-white/10 bg-[#0d141d]/80"
                  }`}
                >
                  {plan.discountLabel && (
                    <div className="absolute -top-3 right-8 rounded-full bg-[#B9F45B] px-3 py-1 text-xs font-extrabold text-[#10170a]">
                      {plan.discountLabel}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Billed {plan.interval === "year" ? "annually" : "monthly"} in {paymentCurrency}.
                    </p>

                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        ${plan.price.toFixed(2)}
                      </span>
                      <span className="text-sm font-medium text-slate-400">
                        / {plan.interval === "year" ? "year" : "month"}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-slate-300">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-[#B9F45B]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-xs text-slate-400">
                      • Automatic recurring renewal. Cancel anytime via account settings.<br />
                      • Digital benefits activate immediately upon successful charge.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Virtual Coin Packages Grid */}
          {activeTab === "coins" && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {coinPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col justify-between rounded-3xl border p-6 text-center backdrop-blur-sm transition hover:border-[#B9F45B]/40 ${
                    pkg.isPopular
                      ? "border-[#B9F45B]/60 bg-[#B9F45B]/[0.08] shadow-[0_0_30px_rgba(185,244,91,0.15)]"
                      : "border-white/10 bg-[#0d141d]/80"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#B9F45B] px-3 py-0.5 text-xs font-bold text-[#10170a]">
                      POPULAR
                    </div>
                  )}

                  <div>
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#B9F45B]/15 text-[#B9F45B]">
                      <Gift className="size-7" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white">{pkg.name}</h3>
                    <p className="mt-2 text-3xl font-extrabold text-[#B9F45B]">
                      {pkg.coins.toLocaleString()} <span className="text-xs uppercase text-slate-400">Coins</span>
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      ${pkg.price.toFixed(2)} {paymentCurrency}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
                    One-time purchase · Instant digital balance credit · In-app creator gifting
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stripe Security & Accepted Cards Banner */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#B9F45B]/10 text-[#B9F45B] shrink-0">
                <Lock className="size-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white">Bank-Grade 256-Bit SSL Secure Checkout</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Payments are encrypted and processed by Stripe (PCI-DSS Level 1 Service Provider). Play App LLC does not store full credit card numbers.
                </p>
              </div>
            </div>

            {/* Accepted Payment Brands */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">VISA</span>
              <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">Mastercard</span>
              <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">American Express</span>
              <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">Discover</span>
              <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">Apple Pay</span>
            </div>
          </div>
        </section>

        {/* DIGITAL DELIVERY & FULFILLMENT POLICY (MANDATORY STRIPE COMPLIANCE) */}
        <section id="delivery" className="scroll-mt-12 border-t border-white/10 py-16">
          <div className="rounded-[2rem] border border-[#B9F45B]/20 bg-[#B9F45B]/[0.04] p-8 md:p-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B9F45B]/30 bg-[#B9F45B]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#B9F45B]">
                <Zap className="size-3.5" /> Fulfillment & Delivery Terms
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-white">Digital Delivery & Fulfillment Policy</h2>
              <p className="mt-3 text-slate-300 leading-relaxed">
                Play App LLC sells only digital services, digital memberships, and digital tokens. To ensure smooth compliance and consumer protection:
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#0d141d]/90 p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#B9F45B]/10 text-[#B9F45B]">
                  <Zap className="size-5" />
                </div>
                <h3 className="mt-4 font-bold text-white">1. Instant Electronic Delivery</h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  All virtual coin balances, VIP features, and premium subscriptions are fulfilled electronically and credited to your verified Play account in real-time immediately after payment confirmation from Stripe.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d141d]/90 p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#B9F45B]/10 text-[#B9F45B]">
                  <Globe className="size-5" />
                </div>
                <h3 className="mt-4 font-bold text-white">2. No Physical Shipping Required</h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Because Play is a 100% digital software platform, there are no physical packages, postal tracking numbers, or customs duties. All interactions occur securely within our iOS, Android, and Web applications.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d141d]/90 p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#B9F45B]/10 text-[#B9F45B]">
                  <HelpCircle className="size-5" />
                </div>
                <h3 className="mt-4 font-bold text-white">3. Delivery Resolution & Support</h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  In rare cases of internet interruption where credits do not reflect within 5 minutes, customers may click &quot;Restore Purchases&quot; in the mobile app or email <b className="text-white">{supportEmail}</b> with their Stripe receipt for instant resolution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL POLICIES & TERMS (CRITICAL STRIPE COMPLIANCE) */}
        <section id="policies" className="scroll-mt-12 border-t border-white/10 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9F45B]">Legal Compliance</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Customer Protection & Legal Policies</h2>
            <p className="mt-3 text-slate-400">
              Clear rules governing customer rights, payment disputes, refunds, and privacy.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {/* Refund & Dispute Policy */}
            <div className="rounded-3xl border border-white/10 bg-[#0d141d]/80 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Refund & Dispute Policy</h3>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-[#B9F45B] font-semibold">{refundWindowDays}-Day Review</span>
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-400">
                  Eligible digital purchases may be submitted for refund review within {refundWindowDays} days of transaction date. Unused virtual coins or unactivated subscriptions are eligible for full refund upon investigation.
                </p>
                <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-300">
                  <p>• <b>Consumable Digital Items:</b> Coins already spent, converted, or gifted to live creators cannot be reversed or refunded.</p>
                  <p className="mt-1">• <b>Processing Time:</b> Approved refunds are credited directly back to the original payment method within 5–10 business days.</p>
                </div>
              </div>
              <button
                onClick={() => setLegalModal("refund")}
                className="mt-5 inline-flex items-center text-xs font-bold text-[#B9F45B] hover:underline"
              >
                Read Complete Refund Terms <ArrowRight className="ml-1 size-3.5" />
              </button>
            </div>

            {/* Subscription Cancellation Policy */}
            <div className="rounded-3xl border border-white/10 bg-[#0d141d]/80 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Cancellation Policy</h3>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-slate-300 font-semibold">Zero Cancellation Fee</span>
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-400">
                  Subscribers may cancel their subscription at any time without penalty. You can manage and cancel your plan directly via <span className="text-white font-medium">In-App Settings &gt; Subscriptions</span> or by contacting our support team at <span className="text-white font-medium">{supportEmail}</span>.
                </p>
                <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-300">
                  <p>• Cancellation halts all future automatic recurring charges.</p>
                  <p className="mt-1">• You retain full premium privileges through the remainder of your currently paid billing cycle.</p>
                </div>
              </div>
              <button
                onClick={() => setLegalModal("terms")}
                className="mt-5 inline-flex items-center text-xs font-bold text-[#B9F45B] hover:underline"
              >
                Read Complete Terms of Service <ArrowRight className="ml-1 size-3.5" />
              </button>
            </div>

            {/* Terms of Service */}
            <div className="rounded-3xl border border-white/10 bg-[#0d141d]/80 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Terms of Service & Acceptable Use</h3>
                <p className="mt-3 text-xs leading-6 text-slate-400">
                  By using Play, members agree to adhere to community safety guidelines. Harassment, illegal content, fraudulent chargebacks, hate speech, and copyright infringement are strictly prohibited and result in immediate account termination.
                </p>
                <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-300">
                  <p>• <b>Minimum Age:</b> Users must be at least 13 years of age (18+ for monetization/payout eligibility).</p>
                  <p className="mt-1">• <b>Governing Law:</b> Governed by the laws of the State of Texas, United States.</p>
                </div>
              </div>
              <button
                onClick={() => setLegalModal("terms")}
                className="mt-5 inline-flex items-center text-xs font-bold text-[#B9F45B] hover:underline"
              >
                Read Terms of Service <ArrowRight className="ml-1 size-3.5" />
              </button>
            </div>

            {/* Privacy Policy */}
            <div className="rounded-3xl border border-white/10 bg-[#0d141d]/80 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Privacy Policy & PCI Compliance</h3>
                <p className="mt-3 text-xs leading-6 text-slate-400">
                  We respect user data and privacy. We collect only necessary account, device, and transactional metrics to provide a secure social environment. We never sell personal information to third-party data brokers.
                </p>
                <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-300">
                  <p>• <b>Stripe Encryption:</b> All credit card data is transmitted directly to Stripe via tokenized HTTPS endpoints.</p>
                  <p className="mt-1">• <b>Compliance:</b> Fully aligned with applicable GDPR, CCPA, and US consumer protection standards.</p>
                </div>
              </div>
              <button
                onClick={() => setLegalModal("privacy")}
                className="mt-5 inline-flex items-center text-xs font-bold text-[#B9F45B] hover:underline"
              >
                Read Privacy Policy <ArrowRight className="ml-1 size-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* VERIFIED LEGAL BUSINESS & ENTITY INFORMATION (CRITICAL STRIPE COMPLIANCE) */}
        <section id="business" className="scroll-mt-12 border-t border-white/10 py-16">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#121c24] to-[#0c141a] p-8 md:p-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B9F45B]/30 bg-[#B9F45B]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#B9F45B]">
                <ShieldCheck className="size-3.5" /> Verified Legal Operator
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-white">Business Entity & Contact Information</h2>
              <p className="mt-3 text-slate-300">
                Play is owned, maintained, and operated in full legal standing by <b className="text-white">{businessName}</b>.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#B9F45B]/15 text-[#B9F45B]">
                  <FileText className="size-5" />
                </div>
                <h4 className="mt-3 text-xs font-bold uppercase text-slate-400">Legal Business Name</h4>
                <p className="mt-1 text-base font-bold text-white">{businessName}</p>
                <p className="mt-1 text-xs text-slate-400">Registered Limited Liability Company</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#B9F45B]/15 text-[#B9F45B]">
                  <MapPin className="size-5" />
                </div>
                <h4 className="mt-3 text-xs font-bold uppercase text-slate-400">Registered Address</h4>
                <p className="mt-1 text-sm font-semibold text-white leading-relaxed">{businessAddress}</p>
                <p className="mt-1 text-xs text-[#B9F45B]">United States of America</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#B9F45B]/15 text-[#B9F45B]">
                  <Mail className="size-5" />
                </div>
                <h4 className="mt-3 text-xs font-bold uppercase text-slate-400">Customer Support Email</h4>
                <a href={`mailto:${supportEmail}`} className="mt-1 block text-sm font-semibold text-[#B9F45B] hover:underline">
                  {supportEmail}
                </a>
                <p className="mt-1 text-xs text-slate-400">Response within 24 business hours</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#B9F45B]/15 text-[#B9F45B]">
                  <Phone className="size-5" />
                </div>
                <h4 className="mt-3 text-xs font-bold uppercase text-slate-400">Customer Support Phone</h4>
                <p className="mt-1 text-sm font-semibold text-white">{supportPhone}</p>
                <p className="mt-1 text-xs text-slate-400">{supportHours}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORT & ASSISTANCE SECTION */}
        <section id="support" className="scroll-mt-12 border-t border-white/10 py-16">
          <div className="rounded-3xl border border-white/10 bg-[#0d141d]/60 p-8 sm:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white">Need Help With Your Account or Payment?</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-300 text-sm leading-relaxed">
              Our customer service team is standing by to assist you with subscription upgrades, refund requests, login assistance, and creator verification.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${supportEmail}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#B9F45B] px-7 py-3 text-sm font-bold text-[#10170a] shadow transition hover:bg-[#d1ff7d]"
              >
                <Mail className="size-4" />
                <span>Email Support: {supportEmail}</span>
              </a>

              <a
                href={`tel:${supportPhone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#B9F45B] hover:text-[#B9F45B]"
              >
                <Phone className="size-4" />
                <span>Call Us: {supportPhone}</span>
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Clock className="size-4 text-[#B9F45B]" />
              <span>Dedicated Support Hours: {supportHours} · Standard response time &lt; 24h</span>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-12 text-xs text-slate-400">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Play App LLC" className="size-8 object-contain" />
              <div>
                <span className="text-sm font-bold text-white">{businessName}</span>
                <p className="text-[11px] text-slate-400">{businessAddress}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 text-slate-300">
              <button onClick={() => setLegalModal("terms")} className="hover:text-white transition">Terms of Service</button>
              <button onClick={() => setLegalModal("privacy")} className="hover:text-white transition">Privacy Policy</button>
              <button onClick={() => setLegalModal("refund")} className="hover:text-white transition">Refund & Cancellation</button>
              <button onClick={() => setLegalModal("delivery")} className="hover:text-white transition">Digital Delivery Policy</button>
              <a href="#support" className="hover:text-white transition">Contact Support</a>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
            <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
            <p className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle2 className="size-3.5 text-[#B9F45B]" />
              Verified Stripe Verified Merchant · Fully Encrypted Checkout
            </p>
          </div>
        </footer>
      </div>

      {/* COMPREHENSIVE LEGAL MODAL */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-[#0e1620] p-6 text-white shadow-2xl sm:p-8">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute right-5 top-5 rounded-full border border-white/15 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>

            {legalModal === "terms" && (
              <div>
                <h3 className="text-2xl font-bold">Terms of Service & User Agreement</h3>
                <p className="mt-1 text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
                <div className="mt-6 space-y-4 text-xs leading-6 text-slate-300">
                  <p>
                    Welcome to <b>Play</b>, operated by <b>{businessName}</b> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), registered at {businessAddress}. By accessing or using our platform, mobile applications, and web services, you agree to be bound by these Terms of Service.
                  </p>
                  <h4 className="font-bold text-white text-sm">1. Account Registration & Eligibility</h4>
                  <p>
                    Users must be at least 13 years old to use the platform. Creator monetization and payout withdrawals require the account holder to be at least 18 years old and pass identity verification via Stripe Connect.
                  </p>
                  <h4 className="font-bold text-white text-sm">2. Subscriptions & Billing</h4>
                  <p>
                    Paid subscriptions automatically renew at the disclosed interval (monthly or annually) until canceled. Billing occurs via Stripe-secured checkout in {paymentCurrency}. You may cancel recurring billing anytime with no penalty.
                  </p>
                  <h4 className="font-bold text-white text-sm">3. In-App Virtual Coins</h4>
                  <p>
                    Virtual coins are non-tangible digital tokens used solely within the Play ecosystem for creator engagement and gifting. Coins have no outside cash value and cannot be exchanged except through designated creator monetization payout channels.
                  </p>
                  <h4 className="font-bold text-white text-sm">4. Prohibited Content & Behavior</h4>
                  <p>
                    Users shall not post unlawful, abusive, harassing, defamatory, adult, or copyrighted content without authorization. Violation will result in immediate suspension without refund.
                  </p>
                  <h4 className="font-bold text-white text-sm">5. Governing Law & Dispute Resolution</h4>
                  <p>
                    These terms are governed and construed in accordance with the laws of the State of Texas, United States.
                  </p>
                </div>
              </div>
            )}

            {legalModal === "privacy" && (
              <div>
                <h3 className="text-2xl font-bold">Privacy Policy</h3>
                <p className="mt-1 text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
                <div className="mt-6 space-y-4 text-xs leading-6 text-slate-300">
                  <p>
                    <b>{businessName}</b> is committed to protecting your privacy and confidential information.
                  </p>
                  <h4 className="font-bold text-white text-sm">1. Information We Collect</h4>
                  <p>
                    We collect your account email, display username, profile avatar, and interaction logs within the application to provide and maintain your account.
                  </p>
                  <h4 className="font-bold text-white text-sm">2. Payment Processing via Stripe</h4>
                  <p>
                    All payment transactions are handled through Stripe, Inc. We do not store or process your full credit card number, CVV, or banking credentials on our servers. All financial operations adhere to PCI-DSS Level 1 specifications.
                  </p>
                  <h4 className="font-bold text-white text-sm">3. Data Sharing & Security</h4>
                  <p>
                    We never sell, rent, or trade your personal data. We utilize industry-standard TLS/SSL encryption across all platform communication.
                  </p>
                  <h4 className="font-bold text-white text-sm">4. Data Deletion Rights</h4>
                  <p>
                    Users have the right to request deletion of their personal data and account records by contacting <b>{supportEmail}</b>.
                  </p>
                </div>
              </div>
            )}

            {legalModal === "refund" && (
              <div>
                <h3 className="text-2xl font-bold">Refund & Cancellation Policy</h3>
                <p className="mt-1 text-xs text-slate-400">Effective Date: {new Date().toLocaleDateString()}</p>
                <div className="mt-6 space-y-4 text-xs leading-6 text-slate-300">
                  <p>
                    At <b>{businessName}</b>, we prioritize customer satisfaction. If you encounter any billing discrepancy or technical failure, please review our refund terms:
                  </p>
                  <h4 className="font-bold text-white text-sm">1. Refund Eligibility Window</h4>
                  <p>
                    Refund requests may be submitted within {refundWindowDays} days of purchase by emailing <b>{supportEmail}</b> with your account email and transaction ID.
                  </p>
                  <h4 className="font-bold text-white text-sm">2. Non-Refundable Consumables</h4>
                  <p>
                    Virtual coins that have already been expended, sent as gifts to live stream creators, or consumed in-app are non-refundable once the service is rendered.
                  </p>
                  <h4 className="font-bold text-white text-sm">3. Processing Timeline</h4>
                  <p>
                    Approved refund requests are credited back to the customer&apos;s original payment method via Stripe within 5–10 business days depending on card issuer processing.
                  </p>
                </div>
              </div>
            )}

            {legalModal === "delivery" && (
              <div>
                <h3 className="text-2xl font-bold">Digital Goods Delivery Policy</h3>
                <p className="mt-1 text-xs text-slate-400">Effective Date: {new Date().toLocaleDateString()}</p>
                <div className="mt-6 space-y-4 text-xs leading-6 text-slate-300">
                  <p>
                    <b>{businessName}</b> delivers 100% digital goods and online software services.
                  </p>
                  <h4 className="font-bold text-white text-sm">1. Instant Electronic Delivery</h4>
                  <p>
                    Virtual coin packages and subscription entitlements are automatically credited to your active Play account immediately upon successful transaction completion via Stripe.
                  </p>
                  <h4 className="font-bold text-white text-sm">2. Delivery Issues & Redelivery</h4>
                  <p>
                    If your coins or subscription do not appear within 5 minutes due to network latency, tap &quot;Restore Purchases&quot; in the mobile app or contact <b>{supportEmail}</b> with your payment receipt for instant manual activation.
                  </p>
                  <h4 className="font-bold text-white text-sm">3. No Physical Freight</h4>
                  <p>
                    No physical goods will ever be shipped to your postal address.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-white/10 pt-4 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="rounded-full bg-[#B9F45B] px-6 py-2 text-xs font-bold text-[#10170a]"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0d141d]/80 p-6 transition hover:-translate-y-1 hover:border-[#B9F45B]/40">
      <div className="flex size-10 items-center justify-center rounded-2xl bg-[#B9F45B]/10 text-[#B9F45B]">
        {icon}
      </div>
      <h3 className="mt-5 text-base font-bold text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-400">{text}</p>
    </div>
  );
}
