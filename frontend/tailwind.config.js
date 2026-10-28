/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep Obsidian & Void Surfaces (matching user's reference UI)
        obsidian: {
          950: '#04070d', // Ultra-dark matte background
          900: '#070c14', // Primary card/screen surface
          850: '#0a111c', // Secondary container surface
          800: '#0e1624', // Card & panel surface
          750: '#121c2d', // Elevated card surface
          700: '#18253a', // Hairline borders
          600: '#22334e', // Active elements
        },
        navy: {
          950: '#04070d',
          900: '#070c14',
          850: '#0a111c',
          800: '#0e1624',
          750: '#121c2d',
          700: '#18253a',
          600: '#22334e',
        },
        // Signature Neon Mint / Cyber Emerald (from reference UI)
        mint: {
          neon: '#0df2a3', // The glowing primary action & badge color
          glow: '#00e599',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c1d',
        },
        // Cyan & Vitals Accent
        cyan: {
          electric: '#00f5c4',
          neon: '#00f0ff',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0f1f4b',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-mint': '0 0 30px -4px rgba(13, 242, 163, 0.45)',
        'glow-mint-sm': '0 0 16px -2px rgba(13, 242, 163, 0.35)',
        'glow-cyan': '0 0 30px -4px rgba(0, 245, 196, 0.45)',
        'glow-cyan-sm': '0 0 14px -2px rgba(0, 245, 196, 0.35)',
        'cyber-card': '0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(24, 37, 58, 0.8)',
        'cyber-card-mint': '0 12px 45px -8px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(13, 242, 163, 0.35)',
        'cyber-card-hover': '0 15px 45px -8px rgba(13, 242, 163, 0.25), 0 0 0 1px rgba(13, 242, 163, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
