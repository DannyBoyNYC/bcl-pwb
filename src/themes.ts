import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const typography = {
	useNextVariants: true,
	fontSize: 12,
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
		type: 'dark'
	}
});

export const BarclaysTheme = createMuiTheme({
	typography,
	palette: {
		primary: {
			main: '#00ACEE'
		},
		secondary: blue
	}
});