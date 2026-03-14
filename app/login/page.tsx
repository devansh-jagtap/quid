"use client"

import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl text-center font-bold mb-6">
          Quid-Invoice Generator
        </h1>
        <button
          onClick={() => signIn("google")}
          className="bg-black text-white text-lg rounded-lg w-50 py-1 mx-15 border"
        >
          Sign in with google
        </button>
      </div>
    </div>
  );
}
