export default {
  name: process.env.APP_NAME || "UniversalRemote",
  slug: process.env.APP_SLUG || "universal-remote",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/icon.png",
  splash: {
    image: "./src/assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  },
  web: {
    favicon: "./src/assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID
    }
  },
  // Add these new settings
  scheme: "universalremote",
  experiments: {
    newArchEnabled: true
  }
}