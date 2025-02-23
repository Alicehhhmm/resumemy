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
                green: {
                    100: '#EDF2EB',
                    200: '#C5E5B4',
                    300: '#99CC7D',
                    400: '#84BA64',
                    500: '#5FA04E',
                    600: '#417E38',
                    700: '#2C682C',
                    800: '#2C682C',
                    900: '#1A3F1D',
                },
                neutral: {
                    100: '#F6F7F9',
                    200: '#E9EDF0',
                    300: '#D9E1E4',
                    400: '#CBD4D9',
                    500: '#B1BCC2',
                    600: '#929FA5',
                    700: '#6E7B83',
                    800: '#556066',
                    900: '#2C3437',
                    950: '#0D121C',
                },
                danger: {
                    100: '#FBF1F0',
                    200: '#FAD3D4',
                    300: '#FAB6B7',
                    400: '#FA8E8E',
                    500: '#F65354',
                    600: '#DE1A1B',
                    700: '#B80C0C',
                    800: '#900E0E',
                    900: '#661514',
                },
                warning: {
                    100: '#FDF3E7',
                    200: '#FAD9B0',
                    300: '#F5BC75',
                    400: '#E99C40',
                    500: '#D07912',
                    600: '#AE5F00',
                    700: '#8B4D04',
                    800: '#683D08',
                    900: '#4D2F0B',
                },
                info: {
                    100: '#E9F4FA',
                    200: '#BCE6FC',
                    300: '#8ED4F8',
                    400: '#52BAED',
                    500: '#229AD6',
                    600: '#0C7BB3',
                    700: '#066291',
                    800: '#074D71',
                    900: '#0A3953',
                },
                accent1: {
                    100: '#F7F1FB',
                    200: '#EAD9FB',
                    300: '#DBBDF9',
                    400: '#C79BF2',
                    500: '#AF74E8',
                    600: '#9756D6',
                    700: '#7D3CBE',
                    800: '#642B9E',
                    900: '#361B52',
                },
                accent2: {
                    100: '#FBF0F4',
                    200: '#FBD4E6',
                    300: '#FBB4D2',
                    400: '#F68BB7',
                    500: '#ED5393',
                    600: '#D6246E',
                    700: '#B01356',
                    800: '#8B1245',
                    900: '#411526',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            spacing: {
                'navh': 'var(--nr-header-h)',
                'navf': 'var(--nr-footer-h)',
                'sdbw': 'var(--nr-sidebar)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-subtle': 'linear-gradient(180deg, theme(colors.neutral.100 / 50%) 0%, theme(colors.neutral.100 / 0%) 48.32%)',
                'gradient-subtle-dark': 'linear-gradient(180deg, theme(colors.neutral.900 / 50%) 0%, theme(colors.neutral.900 / 0%) 48.32%)',
                'gradient-subtle-gray': 'linear-gradient(180deg, theme(colors.neutral.900) 0%, theme(colors.neutral.900 / 80%) 100%)',
                'gradient-subtle-white': 'linear-gradient(180deg, theme(colors.white) 0%, theme(colors.white / 80%) 100%)',
                'gradient-glow-backdrop': 'radial-gradient(8em circle at calc(50%) 10px, theme(colors.green.500), transparent 30%)',
                'gradient-fluo': 'linear-gradient(180deg, var(--fluo-gradual-start), var(--fluo-gradual-end))',
                'gradient-fluo-tr': 'linear-gradient(to right, var(--fluo-gradual-start), var(--fluo-gradual-end))',
                'gradient-four-c3': 'linear-gradient(to right, #22d8e0 30%, #10b981 60%, #facc15 100%)',
                'gradient-four-c4': 'linear-gradient(to right, #6366f1 25%, #22d8e0 50%, #10b981 75%, #facc15 100%)',
                'gradient-article-cover': 'radial-gradient(circle at center, white 0%, white 0%, #10b981 60%)',
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
    plugins: [
        require("tailwindcss-animate"),
    ],
} satisfies Config;
