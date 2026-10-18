import Link from "next/link";
import { Suspense } from "react";
import { formatPostTime, getPost } from "@/lib/posts";
import { deletePostAction } from "./actions";

const buttonClassName = "border border-solid border-neutral-400 px-4 py-2";

async function PostDetail({ id }: { id: string }) {
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

  return (
    <article className="flex min-h-36 w-72 flex-col border border-solid border-neutral-400 p-3">
      <h1 className="text-center font-bold">{post.title}</h1>
      {post.content ? (
        <p className="mt-4 whitespace-pre-wrap text-center">{post.content}</p>
      ) : null}
      <p className="m-0 mt-4 text-center text-sm">{formatPostTime(post)}</p>
    </article>
  );
}

async function PostActions({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex items-start gap-4">
      <PostDetail id={id} />
      <div className="flex shrink-0 flex-col gap-2">
        <Link
          href={`/posts/${id}/edit`}
          className={`${buttonClassName} block text-center`}
        >
          게시글 수정
        </Link>
        <form action={deletePostAction}>
          <input type="hidden" name="id" value={id} />
          <button type="submit" className={`${buttonClassName} w-full`}>
            게시글 삭제
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PostPage({ params }: PageProps<"/posts/[id]">) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <Suspense fallback={<p>불러오는 중...</p>}>
        <PostActions params={params} />
      </Suspense>
      <Link href="/" className="mt-4">
        목록으로
      </Link>
    </main>
  );
}
