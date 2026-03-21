import Navbar from "@/components/Navbar";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-12">
        <Blog />
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
