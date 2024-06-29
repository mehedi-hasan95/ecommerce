import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/components/ui/carousel";

export const ProductCategory = () => {
  return (
    <div className="relative max-w-screen-2xl mx-auto px-6 py-4">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
        Search by Category
      </h2>
      <Carousel className="w-full pt-10">
        <CarouselContent>
          {Array.from({ length: 9 }).map((_, index) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/4 lg:basis-1/6"
              key={index}
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex h-20 w-20 items-center justify-center p-6">
                    <span className="text-4xl font-semibold">Mehedi</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselProgress progressBg="absolute top-0" />
      </Carousel>
    </div>
  );
};
