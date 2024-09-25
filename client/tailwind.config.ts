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
                "5": ".05",
                "10": ".10",
                "20": ".20",
                "40": ".40",
                "60": ".60",
                "80": ".80",
                "100": "1",
            },
            sizes: {
                "1": "0.25rem",
                "2": "0.5rem",
                "4": "1rem",
                "6": "1.5rem",
                "8": "2rem",
                "16": "4rem",
                "20": "5rem",
                "24": "6rem",
                "32": "8rem",
            },
        },
        extend: {
            colors: {
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
                    background: "#1E1E1E",
                    cards: "#2D2D2D",
                    outline: "#515151",
                    outlineNotSelected: "#3B3B3B",
                    heading: "#FFFFFF",
                    text: "#C5C5C5",
                    input: "#DBDBDB",
                    accent: "#69D2FF",
                    safe: "#69D2FF",
                    warning: "#69D2FF",
                    critical: "#69D2FF",
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
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            transitionDuration: {
                "5000": "5000ms",
            },
            spacing: {
                "15": "60px",
            },
            width: {
                modules: `${MODULES_WIDTH}px`,
            },
            height: {
                header: `${HEADER_HEIGHT}px`,
                fullWithHeader: `calc(100dvh - ${HEADER_HEIGHT}px)`,
            },
            fontSize: {
                xxs: ["10px", "12px"],
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("tailwindcss-bg-patterns"),
    ],
} satisfies Config;

export default config;
