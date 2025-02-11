"use client";
import { useRouter } from "next/navigation";

export default function Logout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  async function handle() {
    const response = await fetch("http://localhost:8000/user/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    if (response.status === 200) router.push("/auth");
  }

  return <div onClick={handle}>{children}</div>;
}
