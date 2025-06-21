import { use } from "react";
import { getUser } from "../actions";

export default function UserProfile() {
  const user = use(getUser()); // ⬅️ wait until promise resolves

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">User Profile</h2>
        <p className="text-gray-800">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-800">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-800">
          <strong>City:</strong> {user.address.city}
        </p>
      </div>
    </div>
  );
}
