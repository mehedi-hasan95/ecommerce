"use client";

import { switchLikes } from "@/actions/user/wishlist-action";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";

export const WishListButton = ({
  postId,
  likes,
}: {
  postId: string;
  likes: string[];
}) => {
  const { userId } = useAuth();
  const [isPending, startTransaction] = useTransition();
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
    startTransaction(() => {
      switchOptimisticLike("");
      try {
        switchLikes(postId);
        setLikeState((state) => ({ isLiked: !state.isLiked }));
      } catch (error) {}
    });
  };
  return (
    <>
      {userId ? (
        <button onClick={likeAction}>
          <Heart
            className={cn(
              "size-5 text-rose-500",
              optimisticLike.isLiked && "fill-rose-500"
            )}
          />
        </button>
      ) : (
        <button
          onClick={() =>
            toast("Please login first", {
              action: { label: "Error", onClick: () => console.log("Error") },
            })
          }
        >
          <Heart
            className={cn(
              "size-5 text-rose-500",
              optimisticLike.isLiked && "fill-rose-500"
            )}
          />
        </button>
      )}
    </>
  );
};
