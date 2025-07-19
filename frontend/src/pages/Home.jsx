import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import Subscribe from "../components/Subscribe";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonials />
      <Subscribe />
    </div>
  );
};

export default Home;
