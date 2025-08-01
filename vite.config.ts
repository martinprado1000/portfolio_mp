import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Indica desde donde arranca la ruta absoluta.
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0", // <- Esto permite que sea accesible desde otras IPs
    port: 5173, // (opcional) el puerto que ya usás
  },
});
