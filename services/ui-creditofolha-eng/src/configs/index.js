// Is DEV or Production
export const IsEnvProduction = process.env.NODE_ENV === 'production'

// Base URL for Helmet
export const BaseUrl = 'http://meu.creditofolha.com'

// Endpoint Backend
export const ApiUrl = process.env.REACT_APP_CREDITOR_BASE_URL

// Time left to resfresh token, 15 minutes
export const RefreshThreshold = 15

// Manifest to get those themes from webpack
export const ThemesManifestName = 'themes-manifest.json'

// Sentry Configuration
export const SentryBaseDsn = process.env.REACT_APP_FRONTEND_SENTRY_CREDITOR_BASE_DSN

// Configuration to persist redux reducers in storage
export const PersistConfig = {
  key: 'onidata-creditofolha',
  whitelist: ['auth', 'user'],
}
