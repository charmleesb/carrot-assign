"use server";
import {z} from "zod";

  await new Promise(resolve => setTimeout(resolve, (resolve, 1000)));
const checkEmail = (email:string) => email.endsWith("@zod.com");
const checkPassword = (password:string) => /\d/.test(password);

const formSchema = z.object({
  email: z.string().email().refine(checkEmail, "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z.string().min(10, "Password should be at least 10 characters long.").refine(checkPassword, "Password should contain at least one number (0123456789).")
})

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password")
  }
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } 
}