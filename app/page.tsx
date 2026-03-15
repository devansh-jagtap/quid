import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  BarChart,
  Clock,
  CheckCircle2,
  Globe,
  Sparkles
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 flex flex-col">

      {/* HERO SECTION - Explicitly constraining background image here */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-border/40">
        {/* Background Image restricted to Hero */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{ backgroundImage: "url('/bg.jpg')", backgroundAttachment: "fixed" }}
        />
        {/* Deep glass overlay to blur background and make hero text pop */}
        <div className="absolute inset-0 z-0 bg-background/30 dark:bg-background/60 backdrop-blur-[2px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-0" />

        {/* Ambient Hero Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none opacity-50 dark:opacity-30" />

        <div className="relative z-10 px-4 py-32 md:py-48 max-w-7xl w-full mx-auto flex flex-col items-center text-center">
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background/40 backdrop-blur-xl border border-border/50 text-sm font-medium mb-12 hover:bg-background/60 transition-colors shadow-sm">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-bold">Quid 2.0 is now live</span>
          </div> */}

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-foreground mb-8 max-w-5xl leading-[1.1]">
            Invoicing made{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-blue-500 to-primary/50 bg-300%">
              effortless
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed font-medium">
            Create, manage, and track professional invoices in seconds. Focus on your business, not your billing software.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center z-10">
            {/* Acernity style glowing button */}
            <Link href="/login" className="w-full sm:w-auto overflow-hidden rounded-full p-[2px] relative group">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-background group-hover:bg-transparent transition-colors duration-500 rounded-full h-14 flex items-center justify-center px-10">
                <span className="text-lg font-bold group-hover:text-white transition-colors">Start for Free</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-10 border-2 border-border/50 hover:bg-muted hover:border-border transition-all rounded-full backdrop-blur-sm shadow-sm font-semibold">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of features */}
      <section id="features" className="px-4 py-32 relative bg-background border-b border-border/20">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3 bg-primary/10 inline-block px-4 py-1.5 rounded-full">Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-foreground">Everything you need</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              title="Lightning Fast"
              description="Generate fully formatted invoices in under a minute with our streamlined editor."
              gradient="from-yellow-500/20"
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6 text-emerald-500" />}
              title="Secure Storage"
              description="Your financial data is encrypted and securely stored. Access it anytime, anywhere."
              gradient="from-emerald-500/20"
            />
            <FeatureCard
              icon={<BarChart className="h-6 w-6 text-blue-500" />}
              title="Analytics"
              description="Get powerful insights into your earnings, pending payments, and client history."
              gradient="from-blue-500/20"
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-purple-500" />}
              title="Time Saving"
              description="Automate repetitive tasks so you can get back to doing what you love."
              gradient="from-purple-500/20"
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6 text-primary" />}
              title="Professional Output"
              description="Download crisp, print-ready PDF invoices that make a great impression."
              gradient="from-primary/20"
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-pink-500" />}
              title="Work Anywhere"
              description="Our dashboard is fully responsive. Manage billing from your laptop, tablet, or phone."
              gradient="from-pink-500/20"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section (HIDDEN)
      <section id="pricing" className="px-4 py-32 relative bg-muted/30 border-b border-border/20">
        ... (pricing code suppressed) ...
      </section>
      */}

      {/* CTA Section */}
      <section className="px-4 py-32 relative bg-background flex text-center justify-center">
        <div className="max-w-5xl w-full">
          {/* Very modern glowing container */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

            <div className="rounded-3xl border border-border bg-card p-12 md:p-20 relative overflow-hidden flex flex-col items-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

              <h2 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
                Ready to transform your billing?
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Join thousands of freelancers and agencies who trust Quid to get paid faster.
              </p>
              <Link href="/login">
                <Button size="lg" className="text-xl h-16 w-64 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform duration-300 bg-primary text-primary-foreground hover:bg-primary/90">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-muted/20 border-t border-border/40 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <div className="text-2xl font-black tracking-tight text-foreground">
                Quid <span className="text-muted-foreground font-medium">Invoice</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-muted-foreground">
              <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
              {/* <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link> */}
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/20 text-sm font-medium text-muted-foreground">
            <p>© {new Date().getFullYear()} Quid. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed elegantly down to the pixel.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode, title: string, description: string, gradient: string }) {
  return (
    <Card className="bg-card border border-border/50 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-white/5">
      {/* Animated corner gradient spot */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      <CardHeader className="p-8 pb-4">
        <div className="w-14 h-14 rounded-2xl bg-muted border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <CardDescription className="text-base text-muted-foreground/80 font-medium leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

