"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export async function getUser() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id
    },
    select: {
      username: true,
      email: true,
      bio: true,
      password: true
    }
  });
  if (user) {
    return user;
  }
  notFound();
};

export async function updateUserInfos(prevState: any, formData: FormData) {
  const session = await getSession();
  const id = session.id;
  const username = formData.get("username")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  
  if (!username || !email) {
    return {
      message: "이메일과 유저네임을 입력해주세요.",
      success: false,
    };
  }
  
  await db.user.update({
    where: {
      id
    },
    data: {
      username,
      email
    }
  });

  redirect(`/users/${id}`)
}