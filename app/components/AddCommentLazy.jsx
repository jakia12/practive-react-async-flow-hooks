"use client";
import { useState, useTransition } from "react";

export default function AddCommentLazy() {
  const [isPending, startTransition] = useTransition();
  const [comments, setComments] = useState([]);

  const handleAdd = () => {
    startTransition(() => {
      setTimeout(() => {
        setComments((prev) => [`Lazy comment #${prev.length + 1}`, ...prev]);
      }, 1000);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto border border-gray-200 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Lazy Add Comment</h2>
      <button
        onClick={handleAdd}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isPending
            ? "bg-teal-500 animate-pulse cursor-wait"
            : "bg-teal-600 hover:opacity-90 transition"
        }`}
      >
        {isPending ? "Adding..." : "Add Lazy Comment"}
      </button>

      <ul className="mt-4 space-y-2">
        {comments.map((text, i) => (
          <li
            key={i}
            className="bg-teal-50 text-teal-900 border border-teal-200 p-3 rounded-md"
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
