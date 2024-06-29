import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import sliders from "./slider-details.json";
import Image from "next/image";
import Link from "next/link";

export const HeroSlider = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      autoplay
      autoplayDelay={3000}
    >
      <CarouselContent>
        {sliders.map((item) => (
          <CarouselItem style={{ backgroundColor: `${item.bg}` }} key={item.id}>
            <div className="grid grid-cols-5 mx-auto gap-x-10 px-6 max-w-screen-2xl items-center relative pt-10">
              <div className="col-span-3 space-y-3">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-themeTwo">
                  {item.heading1}
                </h2>
                <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl">
                  {item.heading2}
                </h1>
                <p className="font-medium text-xl">{item.heading3}</p>
                <div className="pt-10">
                  <Link
                    href={"#"}
                    className="bg-themeTwo rounded-full px-6 py-2.5 max-w-max text-white text-sm"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="col-span-2">
                <Image
                  src={item.img}
                  alt=""
                  sizes="100vh"
                  height={0}
                  width={0}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="h-3 w-3" activeDots="bg-orange-600" />
    </Carousel>
  );
};
