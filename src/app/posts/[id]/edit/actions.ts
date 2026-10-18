"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updatePost } from "@/lib/posts";

export async function updatePostAction(id: number, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title) {
    throw new Error("제목을 입력해 주세요.");
  }

  await updatePost(id, {
    title,
    content,
  });

  revalidatePath("/");
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}
