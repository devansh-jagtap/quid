"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Clock,
  FileText,
  Globe,
  Sparkles,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      {/* ───────── HERO ───────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG image */}
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.jpg')", backgroundAttachment: "fixed" }}
        />

        {/* Overlays — adapt to theme */}
        <div className="absolute inset-0 z-[1] bg-background/50 dark:bg-background/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/30 to-background" />

        {/* Content */}
        <div className="relative z-10 px-6 max-w-5xl w-full mx-auto flex flex-col items-center text-center pt-32 pb-20">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-lg text-xs font-semibold text-muted-foreground tracking-wide mb-10 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Modern invoicing for modern teams
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-8"
          >
            Invoicing made
            <br />
            <span className="text-primary italic">effortless.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-14 leading-relaxed"
          >
            Create, manage, and track professional invoices in seconds.
            Beautiful outputs, smart analytics, and zero complexity.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link href="/login">
              <Button
                size="lg"
                className="h-14 px-10 rounded-full text-base font-semibold gap-2 shadow-lg hover:shadow-xl transition-all group bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-10 rounded-full text-base font-semibold border-border/50 hover:bg-muted/60 transition-all"
              >
                View Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating stats — bottom right */}
        <div className="absolute bottom-10 right-10 hidden lg:flex flex-col gap-5 text-right z-10">
          {[
            { label: "Uptime", value: "99.99%" },
            { label: "Invoices sent", value: "1M+" },
            { label: "Countries", value: "120+" },
          ].map((s, i) => (
            <motion.div
              key={i}
              custom={5 + i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-semibold">
                {s.label}
              </p>
              <p className="text-sm font-serif text-foreground/80">{s.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── FEATURES ───────── */}
      <section id="features" className="py-28 md:py-36 px-6 bg-muted/30 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-2xl mx-auto"
          >
            <span className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
              Features
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6">
              Everything you need
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A streamlined toolkit that handles the entire lifecycle of your invoicing — from creation to payment tracking.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Lightning Fast",
                desc: "Generate fully formatted invoices in under a minute with our streamlined editor.",
                color: "text-amber-500 dark:text-amber-400",
                bg: "bg-amber-500/10",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Secure Storage",
                desc: "Your financial data is encrypted end-to-end. Access it anytime, from anywhere.",
                color: "text-emerald-500 dark:text-emerald-400",
                bg: "bg-emerald-500/10",
              },
              {
                icon: <BarChart3 className="h-5 w-5" />,
                title: "Smart Analytics",
                desc: "Get powerful insights into earnings, pending payments, and growth trends.",
                color: "text-blue-500 dark:text-blue-400",
                bg: "bg-blue-500/10",
              },
              {
                icon: <Clock className="h-5 w-5" />,
                title: "Time Saving",
                desc: "Automate recurring invoices, reminders, and follow-ups effortlessly.",
                color: "text-violet-500 dark:text-violet-400",
                bg: "bg-violet-500/10",
              },
              {
                icon: <FileText className="h-5 w-5" />,
                title: "PDF Export",
                desc: "Download crisp, print-ready PDF invoices that leave a professional impression.",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                icon: <Globe className="h-5 w-5" />,
                title: "Work Anywhere",
                desc: "Fully responsive design — manage billing from laptop, tablet, or phone.",
                color: "text-rose-500 dark:text-rose-400",
                bg: "bg-rose-500/10",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-border/50 bg-card p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-5 ${f.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 tracking-tight">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PRODUCT SHOWCASE ───────── */}
      <section id="product" className="py-28 md:py-36 px-6 bg-background relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-primary/8 dark:bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-blue-500/8 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <span className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
                The Product
              </span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight">
                See your business <br />
                at a glance.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-sm text-muted-foreground text-sm leading-relaxed"
            >
              A unified dashboard that gives you real-time visibility into revenue, outstanding payments, and client activity.
            </motion.p>
          </div>

          {/* Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-border/60 bg-card shadow-xl overflow-hidden"
          >
            {/* Window bar */}
            <div className="flex items-center px-5 py-3.5 border-b border-border/40 bg-muted/40">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
              </div>
              <div className="mx-auto px-4 py-1 rounded-md bg-muted/60 border border-border/30 text-[11px] text-muted-foreground font-mono">
                quid.app/dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 md:p-10 space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue", val: "$42,850", trend: "+12.5%", up: true },
                  { label: "Pending", val: "$3,120", trend: "-5.2%", up: false },
                  { label: "Paid Rate", val: "92%", trend: "+2.1%", up: true },
                  { label: "Clients", val: "148", trend: "+8.4%", up: true },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="rounded-2xl bg-muted/40 border border-border/30 p-5"
                  >
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold tracking-tight">{stat.val}</p>
                    <p
                      className={`text-xs font-semibold mt-1 ${
                        stat.up ? "text-emerald-500" : "text-red-400"
                      }`}
                    >
                      {stat.trend}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="rounded-2xl bg-muted/30 border border-border/30 h-52 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
                <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                  <BarChart3 className="h-8 w-8" />
                  <span className="text-xs font-mono">Revenue Analytics</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────── WHY QUID ───────── */}
      <section id="about" className="py-28 md:py-36 px-6 bg-muted/20 border-t border-border/30">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
              Why Quid
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-6">
              Built for people <br />
              who value craft.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              We built Quid because financial tools shouldn't look like they were designed in 2005.
              Your workflow deserves software that's modern, fast, and beautiful.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {[
              {
                num: "01",
                title: "Elegant Simplicity",
                text: "No bloat, no learning curve. Create your first invoice in under 60 seconds.",
              },
              {
                num: "02",
                title: "Real-time Insights",
                text: "Track payments, spot trends, and understand your cash flow at a glance.",
              },
              {
                num: "03",
                title: "Privacy First",
                text: "Your data is yours. End-to-end encrypted and never shared with third parties.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border-t border-border/50 pt-7"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono text-muted-foreground/40">{item.num}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="py-28 md:py-40 px-6 bg-background flex flex-col items-center text-center border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6 leading-tight">
            Ready to transform <br />
            your billing?
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Join thousands of freelancers and agencies who trust Quid to get paid faster.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="h-16 px-14 rounded-full text-base font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Started — It&apos;s Free
            </Button>
          </Link>
          <p className="mt-8 text-muted-foreground/50 text-xs font-medium flex items-center justify-center gap-4">
            <span className="flex items-center gap-1"><Check className="h-3 w-3" /> No credit card</span>
            <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Cancel anytime</span>
            <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Free forever plan</span>
          </p>
        </motion.div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="py-12 px-6 border-t border-border/30 bg-muted/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold tracking-tight">Quid</span>
          </div>

          <div className="flex gap-8 text-muted-foreground text-xs font-medium">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>

          <p className="text-muted-foreground/50 text-xs">
            © {new Date().getFullYear()} Quid. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
