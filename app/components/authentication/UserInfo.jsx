"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-8 bg-zince-300/10 flex flex-col gap-2 my-6 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/5">
        <div>
          Name:{" "}
          <span className="font-bold p-5 text-xl">{session?.user?.name}</span>
        </div>
        <div>
          Email:{" "}
          <span className="font-bold p-5 text-xl">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-8 py-5 mt-3 text-xl"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
