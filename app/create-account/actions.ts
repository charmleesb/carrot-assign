"use server";

import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../lib/constants";
import db from "../../lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkPasswords = (({password, confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword);
const formSchema = z.object({
  username: z.string({
    invalid_type_error: "Username must be a string !",
    required_error: "Where is my username ??"
  })
  .toLowerCase()
  .trim(),
  email: z.string({
    invalid_type_error: "Email must be a string !",
  }).email().toLowerCase(),
  password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirmPassword: z.string().min(PASSWORD_MIN_LENGTH)
}).superRefine(async ({username}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      username
    },
    select: {
      id: true
    }
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "This username is already taken !",
      path: ["username"],
      fatal: true

    });
    return z.NEVER;
  }
}).superRefine(async ({email}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });
  if (user) {
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

interface FormState {
  success?: boolean;
  error?: string;
}

export async function createAccount(prevState:FormState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashPassword,
      },
      select: {
        id: true,
      }
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect(`/users/${user.id}`);
  }
}