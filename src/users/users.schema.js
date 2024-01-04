import z from "zod"
import { extractValidationData } from "../common/errors/utils/extract-error-data.js"

const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    passsword: z.string()
})

export function validateCreateUser(data) {

    const result = userSchema.safeParse(data)
   
    const { hasError, errorMessages, data: userData} = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        userData
    }
}
