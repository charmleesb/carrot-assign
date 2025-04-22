"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, (resolve, 1000)));

  const password = formData.get("password");

  if (password === "12345") {
    return {
      success: "Login Success",
      errors: null,
    };
  }

  return {
    success: null,
    errors: ["Wrong Password"],
  };
}