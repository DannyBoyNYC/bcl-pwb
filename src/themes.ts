import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const typography = {
	useNextVariants: true,
	fontSize: 14,
	fontFamily: "'Source Sans Pro', sans-serif"
}

export const LightTheme = createMuiTheme({
	typography,
	palette: {
		type: 'light'
	}
});

export const DarkTheme = createMuiTheme({
	typography,
	palette: {
    type: 'dark',
    primary: {
      light: '#56ade8',
      main: '#007eb6',
      dark: '#005286',
      contrastText: '#fff',
    },
    secondary: {
      light: '#66e0ff',
      main: '#00aeef',
      dark: '#007fbc',
      contrastText: '#000',
    },
	}
});

export const BarclaysTheme = createMuiTheme({
  typography,
  palette: {
    common: {
      black: '#111',
      white: '#fff'
    },
    background: {
      paper: '#fff',
      default: '#fafafa'
    },
    primary: {
      light: '#56ade8',
      main: '#007eb6',
      dark: '#005286',
      contrastText: '#fff',
    },
    secondary: {
      light: '#66e0ff',
      main: '#00aeef',
      dark: '#007fbc',
      contrastText: '#000',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  }
});

