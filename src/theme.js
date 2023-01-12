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
    brandSec: theme.colors.red,
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  components: {
    Divider: {
      variants: {
        "lg-color": {
          borderWidth: "3px",
          borderStyle: "solid",
          borderColor: theme.colors.purple[400],
        },
        "md-color": {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: theme.colors.purple[300],
        },
      },
    },
  },
});

export default themes;
