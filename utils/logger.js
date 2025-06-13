/**
 * Simple logger utility for API requests
 */
export const logger = {
  /**
   * Log info level message
   * @param {string} message - The message to log
   */
  info: (message) => {
    console.log(`[${new Date().toISOString()}] [INFO] ${message}`)
  },

  /**
   * Log warning level message
   * @param {string} message - The message to log
   */
  warn: (message) => {
    console.warn(`[${new Date().toISOString()}] [WARN] ${message}`)
  },

  /**
   * Log error level message
   * @param {string} message - The message to log
   */
  error: (message) => {
    console.error(`[${new Date().toISOString()}] [ERROR] ${message}`)
  },

  /**
   * Log debug level message (only in development)
   * @param {string} message - The message to log
   */
  debug: (message) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[${new Date().toISOString()}] [DEBUG] ${message}`)
    }
  },
}
