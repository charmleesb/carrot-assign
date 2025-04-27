"use server";

import {z} from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../lib/constants";

const checkEmail = (email:string) => email.endsWith("@zod.com");

const formSchema = z.object({
  email: z.string().email().refine(checkEmail, "Only @zod.com emails are allowed"),
  username: z.string(),
  password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
})

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    username: formData.get("username" as string),
    password: formData.get("password" as string)
  }
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return { fieldErrors: result.error.flatten().fieldErrors };
  } else {
    console.log(result.data);
    return { success: true };
  }
}