/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bimg': "url('./src/istockphoto-851414042-612x612.jpg')"
    }
  },
  plugins: [],
 }
}
