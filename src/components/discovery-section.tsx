"use client";

import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { Container } from "@/components/container";

export function DiscoverySection() {
  return (
    <section id="discovery" className="bg-[#F3F2EE] section-padding ">
      <Container>
        <div className="text-left mb-12">
          <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
            Knowledge Discovery
          </h2>
        </div>
      </Container>

      <ImageAutoSlider className="-mt-2" />
    </section>
  );
}
