import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <h2>Inloggad!</h2>
      <p>User name: {session?.user?.name}</p>
      <p>User id: {session?.user?.id}</p>
      <p>User email: {session?.user?.email}</p>
    </>
  );
}
