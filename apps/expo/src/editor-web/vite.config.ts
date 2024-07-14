import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { exec } from 'child_process';

// This config is used to build the web editor into a single file

export default defineConfig({
  root: 'src/editor-web', // This should be the directory of your index.html
  build: {
    outDir: 'build',
    emptyOutDir: false,
  },
  resolve: {
    alias: [
      {
        find: '@10play/tentap-editor', // On our web bundle we only want to include web related code
        replacement: '@10play/tentap-editor/web',
      },
    ],
  },
  plugins: [react(), viteSingleFile(), {
    name: 'postbuild-commands',
    closeBundle: async () => {
      exec('pnpm editor:post-build', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      });
    },
  },],
  server: {
    port: 3000,
  },
});