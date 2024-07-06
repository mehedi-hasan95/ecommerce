"use client";

import { switchLikes } from "@/actions/user/wishlist-action";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useOptimistic, useState } from "react";
import { toast } from "sonner";

export const WishListButton = ({
  postId,
  likes,
}: {
  postId: string;
  likes: string[];
}) => {
  const { userId } = useAuth();
  const [likeState, setLikeState] = useState({
    isLiked: userId ? likes.includes(userId) : false,
  });
  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return { isLiked: !state.isLiked };
    }
  );
  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLikes(postId).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
      });
      setLikeState((state) => ({ isLiked: !state.isLiked }));
    } catch (error) {}
  };
  return (
    <form action={likeAction}>
      <button>
        <Heart
          className={cn(
            "size-5 text-rose-500",
            optimisticLike.isLiked && "fill-rose-500"
          )}
        />
      </button>
    </form>
  );
};
