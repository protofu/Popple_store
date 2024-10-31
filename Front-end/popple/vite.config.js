import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {  
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoIntegrity: env.VITE_KAKAO_INTEGRITY,
            kakaoShareVersion: env.VITE_KAKAO_SHARE_VERSION,
          }
        }
      }),
    ],
  }
}