import { Container } from "@/components/container";

export default function TermsPage() {
  return (
    <>
      <section className="bg-navy pt-28 pb-20 md:pt-36 md:pb-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Terms of <span className="text-gold">Service</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              Please read these terms carefully before using the BARTI Knowledge &amp; Library Management Platform.
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
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                By accessing or using the BARTI Knowledge &amp; Library Management Platform (&ldquo;KLMP&rdquo;), you agree to be bound
                by these Terms of Service. If you do not agree with any part of these terms, you must not use the platform.
                These terms apply to all visitors, users, and contributors who access the platform.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">2. Description of Service</h2>
              <p className="text-text-secondary leading-relaxed">
                KLMP is a digital repository maintained by Dr. Babasaheb Ambedkar Research &amp; Training Institute (BARTI),
                Government of Maharashtra. The platform provides access to Ambedkarite literature, constitutional studies,
                social justice archives, and other scholarly resources for educational and research purposes.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">3. User Responsibilities</h2>
              <p className="text-text-secondary leading-relaxed">
                You agree to use the platform only for lawful purposes and in a manner that does not infringe the rights
                of others. You must not:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-text-secondary leading-relaxed">
                <li>Use the platform for any unlawful or prohibited activity.</li>
                <li>Attempt to gain unauthorized access to any part of the platform or its systems.</li>
                <li>Upload or distribute viruses, malware, or any harmful code.</li>
                <li>Reproduce, duplicate, or exploit any part of the platform without prior written consent.</li>
                <li>Engage in any activity that disrupts or interferes with the platform&apos;s functionality.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">4. Intellectual Property</h2>
              <p className="text-text-secondary leading-relaxed">
                All content, trademarks, and intellectual property displayed on KLMP are owned by BARTI, the Government of
                Maharashtra, or respective rights holders. Content may be used for personal, educational, or research
                purposes with appropriate attribution. Commercial use or redistribution without explicit permission is
                prohibited.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-text-secondary leading-relaxed">
                The platform and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
                BARTI makes no representations or warranties of any kind, express or implied, regarding the accuracy,
                completeness, reliability, or availability of the platform. Your use of the platform is at your own risk.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">6. Limitation of Liability</h2>
              <p className="text-text-secondary leading-relaxed">
                To the fullest extent permitted by law, BARTI and the Government of Maharashtra shall not be liable for
                any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use
                of the platform. This includes, but is not limited to, loss of data, loss of profits, or interruption of
                service.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">7. External Links</h2>
              <p className="text-text-secondary leading-relaxed">
                The platform may contain links to third-party websites or services. BARTI does not endorse or assume
                responsibility for the content, privacy policies, or practices of any third-party websites. You access
                such links at your own risk.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">8. Modifications to Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                BARTI reserves the right to modify or replace these Terms of Service at any time. Changes will be
                effective immediately upon posting. Your continued use of the platform after any changes constitutes
                acceptance of the revised terms. We encourage you to review these terms periodically.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">9. Governing Law</h2>
              <p className="text-text-secondary leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the Republic of India and
                the State of Maharashtra. Any disputes arising under these terms shall be subject to the exclusive
                jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">10. Contact Information</h2>
              <p className="text-text-secondary leading-relaxed">
                For questions or concerns regarding these Terms of Service, please contact us at:
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
