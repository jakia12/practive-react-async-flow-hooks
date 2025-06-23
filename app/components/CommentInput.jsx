import { useFormStatus } from "react-dom";

export default function CommentInput() {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        name="comment"
        placeholder="Type comment..."
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={pending}
      >
        {pending ? "Adding..." : "Add Comment"}
      </button>
    </>
  );
}
