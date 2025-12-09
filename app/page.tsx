import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Testimonials11 from "@/components/Testimonials11";
import Footer from "@/components/Footer";
import NanoBananaGenerator from '@/components/NanoBananaGenerator';


export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <NanoBananaGenerator />
        <Problem />
        <Pricing />
        <Testimonials11 />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}