import HomeLayout from "@/components/layouts/home";
import { currentUser } from "@clerk/nextjs";
import React from "react";

export default async function Page() {
  const user = await currentUser();

  const userInfo = user
    ? {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.emailAddresses[0]?.emailAddress,
        imageUrl: user.imageUrl,
      }
    : null;

  return (
    <>
      <HomeLayout userInfo={userInfo} />
    </>
  );
}
