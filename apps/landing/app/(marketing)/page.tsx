import { Container } from "@knowingly/container";
import { Hero } from "@knowingly/hero";
import { Background } from "@knowingly/background";
import { Features } from "@knowingly/features";
import { Companies } from "@knowingly/companies";
import { GridFeatures } from "@knowingly/grid-features";
import { Testimonials } from "@knowingly/testimonials";
import { CTA } from "@knowingly/cta";

export default function Home() {
  return (
    <div className="relative overflow-hidden ">
      <Background />
      <Container className="flex min-h-screen flex-col items-center justify-between ">
        <Hero />
        <Companies />
        <Features />
        <GridFeatures />
        <Testimonials />
      </Container>
      <div className="relative">
        <Background />
        <CTA />
      </div>
    </div>
  );
}
