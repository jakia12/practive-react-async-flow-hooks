import AddCommentLazy from "./components/AddCommentLazy";
import CommentForm from "./components/CommentForm";
import Newsletter from "./components/Newsletter";
import OptimisticComments from "./components/OptimisticComments";

export default function HomePage() {
  return (
    <main className="space-y-8 p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">React 19 Actions Practice</h1>

      <section className="pb-[100px]">
        <h2 className="font-semibold text-lg">
          1. useActionState + useFormStatus
        </h2>
        <CommentForm />
      </section>

      <section className="pb-[100px]">
        <h2 className="font-semibold text-lg mt-8">
          2. useActionState Validation
        </h2>
        <Newsletter />
      </section>

      <section className="pb-[100px]">
        <h2 className="font-semibold text-lg mt-8">3. useOptimistic</h2>
        <OptimisticComments />
      </section>

      <section className="pb-[100px]">
        <h2 className="font-semibold text-lg mt-8">4. useTransition</h2>
        <AddCommentLazy />
      </section>
    </main>
  );
}
