import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Ecosystem from "@/components/Ecosystem";
import Hobbies from "@/components/Hobbies";
import Press from "@/components/Press";
import Activities from "@/components/Activities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Ecosystem />
      <Hobbies />
      <Press />
      <Activities />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
