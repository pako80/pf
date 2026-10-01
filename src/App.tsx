import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;

/* Reveal on scroll: shows hierarchy by bringing content in as the reader reaches it. */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const logos: { name: string; file: string; ext?: string; size?: string }[] = [
  { name: "KTO", file: "kto", size: "w-full h-[28.8px] md:h-9" },
  { name: "Betsson", file: "betsson", size: "w-[90%] h-[28.8px] md:h-9" },
  { name: "NetRefer", file: "netrefer" },
  { name: "Authentic Gaming", file: "authentic-gaming", ext: "png", size: "w-full h-16 md:h-20" },
];

const principles: [string, ReactNode][] = [
  [
    "Stakeholder Alignment.",
    <>
      Every project begins from continuous stakeholder alignment, what, why and who{" "}
      <ArrowRight aria-label="leads to" weight="regular" className="inline size-[0.7em] align-baseline" /> discover
    </>,
  ],
  ["Prototype smarter.", "I use AI to rapidly explore ideas, flows, motion, validate assumptions and cross test with real users or data. Iterate into a polished UI."],
  ["Ship pragmatically.", "I understand the codebase, constraints, and possibilities, turning design intent into what actually ships."],
];

const roles = [
  ["Head of Design, KTO Group", "2017-2026"],
  ["Lead Design for Products, Betsson", "2015-2017"],
  ["Lead Design for Native, Betsson", "2013-2015"],
  ["Lead Design, Betsson Labs", "2012-2013"],
];

const NAV_LINKS = [
  { id: "ethos", label: "Ethos" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/* Marks the section crossing the middle of the viewport so the reader knows where they are. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((cur) => (cur === entry.target.id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const NAV_IDS = NAV_LINKS.map((l) => l.id);

function Nav() {
  const active = useActiveSection(NAV_IDS);
  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#top" aria-label="Mario Borg, back to top" className="block">
          <span
            className="block aspect-[102.6/114.5] h-[46px] bg-fg"
            style={{
              maskImage: "url(/logos/monogram.svg)",
              WebkitMaskImage: "url(/logos/monogram.svg)",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "left center",
              WebkitMaskPosition: "left center",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
        </a>
        <ul className="flex items-center gap-6 text-base text-muted md:gap-10">
          {NAV_LINKS.map((l) => {
            const on = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`relative transition-colors hover:text-fg ${on ? "text-fg" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-fg transition-all duration-300 ${
                      on ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };
  return (
    <section id="top" className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl grid-cols-1 content-end items-start gap-10 px-4 pb-12 pt-10 md:grid-cols-12 md:gap-8 md:px-8 md:pb-16">
      <div className="md:col-span-7">
        <motion.h1 {...enter(0)} className="text-4xl font-medium leading-[1.02] tracking-tighter md:text-6xl lg:text-7xl">
          Twenty years building brands and products
        </motion.h1>
        <motion.p {...enter(0.12)} className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">
          From creating world-class brands from the ground up to designing large-scale sportsbook and casino platforms across web and native, my work speaks for itself.
        </motion.p>
        <motion.div {...enter(0.24)} className="mt-10">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-fg px-6 py-3.5 text-sm font-medium text-on-fg transition-transform active:scale-[0.98]"
          >
            Get in touch
            <ArrowDown size={16} weight="regular" className="transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>
      <motion.div {...enter(0.18)} className="md:col-span-5">
        <img
          src={img("mario-studio-light", 900, 1100)}
          alt="Morning light across a designer's desk with sketches and a laptop"
          width={900}
          height={1100}
          fetchPriority="high"
          className="aspect-[4/5] w-full object-cover md:max-h-[68dvh]"
        />
      </motion.div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 md:px-8 md:py-40">
      <ul aria-label="Brands I have worked with" className="grid grid-cols-2 items-center gap-x-8 gap-y-14 md:grid-cols-4 md:gap-x-16">
        {logos.map((l, i) => (
          <li key={l.file}>
            <Reveal delay={i * 0.06}>
              <span
                role="img"
                aria-label={`${l.name} logo`}
                className={`block bg-fg ${l.size ?? "w-full h-8 md:h-10"}`}
                style={{
                  maskImage: `url(/logos/${l.file}.${l.ext ?? "svg"})`,
                  WebkitMaskImage: `url(/logos/${l.file}.${l.ext ?? "svg"})`,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "left center",
                  WebkitMaskPosition: "left center",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

const phases = ["Discover", "Define", "Develop", "Deliver"];

/* Double diamond: static drawing of the discover, define, develop, deliver process. */
function DoubleDiamond() {
  return (
    <div>
      <div className="relative">
      <svg viewBox="0 0 1000 500" className="block w-full overflow-visible text-fg" fill="none" aria-hidden="true">
        {[250, 500, 750].map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1={0}
            y2={500}
            stroke="var(--muted)"
            strokeWidth={1.5}
            strokeDasharray="1 7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <polygon
          points="2,250 250,10 498,250 250,490"
          stroke="var(--mid)"
          strokeWidth={1}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
        <polygon
          points="502,250 750,10 998,250 750,490"
          stroke="var(--mid)"
          strokeWidth={1}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-2 text-xl font-medium tracking-tighter md:text-5xl">
        Problem
      </span>
      <span className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-2 text-xl font-medium tracking-tighter md:text-5xl">
        Solution
      </span>
      </div>
      <div className="relative mt-6 md:mt-10">
        <ul className="grid grid-cols-4 text-center text-xs font-medium tracking-tight md:text-xl">
          {phases.map((ph) => (
            <li key={ph}>{ph}</li>
          ))}
        </ul>
        {["left-1/4", "left-1/2", "left-3/4"].map((pos) => (
          <ArrowRight
            key={pos}
            aria-hidden="true"
            weight="regular"
            className={`absolute ${pos} top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-muted md:size-5`}
          />
        ))}
      </div>
    </div>
  );
}

function Approach() {
  return (
    <section id="ethos" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 md:px-8 md:py-40">
      <Reveal>
        <h2 className="text-3xl font-medium tracking-tighter md:text-5xl">Ethos</h2>
      </Reveal>
      <div className="mt-16 md:mt-24">
        <DoubleDiamond />
      </div>
      <div className="mt-24 flex flex-col gap-14 md:ml-[33%] md:mt-40 md:gap-20">
        {principles.map(([lead, body], i) => (
          <Reveal key={lead} delay={i * 0.06}>
            <p className="max-w-[36ch] text-2xl font-medium leading-snug tracking-tight md:text-4xl">
              {lead} <span className="font-normal text-soft">{body}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 md:px-8 md:py-40">
      <Reveal>
        <h2 className="text-3xl font-medium tracking-tighter md:text-5xl">About</h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-8 md:mt-16">
        <p className="max-w-[56ch] text-base leading-relaxed text-muted md:text-lg">
          A Malta-based designer with 20 years of experience designing iGaming brands, products, and
          digital experiences. My work spans the full spectrum of the industry, from creating brands from
          the ground up to designing large-scale sportsbook and casino platforms across web and native.
          I’ve led design teams, established design systems, and conceptualised new products for multiple
          markets, working with some of the brightest minds in the business, I combine strategic
          thinking with hands-on design through early discovery on through full product execution.
        </p>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-40">
      <Reveal>
        <h2 className="text-3xl font-medium tracking-tighter md:text-5xl">Experience</h2>
      </Reveal>
      <dl className="mt-12 grid grid-cols-1 gap-y-6 md:mt-20 md:ml-[33%] md:gap-y-8">
        {roles.map(([role, years], i) => (
          <Reveal key={role} delay={i * 0.05} className="flex items-baseline justify-between gap-6">
            <dt className="text-base tracking-tight md:text-xl">{role}</dt>
            <dd className="shrink-0 font-mono text-xs text-muted">{years}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-7xl scroll-mt-16 px-4 pb-10 pt-24 md:px-8 md:pt-40">
      <Reveal>
        <p className="text-base text-muted md:text-lg">Get in touch</p>
        <a
          href="mailto:marioborg@gmail.com"
          className="mt-4 inline-block break-all text-3xl font-medium tracking-tighter underline decoration-line decoration-2 underline-offset-8 transition-colors hover:decoration-accent md:text-6xl"
        >
          marioborg@gmail.com
        </a>
      </Reveal>
      <div className="mt-24 flex flex-wrap items-center justify-between gap-4 text-sm text-muted md:mt-40">
        <p>2026 Mario Borg</p>
        <ul className="flex gap-6">
          <li><a className="transition-colors hover:text-fg" href="https://www.linkedin.com/in/marioborg" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Approach />
        <About />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
