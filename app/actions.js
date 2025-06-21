"use server";

export async function addComment(prevState, formData) {
  const comment = formData.get("comment")?.toString().trim();
  if (!comment) return { error: "Comment is required" };

  await new Promise((res) => setTimeout(res, 1000)); // simulate DB
  return { message: "Comment added!" };
}

export async function subscribe(email) {
  await new Promise((res) => setTimeout(res, 800));
  return { status: "subscribed" };
}

// for fetching user data using use(promise)
export async function getUser() {
  return await fetch("https://jsonplaceholder.typicode.com/users/1").then(
    (res) => res.json()
  );
}
