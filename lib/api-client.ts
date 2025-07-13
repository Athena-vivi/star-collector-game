interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresIn: number
}

class APICache {
  private cache = new Map<string, CacheEntry<any>>()
  private pendingRequests = new Map<string, Promise<any>>()

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > entry.expiresIn) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  set<T>(key: string, data: T, expiresIn: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn,
    })
  }

  // 请求去重：如果相同请求正在进行，返回同一个 Promise
  async dedupe<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!
    }

    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key)
    })

    this.pendingRequests.set(key, promise)
    return promise
  }

  clear(): void {
    this.cache.clear()
    this.pendingRequests.clear()
  }
}

export class APIClient {
  private baseURL = "/api"
  private cache = new APICache()

  private async request<T>(
    endpoint: string,
    options?: RequestInit & { cache?: boolean; cacheTime?: number },
  ): Promise<T> {
    const { cache = false, cacheTime = 5 * 60 * 1000, ...fetchOptions } = options || {}
    const cacheKey = `${endpoint}-${JSON.stringify(fetchOptions)}`

    // 检查缓存
    if (cache && fetchOptions.method !== "POST") {
      const cached = this.cache.get<T>(cacheKey)
      if (cached) {
        return cached
      }
    }

    // 请求去重
    const requestFn = async (): Promise<T> => {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions?.headers,
        },
        ...fetchOptions,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new APIError(response.status, errorText || response.statusText)
      }

      const data = await response.json()

      // 缓存 GET 请求结果
      if (cache && fetchOptions.method !== "POST") {
        this.cache.set(cacheKey, data, cacheTime)
      }

      return data
    }

    return this.cache.dedupe(cacheKey, requestFn)
  }

  async refineGoal(data: { userInput: string; userContext?: string }): Promise<{ goal: any }> {
    return this.request("/ai/refine-goal", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getMorningEncouragement(goals: any[]): Promise<{ encouragement: string }> {
    return this.request("/ai/morning-encouragement", {
      method: "POST",
      body: JSON.stringify({ goals }),
      cache: true,
      cacheTime: 10 * 60 * 1000, // 10分钟缓存
    })
  }

  async getEveningQuestions(): Promise<{ questions: string[] }> {
    return this.request("/ai/evening-questions", {
      method: "POST",
      body: JSON.stringify({ recentEntries: [] }),
      cache: true,
      cacheTime: 30 * 60 * 1000, // 30分钟缓存
    })
  }

  async analyzeDecision(data: {
    question: string
    context: string
    options: string[]
  }): Promise<{ analysis: any }> {
    return this.request("/ai/analyze-decision", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const apiClient = new APIClient()

// 导入错误类型
import { APIError } from "./error-handling"
