import gluestackPlugin from "@gluestack-ui/nativewind-utils/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["app/**/*.{tsx,jsx,ts,js}", "components/**/*.{tsx,jsx,ts,js}"],
    presets: [require("nativewind/preset")],
    safelist: [
        {
            pattern:
                /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
        },
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    300: "var(--color-primary-300)",
                    400: "var(--color-primary-400)",
                },
                secondary: {},
                tertiary: {},
                error: {},
                success: {},
                warning: {},
                info: {},
                typography: {
                    white: "#FFFFFF",
                    "100": "var(--color-typography-100)",
                    "900": "var(--color-typography-900)",
                    default: "#ffffff",
                },
                outline: {},
                background: {},
                indicator: {},
                dark: {},
                grey: {
                    "50": "var(--color-grey-50)",
                    "100": "var(--color-grey-100",
                    "200": "var(--color-grey-200)",
                    "300": "var(--color-grey-300)",
                    "400": "var(--color-grey-400)",
                    "700": "var(--color-grey-700)",
                    "800": "var(--color-grey-800)",
                    "900": "var(--color-grey-900)",
                },
            },
            fontFamily: {
                heading: undefined,
                body: undefined,
                mono: undefined,
                roboto: ["Roboto", "sans-serif"],
            },
            fontWeight: {
                extrablack: "950",
            },
            fontSize: {
                "2xs": "10px",
            },

            boxShadow: {
                "hard-1": "-2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
                "hard-2": "0px 3px 10px 0px rgba(38, 38, 38, 0.20)",
                "hard-3": "2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
                "hard-4": "0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
                "hard-5": "0px 2px 10px 0px rgba(38, 38, 38, 0.10)",
                "soft-1": "0px 0px 10px rgba(38, 38, 38, 0.1)",
                "soft-2": "0px 0px 20px rgba(38, 38, 38, 0.2)",
                "soft-3": "0px 0px 30px rgba(38, 38, 38, 0.1)",
                "soft-4": "0px 0px 40px rgba(38, 38, 38, 0.1)",
            },
        },
    },
    plugins: [gluestackPlugin],
};
