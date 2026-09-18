import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Briefcase, Compass, HeartHandshake, Laptop, Mail, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | ACHICHI Media Limited',
  description: 'Join our team of investigative journalists, editors, producers, and engineers building the future of Nigerian news.',
};

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Financial & Markets Correspondent",
      department: "Business & Economy Desk",
      location: "Lagos, Nigeria (Hybrid)",
      type: "Full-Time",
      desc: "Lead investigative coverage of Nigeria's fiscal policy, foreign exchange mechanisms, banking sectors, and startup capital flows."
    },
    {
      title: "National Security & Governance Reporter",
      department: "Political Desk",
      location: "Abuja Bureau",
      type: "Full-Time",
      desc: "Produce breaking scoops and in-depth investigations into government appropriations, legislative defense oversight, and regional security dynamics."
    },
    {
      title: "Multimedia Producer (Audio & Live Rooms)",
      department: "Live Media & Broadcast",
      location: "Lagos, Nigeria",
      type: "Full-Time",
      desc: "Direct our daily Morning Briefing radio broadcasts and moderate closed-door interactive video and audio forums with guest leaders."
    },
    {
      title: "Senior Full-Stack Engineer (Next.js / TypeScript)",
      department: "Product & Engineering",
      location: "Remote (Nigeria / Africa)",
      type: "Full-Time",
      desc: "Architect high-performance reader experiences, personalized algorithmic feeds, and real-time interactive media systems."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-3 block">
            Work With Us
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            Do the Most Meaningful Work of Your Life
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            At ACHICHI Media Limited, we are assembling fearless reporters, rigorous editors, creative storytellers, and world-class technologists dedicated to building the most credible news platform on the African continent.
          </p>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-2">Our Culture</h2>
          <p className="text-3xl font-black">Why Build Your Career Here?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Compass className="w-6 h-6 text-blue-500" />,
              title: "Pursue Truth Without Fear",
              desc: "Our journalists have ironclad editorial independence. We support months-long investigations and never kill stories due to commercial or political pressure."
            },
            {
              icon: <Laptop className="w-6 h-6 text-amber-500" />,
              title: "Modern Newsroom Stack",
              desc: "We combine traditional gumshoe reporting with cutting-edge data analysis, open-source intelligence (OSINT), and high-craft digital design."
            },
            {
              icon: <HeartHandshake className="w-6 h-6 text-emerald-500" />,
              title: "Comprehensive Well-Being",
              desc: "Competitive pay, health insurance, mental wellness support, and dedicated investigative travel grants to keep you safe in the field."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-secondary)]/30 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-1">Open Positions</h2>
              <p className="text-3xl font-black">Current Newsroom Openings</p>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Showing {jobs.length} active roles
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                      {job.department}
                    </span>
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <span className="text-[var(--text-secondary)] font-medium">{job.location}</span>
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <span className="text-[var(--accent)] font-bold">{job.type}</span>
                  </div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {job.desc}
                  </p>
                </div>

                <a 
                  href={`mailto:careers@achichimedia.com?subject=Application:%20${encodeURIComponent(job.title)}`}
                  className="px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 flex-shrink-0"
                >
                  Apply Now <ArrowUpRight size={15} />
                </a>
              </div>
            ))}
          </div>

          {/* General Inquiries */}
          <div className="mt-12 p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] text-center max-w-2xl mx-auto">
            <h4 className="font-bold text-lg mb-2">Don't see your role?</h4>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              We are always eager to meet exceptional journalists, photojournalists, and software engineers. Send your resume, portfolio, and best clips to our talent team.
            </p>
            <a 
              href="mailto:careers@achichimedia.com?subject=General%20Application%20-%20ACHICHI%20Media"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[var(--border)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--bg-hover)] transition-colors"
            >
              <Mail size={15} /> Send Open Pitch
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
