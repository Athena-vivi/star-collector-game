// 高级配色系统 - 专业级调色板
export const colorSystem = {
  // 主色调 - 深邃蓝紫渐变系统
  primary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b", // 主色调
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },

  // 辅助色调 - 优雅紫色系统
  accent: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7", // 辅助色
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },

  // 中性色 - 温暖灰色系统
  neutral: {
    0: "#ffffff",
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09",
  },

  // 语义化颜色
  semantic: {
    success: {
      light: "#dcfce7",
      DEFAULT: "#16a34a",
      dark: "#15803d",
      contrast: "#ffffff",
    },
    warning: {
      light: "#fef3c7",
      DEFAULT: "#d97706",
      dark: "#b45309",
      contrast: "#ffffff",
    },
    error: {
      light: "#fee2e2",
      DEFAULT: "#dc2626",
      dark: "#b91c1c",
      contrast: "#ffffff",
    },
    info: {
      light: "#dbeafe",
      DEFAULT: "#2563eb",
      dark: "#1d4ed8",
      contrast: "#ffffff",
    },
  },

  // 渐变色系统
  gradients: {
    primary: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
    accent: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    hero: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    card: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    glass: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
  },
} as const

// 阴影系统 - 更精致的阴影
export const shadows = {
  xs: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
  sm: "0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px -1px rgba(15, 23, 42, 0.1)",
  md: "0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)",
  lg: "0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)",
  xl: "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)",
  "2xl": "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
  glow: "0 0 20px rgba(168, 85, 247, 0.3)",
  "glow-lg": "0 0 40px rgba(168, 85, 247, 0.2)",
} as const
