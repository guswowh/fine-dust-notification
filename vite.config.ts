import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    // 해석
    // - /api 앞 부분인 origin을 target에 설정되어 있는 부분으로 바꿔준다는 것을 의미한다. (정규표현식을 통해서)
    open: true,
    proxy: {
      '/api': {
        target: 'https://apis.data.go.kr/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
    },
  },
})
