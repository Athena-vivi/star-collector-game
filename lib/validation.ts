import { z } from "zod"

// 基础验证模式
export const goalInputSchema = z.object({
  userInput: z
    .string()
    .min(10, "Please provide at least 10 characters describing your goal")
    .max(1000, "Goal description must be less than 1000 characters")
    .refine((val) => val.trim().length > 0, "Goal description cannot be empty"),
  userContext: z
    .string()
    .max(2000, "Context must be less than 2000 characters")
    .optional()
    .transform((val) => val?.trim()),
})

export const journalEntrySchema = z.object({
  mood: z
    .number()
    .min(1, "Mood must be between 1 and 10")
    .max(10, "Mood must be between 1 and 10")
    .int("Mood must be a whole number"),
  morningCheckIn: z.string().max(1000).optional(),
  eveningReflection: z.string().max(2000).optional(),
  achievements: z.array(z.string().max(200)).max(10, "Maximum 10 achievements allowed").default([]),
  challenges: z.array(z.string().max(200)).max(10, "Maximum 10 challenges allowed").default([]),
  gratitude: z.array(z.string().max(200)).max(10, "Maximum 10 gratitude items allowed").default([]),
})

export const decisionAnalysisSchema = z.object({
  question: z
    .string()
    .min(10, "Please provide at least 10 characters describing your decision")
    .max(500, "Question must be less than 500 characters"),
  context: z
    .string()
    .min(20, "Please provide at least 20 characters of context")
    .max(2000, "Context must be less than 2000 characters"),
  options: z
    .array(z.string().min(1).max(200))
    .min(2, "Please provide at least 2 options")
    .max(5, "Maximum 5 options allowed"),
})

// 类型推导
export type GoalInput = z.infer<typeof goalInputSchema>
export type JournalEntryInput = z.infer<typeof journalEntrySchema>
export type DecisionAnalysisInput = z.infer<typeof decisionAnalysisSchema>

// 验证函数
export function validateGoalInput(data: unknown): GoalInput {
  return goalInputSchema.parse(data)
}

export function validateJournalEntry(data: unknown): JournalEntryInput {
  return journalEntrySchema.parse(data)
}

export function validateDecisionAnalysis(data: unknown): DecisionAnalysisInput {
  return decisionAnalysisSchema.parse(data)
}

// 安全的验证 Hook
export function useValidation<T>(schema: z.ZodSchema<T>) {
  const validate = (data: unknown) => {
    try {
      return { success: true as const, data: schema.parse(data), errors: null }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false as const,
          data: null,
          errors: error.errors.reduce(
            (acc, err) => {
              const path = err.path.join(".")
              acc[path] = err.message
              return acc
            },
            {} as Record<string, string>,
          ),
        }
      }
      return {
        success: false as const,
        data: null,
        errors: { general: "Validation failed" },
      }
    }
  }

  return { validate }
}
