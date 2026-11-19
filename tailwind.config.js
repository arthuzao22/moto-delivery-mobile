/** Mapeia os tokens do global.css para classes (documento 03 §1). */
/** @type {import('tailwindcss').Config} */
const cor = (nome) => `hsl(var(--${nome}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: cor('background'),
        foreground: cor('foreground'),
        heading: cor('heading'),
        card: { DEFAULT: cor('card'), foreground: cor('card-foreground') },
        popover: { DEFAULT: cor('popover'), foreground: cor('popover-foreground') },
        primary: { DEFAULT: cor('primary'), foreground: cor('primary-foreground') },
        secondary: { DEFAULT: cor('secondary'), foreground: cor('secondary-foreground') },
        muted: { DEFAULT: cor('muted'), foreground: cor('muted-foreground') },
        accent: { DEFAULT: cor('accent'), foreground: cor('accent-foreground') },
        attention: cor('attention'),
        destructive: cor('destructive'),
        'brand-text': cor('brand-text'),
        border: cor('border'),
        input: cor('input'),
        ring: cor('ring'),
        chrome: {
          DEFAULT: cor('chrome'),
          foreground: cor('chrome-foreground'),
          border: cor('chrome-border'),
        },
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        medium: ['Inter_500Medium'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
        mono: ['JetBrainsMono_400Regular'],
      },
      borderRadius: { xl: '12px', '2xl': '16px' },
    },
  },
  plugins: [],
};
