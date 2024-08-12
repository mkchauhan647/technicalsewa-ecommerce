import React from "react";
// import ChangePasswordForm from "@/components/dashboard/Changepassword";
import ChangePasswordForm from "@/components/account/change-password/ChangePasswordForm";
export default function ChangePasswordPage() {
  return (
    <>
      <ChangePasswordForm />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: `Change Password | Technical sewa`,
  };
}
