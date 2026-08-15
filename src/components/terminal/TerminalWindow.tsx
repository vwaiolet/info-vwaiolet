import React, { useEffect, useState } from 'react'
import { TerminalThemeId } from '@/lib/terminal/types'
import { THEMES, INTRO_CONFIG, README_CONTENT } from '@/lib/terminal/data'
import { VLogoIcon } from './Icons'
import { Palette, ExternalLink } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface TerminalWindowProps {
  themeId: TerminalThemeId
  setThemeId: (theme: TerminalThemeId) => void
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  themeId,
  setThemeId,
}) => {
  const theme = THEMES[themeId] || THEMES.tokyonight
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const config = INTRO_CONFIG

  // Sequential typing state:
  // Step 1: Typing 'ls -al'
  // Step 2: 'ls -al' finished, 'README.md' displayed
  // Step 3: Typing 'cat README.md'
  // Step 4: 'cat README.md' finished, contents displayed
  const [cmd1Text, setCmd1Text] = useState('')
  const [cmd1Done, setCmd1Done] = useState(false)
  const [cmd2Text, setCmd2Text] = useState('')
  const [cmd2Done, setCmd2Done] = useState(false)

  useEffect(() => {
    const cmd1 = 'ls -al'
    const cmd2 = 'cat README.md'
    let timer1: ReturnType<typeof setTimeout>
    let timer2: ReturnType<typeof setTimeout>
    let timer3: ReturnType<typeof setTimeout>
    let timer4: ReturnType<typeof setTimeout>

    // 1. Initial 400ms delay, then type 'ls -al'
    const startTimeout = setTimeout(() => {
      let idx1 = 0
      const typeCmd1 = () => {
        if (idx1 < cmd1.length) {
          idx1++
          setCmd1Text(cmd1.slice(0, idx1))
          timer1 = setTimeout(typeCmd1, 130)
        } else {
          // 'ls -al' finished -> execute after 350ms
          timer2 = setTimeout(() => {
            setCmd1Done(true)

            // 2. Wait 500ms, then start typing 'cat README.md'
            timer3 = setTimeout(() => {
              let idx2 = 0
              const typeCmd2 = () => {
                if (idx2 < cmd2.length) {
                  idx2++
                  setCmd2Text(cmd2.slice(0, idx2))
                  timer4 = setTimeout(typeCmd2, 100)
                } else {
                  // 'cat README.md' finished -> execute after 350ms
                  setTimeout(() => {
                    setCmd2Done(true)
                  }, 350)
                }
              }
              typeCmd2()
            }, 500)
          }, 350)
        }
      }
      typeCmd1()
    }, 400)

    return () => {
      clearTimeout(startTimeout)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const colorBlocks = [
    'bg-slate-700',
    'bg-red-500',
    'bg-emerald-500',
    'bg-yellow-400',
    'bg-blue-500',
    'bg-purple-500',
    'bg-cyan-400',
    'bg-slate-200',
  ]

  const bottomRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [cmd1Text, cmd1Done, cmd2Text, cmd2Done])

  return (
    <div
      className="w-full max-w-5xl h-[85vh] max-h-[740px] min-h-[480px] transition-all duration-300 flex flex-col rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl border relative select-text"
      style={{
        backgroundColor: theme.windowBg,
        borderColor: theme.border,
        boxShadow:
          '0 30px 90px -20px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* macOS Window Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 select-none border-b shrink-0"
        style={{
          backgroundColor: theme.titleBg,
          borderColor: theme.border,
        }}
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] opacity-85" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] opacity-85" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] opacity-85" />
        </div>

        {/* Centered Window Title */}
        <div className="text-xs font-mono text-slate-400 font-medium tracking-tight">
          zsh
        </div>

        {/* Theme Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10 transition-colors cursor-pointer"
            title="Change Theme"
          >
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px]">{theme.name}</span>
          </button>

          {themeDropdownOpen && (
            <div
              className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-[#16161e] border border-white/15 shadow-2xl p-1.5 z-50 text-xs font-mono space-y-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-2 py-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Terminal Themes
              </div>
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setThemeId(t.id)
                    setThemeDropdownOpen(false)
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    t.id === themeId
                      ? 'bg-purple-600/30 text-purple-300 font-bold'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span>{t.name}</span>
                  <div
                    className="w-2.5 h-2.5 rounded-full border border-white/20"
                    style={{ backgroundColor: t.accent }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div
        className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 font-mono text-xs sm:text-sm selection:bg-purple-500/40 selection:text-white space-y-4 cursor-default"
        style={{ color: theme.text }}
      >
        {/* Session Timestamp */}
        <div className="text-slate-400 text-xs opacity-90">
          Last login: {new Date().toLocaleString()} on ttys001
        </div>

        {/* Neofetch Profile Card */}
        <div className="my-2.5 p-4 sm:p-5 rounded-xl bg-black/25 border border-purple-500/15 font-mono text-xs sm:text-sm flex flex-col md:flex-row gap-5 items-center md:items-start">
          {/* V Logo Emblem / ASCII Art */}
          {config.logoType === 'svg' ? (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-purple-500/20 to-purple-900/30 border border-purple-500/30 flex items-center justify-center p-3 shadow-lg shadow-purple-950/40 shrink-0 self-center md:self-start">
              <VLogoIcon className="w-full h-full drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
            </div>
          ) : (
            <pre
              className="select-none font-bold text-xs sm:text-sm leading-tight whitespace-pre drop-shadow shrink-0 font-mono tracking-wider py-1"
              style={{
                color: theme.accent || '#cba6f7',
                textShadow: '0 0 12px rgba(168, 85, 247, 0.4)',
              }}
            >
              {config.asciiArt}
            </pre>
          )}

          {/* Profile Specs */}
          <div className="flex-1 space-y-1.5 w-full min-w-0">
            {/* Header line */}
            <div className="pb-1 border-b border-white/10">
              <span className="font-bold text-emerald-400" style={{ color: theme.promptUser }}>
                {config.user}
              </span>
              <span className="text-slate-400">@</span>
              <span className="font-bold text-purple-400" style={{ color: theme.promptHost }}>
                {config.host}
              </span>
              <div className="text-slate-600 text-[10px] select-none">
                ------------------------------------------------
              </div>
            </div>

            {/* Fields List */}
            <div className="space-y-1.5 pt-0.5 text-xs">
              {config.fields.map((f, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:gap-2 leading-relaxed">
                  <span
                    className={`w-24 shrink-0 font-semibold ${
                      f.isHighlight ? 'text-purple-300' : 'text-slate-400'
                    }`}
                  >
                    {f.label}:
                  </span>
                  {f.href ? (
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 hover:underline inline-flex items-center gap-1 break-all"
                    >
                      <span>{f.value}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                    </a>
                  ) : (
                    <span
                      className={
                        f.isHighlight
                          ? 'text-white font-medium break-words'
                          : 'text-slate-200 break-words'
                      }
                    >
                      {f.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Quote if exists */}
            {config.quote && (
              <div className="pt-2 text-xs text-slate-300/90 leading-relaxed font-sans border-t border-white/5">
                {config.quote}
              </div>
            )}

            {/* Color Bars */}
            <div className="pt-2 flex gap-1.5">
              {colorBlocks.map((c, i) => (
                <div key={i} className={`w-5 sm:w-6 h-2.5 sm:h-3 rounded-sm ${c}`} />
              ))}
            </div>
          </div>
        </div>

        {/* 1. Command 1 Line: ls -al */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className="font-bold text-emerald-400"
              style={{ color: theme.promptUser }}
            >
              vwaiolet@gyeongho-kim
            </span>
            <span
              className="font-bold text-cyan-400"
              style={{ color: theme.promptPath }}
            >
              ~
            </span>
            <span
              className="font-bold text-slate-200"
              style={{ color: theme.promptSymbol || theme.text }}
            >
              %
            </span>
            <span className="font-bold text-slate-100 ml-1 tracking-wider">
              {cmd1Text}
            </span>
            {!cmd1Done && (
              <span
                className="inline-block w-2.5 h-4 bg-slate-100 animate-pulse ml-0.5 align-middle"
                style={{ backgroundColor: theme.cursor }}
              />
            )}
          </div>

          {/* 2. Output of ls -al: README.md */}
          {cmd1Done && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="py-0.5 px-1 font-mono text-xs sm:text-sm">
                <span className="font-bold text-cyan-300 hover:underline cursor-default">
                  README.md
                </span>
              </div>

              {/* 3. Command 2 Line: cat README.md */}
              <div className="flex items-center gap-1.5 leading-none pt-1">
                <span
                  className="font-bold text-emerald-400"
                  style={{ color: theme.promptUser }}
                >
                  vwaiolet@gyeongho-kim
                </span>
                <span
                  className="font-bold text-cyan-400"
                  style={{ color: theme.promptPath }}
                >
                  ~
                </span>
                <span
                  className="font-bold text-slate-200"
                  style={{ color: theme.promptSymbol || theme.text }}
                >
                  %
                </span>
                <span className="font-bold text-slate-100 ml-1 tracking-wider">
                  {cmd2Text}
                </span>
                {!cmd2Done && (
                  <span
                    className="inline-block w-2.5 h-4 bg-slate-100 animate-pulse ml-0.5 align-middle"
                    style={{ backgroundColor: theme.cursor }}
                  />
                )}
              </div>

              {/* 4. Output of cat README.md (Rendered Markdown) */}
              {cmd2Done && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="p-4 sm:p-5 rounded-xl bg-black/25 border border-white/10 text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => (
                          <p className="my-2.5 leading-relaxed text-slate-200">
                            {children}
                          </p>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="my-3.5 pl-3.5 border-l-2 border-purple-400 bg-purple-950/20 py-2 pr-3 rounded-r-lg italic text-purple-200/95 leading-relaxed text-xs sm:text-sm">
                            {children}
                          </blockquote>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-4 decoration-cyan-400/50 inline-flex items-center gap-1"
                          >
                            <span>{children}</span>
                            <ExternalLink className="w-3 h-3 inline-block opacity-80" />
                          </a>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-white font-bold">{children}</strong>
                        ),
                        code: ({ children }) => (
                          <code className="px-1.5 py-0.5 rounded bg-white/10 text-purple-300 font-mono text-xs">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {README_CONTENT}
                    </ReactMarkdown>
                  </div>

                  {/* 5. Final Ready Prompt */}
                  <div className="flex items-center gap-1.5 leading-none pt-1">
                    <span
                      className="font-bold text-emerald-400"
                      style={{ color: theme.promptUser }}
                    >
                      vwaiolet@gyeongho-kim
                    </span>
                    <span
                      className="font-bold text-cyan-400"
                      style={{ color: theme.promptPath }}
                    >
                      ~
                    </span>
                    <span
                      className="font-bold text-slate-200"
                      style={{ color: theme.promptSymbol || theme.text }}
                    >
                      %
                    </span>
                    <span
                      className="inline-block w-2.5 h-4 bg-slate-100 animate-pulse ml-1 align-middle"
                      style={{ backgroundColor: theme.cursor }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
