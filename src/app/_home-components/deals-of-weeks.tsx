import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/components/ui/carousel";
import { SingleProduct } from "./single-product";
import { AllProductsAction } from "@/actions/seller/product-action";

export const DealsOfWeeks = async () => {
  const products = await AllProductsAction();
  return (
    <div className="relative max-w-screen-2xl mx-auto px-6 py-10 md:py-12 lg:py-16">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
        Deals of Week
      </h2>
      <Carousel className="w-full pt-8">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              key={product.id}
            >
              <div className="p-1">
                <Card>
                  <CardContent className="p-0">
                    <SingleProduct
                      data={product}
                      likes={product.addToWishList}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -top-4 right-10">
          <CarouselPrevious className="-left-6" />
          <CarouselNext className="bg-themeTwo text-white hover:bg-themeTwo" />
        </div>
        <CarouselProgress
          progressBg="absolute top-2"
          progressBar="bg-themeTwo"
        />
      </Carousel>
    </div>
  );
};
