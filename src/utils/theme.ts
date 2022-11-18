export type Breakpoints = {
  mobile: number,
  tablet: number,
}
export const breakpoints = {
  mobile: 700,
  tablet: 1080,
}

const theme = {
  breakpoints: {
    mobile: `(max-width: ${breakpoints.mobile - 1}px)`,
    tablet: `(min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet - 1}px)`,
    desktop: `(min-width: ${breakpoints.tablet}px)`,
  },
  color: {
    background: '#F9F9F2',
    text: '#003D3B',
    button: '#FF6340',
    buttonText: '#F9F9F2',
    error: '#B00020',
  },
  font: {
    fontFamily: '"Maison Neue", sans-serif',
    title: {
      fontFamily: '"Clearface ITC Pro", serif',
    },
  },
}

export default theme;