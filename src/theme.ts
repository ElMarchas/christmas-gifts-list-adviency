// 1. Import the extendTheme function
import { extendTheme, theme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const themes = extendTheme({
  colors: {
    brand: theme.colors.purple,
  },
});

export default themes;
