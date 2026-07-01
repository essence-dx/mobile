import * as React from "react"

const DORA_COLORS = [
  "#f59e0b",
  "#ef4444",
  "#fbbf24",
  "#84cc16",
  "#22c55e",
  "#ea580c",
]
const JARVIS_COLORS = [
  "#3b82f6",
  "#0ea5e9",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#1d4ed8",
]

export function PixelCanvas({ palette }: { palette: string[] }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const timeRef = React.useRef(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const size = 32
    const pixelSize = 4
    const cols = size / pixelSize
    const rows = size / pixelSize

    let active = true
    const grid = Array.from({ length: cols * rows }, (_, i) => ({
      hue: (i * 360) / (cols * rows) + Math.random() * 60,
      sat: 70 + Math.random() * 30,
      light: 50 + Math.random() * 20,
      speed: 0.5 + Math.random() * 1.5,
    }))

    function drawFrame(time: number) {
      if (!active) return
      const dt = time - timeRef.current
      timeRef.current = time

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c
          const cell = grid[idx]
          cell.hue = (cell.hue + cell.speed * dt * 0.06) % 360
          const color = palette[idx % palette.length]
          ctx.fillStyle = color
          ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize)
        }
      }
      requestAnimationFrame(drawFrame)
    }

    requestAnimationFrame(drawFrame)
    return () => {
      active = false
    }
  }, [palette])

  return (
    <canvas
      ref={canvasRef}
      width={32}
      height={32}
      className="h-full w-full object-cover"
    />
  )
}

export { DORA_COLORS, JARVIS_COLORS }
