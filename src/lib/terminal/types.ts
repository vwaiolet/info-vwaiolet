export type TerminalThemeId =
  | 'dracula'
  | 'catppuccin'
  | 'tokyonight'
  | 'onedark'
  | 'monokai'
  | 'nord'
  | 'matrix'
  | 'apple-dark'
  | 'apple-light'

export interface TerminalTheme {
  id: TerminalThemeId
  name: string
  bg: string
  windowBg: string
  titleBg: string
  text: string
  promptUser: string
  promptHost: string
  promptPath: string
  promptSymbol: string
  accent: string
  secondary: string
  cursor: string
  selection: string
  border: string
  tabActive: string
  tabInactive: string
}

export interface IntroField {
  label: string
  value: string
  href?: string
  isHighlight?: boolean
}

export interface IntroConfig {
  user: string
  host: string
  logoType?: 'ascii' | 'svg'
  asciiArt: string
  fields: IntroField[]
  quote?: string
}
