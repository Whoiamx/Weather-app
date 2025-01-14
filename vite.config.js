import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Verifica que sea 'dist', o el directorio donde Vercel está construyendo el proyecto
    assetsDir: "assets", // Si las imágenes están en una carpeta específica, asegúrate de que los activos se estén sirviendo correctamente
  },
});
