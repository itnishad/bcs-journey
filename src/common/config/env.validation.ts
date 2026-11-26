import {z} from 'zod'

export const envSchema = z.object({
    PORT: z.coerce.number().default(8000),
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.coerce.number().default(6379),
})

export function validate(config: Record<string, unknown>){
    return envSchema.parse(config);
}