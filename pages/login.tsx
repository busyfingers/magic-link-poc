import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  useEffect(() => {
    const url = new URL(window.location.href);

    const token = url.searchParams.get("token");

    if (token) {
      signIn("credentials", {
        token,
        callbackUrl: "/",
      });
    }
  }, []);

  return <>{<h2>Loggar in...</h2>}</>;
}
