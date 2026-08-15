import { TerminalTheme, TerminalThemeId, IntroConfig } from './types'

/**
 * ----------------------------------------------------------------------------
 * Intro & Profile Configuration
 * ----------------------------------------------------------------------------
 * 터미널 화면에 표시되는 엔지니어 소개 정보입니다.
 * 원하는 항목을 자유롭게 수정/추가하실 수 있습니다.
 */
export const INTRO_CONFIG: IntroConfig = {
  user: 'vwaiolet',
  host: 'gyeongho-kim',
  logoType: 'svg', // 'svg' (초고화질 네온 V 엠블럼) 또는 'ascii' (텍스트 아스키 아트)
  // 'V' 로고 아스키 아트 (ASCII Art)
  asciiArt: `
       \\ \\         / /
        \\ \\       / / 
         \\ \\     / /  
          \\ \\   / /   
           \\ \\ / /    
            \\ V /     
             \\_/      
`.trim(),
  // 출력할 소개 문구 항목들
  fields: [
    { label: 'Engineer', value: '김경호 (Gyeongho Kim)', isHighlight: true },
    { label: 'Alias', value: 'VWAIOLET', isHighlight: true },
    { label: 'Tagline', value: '최적의 아키텍처를 설계하는 엔지니어' },
    { label: 'Email', value: 'kito17@naver.com', href: 'mailto:kito17@naver.com' },
    { label: 'GitHub', value: 'github.com/vwaiolet', href: 'https://github.com/vwaiolet' },
  ],
}

/**
 * ----------------------------------------------------------------------------
 * README.md Content
 * ----------------------------------------------------------------------------
 * 'cat README.md' 실행 시 터미널 화면에 마크다운으로 렌더링되는 본문입니다.
 */
export const README_CONTENT = `
안녕하세요

저의 이력서는 [여기](https://vwaiolet.notion.site/3bd779dcbed480648e21fbd4070ac0a3)에서 확인해 보실 수 있습니다

> "완벽함은 더 이상 더할 것이 없을 때가 아니라 더 이상 뺄 것이 없을 때 성취된다." - 앙투안 드 생텍쥐베리

저는 이 한 문장을 좋아합니다  
아키텍처를 설계할 때 더 이상 뺄 것이 없는 최적의 아키텍처를 설계하려 노력합니다  
또한 신기술을 탐구하고 적용하는 것을 좋아합니다  

감사합니다
`.trim()

export const THEMES: Record<TerminalThemeId, TerminalTheme> = {
  dracula: {
    id: 'dracula',
    name: 'Dracula',
    bg: '#282a36',
    windowBg: 'rgba(40, 42, 54, 0.95)',
    titleBg: '#21222c',
    text: '#f8f8f2',
    promptUser: '#50fa7b',
    promptHost: '#bd93f9',
    promptPath: '#8be9fd',
    promptSymbol: '#ff79c6',
    accent: '#bd93f9',
    secondary: '#6272a4',
    cursor: '#f8f8f2',
    selection: '#44475a',
    border: 'rgba(189, 147, 249, 0.25)',
    tabActive: '#282a36',
    tabInactive: '#1e1f29',
  },
  catppuccin: {
    id: 'catppuccin',
    name: 'Catppuccin Mocha',
    bg: '#1e1e2e',
    windowBg: 'rgba(30, 30, 46, 0.95)',
    titleBg: '#181825',
    text: '#cdd6f4',
    promptUser: '#a6e3a1',
    promptHost: '#cba6f7',
    promptPath: '#89dceb',
    promptSymbol: '#f38ba8',
    accent: '#cba6f7',
    secondary: '#585b70',
    cursor: '#f5e0dc',
    selection: '#45475a',
    border: 'rgba(203, 166, 247, 0.25)',
    tabActive: '#1e1e2e',
    tabInactive: '#181825',
  },
  tokyonight: {
    id: 'tokyonight',
    name: 'Tokyo Night',
    bg: '#1a1b26',
    windowBg: 'rgba(26, 27, 38, 0.95)',
    titleBg: '#16161e',
    text: '#a9b1d6',
    promptUser: '#9ece6a',
    promptHost: '#bb9af7',
    promptPath: '#7dcfff',
    promptSymbol: '#f7768e',
    accent: '#bb9af7',
    secondary: '#565f89',
    cursor: '#c0caf5',
    selection: '#283457',
    border: 'rgba(187, 154, 247, 0.25)',
    tabActive: '#1a1b26',
    tabInactive: '#16161e',
  },
  onedark: {
    id: 'onedark',
    name: 'One Dark',
    bg: '#282c34',
    windowBg: 'rgba(40, 44, 52, 0.95)',
    titleBg: '#21252b',
    text: '#abb2bf',
    promptUser: '#98c379',
    promptHost: '#c678dd',
    promptPath: '#61afef',
    promptSymbol: '#e06c75',
    accent: '#c678dd',
    secondary: '#5c6370',
    cursor: '#528bff',
    selection: '#3e4451',
    border: 'rgba(198, 120, 221, 0.25)',
    tabActive: '#282c34',
    tabInactive: '#21252b',
  },
  monokai: {
    id: 'monokai',
    name: 'Monokai Pro',
    bg: '#2d2a2e',
    windowBg: 'rgba(45, 42, 46, 0.95)',
    titleBg: '#221f22',
    text: '#fcfcfa',
    promptUser: '#a9dc76',
    promptHost: '#ab9df2',
    promptPath: '#78dce8',
    promptSymbol: '#ff6188',
    accent: '#ffd866',
    secondary: '#727072',
    cursor: '#fcfcfa',
    selection: '#403e41',
    border: 'rgba(255, 216, 102, 0.25)',
    tabActive: '#2d2a2e',
    tabInactive: '#221f22',
  },
  nord: {
    id: 'nord',
    name: 'Nord',
    bg: '#2e3440',
    windowBg: 'rgba(46, 52, 64, 0.95)',
    titleBg: '#242933',
    text: '#d8dee9',
    promptUser: '#a3be8c',
    promptHost: '#b48ead',
    promptPath: '#88c0d0',
    promptSymbol: '#bf616a',
    accent: '#88c0d0',
    secondary: '#4c566a',
    cursor: '#d8dee9',
    selection: '#434c5e',
    border: 'rgba(136, 192, 208, 0.25)',
    tabActive: '#2e3440',
    tabInactive: '#242933',
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix',
    bg: '#0d1117',
    windowBg: 'rgba(13, 17, 23, 0.96)',
    titleBg: '#080c10',
    text: '#00ff66',
    promptUser: '#00ff41',
    promptHost: '#00cc33',
    promptPath: '#00e5ff',
    promptSymbol: '#00ff66',
    accent: '#00ff66',
    secondary: '#008f11',
    cursor: '#00ff66',
    selection: 'rgba(0, 255, 102, 0.25)',
    border: 'rgba(0, 255, 102, 0.3)',
    tabActive: '#0d1117',
    tabInactive: '#080c10',
  },
  'apple-dark': {
    id: 'apple-dark',
    name: 'Apple Dark',
    bg: '#1c1c1e',
    windowBg: 'rgba(28, 28, 30, 0.95)',
    titleBg: '#161618',
    text: '#f2f2f7',
    promptUser: '#30d158',
    promptHost: '#bf5af2',
    promptPath: '#64d2ff',
    promptSymbol: '#ff375f',
    accent: '#bf5af2',
    secondary: '#8e8e93',
    cursor: '#ffffff',
    selection: '#3a3a3c',
    border: 'rgba(255, 255, 255, 0.15)',
    tabActive: '#1c1c1e',
    tabInactive: '#161618',
  },
  'apple-light': {
    id: 'apple-light',
    name: 'Apple Light',
    bg: '#f5f5f7',
    windowBg: 'rgba(245, 245, 247, 0.95)',
    titleBg: '#e5e5ea',
    text: '#1c1c1e',
    promptUser: '#28cd41',
    promptHost: '#af52de',
    promptPath: '#007aff',
    promptSymbol: '#ff2d55',
    accent: '#af52de',
    secondary: '#8e8e93',
    cursor: '#000000',
    selection: '#d1d1d6',
    border: 'rgba(0, 0, 0, 0.15)',
    tabActive: '#f5f5f7',
    tabInactive: '#e5e5ea',
  },
}
