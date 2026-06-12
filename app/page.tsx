import Hero from './components/Hero';
import FoodCategories from './components/FoodCategories';
import FeaturedFoods from './components/FeaturedFoods';

export default function Home() {
  return (
    <div>
      <Hero />
      <FoodCategories />
      <FeaturedFoods />
    </div>
  );
}