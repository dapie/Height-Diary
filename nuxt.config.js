import session from 'express-session'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Rostik',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/reset.css', '~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vue-select'],
    /*
    ** Run ESLINT on save
    */
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    { src: '~plugins/vue-select', ssr: false }
  ],
  serverMiddleware: [
    // API middleware
    session({
      secret: 'rostik-project',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: Date.now() + (30 * 86400 * 1000) }
    }),
    '~/api/index.js'
  ],
}
