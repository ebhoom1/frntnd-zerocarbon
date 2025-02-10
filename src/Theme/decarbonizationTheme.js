import { createTheme } from "@mui/material/styles";

const commonColors = {
  primary: { main: "#4CAF50", contrastText: "#FFFFFF" }, // Eco Green (Main)
  secondary: { main: "#A5D6A7", contrastText: "#333333" }, // Light Green (Accents)
};

// Light Mode Theme
export const lightDecarbonizationTheme = createTheme({
  palette: {
    mode: "light",
    primary: commonColors.primary,
    secondary: commonColors.secondary,
    background: {
      default: "#F1F8E9", // Very Light Green (Eco-friendly base)
      paper: "#FFFFFF", // White for Cards
    },
    text: {
      primary: "#333333", // Dark Gray for readability
      secondary: "#388E3C", // Mid Green for headings
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Arial', sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700, color: "#388E3C" }, // Mid Green Headings
    body1: { fontSize: "1rem", color: "#333333" },
  },
});

// Dark Mode Theme
export const darkDecarbonizationTheme = createTheme({
  palette: {
    mode: "dark",
    primary: commonColors.primary,
    secondary: commonColors.secondary,
    background: {
      default: "#121212", // Black for Dark Mode
      paper: "#1E1E1E", // Dark Gray for Cards
    },
    text: {
      primary: "#E0E0E0", // Light Gray for Readability
      secondary: "#A5D6A7", // Light Green for Highlights
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Arial', sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700, color: "#A5D6A7" }, // Light Green Headings
    body1: { fontSize: "1rem", color: "#E0E0E0" },
  },
});
