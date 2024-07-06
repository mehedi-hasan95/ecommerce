import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ProductImage } from "@prisma/client";
import Image from "next/image";
interface ImageTabsProops {
  images: ProductImage[];
}
export const ImageTabs = ({ images }: ImageTabsProops) => {
  return (
    <Tabs defaultValue={images[0]?.url} className="w-[400px]">
      {/* Full Image  */}
      {images.map((item) => (
        <TabsContent key={item.id} value={item.url}>
          <Image
            src={item.url}
            alt=""
            height={500}
            width={500}
            className="w-full"
          />
        </TabsContent>
      ))}
      {/* end  */}
      {/* TabList  */}
      <TabsList className={cn("mt-8 bg-inherit")}>
        {images.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.url}
            className={cn(
              "data-[state=active]:border-green-700 data-[state=active]:border-2 data-[state=active]:box-border"
            )}
          >
            <Image
              src={item.url}
              alt=""
              height={500}
              width={500}
              className="h-10 w-10"
            />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
