import SavedImagesLayout from "@/components/layouts/saved-images";
import UpgradeLayout from "@/components/layouts/upgrade";
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
      <UpgradeLayout userInfo={userInfo} />
    </>
  );
}
