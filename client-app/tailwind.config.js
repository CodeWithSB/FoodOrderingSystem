const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false,
	theme: {
		extend: {
			height: {
				300: "300px",
				nav: "75px",
				footer: "350px",
			},
			width: {
				30: "30px",
				320: "320px",
				400: "400px",
				500: "500px",
			},
			minWidth: {
				60: "60px",
				320: "320px",
				500: "500px",
				600: "600px",
			},
			maxWidth: {
				320: "320px"
			},
			minHeight: {
				content: "calc(100vh - 75px)",
			},
			rotate: {
				"-75": "-75deg",
			},
			colors: {
				tomato: "#E7301C",
				darkteal: "#062639",
				lightgray: "#EDF4EA",
				flour: "#C9D4C5",
				facebook: "#3b5998",
				twitter: "#1DA1F2",
				instagram: "#E1306C",
				youtube: "#FF0000",
			},
		},
	},
	variants: {
		extend: {
			textColor: ["hover"],
			width: ["responsive", "hover", "focus"],
		},
	},
	plugins: [],
};
