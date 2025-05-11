"use server";

import {z} from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../lib/constants";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import db from "@/lib/db";

// const checkEmail = (email:string) => email.endsWith("@zod.com");

const formSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
})

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    username: formData.get("username" as string),
    password: formData.get("password" as string)
  }
  const result = await formSchema.spa(data);

  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        id: true,
        password: true
      }
    });
    if (!user) {
      return {
        fieldErrors: {
          email: ["No account found with this email."],
          username: [],
          password: [],
        },
      };
    }
    const checkLogin = await bcrypt.compare(result.data.password, user.password ?? "");
    if (checkLogin) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          username: [],
          email: []
        }
      }
    }
  }
}