import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  root: 'frontend',
  plugins: [
    react(),
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
                 // Path is relative to the process cwd
                 const filePath = path.resolve(process.cwd(), 'frontend/index.html');
                 
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
});