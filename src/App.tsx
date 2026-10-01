import { useEffect, useRef, useState, type ReactNode } from "react";
import lottie from "lottie-web";
import { animate, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

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
  { name: "KTO", file: "kto", size: "w-[62%] h-[28.8px] md:h-9" },
  { name: "Kambi", file: "kambi" },
  { name: "Betsson", file: "betsson", size: "w-[56%] h-[28.8px] md:h-9" },
  { name: "Altenar", file: "altenar" },
  { name: "NetRefer", file: "netrefer", size: "w-[68%] h-[37px] md:h-[46.2px]" },
  { name: "Authentic Gaming", file: "authentic-gaming", ext: "png", size: "w-[62%] h-16 md:h-20" },
];

const principles: [string, ReactNode, { file: string; ratio: string }?][] = [
  [
    "Stakeholder Alignment.",
    "Every successful project is the result of continuous stakeholder alignment.",
    { file: "alignment", ratio: "80 / 107" },
  ],
  [
    "Prototype smarter.",
    "I use AI to rapidly explore ideas, flows, motion, validate assumptions and cross test with real users or data. Iterate into a polished UI.",
    { file: "proto", ratio: "69 / 106" },
  ],
  [
    "Ship pragmatically.",
    "I understand the codebase, constraints, and possibilities, turning design intent into what actually ships.",
    { file: "ship", ratio: "85 / 108" },
  ],
];

const roles = [
  ["Head of Design", "KTO Group", "2017-2026"],
  ["Lead Design for Products", "Betsson", "2015-2017"],
  ["Lead Design for Native", "Betsson", "2013-2015"],
  ["Lead Design", "Betsson Labs", "2012-2013"],
  ["Lead Design Sportsbook Product", "IBA Entertainment", "2011-2012"],
  ["Creative Director", "NetRefer", "2006-2010"],
];

const NAV_LINKS = [
  { id: "ethos", label: "Ethos" },
  { id: "about", label: "About" },
  { id: "experience", label: "CV" },
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
                  className={`relative ${on ? "text-fg" : ""}`}
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

/* Hero animation: Discover, Define, Develop, Deliver typed out in a loop. Paused on a still frame under reduced motion. */
function TypingAnimation() {
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!box.current) return;
    const anim = lottie.loadAnimation({
      container: box.current,
      renderer: "svg",
      loop: true,
      autoplay: !reduce,
      path: "/animations/typing_4D.json",
      rendererSettings: { preserveAspectRatio: "xMaxYMin meet" },
    });
    if (reduce) anim.addEventListener("DOMLoaded", () => anim.goToAndStop(150, true));

    return () => anim.destroy();
  }, [reduce]);
  return (
    <div
      ref={box}
      role="img"
      aria-label="Discover, Define, Develop, Deliver"
      className="aspect-[4/5] w-full md:max-h-[68dvh]"
    />
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
            className="group inline-flex items-center gap-2 rounded-[6px] bg-fg px-6 py-3.5 text-sm font-medium text-on-fg transition-transform active:scale-[0.98]"
          >
            Get in touch
            <ArrowDown size={16} weight="regular" className="group-hover:animate-[arrow-bounce_0.8s_ease-in-out_infinite] motion-reduce:group-hover:animate-none" />
          </a>
        </motion.div>
      </div>
      <motion.div {...enter(0.18)} className="md:col-span-5">
        <TypingAnimation />
      </motion.div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl scroll-mt-16 px-4 pb-0 pt-24 md:px-8 md:pt-40">
      <Reveal>
        <h2 className="text-3xl font-medium tracking-tighter md:text-5xl">Companies</h2>
        <p className="mt-4 max-w-[65ch] text-base text-muted md:text-lg">
          Companies I worked for and collaborated with
        </p>
      </Reveal>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
        {logos.map((l, i) => (
          <li key={l.file}>
            <Reveal delay={i * 0.06}>
              <div className="grid aspect-[5/4] place-items-center rounded-[12px] bg-card md:aspect-[5/2]">
                <span
                  role="img"
                  aria-label={`${l.name} logo`}
                  className={`block bg-fg ${l.size ?? "w-[62%] h-8 md:h-10"}`}
                  style={{
                    maskImage: `url(/logos/${l.file}.${l.ext ?? "svg"})`,
                    WebkitMaskImage: `url(/logos/${l.file}.${l.ext ?? "svg"})`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                  }}
                />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Open arrowhead drawn at the origin; (dx, dy) is the direction of travel. */
function Arrowhead({ dx, dy }: { dx: number; dy: number }) {
  const len = Math.hypot(dx, dy);
  const bx = -dx / len;
  const by = -dy / len;
  const L = 20;
  const c = Math.SQRT1_2;
  const barb = (sign: 1 | -1) => {
    const rx = bx * c - sign * by * c;
    const ry = sign * bx * c + by * c;
    return `${L * rx},${L * ry}`;
  };
  return (
    <polyline
      points={`${barb(1)} 0,0 ${barb(-1)}`}
      stroke="var(--mid)"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}

type Pt = { x: number; y: number };

const LOOP_SECONDS = 32;
const mid = (a: Pt, b: Pt): Pt => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/* Piecewise-linear lookup: value at time t for matching `times` and `values` arrays. */
function sample(times: number[], values: number[], t: number) {
  for (let i = 1; i < times.length; i++) {
    if (t <= times[i]) {
      const span = times[i] - times[i - 1];
      const k = span === 0 ? 1 : (t - times[i - 1]) / span;
      return values[i - 1] + (values[i] - values[i - 1]) * k;
    }
  }
  return values[values.length - 1];
}

/*
 * An arrowhead that circles a diamond: it follows each edge, pauses at every corner to turn 90 degrees and keeps going
 * until it is back where it started. `vertices` are listed in travel order, `startEdge` picks where the loop begins,
 * and `turn` is -90 for counter-clockwise or 90 for clockwise. Static on its edge under reduced motion.
 * The position is written as an SVG transform attribute so the arrowhead tip is always the pivot and stays on the line.
 */
function FlowArrow({ vertices, startEdge, turn }: { vertices: [Pt, Pt, Pt, Pt]; startEdge: number; turn: -90 | 90 }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGGElement>(null);
  const v = (i: number) => vertices[(startEdge + i) % 4];
  const start = mid(v(0), v(1));
  const dx = v(1).x - v(0).x;
  const dy = v(1).y - v(0).y;

  useEffect(() => {
    if (reduce || !ref.current) return;
    const node = ref.current;
    const stops = [start, v(1), v(1), v(2), v(2), v(3), v(3), v(4), v(4), start];
    const times = [0, 0.11, 0.14, 0.36, 0.39, 0.61, 0.64, 0.86, 0.89, 1];
    const xs = stops.map((p) => p.x);
    const ys = stops.map((p) => p.y);
    const angles = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4].map((n) => n * turn);
    const controls = animate(0, 1, {
      duration: LOOP_SECONDS,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (t) =>
        node.setAttribute(
          "transform",
          `translate(${sample(times, xs, t)} ${sample(times, ys, t)}) rotate(${sample(times, angles, t)})`,
        ),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, startEdge, turn]);

  return (
    <g ref={ref} transform={`translate(${start.x} ${start.y})`}>
      <Arrowhead dx={dx} dy={dy} />
    </g>
  );
}

/* Corners in travel order: the left diamond circles counter-clockwise, the right one clockwise. */
const LEFT_DIAMOND: [Pt, Pt, Pt, Pt] = [
  { x: 498, y: 250 },
  { x: 250, y: 10 },
  { x: 2, y: 250 },
  { x: 250, y: 490 },
];
const RIGHT_DIAMOND: [Pt, Pt, Pt, Pt] = [
  { x: 502, y: 250 },
  { x: 750, y: 10 },
  { x: 998, y: 250 },
  { x: 750, y: 490 },
];

/* Colours taken from the hero animation so the diagram and the animation read as one set. */
const phases = [
  { name: "Discover", color: "#C9D7E8" },
  { name: "Define", color: "#EAD9B8" },
  { name: "Develop", color: "#C8DCC8" },
  { name: "Deliver", color: "#E9CDC9" },
];

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
          strokeWidth={3}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
        <polygon
          points="502,250 750,10 998,250 750,490"
          stroke="var(--mid)"
          strokeWidth={3}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
        <FlowArrow vertices={LEFT_DIAMOND} startEdge={0} turn={-90} />
        <FlowArrow vertices={LEFT_DIAMOND} startEdge={2} turn={-90} />
        <FlowArrow vertices={RIGHT_DIAMOND} startEdge={0} turn={90} />
        <FlowArrow vertices={RIGHT_DIAMOND} startEdge={2} turn={90} />
      </svg>
      <span className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-2 font-serif text-[18px] font-normal md:text-[54px]">
        Problem
      </span>
      <span className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-2 font-serif text-[18px] font-normal md:text-[54px]">
        Solution
      </span>
      </div>
      <div className="relative mt-6 md:mt-10">
        <ul className="grid grid-cols-4 text-center text-xs font-medium tracking-tight md:text-xl">
          {phases.map((ph) => (
            <li key={ph.name}>
              <span className="inline-block rounded-lg px-2 py-1 md:px-3" style={{ backgroundColor: ph.color, color: "#121212" }}>
                {ph.name}
              </span>
            </li>
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
    <section id="ethos" className="mx-auto max-w-7xl scroll-mt-16 px-4 pb-0 pt-24 md:px-8 md:pt-40">
      <Reveal>
        <h2 className="text-3xl font-medium tracking-tighter md:text-5xl">Design Ethos</h2>
        <p className="mt-4 max-w-[65ch] text-base text-muted md:text-lg">
          My approach revolves around the double diamond methodology
        </p>
      </Reveal>
      <div className="mt-16 md:mt-24">
        <DoubleDiamond />
      </div>
      <div className="mt-24 flex flex-col gap-14 md:ml-[33%] md:mt-40 md:gap-20">
        {principles.map(([lead, body, icon], i) => (
          <Reveal key={lead} delay={i * 0.06} className="relative">
            {icon && (
              <span
                aria-hidden="true"
                className="mb-5 block h-14 bg-fg md:absolute md:right-full md:top-1 md:mb-0 md:mr-16 md:h-[72px]"
                style={{
                  aspectRatio: icon.ratio,
                  maskImage: `url(/icons/${icon.file}.svg)`,
                  WebkitMaskImage: `url(/icons/${icon.file}.svg)`,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "right top",
                  WebkitMaskPosition: "right top",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              />
            )}
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
    <section
      id="about"
      className="mx-auto grid max-w-7xl scroll-mt-16 grid-cols-1 items-start gap-10 px-4 py-24 md:grid-cols-12 md:gap-8 md:px-8 md:py-40"
    >
      <div className="md:col-span-7">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tighter md:text-5xl">About</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 md:mt-16">
          <p className="max-w-[56ch] text-base leading-relaxed text-muted md:text-lg">
            A Malta-based designer with 20 years of experience designing iGaming brands, products, and
            digital experiences. My work spans the full spectrum of the industry, from creating brands from
            the ground up to designing large-scale sportsbook and casino platforms across web and native.
          </p>
          <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-muted md:text-lg">
            I’ve led design teams, established design systems, and conceptualised new products for multiple
            markets, working with some of the brightest minds in the business, I combine strategic
            thinking with hands-on design through early discovery on through full product execution.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.2} className="md:col-span-4 md:col-start-9">
        <img
          src="/mario-borg.jpg"
          alt="Portrait of Mario Borg"
          width={800}
          height={800}
          loading="lazy"
          className="mx-auto aspect-square w-[250px] max-w-full rounded-full object-cover md:ml-auto md:mr-0 md:w-[346px]"
        />
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 md:px-8 md:py-40">
      <Reveal>
        <h2 className="text-3xl font-medium tracking-tighter md:text-5xl">Experience</h2>
        <p className="mt-4 max-w-[65ch] text-base text-muted md:text-lg">
          Please{" "}
          <a
            href="mailto:marioborg@gmail.com"
            className="text-fg underline decoration-line decoration-2 underline-offset-4"
          >
            get in touch
          </a>{" "}
          for a full CV
        </p>
      </Reveal>
      <dl className="mt-12 grid grid-cols-1 gap-y-6 md:mt-20 md:ml-[33%] md:gap-y-8">
        {roles.map(([title, company, years], i) => (
          <Reveal key={`${title}-${company}`} delay={i * 0.05} className="flex items-baseline justify-between gap-6">
            <dt className="text-base tracking-tight md:text-xl">
              {title}, <span className="font-bold">{company}</span>
            </dt>
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
          className="mt-4 inline-block break-all text-3xl font-medium tracking-tighter underline decoration-line decoration-2 underline-offset-8 md:text-6xl"
        >
          marioborg@gmail.com
        </a>
      </Reveal>
      <div className="mt-24 flex flex-wrap items-center justify-between gap-4 text-sm text-muted md:mt-40">
        <p>2026 Mario Borg</p>
        <ul className="flex gap-6">
          <li><a href="https://www.linkedin.com/in/marioborg" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
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
