/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary : 'orange',
        secondary : '#D3D3D3'
        
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
