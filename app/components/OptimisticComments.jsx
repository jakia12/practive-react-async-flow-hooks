"use client";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import CommentList from "./CommentList";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-purple-600 text-white px-4 py-2 rounded-md w-full"
    >
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

export default function OptimisticComments() {
  const [comments, setComments] = useState([]);
  const [shouldAdd, setShouldAdd] = useState(null);

  // ⬇️ Handles client-only update
  useEffect(() => {
    if (shouldAdd) {
      setComments((prev) => [shouldAdd, ...prev]);
    }
  }, [shouldAdd]);

  const [state, formAction] = useActionState(async (prev, formData) => {
    const comment = formData.get("comment")?.toString().trim() || "";
    if (!comment) return { error: "Comment required" };

    return { message: "Comment added!", comment };
  }, {});

  // ⬇️ Extract the comment after submission
  useEffect(() => {
    if (state?.comment) {
      setShouldAdd({ text: state.comment });
    }
  }, [state]);

  return (
    <div className="bg-white p-6 max-w-xl mx-auto rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
      <form action={formAction} className="space-y-3">
        <input
          name="comment"
          placeholder="Say something..."
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-black"
        />
        <SubmitButton />
      </form>

      {state?.error && (
        <p className="text-sm text-red-500 font-medium">{state.error}</p>
      )}

      <CommentList comments={comments} />
    </div>
  );
}
