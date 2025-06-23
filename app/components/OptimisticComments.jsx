"use client";

import { useActionState, useOptimistic, useState, useTransition } from "react";
import { fakeAddComment } from "../actions";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

export default function CommentForm() {
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (prev, newComment) => [newComment, ...prev]
  );

  const [state, formAction] = useActionState(async (_, formData) => {
    const comment = formData.get("comment")?.trim();
    if (!comment) return { error: "Comment required" };

    // Optimistically add
    addOptimisticComment({ text: comment });

    const result = await fakeAddComment(_, formData);
    if (result?.comment) {
      setComments((prev) => [{ text: result.comment }, ...prev]);
    }
    return result;
  }, {});

  const [isPending, startTransition] = useTransition();

  return (
    <div className="max-w-md mx-auto space-y-4 mt-8">
      <form action={formAction} className="space-y-2">
        <CommentInput />
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </form>

      <button
        className="bg-emerald-600 px-4 py-1 text-sm rounded"
        onClick={() => {
          startTransition(() => {
            setComments((prev) => [
              ...prev,
              { text: "Loaded comment from DB..." },
            ]);
          });
        }}
      >
        {isPending ? "Loading..." : "Load More"}
      </button>

      <CommentList comments={optimisticComments} />
    </div>
  );
}
