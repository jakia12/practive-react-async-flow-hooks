import { Suspense } from "react";
import UserProfile from "../components/UserProfile";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Suspense fallback={<p className="text-gray-500">Loading user...</p>}>
        <UserProfile />
      </Suspense>
    </main>
  );
}
