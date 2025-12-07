"use client";

import { useState } from "react";
import ButtonCheckout from "./ButtonCheckout";

type BillingCycle = "monthly" | "yearly";

interface PlanConfig {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  originalPrice?: string;
  billedInfo?: {
    billedPrice: string;
    originalPrice: string;
  };
  creditsBadge: string;
  description: string;
  includes: string[];
  ctaLabel: string;
  helperText: string;
  isPopular?: boolean;
  stripePriceId: string;
}

/* -------------------- MONTHLY PRICING -------------------- */
const monthlyPlans: PlanConfig[] = [
  {
    id: "basic-monthly",
    name: "Basic",
    tagline: "for individual use and small team",
    price: "9.99",
    priceSuffix: "/month",
    creditsBadge: "100 credits/month",
    description: "Perfect for individuals and light users",
    includes: [
      "100 credits per month",
      "50 high-quality images/month",
      "Standard generation speed",
      "Basic customer support",
      "JPG/PNG format downloads",
      "✨ Unused credits automatically roll over to next billing cycle",
    ],
    ctaLabel: "Buy Plan",
    helperText: "Perfect for personal projects and getting started",
    stripePriceId: "price_basic_monthly",
  },
  {
    id: "pro-monthly",
    name: "Pro",
    tagline: "for individual use and small team",
    price: "29.99",
    priceSuffix: "/month",
    creditsBadge: "500 credits/month",
    description: "For professional creators and small teams",
    includes: [
      "500 credits per month",
      "250 high-quality images/month",
      "Priority generation queue",
      "Priority customer support",
      "PNG/WebP format downloads",
      "✨ Unused credits automatically roll over to next billing cycle",
    ],
    ctaLabel: "Buy Plan",
    helperText: "Most popular choice for professional creators",
    stripePriceId: "price_pro_monthly",
    isPopular: true,
  },
  {
    id: "max-monthly",
    name: "Max",
    tagline: "for large team and enterprise",
    price: "79.99",
    priceSuffix: "/month",
    creditsBadge: "1600 credits/month",
    description: "Designed for large enterprises and pro studios",
    includes: [
      "1600 credits per month",
      "1000 high-quality images/month",
      "Fastest generation speed",
      "Dedicated account manager",
      "All format downloads",
      "✨ Unused credits automatically roll over to next billing cycle",
    ],
    ctaLabel: "Buy Plan",
    helperText: "Enterprise solution for maximum productivity",
    stripePriceId: "price_max_monthly",
  },
];

/* -------------------- YEARLY PRICING -------------------- */
const yearlyPlans: PlanConfig[] = [
  {
    id: "basic-yearly",
    name: "Basic",
    tagline: "for individual use and small team",
    price: "7.99",
    priceSuffix: "/month",
    originalPrice: "119.88",
    billedInfo: {
      billedPrice: "95.90/year",
      originalPrice: "119.88",
    },
    creditsBadge: "1200 credits/year",
    description: "Perfect for individuals and light users",
    includes: [
      "1200 credits per year",
      "600 high-quality images/year",
      "Standard generation speed",
      "Basic customer support",
      "JPG/PNG format downloads",
      "✨ Unused credits automatically roll over to next billing cycle",
    ],
    ctaLabel: "Buy Plan (Yearly)",
    helperText: "Save 20% with annual billing - best for long-term users",
    stripePriceId: "price_basic_yearly",
  },
  {
    id: "pro-yearly",
    name: "Pro",
    tagline: "for individual use and small team",
    price: "23.99",
    priceSuffix: "/month",
    originalPrice: "359.88",
    billedInfo: {
      billedPrice: "287.90/year",
      originalPrice: "359.88",
    },
    creditsBadge: "6000 credits/year",
    description: "For professional creators and teams",
    includes: [
      "6000 credits per year",
      "3000 high-quality images/year",
      "Priority generation queue",
      "Priority customer support",
      "PNG/WebP format downloads",
      "✨ Unused credits automatically roll over to next billing cycle",
    ],
    ctaLabel: "Buy Plan (Yearly)",
    helperText: "Best value! Most popular yearly plan",
    stripePriceId: "price_pro_yearly",
    isPopular: true,
  },
  {
    id: "max-yearly",
    name: "Max",
    tagline: "for large team and enterprise",
    price: "63.99",
    priceSuffix: "/month",
    originalPrice: "959.88",
    billedInfo: {
      billedPrice: "767.90/year",
      originalPrice: "959.88",
    },
    creditsBadge: "19200 credits/year",
    description: "Designed for large enterprises and pro studios",
    includes: [
      "19200 credits per year",
      "9600 high-quality images/year",
      "Fastest generation speed",
      "Dedicated account manager",
      "All format downloads",
      "✨ Unused credits automatically roll over to next billing cycle",
    ],
    ctaLabel: "Buy Plan (Yearly)",
    helperText: "Ultimate enterprise solution with dedicated support",
    stripePriceId: "price_max_yearly",
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const plans = billingCycle === "monthly" ? monthlyPlans : yearlyPlans;

  return (
    <section id="pricing" className="py-20 bg-[#f3f6ff]">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        
        {/* ⭐️ 你要求加入的标题区 ⭐️ */}
        <div className="mx-auto mb-12 text-center max-w-3xl">
          <h2 className="mb-4 text-4xl font-semibold lg:text-5xl">
            Choose Your AI Image Generation Plan
          </h2>
          <p className="text-muted-foreground lg:text-lg">
            Generate high-quality AI images with our credit-based subscription
            plan or credit packs. Credits vary by model: Nano Banana (2 credits
            per image), Nano Banana Pro/2 (8 credits for 1k/2k resolution, 16
            credits for 4k resolution). New users get 5 free credits to try our
            service.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-white rounded-full shadow-lg px-1 py-1">
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                billingCycle === "yearly"
                  ? "bg-[#2563ff] text-white shadow"
                  : "text-slate-500"
              }`}
            >
              Annually <span className="text-[11px]">(Save 20%🔥)</span>
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#2563ff] text-white shadow"
                  : "text-slate-500"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => {
            const isPopular = !!plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-[32px] bg-white border ${
                  isPopular ? "border-[#2563ff]" : "border-transparent"
                } shadow-xl flex flex-col px-8 pt-10 pb-10 hover:-translate-y-2 transition-all`}
              >
                {/* Most Popular badge */}
                {isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center bg-[#2563ff] text-white text-xs font-semibold px-6 py-1.5 rounded-full shadow">
                      <span className="text-yellow-300 mr-1">★</span>
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Icon (optional) */}
                <div className="flex justify-center mb-3 text-4xl">
                  {index === 0 && "🚀"}
                  {index === 1 && "👑"}
                  {index === 2 && "💎"}
                </div>

                <h3 className="text-center text-2xl font-semibold text-slate-900">
                  {plan.name}
                </h3>
                <p className="text-center text-sm text-slate-500 mt-1 mb-6">
                  {plan.tagline}
                </p>

                <div className="h-px bg-slate-200 mb-6" />

                {/* Price */}
                <div className="flex justify-center items-end gap-1 mb-3">
                  {plan.originalPrice && (
                    <span className="text-sm text-slate-400 line-through mr-2">
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-[#2563ff]">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-slate-500 mb-1">
                    {plan.priceSuffix}
                  </span>
                </div>

                {/* Credits badge */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center gap-1 bg-[#eef4ff] text-[#2563ff] text-xs font-semibold rounded-full px-4 py-1 shadow">
                    💎 {plan.creditsBadge}
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="mb-6">
                  <ButtonCheckout priceId={plan.stripePriceId} />
                </div>

                <p className="text-center text-xs text-slate-500 mb-4">
                  {plan.helperText}
                </p>

                <div className="h-px bg-slate-200 mb-5" />

                {/* Features List */}
                <ul className="space-y-3 text-sm text-slate-600">
                  {plan.includes.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="inline-flex h-4 w-4 rounded-full bg-[#e0f1ff] text-[#2563ff] items-center justify-center text-[10px]">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;