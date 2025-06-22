import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import Icons from "unplugin-icons/vite";
import inlangSettings from "./project.inlang/settings.json" with { type: "json" };

export default defineConfig({
  site: process.env.SITE_URL || "https://www.e-chan.me/",
  output: "server",
  adapter: cloudflare(),
  i18n: {
    defaultLocale: inlangSettings.baseLocale,
    locales: inlangSettings.locales,
  },
  vite: {
    plugins: [
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
        cookieName: "locale",
        strategy: ["url", "preferredLanguage", "baseLocale"],
        disableAsyncLocalStorage: true,
        urlPatterns: [
          {
            pattern: "/:path(.*)?",
            localized: [
              ["en", "/en/:path(.*)?"],
              ["ja", "/:path(.*)?"]
            ],
          },
        ]
      }),
      Icons({
        compiler: "astro",
      })
    ]
  }
});
