/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
      },
      screens: {
        ms: "376px",
        // => @media (min-width : 375px) { ...}
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1440px",
        // => @media (min-width: 1280px) { ... }

        tv: "1441px",
        // => @media (min-width: 1440) { ... }
      },
      backgroundImage: {
        'light-desktop': "url('/public/images/bg-desktop-light.jpg')",
        'dark-desktop': "url('/public/images/bg-desktop-dark.jpg')",
        'light-mobile': "url('/public/images/bg-mobile-light.jpg')",
        'dark-mobile': "url('/public/images/bg-mobile-dark.jpg')",
      },
    },
    
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
