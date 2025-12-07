// app/(or pages)/components/Hero.tsx
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* 背景视频 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://cdn.ainanobanana.io/ai-poster.png"
        >
          <source
            src="https://cdn.ainanobanana.io/ai-nanobanana-2.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* 文案内容 */}
      <div className="container mx-auto px-4 relative z-10 py-24 md:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="block">Nano Banana AI</span>
          </h1>

          <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-100 mt-4 block">
            Nano Banana AI -- Powered By Gemini 2.5 Flash Image Generation &
            Editing Studio
          </h2>

          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Experience Google&apos;s revolutionary Nano Banana AI (Gemini 2.5
            Flash Image) for advanced image generation and editing. Create,
            blend, and enhance images with state-of-the-art AI technology in
            Nano Banana AI （alternative Google AI Studio).
          </p>

          {/* 按钮区域 */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/en/dashboard"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 bg-blue-400 hover:bg-blue-600 text-white px-8 rounded-full"
            >
              <span>Try Nano Banana</span>
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
                className="lucide lucide-arrow-right ml-2 h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/en/image-to-video"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 bg-blue-500 hover:bg-blue-700 text-white px-8 rounded-full"
            >
              <span>Image to Video</span>
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
                className="lucide lucide-arrow-right ml-2 h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Web / Mobile / Tablet 图标 */}
          <div className="mt-12 flex justify-center gap-8 text-gray-300">
            <div className="flex items-center gap-2">
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
                className="lucide lucide-monitor h-5 w-5"
              >
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
              <span>Web</span>
            </div>

            <div className="flex items-center gap-2">
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
                className="lucide lucide-smartphone h-5 w-5"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              <span>Mobile</span>
            </div>

            <div className="flex items-center gap-2">
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
                className="lucide lucide-tablet h-5 w-5"
              >
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                <line x1="12" x2="12.01" y1="18" y2="18" />
              </svg>
              <span>Tablet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;