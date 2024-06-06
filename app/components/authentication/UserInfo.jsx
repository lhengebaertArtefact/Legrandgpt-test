"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setSession(data.user);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log("Failed to fetch session:", error);
        router.push("/");
      }
    };

    fetchSession();
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-8 bg-zince-300/10 flex flex-col gap-2 my-6 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/5">
        <div>
          Name: <span className="font-bold p-5 text-xl">{session.name}</span>
        </div>
        <div>
          Email: <span className="font-bold p-5 text-xl">{session.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white font-bold px-8 py-5 mt-3 text-xl"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
