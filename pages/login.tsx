import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    const url = new URL(window.location.href);

    const token = url.searchParams.get("token");

    if (token) {
      signIn("credentials", {
        token,
        callbackUrl: "/",
      })
        .then((res) => {
          setStatus("Login ok!");
        })
        .catch((err) => {
          console.log(err.message);
          setStatus("neas");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return <>{loading ? <h2>Loggar in...</h2> : <h2>{status}</h2>}</>;
}
