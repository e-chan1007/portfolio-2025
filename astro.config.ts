import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

export default defineConfig({
  site: process.env.SITE_URL || "https://www.e-chan.me/",
  output: "server",
  adapter: cloudflare(),
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
      })
    ]
  }
});
