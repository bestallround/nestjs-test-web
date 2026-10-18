import Link from "next/link";
import { Suspense } from "react";
import { PostList } from "@/components/post-list";

const techStack = [
  { category: "Frontend", name: "Next.js", infra: "Vercel" },
  { category: "Backend", name: "NestJS", infra: "AWS EC2" },
  { category: "Database", name: "PostgreSQL", infra: "AWS RDS" },
  { category: "ORM", name: "Prisma", infra: "Database Access" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <header className="mb-4 w-full max-w-xl">
        <h1 className="text-center text-2xl font-bold">NestJS 기반 미니 게시판</h1>
        <p className="mt-1 text-center text-sm text-neutral-500">
          리마커블랩스 백엔드 프로덕트 엔지니어 직무 인터뷰 준비 프로젝트
        </p>
        <div className="my-4 h-px w-full bg-neutral-300" />
        <section>
          <h2 className="text-lg font-semibold">Tech Stack & Infrastructure</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-5">
            {techStack.map((item) => (
              <div key={item.category}>
                <p className="text-sm text-neutral-500">{item.category}</p>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-neutral-400">{item.infra}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="my-4 h-px w-full bg-neutral-300" />
      </header>
      <div className="flex items-start gap-4">
        <Suspense fallback={<p>불러오는 중...</p>}>
          <PostList />
        </Suspense>
        <Link
          href="/posts/new"
          className="shrink-0 border border-solid border-neutral-400 px-4 py-2"
        >
          게시글 작성
        </Link>
      </div>
    </main>
  );
}
