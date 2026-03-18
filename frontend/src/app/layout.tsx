import "@/styles/globals.css";
import "katex/dist/katex.min.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/core/i18n/context";
import { detectLocaleServer } from "@/core/i18n/server";

export const metadata: Metadata = {
  title: "DeerFlow",
  description: "A LangChain-based framework for building super agents.",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

function getRuntimeConfig() {
  const enableFollowupSuggestions =
    process.env.ENABLE_FOLLOWUP_SUGGESTIONS !== "false" &&
    process.env.ENABLE_FOLLOWUP_SUGGESTIONS !== "0";
  return { enableFollowupSuggestions };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await detectLocaleServer();
  const runtimeConfig = getRuntimeConfig();
  return (
    <html
      lang={locale}
      className={geist.variable}
      suppressContentEditableWarning
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__DEERFLOW_RUNTIME_CONFIG__=${JSON.stringify(runtimeConfig)}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <I18nProvider initialLocale={locale}>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
