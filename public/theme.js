import { extendTheme, mode } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      'html, body': {
        fontFamily: 'body',
        color: mode('white', 'blue')(props),
        bg: mode('teal', 'red')(props),
        lineHeight: 'base',
      },
    }),
  },
};

const theme = extendTheme({ config });

export default theme;
