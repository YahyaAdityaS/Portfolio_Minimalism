import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SelectedWorks } from "@/components/SelectedWorks";
import { Certificates } from "@/components/Certificates";
import { ServicesExperience } from "@/components/ServicesExperience";
import { ClientRatings } from "@/components/ClientRatings";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div id="work">
          <SelectedWorks />
        </div>
        <div id="certificates">
          <Certificates />
        </div>
        <div id="services">
          <ServicesExperience />
        </div>
        <div id="testimonials">
          <ClientRatings />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
