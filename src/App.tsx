import type { ReactNode } from "react";
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

const logos = [
  { name: "KTO", file: "kto" },
  { name: "Betsson", file: "betsson" },
  { name: "NetRefer", file: "netrefer" },
  { name: "Brand name", file: "placeholder-3" },
];

const principles = [
  ["Start with the decision.", "Every project begins by naming the decision the product helps someone make."],
  ["Prototype early.", "I test rough flows with real users before polishing a single screen."],
  ["Ship with engineers.", "I work in the language of the codebase, so what ships matches what was designed."],
];

const roles = [
  ["Head of Design, KTO Group", "2017-2026"],
  ["Lead Design for Products, Betsson", "2015-2017"],
  ["Lead Design for Native, Betsson", "2013-2015"],
  ["Lead Design, Betsson Labs", "2012-2013"],
];

function Nav() {
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
        <ul className="flex items-center gap-6 text-sm text-muted md:gap-10">
          <li><a className="transition-colors hover:text-fg" href="#work">Work</a></li>
          <li><a className="transition-colors hover:text-fg" href="#about">About</a></li>
          <li><a className="transition-colors hover:text-fg" href="#contact">Contact</a></li>
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
          Senior product designer working on research, systems and interfaces for fintech and health teams.
        </motion.p>
        <motion.div {...enter(0.24)} className="mt-10">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 bg-fg px-6 py-3.5 text-sm font-medium text-on-fg transition-transform active:scale-[0.98]"
          >
            View work
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
      <Reveal>
        <h2 className="text-3xl font-medium tracking-tighter md:text-5xl">Work</h2>
      </Reveal>
      <ul className="mt-16 grid grid-cols-2 items-center gap-x-8 gap-y-14 md:mt-24 md:grid-cols-4 md:gap-x-16">
        {logos.map((l, i) => (
          <li key={l.file}>
            <Reveal delay={i * 0.06}>
              <span
                role="img"
                aria-label={`${l.name} logo`}
                className="block h-8 w-full bg-fg md:h-10"
                style={{
                  maskImage: `url(/logos/${l.file}.svg)`,
                  WebkitMaskImage: `url(/logos/${l.file}.svg)`,
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

/* Double diamond: the outlines draw in on scroll to show the process opening up, then narrowing, twice. */
function DoubleDiamond() {
  const reduce = useReducedMotion();
  const draw = {
    initial: reduce ? false : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.4 },
  } as const;
  return (
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
        <motion.polygon
          points="2,250 250,10 498,250 250,490"
          stroke="var(--mid)"
          strokeWidth={1}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
          {...draw}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <motion.polygon
          points="502,250 750,10 998,250 750,490"
          stroke="var(--mid)"
          strokeWidth={1}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
          {...draw}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
        />
      </svg>
      <span className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-2 text-xl font-medium tracking-tighter md:text-5xl">
        Problem
      </span>
      <span className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-2 text-xl font-medium tracking-tighter md:text-5xl">
        Solution
      </span>
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
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-40">
      <Reveal>
        <h2 className="text-3xl font-medium tracking-tighter md:text-5xl">Ethos</h2>
      </Reveal>
      <Reveal className="mt-16 md:mt-24">
        <DoubleDiamond />
      </Reveal>
      <div className="mt-24 flex flex-col gap-14 md:ml-[33%] md:mt-40 md:gap-20">
        {principles.map(([lead, body], i) => (
          <Reveal key={lead} delay={i * 0.06}>
            <p className="max-w-[36ch] text-2xl font-medium leading-snug tracking-tight md:text-4xl">
              {lead} <span className="font-normal text-muted">{body}</span>
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
          <li><a className="transition-colors hover:text-fg" href="https://www.linkedin.com/in/marioborg/?isSelfProfile=true" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className="transition-colors hover:text-fg" href="#top">Read.cv</a></li>
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
