"use client";

export default function CommentList({ comments = [] }) {
  if (!comments.length) {
    return <p className="text-gray-500 italic">No comments yet.</p>;
  }

  return (
    <ul className="mt-4 space-y-3">
      {comments.map((comment, index) => (
        <li
          key={index}
          className="flex items-start space-x-3 p-3 border rounded-md bg-white shadow-sm"
        >
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
          <div>
            <p className="text-sm text-gray-700">{comment.text || comment}</p>
            <p className="text-xs text-gray-400 mt-1">
              User#{index + 1} • just now
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
