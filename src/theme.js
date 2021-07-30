import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const customTheme = extendTheme({ config });

export default customTheme;