import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Create Professional Invoices
          <span className="block text-primary mt-2">In Minutes</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Streamline your billing process with Quid Invoice Generator. Create,
          manage, and track invoices effortlessly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg" className="text-lg px-8">
              Get Started Free
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Why Choose Quid?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Fast & Easy</CardTitle>
              <CardDescription>
                Create invoices in seconds with our intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No complicated setup. Just sign in with Google and start
                creating professional invoices immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Templates</CardTitle>
              <CardDescription>
                Beautiful, customizable invoice designs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your invoices will look polished and professional, making a
                great impression on your clients.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Track Everything</CardTitle>
              <CardDescription>
                Manage all your invoices in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Keep track of all your invoices, view history, and download PDFs
                anytime you need them.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto bg-card border-border">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of professionals who trust Quid for their invoicing
              needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button size="lg" className="text-lg px-12">
                Sign In with Google
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
