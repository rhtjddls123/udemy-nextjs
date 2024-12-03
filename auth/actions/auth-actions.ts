"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";

export interface CustomError {
  email?: string;
  password?: string;
}

interface SQLiteError extends Error {
  code: string;
  stack?: string;
}

export async function signup(_: { errors: CustomError } | undefined, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: CustomError = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id.toString());
    redirect("/training");
  } catch (error) {
    const customError = error as SQLiteError;
    if (customError.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "It seems like an account for the chosen email already exists."
        }
      };
    }

    throw error;
  }
}

export async function login(_: { errors: CustomError } | undefined, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Could not auth enticate user, please check your credentials."
      }
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not auth enticate user, please check your credentials."
      }
    };
  }

  await createAuthSession(existingUser.id.toString());
  redirect("/training");
}

export async function auth(
  mode: "login" | "signup",
  prevState: { errors: CustomError } | undefined,
  formData: FormData
) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}
