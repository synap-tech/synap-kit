import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

import { colors } from './src/config/tailwind';

export default {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/stories/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        geist: ['var(--font-geist)'],
      },
      colors: {
        background: colors.BACKGROUND,
        foreground: colors.FOREGROUND,

        white: colors.WHITE,
        black: colors.BLACK,

        card: {
          DEFAULT: colors.CARD,
          foreground: colors.CARD_FOREGROUND,
        },
        popover: {
          DEFAULT: colors.POPOVER,
          foreground: colors.POPOVER_FOREGROUND,
        },
        primary: {
          DEFAULT: colors.PRIMARY,
          foreground: colors.PRIMARY_FOREGROUND,
        },
        secondary: {
          DEFAULT: colors.SECONDARY,
          foreground: colors.SECONDARY_FOREGROUND,
          light: colors.SECONDARY_LIGHT,
        },

        layout: {
          background: colors.LAYOUT_BACKGROUND,
          foreground: colors.LAYOUT_FOREGROUND,
        },
        sidebar: {
          DEFAULT: colors.SIDEBAR_BACKGROUND,
          background: colors.SIDEBAR_BACKGROUND,
          foreground: colors.SIDEBAR_FOREGROUND,
          'active-background': colors.SIDEBAR_ACTIVE_BACKGROUND,
          'active-foreground': colors.SIDEBAR_ACTIVE_FOREGROUND,
          accent: colors.SIDEBAR_ACCENT,
          'accent-foreground': colors.SIDEBAR_ACCENT_FOREGROUND,
        },
        muted: {
          DEFAULT: colors.MUTED,
          foreground: colors.MUTED_FOREGROUND,
        },

        accent: {
          DEFAULT: colors.ACCENT,
          foreground: colors.ACCENT_FOREGROUND,
        },

        success: {
          DEFAULT: colors.SUCCESS,
          foreground: colors.SUCCESS_FOREGROUND,
        },
        warning: {
          DEFAULT: colors.WARNING,
          foreground: colors.WARNING_FOREGROUND,
        },
        destructive: {
          DEFAULT: colors.DESTRUCTIVE,
          foreground: colors.DESTRUCTIVE_FOREGROUND,
        },

        border: colors.BORDER,
        input: colors.INPUT,
        ring: colors.RING,

        chart: {
          '1': colors.CHART_1,
          '2': colors.CHART_2,
          '3': colors.CHART_3,
          '4': colors.CHART_4,
          '5': colors.CHART_5,
        },

        base: {
          DEFAULT: colors.BASE,
          foreground: colors.BASE_FOREGROUND,
          100: colors.BASE_100,
          150: colors.BASE_150,
          200: colors.BASE_200,
          300: colors.BASE_300,
          400: colors.BASE_400,
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
    },
  },

  plugins: [tailwindcssAnimate],
} satisfies Config;
