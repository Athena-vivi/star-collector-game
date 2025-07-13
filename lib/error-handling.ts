export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message)
    this.name = "ValidationError"
  }
}

export function handleAPIError(error: unknown): APIError {
  if (error instanceof APIError) {
    return error
  }

  if (error instanceof Error) {
    return new APIError(500, error.message)
  }

  return new APIError(500, "An unexpected error occurred")
}

// 全局错误处理 Hook
export function useErrorHandler() {
  const handleError = (error: unknown) => {
    const apiError = handleAPIError(error)

    // 根据错误类型显示不同的提示
    if (apiError.status === 401) {
      // 处理认证错误
      console.error("Authentication error:", apiError.message)
    } else if (apiError.status >= 500) {
      // 处理服务器错误
      console.error("Server error:", apiError.message)
    } else {
      // 处理客户端错误
      console.error("Client error:", apiError.message)
    }

    return apiError
  }

  return { handleError }
}
