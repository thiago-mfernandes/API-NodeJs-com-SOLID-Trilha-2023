import { defineConfig } from "vitest/config";
import tsconfigPaths from  "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', 'prisma'] //caminho dos testes que quero que tenham o ambiente que criei, usar o ambiente 'prisma'
    ]
  }
})


