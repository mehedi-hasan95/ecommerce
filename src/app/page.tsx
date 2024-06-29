import Image from "next/image";
import { HeroSlider } from "./_home-components/hero-slider";
import { ProductCategory } from "./_home-components/product-category";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <ProductCategory />
    </main>
  );
}
