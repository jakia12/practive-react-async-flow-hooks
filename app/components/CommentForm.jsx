"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { addComment } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition"
    >
      {pending ? "Submitting..." : "Submit Comment"}
    </button>
  );
}

export default function CommentForm() {
  const [state, formAction] = useActionState(addComment, {});

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto space-y-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">Leave a Comment</h2>
      <form action={formAction} className="space-y-3">
        <div className="relative">
          <textarea
            name="comment"
            id="comment"
            rows="4"
            className="w-full border border-blue-400 p-3 rounded focus:outline-none focus:ring focus:border-blue-500"
            rows={4}
            placeholder="Type your comment here..."
          />
          <label
            htmlFor="comment"
            className="absolute left-3 top-2 text-sm text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
          >
            Your Comment
          </label>
        </div>
        <SubmitButton />
        {state?.error && (
          <p className="text-sm text-red-500 font-medium mt-2">{state.error}</p>
        )}
        {state?.message && (
          <p className="text-sm text-green-600 font-medium mt-2">
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
