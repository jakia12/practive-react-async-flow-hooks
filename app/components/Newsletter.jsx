"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribe } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition"
    >
      {pending ? "Joining..." : "Join Now"}
    </button>
  );
}

export default function Newsletter() {
  const [state, formAction] = useActionState(async (prevState, formData) => {
    const email = formData.get("email")?.toString() || "";

    if (!email.includes("@")) {
      return { error: "Invalid email" }; // ✅ good (plain object)
    }

    await subscribe(email); // your async server action

    return { message: "Subscribed successfully!" }; // ✅ good (plain object)
    console.log("Returned state:", state);
  }, {});

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto border border-gray-200 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Subscribe to our Newsletter
      </h2>
      <form action={formAction} className="space-y-3">
        <div className="relative">
          <input
            name="email"
            id="email"
            placeholder="Email address"
            className="placeholder-[#888] text-black  w-full border border-gray-300 rounded-md p-3  focus:outline-none focus:ring-2 focus:ring-green-500"
          />
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
