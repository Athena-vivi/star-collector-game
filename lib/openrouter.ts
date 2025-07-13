interface OpenRouterResponse {
  id: string
  provider: string
  model: string
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

// 只保留GPT-4o和CLAUDE_HAIKU
export class OpenRouterClient {
  private baseUrl = "https://openrouter.ai/api/v1/chat/completions"
  constructor(private apiKey: string) {}
  async chat(
    model: string,
    messages: ChatMessage[],
    options: {
      temperature?: number
      max_tokens?: number
      stream?: boolean
    } = {},
  ): Promise<OpenRouterResponse> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
        "X-Title": "Star-Collector",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 1000,
        ...options,
      }),
    })
    if (!response.ok) {
      const errorText = await response.text()
      console.error("OpenRouter API error:", response.status, errorText)
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`)
    }
    return response.json()
  }
}

export const MODEL_ROUTES = {
  STAR_SETTER: "openai/gpt-4o",
  SUMMARY_EXTRACTION: "anthropic/claude-3-haiku",
} as const

export const API_KEYS = {
  GPT4O: process.env.GPT4O_API_KEY,
  CLAUDE_HAIKU: process.env.CLAUDE_HAIKU_API_KEY,
} as const
