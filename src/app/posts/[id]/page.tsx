import { Suspense } from "react";
import { formatPostTime, getPost } from "@/lib/posts";

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

export default async function PostPage({
  params,
}: PageProps<"/posts/[id]">) {
  const { id } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex items-start gap-4">
        <Suspense fallback={<p>불러오는 중...</p>}>
          <PostDetail id={id} />
        </Suspense>
        <div className="flex shrink-0 flex-col gap-2">
          <button type="button" className={buttonClassName}>
            게시글 수정
          </button>
          <button type="button" className={buttonClassName}>
            게시글 삭제
          </button>
        </div>
      </div>
    </main>
  );
}
