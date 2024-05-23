import ChatWindows from "./components/ChatWindows";
import RegisterForm from "./components/authentication/RegisterForm";
import LoginForm from "./components/authentication/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions as any);

  if (session) redirect("/dashboard");
  return (
    <main className="flex min-h-screen flex-col items-center p-24 border">
      {/* <ChatWindows /> */}
      <LoginForm />
    </main>
  );
}
