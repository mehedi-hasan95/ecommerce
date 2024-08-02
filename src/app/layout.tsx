import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { PrimaryNav } from "@/components/common/navmenu/primery-nav/primary-nav";
import { SeconderyNav } from "@/components/common/navmenu/secondery-nav/secondery-nav";
import { Footer } from "@/components/common/footer/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: {
    default: "Benlgal Shop",
    template: "%s - Bengal Shop",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={poppins.className}>
          <div className="flex flex-col justify-between h-screen">
            <div>
              <div className="max-w-screen-2xl mx-auto px-6 py-5">
                <PrimaryNav />
                <SeconderyNav />
              </div>
              {children}
            </div>
            <Footer />
          </div>
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
