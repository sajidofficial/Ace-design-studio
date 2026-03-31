import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  plugins: [
    {
      name: 'cms-save-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/save') {
             let body = '';
             req.on('data', chunk => { body += chunk; });
             req.on('end', () => {
               try {
                 const data = JSON.parse(body);
                 const filePath = path.resolve(process.cwd(), 'index.html');
                 
                 if (fs.existsSync(filePath)) {
                   let content = fs.readFileSync(filePath, 'utf-8');
                   const marker = /<script id="cms-data">window\.CMS_DATA = .*?<\/script>/s;
                   const replacement = `<script id="cms-data">window.CMS_DATA = ${JSON.stringify(data)};</script>`;
                   
                   if (content.match(marker)) {
                     content = content.replace(marker, replacement);
                     fs.writeFileSync(filePath, content, 'utf-8');
                     console.log(`[CMS] Updated index.html successfully.`);
                   }
                 }
                 
                 res.setHeader('Content-Type', 'application/json');
                 res.statusCode = 200;
                 res.end(JSON.stringify({ success: true }));
               } catch (err) {
                 console.error(`[CMS] Error saving:`, err);
                 res.statusCode = 500;
                 res.end(JSON.stringify({ success: false, error: err.message }));
               }
             });
          } else {
            next();
          }
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        dashboard: path.resolve(__dirname, 'dashboard.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});