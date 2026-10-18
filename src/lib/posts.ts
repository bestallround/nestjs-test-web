const apiUrl = process.env.API_URL ?? "http://localhost:3000";

export type Post = {
  id: number;
  title: string;
  content?: string | null;
  createdAt: string;
  updatedAt: string;
};

export function formatPostTime(post: Post) {
  const createdAt = new Date(post.createdAt);
  const updatedAt = new Date(post.updatedAt);
  const wasUpdated = updatedAt.getTime() - createdAt.getTime() > 1000;
  const time = (wasUpdated ? updatedAt : createdAt).toLocaleString("ko-KR");

  return wasUpdated ? `수정 ${time}` : `생성 ${time}`;
}

export async function getPosts(): Promise<Post[]> {
  let response: Response;

  try {
    response = await fetch(`${apiUrl}/posts`);
  } catch {
    throw new Error("API 서버에 연결하지 못했습니다.");
  }

  if (!response.ok) {
    throw new Error(`게시글을 가져오지 못했습니다. (${response.status})`);
  }

  return response.json();
}

export async function createPost(input: {
  title: string;
  content?: string;
}): Promise<Post> {
  let response: Response;

  try {
    response = await fetch(`${apiUrl}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error("API 서버에 연결하지 못했습니다.");
  }

  if (!response.ok) {
    throw new Error(`게시글을 작성하지 못했습니다. (${response.status})`);
  }

  return response.json();
}
