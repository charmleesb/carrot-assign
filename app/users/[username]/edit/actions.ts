"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import bcrypt from "bcrypt";

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
  const data = {
    username: formData.get("username")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    bio: formData.get("bio")?.toString().trim(),
    password: formData.get("password")?.toString().trim()
  }

  if (!data.username || !data.email || !data.password) {
    return {
      message: "이메일과 유저네임을 입력해주세요.",
      success: false,
    };
  }
  const hashPassword = await bcrypt.hash(data.password, 12);
  await db.user.update({
    where: {
      id
    },
    data: {
      username: data.username,
      email: data.email,
      bio: data.bio,
      password: hashPassword
    }
  });

  redirect(`/users/${id}`)
}