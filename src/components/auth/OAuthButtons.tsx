"use client";

import { signIn } from "next-auth/react";
import { Github, Mail } from "lucide-react";

export default function OAuthButtons() {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="relative flex items-center justify-center w-full mt-4 border-t border-gray-300 dark:border-gray-700">
        <span className="absolute px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm">
          Hoặc đăng nhập với
        </span>
      </div>
      <div className="flex gap-4 mt-4 justify-center">
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
        >
          <Mail className="w-5 h-5 mr-2" />
          Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
        >
          <Github className="w-5 h-5 mr-2" />
          GitHub
        </button>
      </div>
    </div>
  );
}
