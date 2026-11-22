import {z} from 'zod'

export const envSchema = z.object({
    PORT: z.coerce.number().default(8000)
})

export function validate(config: Record<string, unknown>){
    return envSchema.parse(config);
}