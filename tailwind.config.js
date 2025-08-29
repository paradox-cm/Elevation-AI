/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1920px",
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1600px',  // Increased to ensure 1512px triggers lg, not xl
      '2xl': '2560px', // Adjusted for ultra-wide displays like 3360px
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom color palette
        periwinkle: {
          50:  '#f8f7fe',
          100: '#f1eefe',
          200: '#dcd5fc',
          300: '#c7bcfb',
          400: '#9e8af7',
          500: '#7458f4', 
          600: '#684fdc',
          700: '#5742b7',
          800: '#463592',
          900: '#2e2362',
        },
        green: {
          50:  '#f6fdf9',
          100: '#e3faee',
          200: '#baf2d5',
          300: '#91eabb',
          400: '#48db88',
          500: '#12c55d', // vivid green to complement cyan & gold
          600: '#10b055',
          700: '#0d9147',
          800: '#0a7239',
          900: '#064b26',
        },
        red: {
          50:  '#fdf5f4',
          100: '#fcebe9',
          200: '#f7ccc8',
          300: '#f2aea7',
          400: '#e97265',
          500: '#df3523',
          600: '#c93020',
          700: '#a7281a',
          800: '#862015',
          900: '#59150e',
        },
        gold: {
          50:  '#fefcf6',
          100: '#fdf8ed',
          200: '#faeed1',
          300: '#f7e4b6',
          400: '#f1d07f',
          500: '#ebbc48', 
          600: '#d3a943',
          700: '#b38f38',
          800: '#92752e',
          900: '#604e1f',
        },
        magenta: {
          50:  '#fef6fb',
          100: '#fceaf6',
          200: '#f8ccee',
          300: '#f4ade5',
          400: '#ec70d4',
          500: '#e433c3', // vibrant magenta to balance periwinkle & red
          600: '#cd2eaf',
          700: '#aa2691',
          800: '#861f73',
          900: '#59144d',
        },
        cyan: {
          50:  '#f7fcff',
          100: '#effafe',
          200: '#d6f1fd',
          300: '#bde9fc',
          400: '#8cd8f9',
          500: '#5bc8f7', 
          600: '#52b4de',
          700: '#4496b9',
          800: '#377894',
          900: '#245063',
        },
        elevation: {
          50:  '#f5f9ff',
          100: '#e0efff',
          200: '#badbff',
          300: '#94c6ff',
          400: '#479cff',
          500: '#0e62fd', // Site base (PRIMARY MAIN COLOR FOR SITE)
          600: '#0d58e4',
          700: '#0a49bd',
          800: '#083996',
          900: '#052864',
        },
      },
      spacing: {
        '29': '116px',
        '60': '240px',
        '72': '288px',
        '80': '320px',
        '86': '344px',
        '96': '384px',
        '104': '416px',
        '120': '480px',
      },
      maxWidth: {
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1600px',
        'screen-2xl': '2560px',
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.1' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
