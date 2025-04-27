"use server";
import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../lib/constants";
import db from "../../lib/db";

const checkPasswords = (({password, confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword)

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    }
  });

  return Boolean(user) === false;
}

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    }
  });

  return Boolean(user) === false;
}

const formSchema = z.object({
  username: z.string({
    invalid_type_error: "Username must be a string !",
    required_error: "Where is my username ??"
  })
  .toLowerCase()
  .trim()
  .refine(checkUniqueUsername, "This username is already taken !")
  ,
  email: z.string().email().toLowerCase().refine(checkUniqueEmail, "This email is already taken !"),
  password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirmPassword: z.string().min(PASSWORD_MIN_LENGTH)
}).refine(checkPasswords, {
  message: "Both password should be the same !",
  path: ["confirmPassword"]
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // hash password
    // save the user to db
    // log the user in
    // redirect "/home"
    console.log(result.data);
  }
}