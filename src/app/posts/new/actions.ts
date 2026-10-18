"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPost } from "@/lib/posts";

export async function createPostAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title) {
    throw new Error("제목을 입력해 주세요.");
  }

  await createPost({
    title,
    content: content || undefined,
  });

  revalidatePath("/");
  redirect("/");
}
