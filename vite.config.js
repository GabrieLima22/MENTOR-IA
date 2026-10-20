import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Porta fixa e exclusiva: não disputa com o EAD (8000), o Vite dele (5173) nem os workers (3000+).
// strictPort faz o servidor falhar em vez de "pular" para outra porta.
export default defineConfig({
  plugins: [vue()],
  server: { host: '127.0.0.1', port: 5180, strictPort: true },
  preview: { host: '127.0.0.1', port: 5181, strictPort: true },
});
