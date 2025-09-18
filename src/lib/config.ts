interface Config {
  clerkPublishableKey: string
  isDevelopment: boolean
  apiUrl: string
}

export const config: Config = {
  clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string,
  isDevelopment: import.meta.env.DEV,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
}

// Validate required environment variables
const requiredEnvVars = {
  VITE_CLERK_PUBLISHABLE_KEY: config.clerkPublishableKey,
}

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})

// Development environment warning
if (config.isDevelopment) {
  console.info('Running in development mode')
  if (config.clerkPublishableKey.startsWith('pk_test_')) {
    console.info('Using Clerk development keys (this is expected in development)')
  }
}