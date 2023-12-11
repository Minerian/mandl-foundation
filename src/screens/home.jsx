import Hero from "../sections/home/hero/hero";
import Logos from "../sections/home/logos/logos";
import Slider from "../sections/home/slider/slider";

import Logo1 from "../assets/logos/logo1.svg";
import Logo2 from "../assets/logos/logo2.svg";
import Logo3 from "../assets/logos/logo3.svg";
import Logo4 from "../assets/logos/logo4.svg";
import Logo5 from "../assets/logos/logo5.svg";
import Logo6 from "../assets/logos/logo6.svg";
import Logo7 from "../assets/logos/logo7.svg";
import Logo8 from "../assets/logos/logo8.svg";
import What from "../sections/home/what/what";
import About from "../sections/home/about/about";
import BlogSlider from "../sections/blogSlider/blogSlider";
import InvolvedBox from "../sections/involvedBox/involvedBox";

const content1 = [Logo1, Logo2, Logo3, Logo4];
const content2 = [Logo5, Logo6, Logo7, Logo8];

const Home = () => {
  return (
    <div>
      <Hero />
      <Slider />
      <Logos title={"Recent partners"} list={content1} />
      <What />
      <About />
      <Logos title={"Media about us"} list={content2} />

      <BlogSlider />

      <InvolvedBox />
    </div>
  );
};

export default Home;
