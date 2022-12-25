import { useEffect, useState } from "react";

export default function Error() {
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const url = new URL(window.location.href);

    setError(url.searchParams.get("error"));
  }, []);

  return (
    <>
      <h2>Error logging in</h2>
      <p>{error}</p>
    </>
  );
}
