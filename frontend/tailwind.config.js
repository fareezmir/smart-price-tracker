/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Design tokens (dark UI + light purple brand)
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        bg: {
          DEFAULT: '#0B0C0F',
          soft: '#0F1115',
          hard: '#0A0B0E',
        },
        text: {
          hi: '#F5F7FA',
          lo: '#B5B9C3',
          mute: '#8A90A2',
        },
        // Border
        border: '#1A1D24',
        brand: {
          DEFAULT: '#A78BFA', // violet-400
          hover: '#8B5CF6',   // violet-500
          tint: '#EDE9FE',    // violet-100
          fg: '#1B170A',
        },

        // Brand aliases (usage: bg-brandPrimary, hover:bg-brandPrimaryHover)
        brandPrimary: '#A78BFA',
        brandPrimaryHover: '#8B5CF6',
        brandPrimaryTint: '#EDE9FE',
        brandOnPrimary: '#1B170A',

        // Surface aliases (usage: bg-surfaceBase / bg-surfaceRaised)
        surfaceBase: '#0B0C0F',
        surfaceRaised: '#0F1115',
        surfaceSunken: '#0A0B0E',

        // Text aliases (usage: text-textPrimary / text-textSecondary)
        textPrimary: '#F5F7FA',
        textSecondary: '#B5B9C3',
        textMuted: '#8A90A2',

        // Primary purple family
        primaryPurple: '#A78BFA',     // main
        primaryPurpleHover: '#8B5CF6',
        primaryPurpleLight: '#EDE9FE',
        onPrimaryPurple: '#1B170A',

        // Surfaces (dark)
        surfaceBlack: '#0B0C0F',
        surfaceSlate: '#0F1115',
        surfaceJet: '#0A0B0E',

        // Text
        textWhite: '#F5F7FA',
        textGray: '#B5B9C3',
        textGrayMuted: '#8A90A2',

        // Border
        borderSlate: '#1A1D24',
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)', 'Geist', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0,0,0,0.45), 0 2px 10px rgba(0,0,0,0.25)',
        card: '0 12px 50px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
        glow: '0 0 0 8px rgba(167,139,250,0.14), 0 12px 40px -12px rgba(167,139,250,0.45)',
      },
      backgroundImage: {
        'radial-spot':
          'radial-gradient(1000px 600px at 50% -20%, rgba(167,139,250,0.12), transparent 60%)',
      },
      animation: {
        'fade-up': 'fadeUp 600ms ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
