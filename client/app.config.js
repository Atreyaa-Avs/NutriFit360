export default ({ config }) => ({
  ...config,
  extra: {
    EXPO_PUBLIC_BACKEND_URL: process.env.EXPO_PUBLIC_BACKEND_URL,
    router: {},
    eas: {
      projectId: "3c9226d2-7187-4e2d-9d90-860bf2bdeaf4"
    }
  }
});
