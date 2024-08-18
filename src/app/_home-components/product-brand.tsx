import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/components/ui/carousel";
import { Brand } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  brands: Promise<Brand[]>;
}
export const ProductBrand = async ({ brands }: Props) => {
  const data = await brands;

  return (
    <div className="relative max-w-screen-2xl mx-auto px-6 py-4 md:py-6 lg:py-10">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
        Search by Brand
      </h2>
      <Carousel className="w-full pt-8">
        <CarouselContent>
          {data.map((item) => (
            <Link href={`/brands/${item.id}`} key={item.id}>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="flex flex-col gap-y-2 items-center">
                        <Image
                          src={item.img}
                          alt={item.name}
                          height={100}
                          width={100}
                          style={{ height: "auto", width: "auto" }}
                        />
                        <p>{item.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </Link>
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
