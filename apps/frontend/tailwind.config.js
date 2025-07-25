/** @type {import('tailwindcss').Config} */

const colors = {
    primary: '#3c3c3c',
    secondary: '#16ACCE',
    'dark-gray': '#555',
    'mid-gray': '#777',
    gray: '#ccc',
    'light-gray': '#f1f1f1',
}

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors,
            fontFamily: {
                lato: ['lato', 'Helvetica Neue', 'Verdana', 'YuGothic', 'Meiryo', 'sans-serif'],
            },
            fontSize: {
                xxs: '0.625rem',
            },
            maxWidth: {
                base: '1160px',
            },
            width: {
                '45pct': '45%',
                '95pct': '95%',
            },
            screens: {
                sm: '576px',
                md: '740px',
                lg: '900px',
            },
            letterSpacing: {
                wide: '0.01em',
                wider: '0.02em',
                widest: '0.04em',
                'logo-small': '0.037em',
                'logo-medium': '0.055em',
            },
            lineHeight: {
                'ex-tight': '1.1',
            },
        },
    },
    plugins: [],
}
