import BlogSlider from "../sections/blogSlider/blogSlider";
import CategoryBanner from "../sections/categoryTemplate/categoryBanner/categoryBanner";
import CategoryWhy from "../sections/categoryTemplate/categoryWhy/categoryWhy";
import CategoryHero from "../sections/categoryTemplate/hero/categoryHero";
import Strategy from "../sections/categoryTemplate/strategy/strategy";
import InvolvedBox from "../sections/involvedBox/involvedBox";

const CategoryTemplate = ({ type }) => {
  return (
    <div>
      <CategoryHero type={type} />

      <CategoryBanner type={type} />

      <CategoryWhy type={type} />

      <BlogSlider />

      <Strategy />

      <InvolvedBox />
    </div>
  );
};

export default CategoryTemplate;
