import fs from "fs"
import path from "path"
import { logger } from "../utils/logger"
import banknames from "../data/banknames.json"

/**
 * API handler to get branch details by IFSC code
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} JSON response with branch details
 */
export default function handler(req, res) {
  const startTime = Date.now()
  logger.info(`[API] IFSC lookup request received: ${JSON.stringify(req.query)}`)

  try {
    const { ifsc } = req.query

    if (!ifsc) {
      logger.warn("[API] Missing ifsc param")
      return res.status(400).json({
        success: false,
        error: "Missing ifsc param",
        message: "Please provide an IFSC code using the ifsc parameter",
      })
    }

    // Extract bank code from IFSC (first 4 characters)
    const bankCode = ifsc.slice(0, 4)

    // Check if bank exists
    if (!banknames[bankCode]) {
      logger.warn(`[API] Bank not found for IFSC: ${ifsc}`)
      return res.status(404).json({
        success: false,
        error: "Bank not found",
        message: `No bank found for IFSC code: ${ifsc}`,
      })
    }

    // Construct file path
    const filePath = path.join(process.cwd(), "data", "banks", `${bankCode}.json`)

    if (!fs.existsSync(filePath)) {
      logger.warn(`[API] Bank data file not found: ${bankCode}.json`)
      return res.status(404).json({
        success: false,
        error: "Bank data not found",
        message: `Data file not found for bank code: ${bankCode}`,
      })
    }

    // Read and parse the bank data file
    const bankData = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    // Look for the specific IFSC
    const branchData = bankData[ifsc]

    if (!branchData) {
      logger.warn(`[API] IFSC not found: ${ifsc}`)
      return res.status(404).json({
        success: false,
        error: "IFSC not found",
        message: `No data found for IFSC code: ${ifsc}`,
      })
    }

    const responseTime = Date.now() - startTime
    logger.info(`[API] IFSC lookup completed in ${responseTime}ms for IFSC: ${ifsc}`)

    return res.status(200).json({
      success: true,
      data: branchData,
      metadata: {
        ifsc: ifsc,
        bank_code: bankCode,
        bank_name: banknames[bankCode],
        responseTime: `${responseTime}ms`,
      },
    })
  } catch (error) {
    logger.error(`[API] Error in IFSC lookup: ${error.message}`)
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "An unexpected error occurred while processing your request",
    })
  }
}
