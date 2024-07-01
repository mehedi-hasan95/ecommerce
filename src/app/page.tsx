import { HeroSlider } from "./_home-components/hero-slider";
import { ProductCategory } from "./_home-components/product-category";
import { AllBrandAction } from "@/actions/admin/brand-aciton";
import { Suspense } from "react";
import { ProductBrand } from "./_home-components/product-brand";
import { FituredProduct } from "./_home-components/fitured-product";
import { DealsOfWeeks } from "./_home-components/deals-of-weeks";

export default async function Home() {
  const brands = AllBrandAction();
  return (
    <main>
      <HeroSlider />
      <ProductCategory />
      <FituredProduct />
      <DealsOfWeeks />
      <Suspense fallback={<p>Loading...</p>}>
        <ProductBrand brands={brands} />
      </Suspense>
    </main>
  );
}
