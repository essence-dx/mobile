"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Archive,
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code,
  Cog,
  Database,
  FileText,
  Folder,
  Ghost,
  Grid3x3,
  Lightbulb,
  LogOut,
  Menu,
  MessageSquare,
  MessageSquarePlus,
  Mic,
  Moon,
  MoreHorizontal,
  Paintbrush,
  Paperclip,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Settings,
  Share2,
  Sliders,
  Sparkles,
  Sun,
  User,
  X,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { useLocalStorage, useMediaQuery } from "./hooks"
import {
  SettingsAccount,
  SettingsAppearance,
  SettingsCustomize,
  SettingsPlaceholder,
} from "./settings"
import {
  BotMessageActions,
  HistoryItem,
  LogoIcon,
  SidebarItem,
  SidebarSubItem,
  SourceBadge,
  SourceItem,
  ThoughtProcess,
  VoiceBar,
} from "./ui"

type RightPanel = "thoughts" | "sources" | "files" | null

export function DxChat({ swapped }: { swapped?: boolean }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage(
    "dx-sidebar-collapsed",
    true
  )
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [rightPanel, setRightPanel] = useLocalStorage<RightPanel>(
    "dx-right-panel",
    null
  )
  const [inputValue, setInputValue] = React.useState("")
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [isVoiceMode, setIsVoiceMode] = React.useState(false)
  const [projectsOpen, setProjectsOpen] = useLocalStorage(
    "dx-projects-open",
    true
  )
  const [historyOpen, setHistoryOpen] = useLocalStorage("dx-history-open", true)
  const [darkMode, setDarkMode] = useLocalStorage("dx-dark-mode", false)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [settingsTab, setSettingsTab] = React.useState("account")

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleDarkMode = React.useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return next
    })
  }, [setDarkMode])

  const scrollViewportRef = React.useRef<HTMLDivElement>(null)
  const [showScrollBtn, setShowScrollBtn] = React.useState(false)

  const handleScroll = React.useCallback(() => {
    const viewport = scrollViewportRef.current
    if (!viewport) return
    const { scrollTop, scrollHeight, clientHeight } = viewport
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    setShowScrollBtn(distanceFromBottom > 100)
  }, [])

  const scrollToBottom = React.useCallback(() => {
    const viewport = scrollViewportRef.current
    if (!viewport) return
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" })
  }, [])

  const openRightPanel = React.useCallback(
    (panel: RightPanel) => {
      setRightPanel((prev) => (prev === panel ? null : panel))
    },
    [setRightPanel]
  )

  const closeRightPanel = React.useCallback(() => {
    setRightPanel(null)
  }, [setRightPanel])

  const handleSendMessage = React.useCallback(() => {
    if (!inputValue.trim() || isConnecting) return
    setIsConnecting(true)
    setTimeout(() => setIsConnecting(false), 2000)
    setInputValue("")
  }, [inputValue, isConnecting])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage]
  )

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {(mobileSidebarOpen || rightPanel) && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(2px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => {
              setMobileSidebarOpen(false)
              closeRightPanel()
            }}
          />
        )}
      </AnimatePresence>

      {/* LEFT SIDEBAR */}
      <motion.aside
        initial={false}
        className={cn(
          "absolute top-0 left-0 z-50 flex h-full flex-shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:relative",
          "shadow-2xl md:shadow-none",
          sidebarCollapsed ? "w-[68px]" : "w-[260px]"
        )}
        animate={{
          x: isDesktop ? 0 : mobileSidebarOpen ? 0 : "-100%",
          width: sidebarCollapsed ? 68 : 260,
        }}
        transition={{
          x: { type: "spring", stiffness: 400, damping: 30 },
          width: { type: "spring", stiffness: 300, damping: 30 },
        }}
        style={
          swapped
            ? ({
                "--color-sidebar": "var(--color-background)",
                "--color-sidebar-foreground": "var(--color-foreground)",
                "--color-sidebar-border": "var(--color-border)",
                "--color-sidebar-primary": "var(--color-primary)",
                "--color-sidebar-primary-foreground":
                  "var(--color-primary-foreground)",
                "--color-sidebar-accent": "var(--color-accent)",
                "--color-sidebar-accent-foreground":
                  "var(--color-accent-foreground)",
                "--color-sidebar-ring": "var(--color-ring)",
              } as React.CSSProperties)
            : undefined
        }
      >
        {/* Sidebar Header */}
        {sidebarCollapsed ? (
          <div className="flex h-14 items-center justify-center">
            <LogoIcon className="size-5 shrink-0 text-sidebar-foreground" />
          </div>
        ) : (
          <div className="flex h-14 items-center px-4 pt-2">
            <LogoIcon className="size-6 shrink-0 text-sidebar-foreground" />
            <span className="ml-2 font-bold text-sidebar-foreground md:hidden">
              SuperGrok
            </span>
            <div className="ml-auto flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-xs"
                className="hidden text-muted-foreground md:flex"
                onClick={() => setSidebarCollapsed(true)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground"
                onClick={() => setSettingsOpen(true)}
              >
                <Cog className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <motion.div
          className={cn(
            "space-y-0.5 pt-4 pb-4",
            sidebarCollapsed ? "flex flex-col items-center" : "px-3"
          )}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -8, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                },
              },
            }}
          >
            <SidebarItem
              icon={Search}
              label="Search"
              collapsed={sidebarCollapsed}
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -8, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                },
              },
            }}
          >
            <SidebarItem
              icon={MessageSquarePlus}
              label="New Chat"
              collapsed={sidebarCollapsed}
              active
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -8, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                },
              },
            }}
          >
            <SidebarItem
              icon={Sparkles}
              label="Imagine"
              collapsed={sidebarCollapsed}
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -8, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                },
              },
            }}
          >
            <SidebarItem
              icon={Rocket}
              label="Skills and Connectors"
              collapsed={sidebarCollapsed}
              badge="New"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -8, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                },
              },
            }}
          >
            <SidebarItem
              icon={Settings}
              label="Settings"
              collapsed={sidebarCollapsed}
            />
          </motion.div>
        </motion.div>

        {/* Scrollable Middle */}
        <ScrollArea className="flex-1 px-3">
          {sidebarCollapsed ? (
            <>
              <Separator className="mx-3 my-2" />
              <div className="flex flex-col items-center gap-1 py-2">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                >
                  <Plus className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                >
                  <Folder className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                >
                  <Clock className="size-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Collapsible open={projectsOpen} onOpenChange={setProjectsOpen}>
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted md:text-sm">
                    <ChevronRight
                      className={cn(
                        "size-4 transition-transform",
                        projectsOpen && "rotate-90"
                      )}
                    />
                    <span>Projects</span>
                    <Plus className="ml-auto size-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-0.5 pb-2 pl-6">
                  <SidebarSubItem
                    icon={Grid3x3}
                    label="dx-cpp"
                    collapsed={false}
                  />
                  <SidebarSubItem
                    icon={Code}
                    label="dx-rust"
                    collapsed={false}
                  />
                  <SidebarSubItem
                    icon={Ghost}
                    label="dx-ghost"
                    collapsed={false}
                  />
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted md:text-sm">
                    <ChevronRight
                      className={cn(
                        "size-4 transition-transform",
                        historyOpen && "rotate-90"
                      )}
                    />
                    <span>History</span>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-0.5 pb-2 pl-6">
                  <HistoryItem
                    icon={MessageSquare}
                    label="React Hooks Guide"
                    collapsed={false}
                    active
                  />
                  <HistoryItem
                    icon={MessageSquare}
                    label="TypeScript Generics"
                    collapsed={false}
                  />
                  <HistoryItem
                    icon={MessageSquare}
                    label="Next.js 14 App Router"
                    collapsed={false}
                  />
                  <HistoryItem
                    icon={MessageSquare}
                    label="Framer Motion Animations"
                    collapsed={false}
                  />
                </CollapsibleContent>
              </Collapsible>
              <div className="h-4" />
            </>
          )}
        </ScrollArea>

        {/* Profile Footer */}
        <div className="bg-sidebar p-3">
          <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
            <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              EF
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 overflow-hidden">
                <div className="truncate text-xs font-medium text-foreground">
                  Essence From Existence
                </div>
                <div className="truncate text-[10px] text-muted-foreground">
                  essencefromexistence@gmail.com
                </div>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 size-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="mr-2 size-4" />
                  Archived
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sun className="mr-2 size-4" />
                  Light mode
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Moon className="mr-2 size-4" />
                  Dark mode
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-border px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-xs"
              className="md:hidden"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <h1 className="text-[15px] font-semibold text-foreground md:text-base">
              SuperGrok
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground"
            >
              <Share2 className="size-4" />
            </Button>
          </div>
        </header>

        {/* Chat Content */}
        <div className="min-h-0 flex-1">
          <ScrollArea
            viewportRef={scrollViewportRef}
            onScroll={handleScroll}
            className="h-full px-4 md:px-6"
          >
            <div className="mx-auto max-w-3xl py-6">
              {/* Welcome Message */}
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
                  Welcome to SuperGrok
                </h2>
                <p className="text-sm text-muted-foreground md:text-base">
                  Your AI assistant for coding, creativity, and productivity
                </p>
              </div>

              {/* Sample Messages */}
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    EF
                  </div>
                  <div className="flex-1">
                    <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-foreground md:text-base">
                      <p>
                        Can you help me understand React Hooks and how to use
                        them effectively?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    SG
                  </div>
                  <div className="flex-1">
                    <div className="rounded-2xl bg-background px-4 py-3 text-sm text-foreground shadow-sm md:text-base">
                      <p className="mb-3">
                        Of course! React Hooks are functions that let you use
                        state and other React features in functional components.
                      </p>
                      <ThoughtProcess
                        label="React Hooks"
                        onOpenThoughts={() => openRightPanel("thoughts")}
                      />
                      <div className="mt-3 space-y-2">
                        <SourceBadge
                          label="React Docs"
                          domain="react"
                          onClick={() => openRightPanel("sources")}
                        />
                        <SourceBadge
                          label="MDN Web Docs"
                          domain="mdn"
                          onClick={() => openRightPanel("sources")}
                        />
                      </div>
                      <BotMessageActions />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Scroll to Bottom Button */}
        <div className="absolute bottom-36 left-1/2 z-30 -translate-x-1/2 md:bottom-40">
          <motion.button
            onClick={scrollToBottom}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md hover:bg-muted hover:text-foreground md:size-9"
            animate={{
              y: showScrollBtn ? 0 : 20,
              opacity: showScrollBtn ? 1 : 0,
              scale: showScrollBtn ? 1 : 0.8,
              pointerEvents: showScrollBtn
                ? ("auto" as const)
                : ("none" as const),
            }}
            transition={{
              y: { type: "spring", stiffness: 400, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { type: "spring", stiffness: 400, damping: 30 },
            }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowDown className="size-4" />
          </motion.button>
        </div>

        {/* Chat Input */}
        <div className="border-t border-border bg-background p-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="relative flex items-center gap-2 rounded-2xl border border-border bg-muted px-4 py-3 transition-colors focus-within:border-primary md:px-5 md:py-4">
              <Button
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground"
              >
                <Paperclip className="size-4" />
              </Button>
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message SuperGrok..."
                className="min-h-0 flex-1 resize-none border-none bg-transparent p-0 text-[15px] shadow-none outline-none placeholder:text-muted-foreground md:text-base"
                rows={1}
              />
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                  onClick={() => setIsVoiceMode(!isVoiceMode)}
                >
                  <Mic className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isConnecting}
                >
                  {isConnecting ? (
                    <RefreshCw className="size-4 animate-spin" />
                  ) : (
                    <ArrowUp className="size-4" />
                  )}
                </Button>
              </div>

              {/* Voice Mode Overlay */}
              <AnimatePresence>
                {isVoiceMode && (
                  <motion.div
                    initial={{ opacity: 0, pointerEvents: "none" }}
                    animate={{
                      opacity: 1,
                      pointerEvents: "auto" as const,
                    }}
                    exit={{ opacity: 0, pointerEvents: "none" }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background",
                      rightPanel
                        ? "pointer-events-auto z-10 scale-100 opacity-100"
                        : "pointer-events-none z-0 scale-95 opacity-0"
                    )}
                  >
                    <div className="flex h-full flex-1 items-center">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="rounded-full text-muted-foreground"
                      >
                        <Paperclip className="size-4" />
                      </Button>
                      <Input
                        placeholder="Speak now or type..."
                        className="h-full flex-1 border-none bg-transparent px-2 text-[15px] font-medium text-foreground shadow-none outline-none placeholder:text-blue-400 md:px-3"
                      />
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-1.5 md:gap-2">
                      <div className="flex h-[38px] items-center gap-2 rounded-full border border-blue-100 bg-blue-50 pr-1 pl-3 md:h-[42px] md:gap-3 md:pr-1.5 md:pl-4 dark:border-blue-900 dark:bg-blue-950">
                        <div className="flex h-4 items-center gap-[3px] md:h-5">
                          <VoiceBar delay="0.1s" height={40} />
                          <VoiceBar delay="0.3s" height={80} />
                          <VoiceBar delay="0.5s" height={60} />
                          <VoiceBar delay="0.2s" height={100} />
                          <VoiceBar delay="0.6s" height={50} />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="rounded-full text-blue-600 dark:text-blue-400"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="rounded-full text-muted-foreground"
                      >
                        <ArrowUp className="size-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex flex-shrink-0 flex-col overflow-hidden border-l bg-sidebar shadow-[-4px_0_20px_rgba(0,0,0,0.08)] md:relative",
          swapped ? "border-sidebar-border" : "border-border"
        )}
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: rightPanel ? 340 : 0,
          opacity: rightPanel ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 350, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        style={
          swapped
            ? ({
                "--color-sidebar": "var(--color-background)",
                "--color-background": "var(--color-sidebar)",
                "--color-foreground": "var(--color-sidebar-foreground)",
                "--color-muted": "var(--color-sidebar-accent)",
                "--color-muted-foreground":
                  "var(--color-sidebar-accent-foreground)",
                "--color-accent": "var(--color-sidebar-accent)",
                "--color-accent-foreground":
                  "var(--color-sidebar-accent-foreground)",
                "--color-card": "var(--color-sidebar)",
                "--color-card-foreground": "var(--color-sidebar-foreground)",
                "--color-popover": "var(--color-sidebar)",
                "--color-popover-foreground": "var(--color-sidebar-foreground)",
                "--color-ring": "var(--color-sidebar-ring)",
              } as React.CSSProperties)
            : undefined
        }
      >
        <div className="flex h-full flex-col">
          {/* Right Panel Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">
              {rightPanel === "thoughts" && "Thoughts"}
              {rightPanel === "sources" && "Sources"}
              {rightPanel === "files" && "Files"}
            </h3>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground"
              onClick={closeRightPanel}
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Thoughts */}
          <ScrollArea
            className={cn(
              "flex-1 p-4 md:p-5",
              rightPanel !== "thoughts" && "hidden"
            )}
          >
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Lightbulb className="size-3" />
                  <span>Thinking process</span>
                </div>
                <p className="text-sm text-foreground">
                  User is asking about React Hooks. I should explain the basic
                  concepts and provide examples of common hooks like useState,
                  useEffect, and useContext.
                </p>
              </div>
            </div>
          </ScrollArea>

          {/* Sources */}
          <ScrollArea
            className={cn(
              "flex-1 p-4 md:p-5",
              rightPanel !== "sources" && "hidden"
            )}
          >
            <div className="space-y-3">
              <SourceItem
                searched="react hooks"
                title="React Hooks – React"
                score="10"
              />
              <SourceItem
                searched="usestate hook"
                title="useState Hook Reference"
                score="9"
              />
              <SourceItem
                searched="useeffect hook"
                title="useEffect Hook Reference"
                score="8"
              />
            </div>
          </ScrollArea>

          {/* Files */}
          <ScrollArea
            className={cn("flex-1", rightPanel !== "files" && "hidden")}
          >
            <div className="py-2">
              <button className="flex w-full items-center justify-between px-4 py-3 text-left text-[14px] text-foreground/80 transition-colors hover:bg-muted md:px-5">
                <div className="flex items-start gap-3">
                  <Folder className="mt-0.5 size-[18px] text-muted-foreground/40" />
                  <div>
                    <div className="font-medium text-foreground">dx-cpp</div>
                    <div className="text-[12px] text-muted-foreground">
                      42 files &middot; Updated 2d ago
                    </div>
                  </div>
                </div>
                <ChevronRight className="size-3 text-muted-foreground" />
              </button>
              <button className="flex w-full items-center justify-between px-4 py-3 text-left text-[14px] text-foreground/80 transition-colors hover:bg-muted md:px-5">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 size-[18px] text-muted-foreground/40" />
                  <div>
                    <div className="font-medium text-foreground">
                      dx-cpp.zip
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      21.8 KB &middot; Updated 1d ago
                    </div>
                  </div>
                </div>
                <ChevronRight className="size-3 text-muted-foreground" />
              </button>
            </div>
          </ScrollArea>
        </div>
      </motion.aside>

      {/* SETTINGS DIALOG */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="flex h-full max-h-[90vh] w-full max-w-[100vw] flex-col gap-0 overflow-hidden rounded-2xl border-border bg-muted p-0 md:h-[650px] md:w-[900px] md:max-w-[95vw] md:flex-row"
        >
          <DialogTitle className="sr-only">Settings</DialogTitle>
          {/* Settings Sidebar */}
          <div className="z-10 no-scrollbar flex w-full flex-shrink-0 flex-row overflow-x-auto border-b border-border bg-background px-2 py-2 whitespace-nowrap shadow-sm md:w-[220px] md:flex-col md:border-r md:border-b-0 md:px-3 md:py-4 md:shadow-none">
            <div className="flex w-max flex-row gap-1 md:w-full md:flex-col">
              {[
                { id: "account", label: "Account", icon: User },
                { id: "appearance", label: "Appearance", icon: Paintbrush },
                { id: "behavior", label: "Behavior", icon: Sparkles },
                { id: "customize", label: "Customize", icon: Sliders },
                {
                  id: "datacontrols",
                  label: "Data Controls",
                  icon: Database,
                },
                {
                  id: "subscription",
                  label: "Subscription",
                  icon: DollarSign,
                },
                { id: "usage", label: "Usage", icon: Zap },
              ].map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => setSettingsTab(id)}
                  className={cn(
                    "flex flex-shrink-0 items-center justify-center gap-2 rounded-full px-3 py-2 text-[13px] font-medium transition-colors md:justify-start md:gap-3 md:rounded-lg md:px-3 md:text-[14px]",
                    settingsTab === id
                      ? "bg-muted-foreground/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted-foreground/5"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon className="hidden size-[18px] md:inline-block" />
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="relative flex h-full flex-1 flex-col overflow-hidden bg-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={settingsTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="flex h-full flex-1 flex-col"
              >
                <ScrollArea className="flex-1 p-4 pt-6 md:p-8">
                  {settingsTab === "account" && <SettingsAccount />}
                  {settingsTab === "appearance" && (
                    <SettingsAppearance
                      darkMode={darkMode}
                      onToggleDarkMode={toggleDarkMode}
                    />
                  )}
                  {settingsTab === "customize" && <SettingsCustomize />}
                  {settingsTab === "behavior" && (
                    <SettingsPlaceholder title="Behavior" />
                  )}
                  {settingsTab === "datacontrols" && (
                    <SettingsPlaceholder title="Data Controls" />
                  )}
                  {settingsTab === "subscription" && (
                    <SettingsPlaceholder title="Subscription" />
                  )}
                  {settingsTab === "usage" && (
                    <SettingsPlaceholder title="Usage" />
                  )}
                </ScrollArea>
              </motion.div>
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
