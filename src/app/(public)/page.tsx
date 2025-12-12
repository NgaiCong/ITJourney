import Hero from "@/components/landing/Hero";
import Manifesto from "@/components/landing/Manifesto";
import Roadmap from "@/components/landing/Roadmap";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <Roadmap />
      <Manifesto />
    </main>
  );
}

