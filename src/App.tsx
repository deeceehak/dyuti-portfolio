import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Linkedin,
  FileText,
  Sparkles,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

/**
 * Dyuti Chakravarthy — PM Portfolio UI
 * - Cream background (#E9E4D7 / #FAF9F6)
 * - Dark gray text
 * - Violet/mauve accent
 * - Pages: Home + 3 case study pages
 *
 * Notes:
 * - Single-file React UI using hash routing.
 * - Replace placeholders (images, copy, links) as needed.
 */

const THEME = {
  bg: "#E9E4D7",
  bg2: "#FAF9F6",
  text: "#1F2937",
  muted: "#6B7280",
  line: "rgba(31,41,55,0.14)",
  card: "rgba(255,255,255,0.55)",
  accent: "#5B5F97", // muted indigo (CTA base)
  accent2: "#9A6AA8", // mauve/violet
  shadow: "0 14px 40px rgba(31,41,55,0.10)",
};

// Replace with your hosted resume URL later
const RESUME_URL = "https://your-resume-link.com";
// Replace with your LinkedIn URL later
const LINKEDIN_URL = "https://www.linkedin.com/in/your-handle";

const EMAIL_TO = "dyutichakravarthy@gmail.com";

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" },
};

type RouteSetter = (r: string) => void;

type SectionTone = "solid-mauve" | "solid-cream";

type CaseSectionDef = {
  title: string;
  anchor: string;
  body: string;
  withImage?: boolean;
  imageHint?: string;
  tone?: SectionTone;
  fullBleed?: boolean;
};

function useHashRoute(): [string, RouteSetter] {
  const getRoute = () => (window.location.hash || "#/home").replace("#", "");
  const [route, setRoute] = React.useState(getRoute());
  React.useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return [route, (r) => (window.location.hash = `#${r}`)];
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>;
}

function Pill({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "accent2" }) {
  const bg = tone === "accent" ? "rgba(91,95,151,0.10)" : "rgba(154,106,168,0.12)";
  const border = tone === "accent" ? "rgba(91,95,151,0.25)" : "rgba(154,106,168,0.25)";
  const color = tone === "accent" ? THEME.accent : THEME.accent2;
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
      style={{ background: bg, border: `1px solid ${border}`, color }}
    >
      {children}
    </span>
  );
}

function Button({
  children,
  href,
  variant = "primary",
  icon = true,
  onClick,
  newTab = false,
  type,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  newTab?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200";

  const styles: React.CSSProperties =
    variant === "primary"
      ? {
          background: `linear-gradient(135deg, ${THEME.accent} 0%, ${THEME.accent2} 140%)`,
          color: "white",
          boxShadow: "0 10px 24px rgba(91,95,151,0.20)",
        }
      : variant === "secondary"
      ? {
          background: "rgba(31,41,55,0.06)",
          color: THEME.text,
          border: `1px solid ${THEME.line}`,
        }
      : {
          background: "transparent",
          color: THEME.text,
          border: `1px solid ${THEME.line}`,
        };

  const content = (
    <span className="flex items-center gap-2">
      {children}
      {icon ? <ArrowRight className="h-4 w-4" /> : null}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noreferrer" : undefined}
        className={`${base} hover:-translate-y-0.5 active:translate-y-0`}
        style={styles}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} hover:-translate-y-0.5 active:translate-y-0`}
      style={styles}
    >
      {content}
    </button>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl p-5 sm:p-6 ${className}`}
      style={{
        background: THEME.card,
        border: `1px solid ${THEME.line}`,
        boxShadow: THEME.shadow,
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </div>
  );
}

function Section({
  title,
  eyebrow,
  children,
  id,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="py-10 sm:py-14">
      <div className="mb-6 flex flex-col gap-2">
        {eyebrow ? (
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: THEME.accent2 }} />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: THEME.muted }}>
              {eyebrow}
            </p>
          </div>
        ) : null}
        <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: THEME.text }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function NavBar({ onNavigate }: { onNavigate: RouteSetter }) {
  const [open, setOpen] = React.useState(false);

  const Link = ({ label, route, subtle }: { label: string; route: string; subtle?: boolean }) => (
    <a
      href={`#${route}`}
      onClick={() => {
        setOpen(false);
        onNavigate(route);
      }}
      className={`text-sm font-medium transition-colors ${
        subtle ? "opacity-75 hover:opacity-100" : "hover:opacity-100"
      }`}
      style={{ color: THEME.text, opacity: subtle ? 0.7 : 0.9 }}
    >
      {label}
    </a>
  );

  return (
    <div
      className="sticky top-0 z-40"
      style={{
        background: "rgba(250,249,246,0.72)",
        borderBottom: `1px solid ${THEME.line}`,
        backdropFilter: "blur(10px)",
      }}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          <a href="#/home" className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-xl"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${THEME.accent2}, ${THEME.accent})`,
                boxShadow: "0 10px 20px rgba(31,41,55,0.12)",
              }}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold" style={{ color: THEME.text }}>
                Dyuti Chakravarthy
              </div>
              <div className="text-xs" style={{ color: THEME.muted }}>
                Product Manager • EV & Energy Platforms
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6">
            <Link label="Home" route="/home" />
            <Link label="Projects" route="/home#projects" subtle />
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium opacity-75 hover:opacity-100"
              style={{ color: THEME.text }}
            >
              Resume
            </a>
            <a
              href="#/home#cta"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold"
              style={{
                background: "rgba(91,95,151,0.10)",
                border: `1px solid rgba(91,95,151,0.20)`,
                color: THEME.accent,
              }}
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2"
            style={{ border: `1px solid ${THEME.line}` }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div className="md:hidden pb-5">
            <div
              className="rounded-3xl p-4"
              style={{ background: "rgba(255,255,255,0.5)", border: `1px solid ${THEME.line}` }}
            >
              <div className="flex flex-col gap-3">
                <Link label="Home" route="/home" />
                <Link label="Projects" route="/home#projects" subtle />
                <Link label="Project A" route="/projects/project-a" subtle />
                <Link label="Project B" route="/projects/project-b" subtle />
                <Link label="Project C" route="/projects/project-c" subtle />
                <Link label="Contact" route="/home#cta" subtle />
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="mt-10"
      style={{
        borderTop: `1px solid ${THEME.line}`,
        background: "rgba(255,255,255,0.30)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container>
        <div className="py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm" style={{ color: THEME.muted }}>
            <span className="font-semibold" style={{ color: THEME.text }}>
              Get in touch
            </span>
            <span className="mx-2 opacity-60">|</span>
            <a
              href={`mailto:${EMAIL_TO}`}
              className="underline underline-offset-4"
              style={{ color: THEME.accent }}
            >
              {EMAIL_TO}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${EMAIL_TO}`}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
              style={{
                background: "rgba(154,106,168,0.10)",
                border: `1px solid rgba(154,106,168,0.20)`,
                color: THEME.accent2,
              }}
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
              style={{
                background: "rgba(31,41,55,0.06)",
                border: `1px solid ${THEME.line}`,
                color: THEME.text,
              }}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(900px 400px at 15% 20%, rgba(91,95,151,0.18), transparent 60%), radial-gradient(700px 380px at 80% 15%, rgba(154,106,168,0.18), transparent 55%)",
        }}
      />
      <Container>
        <div className="relative py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-center lg:text-left">
            <motion.div {...fade} className="lg:col-span-7 order-1">
              <div className="text-center lg:text-left">
                <h1
                  className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight"
                  style={{
                    color: THEME.text,
                    fontFamily:
                      "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Hi! I'm Dyuti Chakravarthy,
                  <br />
                  <span className="font-normal">
                    A Product Manager focused on growth, trust, and long-term engagement.
                  </span>
                </h1>

                <p className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: THEME.muted }}>
                  Product Manager with 3+ years building 0→1 and growth-stage EV & energy platforms at scale.
                  I drive conversion, retention, and revenue through user-led discovery, crisp experimentation,
                  and platform integrations across B2B2C ecosystems.
                </p>

                <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Button
                    icon={false}
                    onClick={() =>
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  >
                    View Projects
                  </Button>
                  <Button href={RESUME_URL} newTab variant="secondary" icon={false}>
                    <span className="inline-flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Resume (PDF)
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </Button>
                </div>

                <div className="mt-7 text-xs" style={{ color: THEME.muted }}>
                  Open to Growth PM roles <span className="mx-2 opacity-60">|</span> 3+ years experience{" "}
                  <span className="mx-2 opacity-60">|</span> Ann Arbor, MI (open to relocation)
                </div>
              </div>
            </motion.div>

            <motion.div {...fade} className="lg:col-span-5 order-2 flex justify-center lg:justify-end">
              <div
                className="h-36 w-36 sm:h-44 sm:w-44 lg:h-52 lg:w-52 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(154,106,168,0.35), rgba(91,95,151,0.45))",
                  border: `1px dashed ${THEME.line}`,
                  boxShadow: THEME.shadow,
                }}
              >
                <span className="text-xs text-center px-4" style={{ color: THEME.muted }}>
                  Profile photo
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />

      <Container>
        <Section title="Projects" eyebrow="Case studies" id="projects">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            <ProjectCard
              title="EV Energy Rewards — Enrollment & Incentives"
              blurb="Modular enrollment platform + incentive dashboard: improved conversion and reduced post-enrollment churn."
              route="/projects/project-a"
              tags={["Activation", "Retention", "Integrations"]}
            />
            <ProjectCard
              title="Bronco Overland Adventures — 0→1 Booking"
              blurb="Built and launched a new booking platform with strong customer satisfaction and early revenue validation."
              route="/projects/project-b"
              tags={["0→1", "Discovery", "Monetization"]}
              tone="accent2"
            />
            <ProjectCard
              title="Ford.com + EV Routing — Experience Optimization"
              blurb="Shipped iterative improvements across homepage and EV routing to raise satisfaction and trip accuracy."
              route="/projects/project-c"
              tags={["Experimentation", "UX", "Scale"]}
            />
          </div>
        </Section>

        <Section title="Experience" eyebrow="One cohesive story (with role progression)" id="experience">
          <div className="grid grid-cols-1 gap-5">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: THEME.text }}>
                    Ford Motor Company — Product (EV & Energy Platforms)
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: THEME.muted }}>
                    Jan 2023 — Present • Progression across Product Design → APM → PM
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed" style={{ color: THEME.muted }}>
                Across multiple roles at Ford, I’ve focused on one through-line: improving adoption, engagement, and
                trust for EV and connected experiences by combining rigorous discovery with measurable delivery.
              </p>

              <div className="mt-4">
                <p className="text-sm leading-relaxed" style={{ color: THEME.muted }}>
                  At Ford, I’ve worked across EV energy, consumer booking, and high-scale digital experiences with a single focus: driving adoption, engagement, and trust through strong discovery and measurable delivery. As a PM on EV Energy Rewards, I led a modular enrollment platform that tripled market coverage, improved conversion from 4% to 15%, and reduced post-enrollment churn by 19%.
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: THEME.muted }}>
                  Previously, I launched a 0→1 adventure booking platform generating $104K in pilot revenue with 90% CSAT, and earlier drove experimentation on Ford.com and EV routing that lifted CSAT by 15% and improved routing accuracy to 95% for 80K+ vehicles.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill tone="accent">0→1</Pill>
                <Pill tone="accent">Growth</Pill>
                <Pill tone="accent">Experimentation</Pill>
                <Pill tone="accent2">Platform integrations</Pill>
                <Pill tone="accent2">B2B2C</Pill>
              </div>
            </Card>
          </div>
        </Section>

        <Section title="Education" eyebrow="Core foundation" id="education">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card>
              <h3 className="text-lg font-semibold" style={{ color: THEME.text }}>
                University / Program
              </h3>
              <p className="mt-1 text-sm" style={{ color: THEME.muted }}>
                Add your degree • Year
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: THEME.muted }}>
                Replace with a 1–2 line description (focus areas, leadership, etc.).
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold" style={{ color: THEME.text }}>
                University / Program
              </h3>
              <p className="mt-1 text-sm" style={{ color: THEME.muted }}>
                Add your degree • Year
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: THEME.muted }}>
                Replace with a 1–2 line description (focus areas, leadership, etc.).
              </p>
            </Card>
          </div>

          <div className="mt-5">
            <Card className="p-6">
              <h3 className="text-lg font-semibold" style={{ color: THEME.text }}>
                Certifications & Coursework
              </h3>
              <ul className="mt-3 space-y-3 text-sm" style={{ color: THEME.text }}>
                <li className="flex items-center justify-between">
                  <span>Product Analytics Certification</span>
                  <a href="#" className="text-sm underline" style={{ color: THEME.accent }}>
                    View certificate
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>Experiment Design</span>
                  <a href="#" className="text-sm underline" style={{ color: THEME.accent }}>
                    View certificate
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>User Research</span>
                  <a href="#" className="text-sm underline" style={{ color: THEME.accent }}>
                    View certificate
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </Section>

        <Section title="Contact" eyebrow="Let's talk" id="cta">
          <Card>
            <ContactForm />
          </Card>
        </Section>
      </Container>
    </>
  );
}

function ProjectCard({
  title,
  blurb,
  route,
  tags = [],
  tone = "accent",
}: {
  title: string;
  blurb: string;
  route: string;
  tags?: string[];
  tone?: "accent" | "accent2";
}) {
  const pillTone = tone === "accent2" ? "accent2" : "accent";
  return (
    <motion.div {...fade} className="h-full">
      <Card className="h-full flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold" style={{ color: THEME.text }}>
            {title}
          </h3>
          <Pill tone={pillTone}>Case</Pill>
        </div>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: THEME.muted }}>
          {blurb}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full px-3 py-1 text-xs"
              style={{
                background: "rgba(31,41,55,0.06)",
                border: `1px solid ${THEME.line}`,
                color: THEME.text,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-10 pt-3 mt-auto">
          <Button href={`#${route}`} variant="primary" icon={false}>
            View
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function ContactForm() {
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name || "Someone"}`);
    const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: THEME.text }}>
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border px-3 py-2"
          style={{ borderColor: THEME.line, background: "rgba(255,255,255,0.6)", color: THEME.text }}
          placeholder="Name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: THEME.text }}>
          Your message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full rounded-xl border px-3 py-2"
          style={{ borderColor: THEME.line, background: "rgba(255,255,255,0.6)", color: THEME.text }}
          placeholder="Write your message…"
          required
        />
      </div>

      <Button type="submit" icon={false}>
        Send message
      </Button>

      <div className="text-xs" style={{ color: THEME.muted }}>
        This opens your email client with the message pre-filled.
      </div>
    </form>
  );
}

function CaseStudyLayout({
  title,
  subtitle,
  meta = [],
  sections = [],
  heroImageHint = "Add a hero image (dashboard, flow, or product screenshot)",
}: {
  title: string;
  subtitle: string;
  meta?: string[];
  sections?: CaseSectionDef[];
  heroImageHint?: string;
}) {
  // Split sections so fullBleed ones can render edge-to-edge.
  const indexed = sections.map((s, i) => ({ ...s, __idx: i }));
  const regularSections = indexed.filter((s) => !s.fullBleed);
  const bleedSections = indexed.filter((s) => s.fullBleed);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 420px at 12% 10%, rgba(91,95,151,0.14), transparent 60%), radial-gradient(800px 420px at 88% 18%, rgba(154,106,168,0.14), transparent 58%)",
        }}
      />

      <Container>
        <div className="py-10 sm:py-14">
          <motion.div {...fade}>
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="accent">Case Study</Pill>
              <Pill tone="accent2">PM Narrative</Pill>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold" style={{ color: THEME.text }}>
              {title}
            </h1>
            <p className="mt-2 text-sm sm:text-base" style={{ color: THEME.muted }}>
              {subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {meta.map((m) => (
                <span
                  key={m}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ background: "rgba(31,41,55,0.06)", border: `1px solid ${THEME.line}`, color: THEME.text }}
                >
                  {m}
                </span>
              ))}
            </div>

            <div
              className="mt-8 aspect-[16/7] w-full rounded-3xl"
              style={{
                border: `1px dashed ${THEME.line}`,
                background:
                  "linear-gradient(135deg, rgba(31,41,55,0.06), rgba(255,255,255,0.35)), radial-gradient(circle at 20% 20%, rgba(91,95,151,0.16), transparent 60%)",
              }}
            >
              <div className="h-full w-full flex items-center justify-center text-center px-6">
                <div>
                  <div className="text-sm font-semibold" style={{ color: THEME.text }}>
                    Image placeholder
                  </div>
                  <div className="mt-1 text-xs" style={{ color: THEME.muted }}>
                    {heroImageHint}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="grid gap-0">
                {regularSections.map((s) => (
                  <CaseSection key={s.anchor} idx={(s as any).__idx} {...s} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div
                  className="rounded-3xl p-5"
                  style={{ background: "rgba(255,255,255,0.35)", border: `1px solid ${THEME.line}`, backdropFilter: "blur(10px)" }}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: THEME.muted }}>
                    At a glance
                  </div>
                  <div className="mt-4 grid gap-3 text-sm" style={{ color: THEME.text }}>
                    <div className="flex items-center justify-between">
                      <span style={{ color: THEME.muted }}>Role</span>
                      <span>PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: THEME.muted }}>Timeline</span>
                      <span>XX weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: THEME.muted }}>Team</span>
                      <span>Eng + Design + Data</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: THEME.muted }}>Scope</span>
                      <span>Feature / System</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: THEME.muted }}>
                      Jump to
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      {sections.map((s) => (
                        <button
                          key={s.anchor}
                          onClick={() =>
                            document.getElementById(s.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" })
                          }
                          className="text-left rounded-xl px-3 py-2 text-sm"
                          style={{ background: "rgba(31,41,55,0.06)", border: `1px solid ${THEME.line}`, color: THEME.text }}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button href="#/home" variant="secondary" icon={false}>
                      Back to home
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Full-bleed sections render outside Container so backgrounds span edge-to-edge. */}
      {bleedSections.map((s) => (
        <CaseSection
          key={(s as any).__idx}
          idx={(s as any).__idx}
          {...(s as any)}
        />
      ))}
    </div>
  );
}

function CaseSection({
  title,
  anchor,
  body,
  withImage = false,
  imageHint,
  idx = 0,
  tone,
  fullBleed = false,
}: CaseSectionDef & { idx?: number }) {
  const isTint = idx % 3 === 1;
  const isAlt = idx % 3 === 2;

  const solidMap: Record<string, string> = {
    "solid-mauve": "rgba(154,106,168,0.28)",
    "solid-cream": "rgba(233,228,215,0.55)",
  };

  const bg = tone
    ? solidMap[tone] || "transparent"
    : isTint
    ? "rgba(154,106,168,0.07)"
    : isAlt
    ? "rgba(91,95,151,0.06)"
    : "transparent";

  const useSplit = withImage && idx % 2 === 0;

  const content = (
    <div className={useSplit ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" : ""}>
      <div className={useSplit ? "lg:col-span-6" : ""}>
        <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: THEME.text }}>
          {title}
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: THEME.muted }}>
          {body}
        </p>
      </div>

      {withImage ? (
        <div className={useSplit ? "lg:col-span-6" : "mt-6"}>
          <div
            className="aspect-[16/9] w-full rounded-3xl"
            style={{
              border: `1px dashed ${THEME.line}`,
              background:
                "linear-gradient(135deg, rgba(31,41,55,0.06), rgba(255,255,255,0.35)), radial-gradient(circle at 70% 30%, rgba(154,106,168,0.14), transparent 55%)",
            }}
          >
            <div className="h-full w-full flex items-center justify-center text-center px-6">
              <div>
                <div className="text-sm font-semibold" style={{ color: THEME.text }}>
                  Image placeholder
                </div>
                <div className="mt-1 text-xs" style={{ color: THEME.muted }}>
                  {imageHint || "Add a chart, mock, flow, or screenshot"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

  // Full-bleed background across the viewport, with content constrained inside Container.
  if (fullBleed) {
    return (
      <section
        id={anchor}
        className="scroll-mt-28 py-10 sm:py-12"
        style={{ background: bg, borderTop: idx === 0 ? "none" : `1px solid ${THEME.line}` }}
      >
        <Container>{content}</Container>
      </section>
    );
  }

  return (
    <section
      id={anchor}
      className="scroll-mt-28 py-10 sm:py-12"
      style={{ background: bg, borderTop: idx === 0 ? "none" : `1px solid ${THEME.line}` }}
    >
      <Container>{content}</Container>
    </section>
  );
}

function ProjectA() {
  return (
    <CaseStudyLayout
      title="EV Energy Rewards — Enrollment & Incentives"
      subtitle="How I improved enrollment conversion while reducing churn by fixing blockers and scaling market expansion."
      meta={["Activation", "Retention", "Integrations", "Experimentation"]}
      sections={[
        {
          title: "Background",
          anchor: "background",
          tone: "solid-cream",
          body:
            "Ford’s EV Energy Rewards program connects drivers, utilities, and partners to enable incentive-driven charging. The challenge: expand to more markets while ensuring enrollment stays fast, trustworthy, and measurable.",
          withImage: true,
          imageHint: "Add program map: user → enrollment → partner → incentives",
        },
        {
          title: "Customer Problem",
          anchor: "problem",
          body:
            "Users dropped during enrollment due to unclear eligibility, connectivity failures, and address validation issues. These breakdowns created friction, reduced trust, and increased churn shortly after sign-up.",
        },
        {
          title: "Business Value",
          anchor: "value",
          tone: "solid-cream",
          body:
            "Improving conversion and reducing churn directly increased enrolled base (and downstream participation), reduced support load, and enabled faster market expansion through a repeatable, configurable enrollment system.",
        },
        {
          title: "Insights & Diagnosis",
          anchor: "insights",
          body:
            "I combined funnel analytics, support tickets, and partner telemetry to isolate the top drop-off drivers: step order confusion, missing state validation, and unreliable connectivity checks. The biggest lever was reducing failure states users couldn’t recover from.",
        },
        {
          title: "Solution Overview",
          anchor: "solution",
          tone: "solid-mauve",
          body:
            "I shipped a modular enrollment platform with clearer eligibility checks, better error recovery, and improved partner connectivity validation. In parallel, I integrated Chargescape API and launched an incentive dashboard to drive participation post-enrollment.",
          withImage: true,
          imageHint: "Add: before/after enrollment flow + incentive dashboard placeholder",
        },
        {
          title: "Experimentation & Rollout",
          anchor: "experiment",
          tone: "solid-cream",
          body:
            "I A/B tested copy and step order, monitored guardrails (support contacts, drop-off by error type), and rolled out iteratively across markets. I used partner telemetry to validate reliability before expanding coverage.",
        },
        {
          title: "Results",
          anchor: "results",
          body:
            "Outcome: conversion improved from 4% → 15%, market coverage tripled, and post-enrollment churn dropped 19%. The incentive dashboard reached 15% adoption in the first release cycle.",
          withImage: true,
          imageHint: "Add a simple before/after funnel + churn trend",
        },
        {
          title: "What I'd Do Next",
          anchor: "next",
          tone: "solid-mauve",
          fullBleed: true,
          body:
            "Next, I’d (1) reduce remaining friction with progressive disclosure and clearer eligibility checks, (2) increase ongoing engagement with milestone-based nudges, and (3) scale market expansion with self-serve configuration and stronger partner telemetry. I’d run follow-up experiments on copy, step order, and notification timing while tracking completion rate, churn, and downstream incentive participation.",
        },
      ]}
    />
  );
}

function ProjectB() {
  return (
    <CaseStudyLayout
      title="Bronco Overland Adventures — 0→1 Booking Platform"
      subtitle="Launching a new booking experience end-to-end and validating revenue with a customer-first rollout."
      meta={["0→1", "Discovery", "Monetization", "Delivery"]}
      heroImageHint="Add booking flow or marketplace layout"
      sections={[
        {
          title: "Background",
          anchor: "background",
          body:
            "Bronco Overland Adventures tested a new experience model: curated off-road adventures with booking and payments. The product needed a credible, branded journey from browsing → selection → booking.",
          withImage: true,
          imageHint: "Add: marketplace browse → checkout flow",
        },
        {
          title: "Customer Problem",
          anchor: "problem",
          body:
            "Early pilots had inconsistent discovery, unclear value, and limited trust signals. Users needed confidence in what they were buying and an easy way to evaluate and book experiences.",
        },
        {
          title: "Business Value",
          anchor: "value",
          tone: "solid-cream",
          body:
            "A streamlined booking flow and trust-building UX increased bookings and improved satisfaction, enabling revenue validation and a roadmap for scaling the offering.",
        },
        {
          title: "Constraints & Stakeholders",
          anchor: "constraints",
          body:
            "I aligned Product, Design, Legal, Ops, and Engineering around payment, policy, and operational readiness. Key constraints included brand consistency, partner fulfillment, and customer support readiness.",
        },
        {
          title: "Solution",
          anchor: "solution",
          tone: "solid-mauve",
          body:
            "I delivered the core booking platform and led V2 improvements, including a review system and a rebrand aligned with Ford’s design system to strengthen trust and consistency.",
          withImage: true,
          imageHint: "Add: reviews component + branded layout placeholder",
        },
        {
          title: "Results",
          anchor: "results",
          body:
            "The pilot generated $104K in revenue in 3 months with 90% CSAT. Customer feedback highlighted clarity of itinerary and ease of booking as key drivers.",
          withImage: true,
          imageHint: "Add: revenue trend + CSAT snapshot",
        },
      ]}
    />
  );
}

function ProjectC() {
  return (
    <CaseStudyLayout
      title="Ford.com + EV Routing — Experience Optimization"
      subtitle="Improving satisfaction and accuracy at scale through research-led iteration and test-driven delivery."
      meta={["Experimentation", "UX", "Scale", "Quality"]}
      heroImageHint="Add homepage experiment or routing accuracy dashboard"
      sections={[
        {
          title: "Background",
          anchor: "background",
          body:
            "Two high-scale surfaces shaped the customer experience: Ford.com (high-traffic discovery) and EV routing (in-journey reliability). Both needed iterative improvements grounded in user pain points.",
        },
        {
          title: "Customer Problem",
          anchor: "problem",
          tone: "solid-mauve",
          body:
            "Homepage users struggled to find relevant paths quickly, while EV drivers experienced routing edge cases that reduced confidence on longer trips.",
          withImage: true,
          imageHint: "Add: annotated homepage + edge-case routing examples",
        },
        {
          title: "Business Value",
          anchor: "value",
          tone: "solid-cream",
          body:
            "Better discovery and higher routing accuracy improved CSAT, reduced friction in the purchase/ownership journey, and supported long-term trust in Ford’s EV ecosystem.",
        },
        {
          title: "Approach",
          anchor: "approach",
          body:
            "I used a loop of discovery → hypothesis → test → ship: user research and analytics informed A/B tests on the homepage, while systematic edge-case testing and partner collaboration improved routing accuracy.",
        },
        {
          title: "Results",
          anchor: "results",
          body:
            "Homepage improvements contributed to a 15% CSAT lift. Routing accuracy improved to 95% for 80K+ Mach-Es, with the work featured at CES 2024.",
          withImage: true,
          imageHint: "Add: CSAT chart + routing accuracy trend",
        },
      ]}
    />
  );
}

function NotFound() {
  return (
    <Container>
      <div className="py-16">
        <Card>
          <h1 className="text-2xl font-semibold" style={{ color: THEME.text }}>
            Page not found
          </h1>
          <p className="mt-2 text-sm" style={{ color: THEME.muted }}>
            Use the navigation to go back.
          </p>
          <div className="mt-5">
            <Button href="#/home" variant="primary" icon={false}>
              Back to home
            </Button>
          </div>
        </Card>
      </div>
    </Container>
  );
}

function buildGrainDataUrl() {
  // Avoid backslash-escaped strings in TSX (prevents \uXXXX parse issues in some bundlers)
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">` +
    `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter>` +
    `<rect width="180" height="180" filter="url(#n)" opacity="0.45"/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// Minimal runtime sanity checks
function devAssert(condition: boolean, message: string) {
  if (!condition && typeof console !== "undefined") {
    // eslint-disable-next-line no-console
    console.error(`Assertion failed: ${message}`);
  }
}

devAssert(EMAIL_TO.includes("@"), "EMAIL_TO should be a valid email");
devAssert(LINKEDIN_URL.startsWith("https://"), "LINKEDIN_URL should be https://...");

actionCheck();
function actionCheck() {
  devAssert(typeof RESUME_URL === "string", "RESUME_URL should be a string");
}

export default function PortfolioApp() {
  const [route, navigate] = useHashRoute();

  const cleanRoute = React.useMemo(() => {
    const r = route.split("#")[0];
    return r || "/home";
  }, [route]);

  const Page = React.useMemo(() => {
    if (cleanRoute === "/home") return <HomePage />;
    if (cleanRoute === "/projects/project-a") return <ProjectA />;
    if (cleanRoute === "/projects/project-b") return <ProjectB />;
    if (cleanRoute === "/projects/project-c") return <ProjectC />;
    return <NotFound />;
  }, [cleanRoute]);

  const grain = React.useMemo(() => buildGrainDataUrl(), []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(180deg, ${THEME.bg} 0%, ${THEME.bg2} 120%)`,
        color: THEME.text,
      }}
    >
      <NavBar onNavigate={navigate} />

      <main>{Page}</main>

      <Footer />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{ backgroundImage: grain, mixBlendMode: "multiply" }}
      />
    </div>
  );
}

