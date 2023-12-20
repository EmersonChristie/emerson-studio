import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";

interface Credentials {
  username: string;
  password: string;
}

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [loginError, setError] = useState<string>("");

  const router = useRouter();

  function handleUpdate(e: ChangeEvent<HTMLInputElement>) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-md bg-white p-6 shadow-md">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            name="username"
            type="email"
            onChange={handleUpdate}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            onChange={handleUpdate}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {loginError && (
          <span className="text-sm text-red-500">{loginError}</span>
        )}
        <button
          onClick={async () => {
            const response = await signIn("credentials", {
              redirect: false,
              ...credentials,
            });
            if (response?.error) {
              setError(response.error);
            } else if (response?.ok) {
              router.push("/");
            }
          }}
          className="mt-4 w-full rounded-md bg-indigo-600 py-2 px-4 font-semibold text-white hover:bg-indigo-700"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
