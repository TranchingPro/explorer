import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: "http://8.217.153.17:3050/api",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    },
    port: 3010,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("vue/dist/vue")) {
            return "v";
          }
          if (id.includes("vue-") || id.includes("@vue")) {
            return "vi";
          }
          if (id.includes("@sentry")) {
            return "s";
          }
          if (id.includes("@headlessui") || id.includes("@heroicons") || id.includes("@tailwind")) {
            return "t";
          }
          if (id.includes("@firebase")) {
            return "f";
          }
          if (id.includes("@ethersproject")) {
            return "e";
          }
          if (id.includes("@matterlabs")) {
            return "m";
          }
          if (id.includes("@zkamoeba/micro-web3") || id.includes("ethers")) {
            return "z";
          }

          if (id.includes("/src/composables")) {
            return "cm";
          }
          if (id.includes("/src/components")) {
            return "cn";
          }
        },
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["./tests/**/**.spec.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
});
