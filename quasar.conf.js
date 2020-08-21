/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

module.exports = function(/* ctx */) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: false,
    boot: ["firebase", "router-auth"],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ["app.scss"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      "roboto-font", // optional, you are not bound to it
      "material-icons" // optional, you are not bound to it
    ],
    build: {
      vueRouterMode: "hash",
      extendWebpack(cfg) {}
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: "material-icons", // Quasar icon set
      lang: "en-us", // Quasar language pack
      config: {
        loading: {
          message: "we are getting everything ready for you"
        }
      },
      importStrategy: "auto",
      plugins: ["Dialog", "LocalStorage", "SessionStorage", "Loading"]
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: ["zoomIn", "zoomOut"],
    ssr: {
      pwa: false
    },
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: `Quasar App`,
        short_name: `Quasar App`,
        description: `A Quasar Framework app`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {},

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "awesome-todo"
      },

      nodeIntegration: true,

      extendWebpack(/* cfg */) {}
    }
  };
};
