import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import partytown from "@astrojs/partytown";
import inlangSettings from "./project.inlang/settings.json" with {
  type: "json",
};

export default defineConfig({
  site: import.meta.env.SITE_URL || "https://www.e-chan.me/",
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),
  integrations: [
    mdx(),
    icon({
      iconDir: "src/assets/icons",
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    })
  ],
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
              ["ja", "/:path(.*)?"],
            ],
          },
        ],
      }),
    ],
  },
});
