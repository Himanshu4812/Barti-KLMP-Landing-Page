import { Container } from "@/components/container";

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy pt-28 pb-20 md:pt-36 md:pb-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              How BARTI collects, uses, and protects your personal information when you use the Knowledge &amp; Library
              Management Platform.
            </p>
            <p className="mt-3 text-sm text-white/40">
              Last updated: June 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg-primary">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">1. Information We Collect</h2>
              <p className="text-text-secondary leading-relaxed">
                We collect information you voluntarily provide when using the platform, such as your name, email address,
                and any messages submitted through our contact form. We also collect certain technical information
                automatically, including your IP address, browser type, device information, and usage patterns.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">2. How We Use Your Information</h2>
              <p className="text-text-secondary leading-relaxed">
                The information we collect is used for the following purposes:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-text-secondary leading-relaxed">
                <li>To respond to your inquiries and provide support.</li>
                <li>To improve and personalize your experience on the platform.</li>
                <li>To analyze usage trends and enhance platform functionality.</li>
                <li>To comply with legal obligations and protect our rights.</li>
                <li>To communicate important updates or changes to our services.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">3. Data Sharing and Disclosure</h2>
              <p className="text-text-secondary leading-relaxed">
                BARTI does not sell, trade, or rent your personal information to third parties. We may share your
                information with authorized service providers who assist in operating the platform, subject to strict
                confidentiality agreements. We may also disclose information if required by law or to protect the rights
                and safety of BARTI, its users, or the public.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">4. Cookies and Tracking</h2>
              <p className="text-text-secondary leading-relaxed">
                The platform may use cookies and similar tracking technologies to enhance your experience. Cookies are
                small data files stored on your device that help us remember your preferences and understand how you
                interact with the platform. You can control cookie settings through your browser preferences; however,
                disabling cookies may affect certain features of the platform.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">5. Data Security</h2>
              <p className="text-text-secondary leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. These measures include encryption,
                secure servers, and access controls. However, no method of transmission over the internet is completely
                secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">6. Data Retention</h2>
              <p className="text-text-secondary leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in
                this policy, or as required by applicable law. When data is no longer needed, it will be securely
                deleted or anonymized.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">7. Your Rights</h2>
              <p className="text-text-secondary leading-relaxed">
                You have the right to access, correct, or delete your personal information held by us. You may also
                object to or restrict certain processing of your data. To exercise these rights, please contact us using
                the information provided below. We will respond to your request within the timeframe required by
                applicable law.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">8. Third-Party Links</h2>
              <p className="text-text-secondary leading-relaxed">
                The platform may contain links to third-party websites. This Privacy Policy applies only to KLMP, and we
                are not responsible for the privacy practices of third-party sites. We encourage you to review the
                privacy policies of any external websites you visit.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">9. Changes to This Policy</h2>
              <p className="text-text-secondary leading-relaxed">
                BARTI may update this Privacy Policy from time to time. Changes will be posted on this page with an
                updated revision date. We encourage you to review this policy periodically to stay informed about how we
                protect your information.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">10. Contact Us</h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                please reach out to us:
              </p>
              <div className="mt-3 p-4 bg-card-bg rounded-xl border border-border-light text-text-secondary text-sm leading-relaxed">
                <p><strong>Dr. Babasaheb Ambedkar Research &amp; Training Institute (BARTI)</strong></p>
                <p>Hanuman Nagar, Byculla East, Mumbai - 400027</p>
                <p>Email: library@barti.maharashtra.gov.in</p>
                <p>Phone: +91 22 2373 1100</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
