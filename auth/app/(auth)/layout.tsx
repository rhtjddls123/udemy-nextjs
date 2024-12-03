import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";
import { logout } from "@/actions/auth-actions";

interface AuthLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next.js Authentication"
};

export default function AuthRootLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <header id="auth-header">
        <p>Welcome back!</p>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
