import Link from "next/link";
import { createPostAction } from "./actions";

export default function NewPostPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="mb-4 text-2xl font-bold">게시글 작성</h1>
      <form action={createPostAction} className="flex w-full max-w-md flex-col gap-3">
        <label className="flex flex-col gap-1">
          제목
          <input
            name="title"
            required
            className="border border-solid border-neutral-400 px-2 py-1"
          />
        </label>
        <label className="flex flex-col gap-1">
          내용
          <textarea
            name="content"
            rows={5}
            className="border border-solid border-neutral-400 px-2 py-1"
          />
        </label>
        <button
          type="submit"
          className="border border-solid border-neutral-400 px-4 py-2"
        >
          등록
        </button>
      </form>
      <Link href="/" className="mt-4">
        목록으로
      </Link>
    </main>
  );
}
