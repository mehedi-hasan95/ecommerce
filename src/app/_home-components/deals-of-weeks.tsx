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
export const DealsOfWeeks = () => {
  return (
    <div className="relative max-w-screen-2xl mx-auto px-6 py-10 md:py-12 lg:py-16">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
        Search by Brand
      </h2>
      <Carousel className="w-full pt-8">
        <CarouselContent>
          <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5">
            <div className="p-1">
              <Card>
                <CardContent className="p-0">
                  <SingleProduct />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
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
