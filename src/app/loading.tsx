import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-2xl px-6 mx-auto">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-4">
          <Skeleton className="h-52 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
