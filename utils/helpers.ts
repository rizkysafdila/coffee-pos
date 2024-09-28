import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { ErrorResponse } from '~/types'

export const $breakpoints = useBreakpoints(breakpointsTailwind)
export const isMobile = $breakpoints.smaller('sm') // only smaller than lg
export const isTablet = $breakpoints.smaller('md') // only smaller than md
export const isLaptop = $breakpoints.smaller('xl') // only smaller than xl

export function toCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function getErrorMessage(err: Error) {
  return (err as ErrorResponse).response?.data?.message ?? err.message
}
