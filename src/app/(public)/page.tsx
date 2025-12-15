
import Hero from "@/components/landing/Hero";
import ScrollStory from "@/components/landing/ScrollStory";
import Manifesto from "@/components/landing/Manifesto";
import Community from "@/components/landing/Community";
import Introduction from "@/components/landing/Introduction";




export default function Home() {
  return (
    <main className="min-h-screen bg-black text-foreground">

      <Hero />
      <ScrollStory />

      <Introduction />


      <Community />
      <Manifesto />
    </main>
  );
}

