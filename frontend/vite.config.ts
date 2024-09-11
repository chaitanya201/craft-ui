import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: { noExternal: ["react-live", "react-syntax-highlighter"] },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
      binaryInterval: 100,
    },
  },
});
