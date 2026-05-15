import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/skillbadge/",
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SkillBadge - Prototype',
        short_name: 'SkillBadge',
        description: 'SkillBadge - prototype de certification blockchain des compétences numériques au Burkina Faso.',
        theme_color: '#0A0D14',
        background_color: '#0A0D14',
        display: 'standalone',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
});
