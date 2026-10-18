import Link from "next/link";
import { formatPostTime, getPosts } from "@/lib/posts";

export async function PostList() {
  let posts;

  try {
    posts = await getPosts();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "게시글을 가져오지 못했습니다.";
    return <p>{message}</p>;
  }

  if (posts.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-4 p-0">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="flex h-36 w-72 shrink-0 flex-col border border-solid border-neutral-400 p-3 text-inherit no-underline"
          >
            <div className="flex flex-1 items-center justify-center text-center">
              {post.title}
            </div>
            <p className="m-0 text-center text-sm">{formatPostTime(post)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
