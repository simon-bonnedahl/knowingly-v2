import { Container } from "@knowingly/container";
import { Background } from "@knowingly/background";
import { Heading } from "@knowingly/heading";
import { Subheading } from "@knowingly/subheading";
import { Pricing } from "@knowingly/pricing";
import { PricingTable } from "./pricing-table";
import { Companies } from "@knowingly/companies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Knowingly",
  description:
    "Knowingly is a platform that...",
  openGraph: {
    images: [],
  },
};

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between  pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Simple pricing for your ease</Heading>
          <Subheading className="text-center">
            Knowingly offers a wide range of services. You can choose the one
            that suits your needs. Select from your favourite plan and get
            started instantly.
          </Subheading>
        </div>
        <Pricing />
        <PricingTable />
        <Companies />
      </Container>
    </div>
  );
}
