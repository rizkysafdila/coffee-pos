import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export const $breakpoints = useBreakpoints(breakpointsTailwind)
export const isMobile = $breakpoints.smaller('sm') // only smaller than lg
export const isTablet = $breakpoints.smaller('md') // only smaller than md
export const isLaptop = $breakpoints.smaller('xl') // only smaller than xl

export function toCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value)
}

export function toCapitalize(value: string): string {
  return value?.replace(/\b\w/g, match => match.toUpperCase())
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based, so we add 1
  const day = date.getDate().toString().padStart(2, '0')

  return `${day}-${month}-${year}`
}
