/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4D5B9E",
                primaryDark: "#293264",
                secondary: "#D6DBF5",
                dimWhite: "#F5F7FB",
                greenCorrect: "#94D7A2",
                redWrong: "#F8BCBC",
            }
        },
    },
    plugins: [],
}