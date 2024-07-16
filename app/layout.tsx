import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })
import type { Metadata } from "next"
import { ReduxProvider } from "@/store/provider"
// import { Provider } from "react-redux";
// import store from "@/store/store";

export const metadata: Metadata = {
  title: "Technical Store",
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>{children}</body>
      </ReduxProvider>
    </html>
  )
}
