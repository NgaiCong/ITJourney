import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
