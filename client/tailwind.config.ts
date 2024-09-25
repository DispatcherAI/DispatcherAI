import type { Config } from "tailwindcss";

/**
 * Other values!
 */

export const HEADER_HEIGHT = 50;
export const MODULES_WIDTH = 350;

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        patterns: {
            opacities: {
                100: "1",
                80: ".80",
                60: ".60",
                40: ".40",
                20: ".20",
                10: ".10",
                5: ".05",
            },
            sizes: {
                1: "0.25rem",
                2: "0.5rem",
                4: "1rem",
                6: "1.5rem",
                8: "2rem",
                16: "4rem",
                20: "5rem",
                24: "6rem",
                32: "8rem",
            },
        },
        extend: {
            colors: {
                // shadcn
                text: "#020817",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "#020817",
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

                dp: {
                    text: "rgba(255,255,255,0.75)",
                    outline: "rgba(255,255,255,0.25)",
                    headingText: "#FFFFFF",
                    card: "#2D2D2D",
                    hoverCard: "#3C3C3C",
                    primary: "#69D2FF",
                    primary2: "#49B5E2",
                    inputLabelColor: "rgba(255,255,255,0.5)",
                    outlineNotSelected: "3B3B3B",
                    nonEmergency: "#47FF85",
                    critical: "#F40000",
                    background: "#1E1E1E",
                    inputText: "#9F9F9F",
                    medium: "#FABC1F",
                    backgroundHover: "#222222",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                xs: "calc(var(--radius) - 6px)",
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
            transitionDuration: {
                "5000": "5000ms",
            },
            spacing: { 15: "60px" },
            width: {
                modules: `${MODULES_WIDTH}px`,
            },
            height: {
                header: `${HEADER_HEIGHT}px`,
                fullWithHeader: `calc(100dvh - ${HEADER_HEIGHT}px)`,
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("tailwindcss-bg-patterns"),
    ],
} satisfies Config;

export default config;
