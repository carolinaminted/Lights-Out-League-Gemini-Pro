import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'transform-html-production',
      transformIndexHtml(html) {
        // 1. Remove the Babel Standalone script
        let newHtml = html.replace(/<script.*src=".*babel.*standalone.*"><\/script>/, '');
        
        // 2. Remove the Tailwind CDN script (since we build CSS)
        newHtml = newHtml.replace(/<script.*src=".*cdn\.tailwindcss\.com.*"><\/script>/, '');

        // 3. Remove the Tailwind Config script block
        newHtml = newHtml.replace(/<script>\s*tailwind\.config[\s\S]*?<\/script>/, '');

        // 4. Remove the Import Map (Vite handles bundling)
        newHtml = newHtml.replace(/<script type="importmap">[\s\S]*?<\/script>/, '');
        
        // 5. Remove the in-browser babel entry point
        newHtml = newHtml.replace(/<script.*type="text\/babel".*src="\.\/index\.tsx"><\/script>/, '');
        
        // 6. Inject the standard Vite module entry point
        // Note: Vite usually auto-injects, but we make sure the old one is gone and the new one is present.
        return newHtml.replace('</body>', '<script type="module" src="./index.tsx"></script></body>');
      }
    }
  ],
  define: {
    // Shim process.env for the build to prevent crashes on 'process.env.API_KEY' usage
    // In production, you should set this environment variable in your host provider (Netlify/Vercel)
    'process.env': process.env
  }
});