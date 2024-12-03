import AuthForm from "@/components/auth-form";

interface HomeProps {
  searchParams: Promise<{ mode: "login" | "signup" }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { mode } = await searchParams;
  return <AuthForm mode={mode} />;
}
