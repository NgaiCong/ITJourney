import Hero from "@/components/landing/Hero";
import Manifesto from "@/components/landing/Manifesto";
import Community from "@/components/landing/Community";
import Introduction from "@/components/landing/Introduction";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-foreground overflow-x-hidden">
      <Hero />
      <Introduction />
      <Community />
      <Manifesto />
    </main>
  );
}

