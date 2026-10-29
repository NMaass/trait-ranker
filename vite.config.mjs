import { defineConfig } from "vite";
import { transformAsync } from "@babel/core";
export default defineConfig({
  plugins: [{
    name: "flow-and-jsx", enforce: "pre",
    async transform(code, id) {
      if (!id.includes("/src/") || !/\.jsx?$/.test(id)) return;
      return transformAsync(code, { filename: id, babelrc: false, configFile: false,
        presets: ["@babel/preset-flow", ["@babel/preset-react", { runtime: "automatic" }]], sourceMaps: true });
    },
  }],
  build: { outDir: "build" },
  server: { host: "127.0.0.1" },
});
