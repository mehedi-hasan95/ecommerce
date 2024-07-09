import { cn } from "@/lib/utils"; // Adjust the path to your utility function
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const filledStars = Math.round(rating);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((_, idx) => (
        <Star
          key={idx}
          className={cn("w-5 h-5", {
            "text-yellow-400": idx < filledStars,
            "text-gray-300": idx >= filledStars,
          })}
          fill="currentColor"
        />
      ))}
    </div>
  );
};

export default StarRating;
