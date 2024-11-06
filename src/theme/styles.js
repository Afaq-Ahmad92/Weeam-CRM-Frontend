import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = extendTheme({
  colors: {
    brand: {
      100: "#F5ECCB",
      200: "#EDD199",
      300: "#E5B668",
      400: "#D99A36",
      500: "#B79045",
      600: "#B79045",
      700: "#755A24",
      800: "#544013",
      900: "#332602",
    },
    brandScheme: {
      100: "#F5ECCB",
      200: "#E5B668",
      300: "#E5B668",
      400: "#D99A36",
      500: "#B79045",
      600: "#B79045",
      700: "#755A24",
      800: "#544013",
      900: "#332602",
    },
    brandTabs: {
      100: "#F5ECCB",
      200: "#EDD199",
      300: "#EDD199",
      400: "#EDD199",
      500: "#EDD199",
      600: "#B79045",
      700: "#755A24",
      800: "#544013",
      900: "#332602",
    },

    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      300: "#eb7b74",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      400: "#fde04ce8",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#d0dcfb",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#1B254B",
      800: "#111c44",
      900: "#0b1437",
    },
    gray: {
      100: "#FAFCFE",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "Inter,sans-serif",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "Inter,sans-serif",
      },
    }),
  },
});
