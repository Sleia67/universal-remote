export default {
  name: process.env.APP_NAME || "IrUniRemote",
  slug: "universal-remote",  // Changed to match Expo project slug
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
    },
    package: "com.sleia.universalremote"  // Added Android package name
  },
  web: {
    favicon: "./src/assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "725c8278-43d8-420b-8263-0f7d1ff90763"
    }
  },
  owner: "sleia"  // Added owner field
};
