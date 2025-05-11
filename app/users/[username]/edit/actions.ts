"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";

const checkPasswords = (({password, confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword);
const formSchema = z.object({
  userId: z.number(),
  username: z.string({
    invalid_type_error: "Username must be a string !",
    required_error: "Where is my username ??"
  })
  .toLowerCase()
  .trim(),
  email: z.string({
    invalid_type_error: "Email must be a string !",
  }).email().toLowerCase(),
  bio: z.string(),
  password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirmPassword: z.string().min(PASSWORD_MIN_LENGTH)
}).superRefine(async ({username, userId}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      username
    },
    select: {
      id: true
    }
  });
  if (user && user.id !== userId) {
    ctx.addIssue({
      code: "custom",
      message: "This username is already taken !",
      path: ["username"],
      fatal: true

    });
    return z.NEVER;
  }
}).superRefine(async ({email, userId}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });
  if (user && user.id !== userId) {
    ctx.addIssue({
      code: "custom",
      message: "This email is already taken !",
      path: ["email"],
      fatal: true

    });
    return z.NEVER;
  }
}).refine(checkPasswords, {
  message: "Both password should be the same !",
  path: ["confirmPassword"]
});

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

export async function updateUserInfos(formData: FormData) {
  const session = await getSession();
  const id = session.id;
  const data = {
    userId: id,
    username: formData.get("username")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    bio: formData.get("bio")?.toString().trim(),
    password: formData.get("password")?.toString().trim(),
    confirmPassword: formData.get("confirmPassword")?.toString().trim()
  }

  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashPassword = await bcrypt.hash(result.data.password, 12);
      await db.user.update({
        where: {
          id
        },
        data: {
          username: result.data.username,
          email: result.data.email,
          bio: result.data.bio,
          password: hashPassword
        },
        select: {
          id: true
        }
      });
  }

  redirect(`/users/${id}`)
}