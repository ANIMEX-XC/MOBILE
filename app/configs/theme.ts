import { extendTheme } from "native-base";

export const customThemeConfig = extendTheme({
  primary: "#5730ef",

  colors: {
    primary: "#5730ef",
    customPurple: "#5730ef",
  },
  components: {
    Button: {
      baseStyle: {
        backgroundColor: "customPurple", // Set background color of Button
        _text: {
          color: "white", // Set text color to white
        },
      },
      variants: {
        solid: {
          backgroundColor: "customPurple",
          _text: {
            color: "white",
          },
        },
      },
    },
    Input: {
      baseStyle: {
        borderColor: "customPurple", // Set border color of Input
        _focus: {
          borderColor: "customPurple", // Set focus border color to custom purple
        },
      },
    },
  },
  fontConfig: {
    body: {
      fontFamily: "poppinsReguler",
    },
    heading: {
      fontFamily: "poppinsBold",
    },
  },
  useSystemColorMode: false,
  initialColorMode: "dark",
});
