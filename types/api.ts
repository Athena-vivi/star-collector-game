// 严格的 API 类型定义
export interface APIResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
}

// 品牌类型防止 ID 混淆
export type GoalId = string & { readonly __brand: "GoalId" }
export type UserId = string & { readonly __brand: "UserId" }
export type JournalEntryId = string & { readonly __brand: "JournalEntryId" }

// 创建品牌类型的辅助函数
export function createGoalId(id: string): GoalId {
  return id as GoalId
}

export function createUserId(id: string): UserId {
  return id as UserId
}

export function createJournalEntryId(id: string): JournalEntryId {
  return id as JournalEntryId
}

// 严格的数据模型
export interface Goal {
  readonly id: GoalId
  title: string
  description: string
  category: GoalCategory
  targetDate: Date
  readonly createdAt: Date
  progress: number
  milestones: readonly Milestone[]
  isSmartGoal: boolean
}

export interface JournalEntry {
  readonly id: JournalEntryId
  readonly date: Date
  morningCheckIn?: string
  eveningReflection?: string
  mood: number
  achievements: readonly string[]
  challenges: readonly string[]
  gratitude: readonly string[]
}

export interface Milestone {
  readonly id: string
  title: string
  description: string
  targetDate: Date
  completed: boolean
  readonly createdAt: Date
}

export type GoalCategory = "personal" | "professional" | "health" | "learning" | "financial" | "relationships"

// API 错误类型
export interface APIErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
  code?: string
}
