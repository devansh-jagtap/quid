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
  Globe
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -mr-[400px] -mt-[400px] w-[800px] h-[800px] rounded-full bg-primary/20 blur-[120px] pointer-events-none opacity-50 dark:opacity-20" />
      <div className="absolute bottom-0 left-0 -ml-[400px] -mb-[400px] w-[800px] h-[800px] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none opacity-50 dark:opacity-20" />

      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-20 md:pt-48 md:pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/80 border border-border text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          Quid 2.0 is now live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl">
          Invoicing made{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            effortless
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          Create, manage, and track professional invoices in seconds. Focus on your business, not your billing.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center z-10">
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all rounded-xl">
              Start for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-2 border-border hover:bg-muted transition-all rounded-xl backdrop-blur-sm">
              View Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Grid of features */}
      <section id="features" className="px-4 py-24 relative z-10 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Capabilities</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground">Everything you need</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              title="Lightning Fast"
              description="Generate fully formatted invoices in under a minute with our streamlined editor."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6 text-emerald-500" />}
              title="Secure Storage"
              description="Your financial data is encrypted and securely stored. Access it anytime, anywhere."
            />
            <FeatureCard 
              icon={<BarChart className="h-6 w-6 text-blue-500" />}
              title="Analytics"
              description="Get powerful insights into your earnings, pending payments, and client history."
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6 text-purple-500" />}
              title="Time Saving"
              description="Automate repetitive tasks so you can get back to doing what you love."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="h-6 w-6 text-primary" />}
              title="Professional Output"
              description="Download crisp, print-ready PDF invoices that make a great impression."
            />
            <FeatureCard 
              icon={<Globe className="h-6 w-6 text-pink-500" />}
              title="Work Anywhere"
              description="Our dashboard is fully responsive. Manage billing from your laptop, tablet, or phone."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-32 relative z-10 flex text-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="rounded-3xl border border-border bg-card/50 backdrop-blur-md p-10 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 pointer-events-none" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of freelancers, agencies, and small businesses who trust Quid for their invoicing needs.
            </p>
            <Link href="/login">
              <Button size="lg" className="text-xl h-16 px-12 shadow-primary/30 shadow-xl rounded-full hover:scale-105 transition-transform duration-300">
                Sign In with Google
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-card/40 backdrop-blur-sm border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md group">
      <CardHeader>
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
