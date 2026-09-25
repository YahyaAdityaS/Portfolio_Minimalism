import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates";
import { ServicesExperience } from "@/components/ServicesExperience";
import { Education } from "@/components/Education";
import { ClientRatings } from "@/components/ClientRatings";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-zinc-900 dark:text-zinc-50">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div id="work">
          <Projects />
        </div>
        <div id="certificates">
          <Certificates />
        </div>
        <div id="services">
          <ServicesExperience />
        </div>
        <div id="education">
          <Education />
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
