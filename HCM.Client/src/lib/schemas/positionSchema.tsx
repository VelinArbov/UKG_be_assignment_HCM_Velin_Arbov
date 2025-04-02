import { z } from 'zod';

const requiredString = (fieldName: string) => z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` })

export const positionSchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    city: requiredString('City'),
    date: z.coerce.date({
        message: 'Date is required'
    })
})

export type PositionSchema = z.infer<typeof positionSchema>;