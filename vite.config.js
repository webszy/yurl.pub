const vuePlugin = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
require('dotenv')
    .config({
      path:require('path').resolve(__dirname,'./.env.local')
    })
/**
 * @type {import('vite').UserConfig}
 */
module.exports = {

  plugins: [
    vuePlugin(),
    vueJsx(),
    {
      name: 'virtual',
      resolveId(id) {
        if (id === '@foo') {
          return id
        }
      },
      load(id) {
        if (id === '@foo') {
          return `export default { msg: 'hi' }`
        }
      }
    }
  ],
  build: {
    minify: false
  }
}
