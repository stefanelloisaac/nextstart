import { sublevelStyles } from '../configs/sublevels'

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
