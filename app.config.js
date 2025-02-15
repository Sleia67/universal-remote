export default {
  name: process.env.APP_NAME || "IrUniRemote",
  slug: process.env.APP_SLUG || "ir-uni-remote",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/icon.png",
  userInterfaceStyle: "automatic",
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
      projectId: "725c8278-43d8-420b-8263-0f7d1ff90763"
    }
  }
};
