import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 使用相对 base，构建产物可以放在任意静态目录下运行。
export default defineConfig({
  base: './',
  plugins: [react()],
});
