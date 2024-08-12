import React from "react";
// import ForgotPasswordForm from "@/features/account/ForgotPassword";
import ForgotPasswordForm from "@/components/account/forget-password/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: `Forgot Password | Technical sewa`,
  };
}
