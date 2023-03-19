import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const proxy = Object.fromEntries(['/api'].map((v) => [
  v,
  {
    target: 'http://server:3001',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`${v}`), '')
  }
]))

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    /* 如何开启本地开发环境的 https
      1. 全局安装插件
        npm i mkcert -g
      2. 新建文件夹
      3. 创建ca证书
        mkcert create-ca 
      4. 创建 cert 证书
        mkcert create-cert
      5. 双击 ca.crt 安装证书
      6. 配置证书地址
        https: {
          cert: fs.readFileSync(path.join(__dirname, 'xx/cert.crt')),
          key: fs.readFileSync(path.join(__dirname, 'xx/cert.key'))
        }
     */
    // 监听所有公网地址
    host: '0.0.0.0',
    port: 8080,
    // 可尝试下一个port
    strictPort: false,
    // 代理
    proxy
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
