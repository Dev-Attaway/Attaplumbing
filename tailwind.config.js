module.exports = {
  content: [
    "./views/**/*.handlebars", // Double asterisk for subfolders
    "./public/**/*.js",
    "./node_modules/daisyui/dist/**/*.js", // Add this if using DaisyUI components
    "./views/**/*.handlebars", // Double asterisk for subfolders
    "./public/**/*.js",
    "./node_modules/daisyui/dist/**/*.js", // Add this if using DaisyUI components
  ],
  theme: {
    extend: {
      fontFamily: {
        DMsans: ["DM Sans", "sans-serif"], // Default sans-serif font
        poppins: ["Poppins", "sans-serif"], // Poppins font family
        rokkitt: ["Rokkitt", "serif"], // Rokkitt font family
        // Add as many custom font families as you need
      },
      backgroundPosition: {
        bottom: "bottom",
        "bottom-4": "center bottom 1rem",
        "bottom-2": "center bottom 0.5rem",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top",
        "top-4": "center top 1rem",
      },
      colors: {
        primaryQ: "#df8327", // Custom orange color
        primaryQDark: "#b7691b",
        primaryQLight: "#eaae73",
      },
      scale: {
        50: "0.5",
      },
      backgroundImage: {
        nailsBG: "url('/assets/imgs/Homepage_header.jpg')",
        primaryQ: "#df8327", // Custom orange color
        primaryQDark: "#b7691b",
        primaryQLight: "#eaae73",
      },
      scale: {
        50: "0.5",
      },
      backgroundImage: {
        nailsBG: "url('/assets/imgs/Homepage_header.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        Attaplumbing: {
          primary: "#ed1b24",

          "primary-content": "#fefefefe",

          secondary: "#f3f4f6",

          "secondary-content": "#0e0e0e",

          accent: "000000",

          "accent-content": "#bebebe",

          neutral: "#9ca3af",

          "neutral-content": "#090a0b",

          "base-100": "#fefefe",

          "base-200": "#dddddd",

          "base-300": "#bdbdbd",

          "base-content": "#161616",

          info: "#f3f4f6",

          "info-content": "#141415",

          success: "#22c55e",

          "success-content": "#000e03",

          warning: "#fde047",

          "warning-content": "#161202",

          error: "#ef4444",

          "error-content": "#140202",
        },
      },
    ],
  },
};
