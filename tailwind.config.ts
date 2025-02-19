import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                fluo: {
                    DEFAULT: 'var(--fluo)',
                    primary: 'var(--fluo-primary)',
                    deep: 'var(--fluo-deep)',
                    light: 'var(--fluo-light)',
                    soft: 'var(--fluo-soft)',
                    pale: 'var(--fluo-pale)',
                    mute: 'var(--fluo-mute)',
                    background: 'var(--fluo-background)',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                pulse: {
                    100: '#0000330F',
                    200: '#00002D17',
                    300: '#DDEAF814',
                    400: '#D3EDF81D',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            backgroundImage: {
                'gradient-fluo': 'linear-gradient(180deg, var(--fluo-gradual-start), var(--fluo-gradual-end))',
                'gradient-fluo-tr': 'linear-gradient(to right, var(--fluo-gradual-start), var(--fluo-gradual-end))',
                'gradient-four-c3': 'linear-gradient(to right, #22d8e0 30%, #10b981 60%, #facc15 100%)',
                'gradient-four-c4': 'linear-gradient(to right, #6366f1 25%, #22d8e0 50%, #10b981 75%, #facc15 100%)',
            },
            animation: {
                surf: 'surf 1s infinite ease-in-out',
                'pulse-speed': 'pulse 600ms infinite alternate-reverse',
            },
            keyframes: {
                surf: {
                    '0%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(0, 6px)' },
                    '50%': { transform: 'translate(0, -6px)' },
                    '75%': { transform: 'translate(0, 3px)' },
                    '100%': { transform: 'translate(0, 0)' },
                },
                pulse: {
                    from: { background: 'theme("colors.pulse.100")' },
                    to: { background: 'theme("colors.pulse.200")' },
                },
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
