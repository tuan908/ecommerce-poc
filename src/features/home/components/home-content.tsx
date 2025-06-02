"use client";

import Hero from "@/features/home/components/hero-section";
import Footer from "@/shared/components/layout/footer";
import Header from "@/shared/components/layout/header";
import json from "@/shared/i18n/locales/vi.json";
import { useRouter } from "next/navigation";
import { memo, startTransition } from "react";
import CTASection from "./cta-section";
import FeaturesSection from "./features-section";
import ProductCarousel from "./product-carousel";
import TestimonialsSection from "./testinomials-section";

const HomeContent = memo(() => {
  const router = useRouter();

  const handleBrowseProducts = () => {
    router.prefetch("/products");
    startTransition(() => {
      router.push("/products");
    });
  };

  const ctaButtons = [
    {
      text: json.home.viewProducts,
      variant: "secondary" as const,
      onClick: handleBrowseProducts,
    },
    { text: json.navigation.contact, variant: "outline" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero
          title={json.home.heroTitle}
          highlightText={json.home.heroHighlight}
          description={json.home.heroDescription}
          imageSrc="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/497801838_676484315004569_9022096698584304224_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEHE62kKE_j7Vv7153_tphWmwmDKSWFYr2bCYMpJYVivZ0bzd8qF1JgfCzazUFzb_b3ft9-_YZE0tJYlQbuuylK&_nc_ohc=DAjBQt54wV8Q7kNvwEh7Ma7&_nc_oc=Adnn_YcCpXLy9OnuNHaojYoRyYD9iMjegD8De6zCmnU-mpNAHnLs6n3nNaX4XeB-iXY&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=HpALR9AW5NHBcEQU2_UpVw&oh=00_AfLiM9YI6ZFDwwdh4VJTRg77My2hUTIwAN_E91Hpi17I0w&oe=68431DC5"
          imageAlt={json.home.heroImageAlt}
          primaryButtonText={json.home.heroPrimaryButtonText}
          onPrimaryClick={handleBrowseProducts}
        />

        <FeaturesSection
          title={json.home.featuresTitle}
          description={json.home.featuresDescription}
        />

        <section id="products" className="bg-[#1f5d59]/5">
          <ProductCarousel />
        </section>

        <TestimonialsSection
          title={json.home.testimonialsTitle}
          description={json.home.testimonialsDescription}
        />

        <CTASection
          title={json.home.ctaTitle}
          description={json.home.ctaDescription}
          buttons={ctaButtons}
        />
      </main>

      <Footer />
    </div>
  );
});

HomeContent.displayName = "HomeContent";
export default HomeContent;
