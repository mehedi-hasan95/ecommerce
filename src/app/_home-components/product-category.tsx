import { AllCategoryAction } from "@/actions/admin/category-aciton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/components/ui/carousel";
import Image from "next/image";

export const ProductCategory = async () => {
  const categories = await AllCategoryAction();
  return (
    <div className="relative max-w-screen-2xl mx-auto px-6 py-10 md:py-12 lg:py-16">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
        Search by Category
      </h2>
      <Carousel className="w-full pt-8">
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/4 lg:basis-1/6"
              key={category.id}
            >
              <div className="p-1">
                <Card>
                  <CardContent
                    className="flex aspect-square items-center justify-center p-6"
                    style={{ backgroundColor: category.color || "#F7F7F7" }}
                  >
                    <div className="flex flex-col gap-y-2 items-center">
                      <Image
                        src={category.img}
                        alt={category.name}
                        height={100}
                        width={100}
                      />
                      <p>{category.name}</p>
                    </div>
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
