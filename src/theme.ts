// 1. Import the extendTheme function
import { extendTheme, theme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const themes = extendTheme({
  styles: {
    global: {
      body: {},
    },
  },
  colors: {
    brand: theme.colors.purple,
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

export default themes;
