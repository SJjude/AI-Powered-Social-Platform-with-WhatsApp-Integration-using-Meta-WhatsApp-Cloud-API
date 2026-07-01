export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api/v1',
  name: import.meta.env.VITE_APP_NAME ?? 'SocialConnect',
} as const;
