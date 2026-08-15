import React, { useEffect, useState } from 'react'
import { TerminalThemeId } from '@/lib/terminal/types'
import { TerminalWindow } from './TerminalWindow'
import { THEMES } from '@/lib/terminal/data'
import { VLogoIcon } from './Icons'
import {
  Wifi,
  Battery,
  Search,
  Sliders,
  Palette,
} from 'lucide-react'

export const MacDesktop: React.FC = () => {
  const [themeId, setThemeId] = useState<TerminalThemeId>('tokyonight')

  // Live system clock
  const [timeStr, setTimeStr] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }
      setTimeStr(now.toLocaleString('en-US', options).replace(',', ''))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="h-screen w-screen relative overflow-hidden flex flex-col justify-between select-none bg-slate-950 font-sans text-slate-100"
      style={{
        background:
          'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 45%, #020617 100%)',
      }}
    >
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[45rem] h-[45rem] bg-violet-600/15 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/2 -right-40 w-[40rem] h-[40rem] bg-fuchsia-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-40 left-10 w-[35rem] h-[35rem] bg-indigo-600/15 rounded-full blur-[130px]" />
      </div>

      {/* 1. macOS Top Menu Bar */}
      <header className="relative z-40 h-8 px-3 bg-black/40 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between text-xs text-slate-200 select-none shadow-sm">
        {/* Left Menu Items (V Logo & Terminal Title) */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center p-0.5" title="VWAIOLET">
            <VLogoIcon className="w-4 h-4" />
          </div>
          <span className="font-bold text-white tracking-tight cursor-default">Terminal</span>
        </div>

        {/* Right Status Tray */}
        <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
          {/* Active Theme Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px]">
            <Palette className="w-3 h-3 text-purple-400" />
            <span className="text-slate-300">{THEMES[themeId]?.name}</span>
          </div>

          {/* Wi-Fi & Battery */}
          <div className="flex items-center gap-2">
            <span title="Connected: 10Gbps Fiber">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] hidden sm:inline">100%</span>
              <Battery className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Control Center & Search */}
          <Sliders className="w-3 h-3 text-slate-400 hidden sm:inline" />
          <Search className="w-3 h-3 text-slate-400 hidden sm:inline" />

          {/* Live Date / Clock */}
          <span className="font-sans font-medium text-slate-200 ml-1 whitespace-nowrap">
            {timeStr}
          </span>
        </div>
      </header>

      {/* 2. Desktop Center: MacBook Terminal Window */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8">
        <TerminalWindow
          themeId={themeId}
          setThemeId={setThemeId}
        />
      </main>
    </div>
  )
}
