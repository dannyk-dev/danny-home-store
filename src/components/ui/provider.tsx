"use client"

import { ChakraProvider, createSystem, defaultConfig, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  {
            value: '#ffe5e5'
          },
          100: {
            value: '#fdb8b8'
          },
          200: {
            value: '#fb8a8a'
          },
          300: {
            value: '#f85b5b'
          },
          400: {
            value: '#f62c2c'
          },
          500: {
            value: '#e60000'
          }, // primary (soft) red
          600: {
            value: '#b40000'
          },
          700: {
            value: '#820000'
          },
          800: {
            value: '#500000'
          },
          900: {
            value: '#200000'
          },
        },
      },
      fonts: { body: {value: "Geist, Inter, sans-serif"} },
    }
  }
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider  value={theme}>
      <ColorModeProvider  {...props}  />
    </ChakraProvider>
  )
}
