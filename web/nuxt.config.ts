import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "pt-AO",
      },
      title: "Dashboard Center",
    },
  },
  alias: {
    "@stores": resolve(__dirname, "./stores"),
    "@types": resolve(__dirname, "./types"),
    "@utils": resolve(__dirname, "./utils"),
    "@imgs": resolve(__dirname, "./assets/imgs"),
  },
  css: [
    "@/styles/simplebar.css",
    "@/styles/perfect-scrollbar.css",
    "@/styles/pace.min.css",
    "@/styles/bootstrap.min.css",
    "@/styles/metisMenu.min.css",
    "@/styles/app.css",
  ],
  modules: [
    "nuxt-icon",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    "radix-vue/nuxt",
    // "nuxt-security",
  ],
  routeRules: {
    "/": { redirect: "/app" },
  },
  googleFonts: {
    preload: true,
    preconnect: true,
    families: {
      Inter: [300, 400, 500, 700, 900],
    },
  },
  runtimeConfig: {
    public: {
      apiSecretToken: process.env.NUXT_API_SECRET_TOKEN || "",
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "",
    },
  },
});
