import fs from "fs"
import path from "path"
import { logger } from "../utils/logger"

/**
 * API handler to get states for a specific bank
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} JSON response with states list
 */
export default function handler(req, res) {
  const startTime = Date.now()
  logger.info(`[API] States request received: ${JSON.stringify(req.query)}`)

  try {
    const { bank } = req.query

    if (!bank) {
      logger.warn("[API] Missing bank param")
      return res.status(400).json({
        success: false,
        error: "Missing bank param",
        message: "Please provide a bank code using the bank parameter",
      })
    }

    // Sanitize bank code to prevent directory traversal
    const sanitizedBank = bank.replace(/[^a-zA-Z0-9]/g, "")
    const filePath = path.join(process.cwd(), "data", "banks", `${sanitizedBank}.json`)

    if (!fs.existsSync(filePath)) {
      logger.warn(`[API] Bank not found: ${sanitizedBank}`)
      return res.status(404).json({
        success: false,
        error: "Bank not found",
        message: `No data found for bank code: ${sanitizedBank}`,
      })
    }

    // Read and parse the bank data file
    const allBranches = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    // Extract unique states with their ISO3166 codes
    const statesMap = {}
    Object.values(allBranches).forEach((branch) => {
      if (branch.STATE && !statesMap[branch.STATE]) {
        statesMap[branch.STATE] = branch.ISO3166 || null
      }
    })

    // Convert to array of objects
    const states = Object.entries(statesMap)
      .map(([state, iso]) => ({
        name: state,
        iso_code: iso,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))

    const responseTime = Date.now() - startTime
    logger.info(`[API] States request completed in ${responseTime}ms. Found ${states.length} states for bank: ${bank}`)

    return res.status(200).json({
      success: true,
      count: states.length,
      data: states,
      metadata: {
        bank: sanitizedBank,
        responseTime: `${responseTime}ms`,
      },
    })
  } catch (error) {
    logger.error(`[API] Error in states request: ${error.message}`)
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "An unexpected error occurred while processing your request",
    })
  }
}
