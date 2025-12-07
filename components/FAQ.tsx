"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What makes Nano Banana AI different from other generators?",
    answer: (
      <>
        Nano Banana AI is believed to be a mysterious Google project with
        breakthrough technology: 95% first-try success rate, under 1-second
        generation, and superior character consistency that outperforms
        competitors like Flux Kontext. No sign-up required.
      </>
    ),
  },
  {
    question: "How fast is image generation really by Nano Banana AI?",
    answer: (
      <>
        Our lightning-fast processing delivers professional-quality images in
        under 10 second. This breakthrough speed, combined with our 95%
        accuracy rate, means you spend less time waiting and more time
        creating. Most users get perfect results on their first try.
      </>
    ),
  },
  {
    question: "What is face completion technology by Nano Banana AI?",
    answer: (
      <>
        Our advanced face completion technology can reconstruct and enhance
        facial features with photorealistic accuracy. Perfect for restoring old
        photos, completing partial faces, or creating consistent character
        portraits for AI influencers and marketing campaigns.
      </>
    ),
  },
  {
    question: "Can I use Nano Banana AI for commercial projects?",
    answer: (
      <>
        Yes! All paid plans include commercial licensing and unrestricted usage
        rights. Create content for marketing campaigns, social media, product
        photography, or AI influencers. Our enterprise-grade security (SOC 2,
        GDPR, ISO 27001) ensures your projects remain safe and compliant.
      </>
    ),
  },
  {
    question: "Is Nano Banana AI really connected to Google?",
    answer: (
      <>
        While the exact origins remain mysterious, Nano Banana AI demonstrates
        Google-quality performance with enterprise-grade security (SOC 2, GDPR,
        ISO 27001 certified). Our breakthrough technology and 4.9/5 user rating
        speak for themselves, regardless of origin.
      </>
    ),
  },
  {
    question:
      "Do I need to credit card to start using Nano Banana AI?",
    answer: (
      <>
        No credit card required! Start creating immediately without any credit
        card. Simply visit our platform and begin generating professional images
        instantly. Upgrade to paid plans anytime for more features and higher
        limits.
      </>
    ),
  },
  {
    question:
      "What is character consistency in Nano Banana AI and why is it important?",
    answer: (
      <>
        Character consistency ensures your AI-generated personas maintain the
        same appearance across multiple images. Our technology outperforms Flux
        Kontext, making it perfect for creating AI influencers, brand mascots,
        or storytelling with recurring characters.
      </>
    ),
  },
  {
    question: "Why do creators say Nano Banana AI is better than other tools?",
    answer: (
      <>
        100K+ daily users choose us for our unique combination: 95% first-try
        success, under 1-second generation, no sign-up barriers, and mysterious
        Google-quality results. Our natural language processing understands
        complex edits without technical prompts.
      </>
    ),
  },
  {
    question: "What security certifications does Nano Banana AI have?",
    answer: (
      <>
        We&apos;re fully certified with SOC 2, GDPR, and ISO 27001 standards.
        Your creative content and data are protected by enterprise-grade
        security. All uploads are encrypted and never used for training - your
        ideas remain exclusively yours.
      </>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const maxHeight = isOpen
    ? `${contentRef.current?.scrollHeight ?? 0}px`
    : "0px";

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden mb-4">
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-black hover:text-blue-600 transition-colors text-left"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <h3 className="font-medium">{item.question}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-down h-5 w-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        ref={contentRef}
        className="px-6 overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight }}
      >
        <div className="text-gray-700 pt-2">{item.answer}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Frequently Asked Question about Nano Banana AI
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqList.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;