import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Ridgemont Management Co.",
  description: "Ridgemont",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navList = [
    { name: "who we are", link: "/" },
    { name: "what we do", link: "/" },
    { name: "properties", link: "/" },
    { name: "contact", link: "/contact" },
  ];
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-20 whitespace-nowrap">
                <div className="w-full max-w-6xl flex justify-between items-center p-3 px-5 text-md">
                  <section className="flex gap-5 items-center font-semibold text-xl">
                    <Link href={"/"}>Ridgement Management Co.</Link>
                  </section>
                  {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}
                  <section className="uppercase flex gap-2 hidden md:block">
                    {navList.map((item, i: number) => (
                      <Link key={i} href={item.link} className="p-2">
                        {item.name}
                      </Link>
                    ))}
                  </section>
                </div>
              </nav>
              <section className="h-[530px] w-full cover-image flex items-center pl-[150px]">
                <h1 className="scroll-m-20 text-2xl tracking-tight lg:text-4xl text-white w-3/5">
                  A assda real estate investment company with $123 of assets
                  under management
                </h1>
              </section>
              <section className="flex w-full p-5 bg-accent justify-center">
                <div className="w-full max-w-6xl flex flex-col">{children}</div>
              </section>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-base gap-8 py-16">
                <p className="uppercase text-muted-foreground">
                  © 2024 Ridgemont Management Co.{" "}
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
