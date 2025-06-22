"use client";

import { useActionState, useOptimistic, useState } from "react";
import { addComment } from "../actions";
import CommentList from "./CommentList";

export default function OptimisticComments() {
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, newComment) => [newComment, ...currentComments]
  );

  const [state, formAction] = useActionState(async (prevState, formData) => {
    const comment = formData.get("comment")?.toString().trim();
    if (!comment) return { error: "Comment required" };

    // Optimistic update
    addOptimisticComment({ text: comment });

    const result = await addComment(prevState, formData);

    if (result?.comment) {
      setComments((prev) => [{ text: result.comment }, ...prev]);
    }

    return result;
  }, {});

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <form action={formAction} className="flex gap-2">
        <input
          name="comment"
          placeholder="Write a comment..."
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

      <CommentList comments={optimisticComments} />
    </div>
  );
}
