import { Container } from "@/components/container";
import { BookOpen, Eye, Target, Shield, Users, Award, ScrollText } from "lucide-react";

const TIMELINE = [
  { year: "1998", title: "Institute Established", description: "Dr. Babasaheb Ambedkar Research and Training Institute (BARTI) was founded by the Government of Maharashtra to promote Ambedkarite thought and social justice research." },
  { year: "2005", title: "Library Foundation", description: "The BARTI central library was established with a core collection of 5,000 volumes focusing on constitutional law, social justice, and Ambedkarite literature." },
  { year: "2012", title: "Digital Cataloging Initiative", description: "Launched the first digital cataloging system to inventory over 12,000 books, research papers, and archival materials." },
  { year: "2018", title: "Research Repository Launch", description: "Opened the digital research repository for public access, making thousands of documents available to scholars and researchers worldwide." },
  { year: "2024", title: "KLMP Platform", description: "Launched the Knowledge and Library Management Platform to modernize operations, enhance discoverability, and preserve Maharashtra's knowledge heritage." },
];

const TEAM = [
  { name: "Dr. Prakash R. Gaikwad", role: "Director, BARTI", bio: "Oversees the institute's research agenda and strategic direction. Former professor of social justice studies at University of Mumbai." },
  { name: "Mrs. Sunita V. Kamble", role: "Chief Librarian", bio: "Manages the central library collection with over 20 years of experience in academic librarianship and digital archive management." },
  { name: "Dr. Anil D. Meshram", role: "Head of Research", bio: "Leads research publications and coordinates the digital repository initiatives. Specializes in constitutional history and policy studies." },
  { name: "Mr. Rajesh S. Pawar", role: "Digital Library Manager", bio: "Responsible for the digital transformation of library services including the KLMP platform implementation and member engagement programs." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy pt-28 pb-20 md:pt-36 md:pb-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              About <span className="text-gold">BARTI</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              Dr. Babasaheb Ambedkar Research and Training Institute (BARTI) is a premier
              institution established by the Government of Maharashtra to preserve, promote,
              and propagate the thoughts and ideals of Dr. B. R. Ambedkar through research,
              education, and knowledge preservation.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg-primary">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card-bg rounded-2xl p-8 shadow-sm border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-navy" />
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">Our Mission</h3>
              <p className="text-text-secondary leading-relaxed">
                To establish a comprehensive knowledge ecosystem that preserves, manages,
                and provides democratic access to Ambedkarite literature, constitutional
                studies, social justice resources, and public knowledge archives for
                researchers, scholars, and citizens across Maharashtra.
              </p>
            </div>
            <div className="bg-card-bg rounded-2xl p-8 shadow-sm border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">Our Vision</h3>
              <p className="text-text-secondary leading-relaxed">
                To be Maharashtra&apos;s leading digital knowledge repository and a model for
                government library transformation — where every citizen has seamless access
                to the intellectual heritage of Dr. Ambedkar and the constitutional legacy
                of India.
              </p>
            </div>
            <div className="bg-card-bg rounded-2xl p-8 shadow-sm border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-teal" />
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">Our Values</h3>
              <ul className="space-y-3 text-text-secondary">
                {["Accessibility for All", "Preservation of Heritage", "Academic Integrity", "Technological Innovation"].map((value) => (
                  <li key={value} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-card-bg">
        <Container>
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">
              Our Journey
            </h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              From a modest research institute to a comprehensive knowledge repository —
              key milestones in BARTI&apos;s evolution.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border-light hidden md:block" />
            <div className="space-y-10">
              {TIMELINE.map((item, index) => (
                <div key={item.year} className="relative pl-0 md:pl-20">
                  <div className="hidden md:flex absolute left-4 top-1 w-9 h-9 rounded-full bg-navy border-4 border-card-bg items-center justify-center">
                    <span className="text-xs font-bold text-gold">{index + 1}</span>
                  </div>
                  <div className="bg-bg-primary rounded-2xl p-6 md:p-8 border border-border-light">
                    <span className="inline-block px-3 py-1 bg-navy text-gold text-sm font-semibold rounded-lg mb-3">
                      {item.year}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg-primary">
        <Container>
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">
              Our Team
            </h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              Dedicated professionals committed to preserving and sharing knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => {
              const initials = member.name.split(" ").map((n) => n[0]).join("");
              return (
                <div key={member.name} className="bg-card-bg rounded-2xl p-6 shadow-sm border border-border-light text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-gold">{initials}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy">{member.name}</h3>
                  <p className="text-gold text-sm font-semibold mt-1">{member.role}</p>
                  <p className="text-text-secondary text-sm mt-3 leading-relaxed">{member.bio}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
