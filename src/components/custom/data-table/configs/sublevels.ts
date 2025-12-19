export interface SublevelStyle {
  fontSize: string
  fontWeight: string
  textColor: string
  badgeColor: string
  lineColor: string
  backgroundColor?: string
}

export const sublevelStyles: Record<number, SublevelStyle> = {
  0: {
    fontSize: 'text-sm',
    fontWeight: 'font-semibold',
    textColor: 'text-foreground',
    badgeColor: 'bg-primary text-slate-200',
    lineColor: 'bg-primary',
    backgroundColor: '',
  },
  1: {
    fontSize: 'text-sm',
    fontWeight: 'font-medium',
    textColor: 'text-foreground',
    badgeColor: 'bg-cyan-500 text-slate-200 dark:bg-cyan-600',
    lineColor: 'bg-cyan-500 dark:bg-cyan-600',
  },
  2: {
    fontSize: 'text-sm',
    fontWeight: 'font-normal',
    textColor: 'text-foreground/90',
    badgeColor: 'bg-green-500 text-slate-200 dark:bg-green-600',
    lineColor: 'bg-green-500 dark:bg-green-600',
  },
  3: {
    fontSize: 'text-sm',
    fontWeight: 'font-normal',
    textColor: 'text-foreground/80',
    badgeColor: 'bg-yellow-500 text-slate-200 dark:bg-yellow-600',
    lineColor: 'bg-yellow-500 dark:bg-yellow-600',
  },
  4: {
    fontSize: 'text-sm',
    fontWeight: 'font-normal',
    textColor: 'text-foreground/70',
    badgeColor: 'bg-orange-500 text-slate-200 dark:bg-orange-600',
    lineColor: 'bg-orange-500 dark:bg-orange-600',
  },
  5: {
    fontSize: 'text-xs',
    fontWeight: 'font-normal',
    textColor: 'text-foreground/60',
    badgeColor: 'bg-red-500 text-slate-200 dark:bg-red-600',
    lineColor: 'bg-red-500 dark:bg-red-600',
  },
  6: {
    fontSize: 'text-xs',
    fontWeight: 'font-normal',
    textColor: 'text-muted-foreground',
    badgeColor: 'bg-slate-500 text-slate-200 dark:bg-slate-600',
    lineColor: 'bg-slate-500 dark:bg-slate-600',
  },
}

export const getSublevelClasses = (depth: number): string => {
  const level = Math.min(depth, 6)
  const style = sublevelStyles[level]

  return `${style.fontSize} ${style.fontWeight} ${style.textColor} ${style.backgroundColor || ''}`
}

export const getSublevelBadge = (
  depth: number,
): { label: string; classes: string; lineColor: string } | null => {
  const level = Math.min(depth, 6)
  const style = sublevelStyles[level]

  return {
    label: `Nível ${depth}`,
    classes: style.badgeColor,
    lineColor: style.lineColor,
  }
}

export const getSublevelOrderColor = (depth: number): string => {
  const level = Math.min(depth, 6)
  const colorMap: Record<number, string> = {
    0: 'bg-primary',
    1: 'bg-cyan-500 dark:bg-cyan-600',
    2: 'bg-green-500 dark:bg-green-600',
    3: 'bg-yellow-500 dark:bg-yellow-600',
    4: 'bg-orange-500 dark:bg-orange-600',
    5: 'bg-red-500 dark:bg-red-600',
    6: 'bg-slate-500 dark:bg-slate-600',
  }
  return colorMap[level]
}
