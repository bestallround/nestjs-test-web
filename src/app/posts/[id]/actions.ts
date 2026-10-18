"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deletePost } from "@/lib/posts";

export async function deletePostAction(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  await deletePost(id);
  revalidatePath("/");
  redirect("/");
}
