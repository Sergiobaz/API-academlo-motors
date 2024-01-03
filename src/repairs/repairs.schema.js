import z from "zod"
import { extractValidationData } from "../common/errors/utils/extract-error-data.js"

const repairSchema = z.object({
    date: z.string(),
    motorsNumber: z.number(),
    description: z.string(),
    userId: z.number()
})

export function validateCreateRepair(data) {
    const result = repairSchema.safeParse(data)

    const { hasError, errorMessages, data: repairData} = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        repairData
    }
}
