import type { Metadata } from "next";
import { ApiProvider } from "./context/ApiProvider";
import { Asset360Provider } from "./context/Asset360Provider";
import { RestoreScrollProvider } from "./context/RestoreScrollProvider";
import { montserrat } from "./font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApiProvider>
      <RestoreScrollProvider>
        <Asset360Provider>
          <html lang="en">
            <body className={montserrat.className}>{children}</body>
          </html>
        </Asset360Provider>
      </RestoreScrollProvider>
    </ApiProvider>
  );
}
