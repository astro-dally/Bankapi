import { logger } from "../utils/logger"
import banknames from "../data/banknames.json"

/**
 * API handler to search banks by name
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} JSON response with matching banks
 */
export default function handler(req, res) {
  const startTime = Date.now()
  logger.info(`[API] Bank search request received: ${JSON.stringify(req.query)}`)

  try {
    const { q, limit = 10 } = req.query

    if (!q) {
      logger.warn("[API] Missing query param: q")
      return res.status(400).json({
        success: false,
        error: "Missing query param: q",
        message: "Please provide a search term using the q parameter",
      })
    }

    const results = Object.entries(banknames)
      .filter(([_, name]) => name.toLowerCase().includes(q.toLowerCase()))
      .map(([code, name]) => ({ code, name }))
      .slice(0, Number.parseInt(limit))

    const responseTime = Date.now() - startTime
    logger.info(`[API] Bank search completed in ${responseTime}ms. Found ${results.length} results for query: ${q}`)

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
      metadata: {
        query: q,
        responseTime: `${responseTime}ms`,
      },
    })
  } catch (error) {
    logger.error(`[API] Error in bank search: ${error.message}`)
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "An unexpected error occurred while processing your request",
    })
  }
}
