// tailwind config is required for editor support
import type { Config } from 'tailwindcss';
import baseConfig from "@knowingly/tailwind-config/web";

const config: Pick<Config, 'prefix' | 'presets' | 'corePlugins'> = {
  prefix: 'mly-',
  corePlugins: {
    // Disable preflight to avoid Tailwind overriding the styles of the editor.
    preflight: false,
  },
  presets: [baseConfig],
};

export default config;
