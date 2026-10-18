import Link from "next/link";
import { Suspense } from "react";
import { getPost } from "@/lib/posts";
import { updatePostAction } from "./actions";

async function EditPostForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  let post;

  try {
    post = await getPost(postId);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "게시글을 가져오지 못했습니다.";
    return <p>{message}</p>;
  }

  const updateAction = updatePostAction.bind(null, post.id);

  return (
    <>
    <form action={updateAction} className="flex w-full max-w-md flex-col gap-3">
      <label className="flex flex-col gap-1">
        제목
        <input
          name="title"
          required
          defaultValue={post.title}
          className="border border-solid border-neutral-400 px-2 py-1"
        />
      </label>
      <label className="flex flex-col gap-1">
        내용
        <textarea
          name="content"
          rows={5}
          defaultValue={post.content ?? ""}
          className="border border-solid border-neutral-400 px-2 py-1"
        />
      </label>
      <button
        type="submit"
        className="border border-solid border-neutral-400 px-4 py-2"
      >
        수정
      </button>
    </form>
    <Link href={`/posts/${id}`} className="mt-4 text-center">
      상세로
    </Link>
    </>
  );
}

export default function EditPostPage({
  params,
}: PageProps<"/posts/[id]/edit">) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="mb-4 text-2xl font-bold">게시글 수정</h1>
      <Suspense fallback={<p>불러오는 중...</p>}>
        <EditPostForm params={params} />
      </Suspense>
    </main>
  );
}
