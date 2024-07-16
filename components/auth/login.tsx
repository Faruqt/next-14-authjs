"use client";

// library imports
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const searchParams = useSearchParams();
  const googleLogin =
    "Your google login url which will contain your client id and redirectURI";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authenticated) {
      // Redirect to previous page or home page
      const next = searchParams.get("next") || "/";
      window.location.href = next;
    }
  }, [authenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, type: "credentials" }),
      });

      if (res.ok) {
        setAuthenticated(true);
      } else {
        // handle error state here
        setError("Invalid credentials");
      }
    } catch (error) {
      // handle error state here
      console.error("Error during sign-in", error);
      setError("Internal server error");
    }
  };

  return (
    <div className="mx-auto w-[200px] h-full border-red-100">
      <div>
        <p className="text-xl w-full flex justify-center mt-3 mb-5">Sign In</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              className="w-full rounded-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              className="w-full rounded-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="w-full flex justify-center bg-teal-500 text-white mt-3 rounded-md"
            type="submit"
          >
            Sign In
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
      <div className="my-2">
        <div className="flex justify-center"> or </div>
      </div>
      <div className="w-full bg-red-700 rounded-md mb-2">
        <Link href={googleLogin} className="flex ">
          <p className="w-full text-white flex justify-center">
            Sign in with Google
          </p>
        </Link>
      </div>
    </div>
  );
}
