/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Add TypeScript support
  ],
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
