import RegisterForm from "../components/authentication/RegisterForm";
import { verifyToken } from "../utils/auth";
import { redirect } from "next/navigation";
import cookies from "next-cookies";

export default async function Register(ctx) {
  const { token } = cookies(ctx);

  if (token) {
    try {
      await verifyToken(token);
      redirect("/dashboard");
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  return <RegisterForm />;
}
